const Sequelize = require('sequelize')
const { db } = require('../config/')

const Veterinario = db.define('veterinario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    expediente: {
        type: Sequelize.INTEGER,
        unique:true
    },
    nombres: Sequelize.STRING,
    apellidos: Sequelize.STRING,
    contrasenia: Sequelize.STRING,
    // TODO ver q otras mamadas

    fechaCreacion: {type: Sequelize.DATEONLY(64), defaultValue: Sequelize.NOW},
})


module.exports = Veterinario;