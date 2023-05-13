const Sequelize = require('sequelize')
const { db } = require('../config/')

const Examen = db.define('examen', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    caso: Sequelize.STRING,
    propietario: Sequelize.STRING,
    direccion: Sequelize.STRING,
    telefono: Sequelize.STRING,

    fecha: Sequelize.DATEONLY,
    hora: Sequelize.TIME,
    
    especie: Sequelize.STRING,
    nombreAnimal: Sequelize.STRING,
    razaAnimal: Sequelize.STRING,
    sexo: Sequelize.INTEGER,
    nombreMedico: Sequelize.STRING,
    edadAnimal: Sequelize.INTEGER,
    estaCastrado: Sequelize.INTEGER,
    expediente: Sequelize.INTEGER,
    anamnesisExamenFisico: Sequelize.STRING,
    tratamientosPrevios: Sequelize.STRING,

    fechaCreacion: {type: Sequelize.DATEONLY(64), defaultValue: Sequelize.NOW},
})

module.exports = Examen;