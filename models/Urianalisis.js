const Sequelize = require('sequelize')
const { db } = require('../config/')

const Urianalisis = db.define('urianalisis', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    color:Sequelize.STRING,
    apariencia:Sequelize.STRING,
    densidad:Sequelize.STRING,
    proteinas:Sequelize.STRING,
    glucosa:Sequelize.STRING,
    sangreHG:Sequelize.STRING,
    pH:Sequelize.STRING,
    cetonas:Sequelize.STRING,
    bilirrubina:Sequelize.STRING,
    eritrocitos:Sequelize.STRING,
    leucocitos:Sequelize.STRING,
    escamosas:Sequelize.STRING,
    transitorias:Sequelize.STRING,
    cilindros:Sequelize.STRING,
    renales:Sequelize.STRING,
    cristales:Sequelize.STRING,
    lipidos:Sequelize.STRING,
    bacterias:Sequelize.STRING,
    otros:Sequelize.STRING,
    interpretacion:Sequelize.STRING,
})


module.exports = Urianalisis;