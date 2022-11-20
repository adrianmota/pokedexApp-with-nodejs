const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pokedex', '', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});

module.exports = sequelize;