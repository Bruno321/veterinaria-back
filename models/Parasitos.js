const Sequelize = require('sequelize')
const { db } = require('../config/')

const Parasitos = db.define('parasitos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    tipoMuestra: Sequelize.STRING,
    tecnica: Sequelize.STRING,
    resultado: Sequelize.STRING,
    observaciones:Sequelize.STRING,
})

module.exports = Parasitos;