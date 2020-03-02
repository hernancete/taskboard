
. ../.env

CONTAINER_NAME='mysql'
DB_DOCKER_VOLUME='taskboard_db'

CONTAINER_RUNNING=$(docker ps -f name=${CONTAINER_NAME}|grep -w ${CONTAINER_NAME})
CONTAINER_EXISTS=$(docker ps -a -f name=${CONTAINER_NAME}|grep -w ${CONTAINER_NAME})

CREATE_CONTAINER_CMD="docker container create --name ${CONTAINER_NAME} -p 3306:3306 -v ${DB_DOCKER_VOLUME}:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=${DB_PASS} mysql:8.0"
START_CONTAINER_CMD="docker start ${CONTAINER_NAME}"

if [ -z "${CONTAINER_RUNNING}" ];then
    if [ -z "${CONTAINER_EXISTS}" ];then
        # create container
        ${CREATE_CONTAINER_CMD}
    fi
    # start container
    ${START_CONTAINER_CMD}
fi

# create DB
CREATE_DB_SQL="CREATE DATABASE IF NOT EXISTS ${DB_NAME};"
docker exec -it ${CONTAINER_NAME} mysql -u root -p${DB_ROOT_PASS} --execute="${CREATE_DB_SQL}"

# create user
CREATE_USER_SQL="CREATE USER IF NOT EXISTS '${DB_USER}'@'%' IDENTIFIED WITH mysql_native_password BY '${DB_PASS}';"
GRANT_USER_SQL="GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'%';"
docker exec -it ${CONTAINER_NAME} mysql -u root -p${DB_ROOT_PASS} --execute="${CREATE_USER_SQL}${GRANT_USER_SQL}"
# More info about mysql_native_password plugin https://github.com/mysqljs/mysql/issues/2046#issuecomment-396039909
