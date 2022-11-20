const { Sequelize } = require('sequelize');
const sequelize = require('../util/database');

const Pokemon = sequelize.define('pokemon', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photoUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Pokemon;