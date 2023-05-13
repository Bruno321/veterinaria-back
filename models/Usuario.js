const Sequelize = require('sequelize')
const { db } = require('../config/')

const Usuario = db.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    correo: {
        type: Sequelize.STRING,
        unique:true
    },
    nombres: Sequelize.STRING,
    apellidos: Sequelize.STRING,
    contrasenia: Sequelize.STRING,
    direccion: Sequelize.STRING,
    telefono: Sequelize.STRING,
    // TODO ver q otras mamadas

    fechaCreacion: {type: Sequelize.DATEONLY(64), defaultValue: Sequelize.NOW},
})


module.exports = Usuario;