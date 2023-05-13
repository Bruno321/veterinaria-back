const Sequelize = require('sequelize')
const { db } = require('../config/')

const Examenes = db.define('examenes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    img:Sequelize.STRING
    // TODO ver q otras mamadas

})

module.exports = Examenes;