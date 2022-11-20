const { Sequelize } = require('sequelize');
const sequelize = require('../util/database');

const Region = sequelize.define('region', {
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
});

module.exports = Region;