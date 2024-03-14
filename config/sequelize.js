const { Sequelize } = require("sequelize");
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = require("./config");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: "mysql"
});

module.exports = sequelize;