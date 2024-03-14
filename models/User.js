const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const user = sequelize.define("User", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: true
    },

    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: false
    },

    google_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },

    github_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    }

},{
    timestamps: true,
    underscored: true
});

module.exports = user;