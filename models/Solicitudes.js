const Sequelize = require('sequelize')
const { db } = require('../config/')

const Solicitudes = db.define('solicitudes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pendiente: {type: Sequelize.INTEGER, defaultValue: 0},
    fechaCreacion: {type: Sequelize.DATEONLY(64), defaultValue: Sequelize.NOW},
})

module.exports = Solicitudes;