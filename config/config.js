require('dotenv').config();  // this line is important!
module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": "127.0.0.1",
        "dialect": "mysql",
        "migrationStorageTableName": "sequelize_meta"
    },
    "production": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": "mysql",
        "operatorsAliases": false
    }
}