const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwtSign = (data) => {
    try {
        return jwt.sign(data, process.env.JWT_SECRET);
    }
    catch (e) {
        console.log('Error building token');
        throw new Error('Error building token');
    }
}

const jwtDecode = (token) => {
    try {
        return jwt.decode(token, process.env.JWT_SECRET);
    }
    catch (e) {
        console.log('Auth error', e);
        throw new Error('Auth error');
    }
}

const hashPassword = async (plainTextPassword) => {
    const saltRounds = 10;
    return await bcrypt.hash(plainTextPassword, saltRounds);
}

const validatePassword = async (plainTextPassword, hashedPassword) => {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
}

module.exports = {
    jwtSign,
    jwtDecode,
    hashPassword,
    validatePassword,
}
