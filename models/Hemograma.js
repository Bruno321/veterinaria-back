const Sequelize = require('sequelize')
const { db } = require('../config/')

const Hemograma = db.define('hemograma', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    // TODO que pedo con las rayas
    Hematocrito:Sequelize.STRING,
    Hemoglobina:Sequelize.STRING,
    Eritrocitos:Sequelize.STRING,
    VGM:Sequelize.STRING,
    CGMH:Sequelize.STRING,
    Reticulocitos:Sequelize.STRING,
    Plaquetas:Sequelize.STRING,
    SolidosTotales:Sequelize.STRING,
    Leucocitos_Totales:Sequelize.STRING,
    Neutrófilos:Sequelize.STRING,
    Bandas:Sequelize.STRING,
    Linfocitos:Sequelize.STRING,
    Monocitos:Sequelize.STRING,
    Eosinófilos:Sequelize.STRING,
    Basofilos:Sequelize.STRING,

    HematocritoVar:Sequelize.STRING,
    HemoglobinaVar:Sequelize.STRING,
    EritrocitosVar:Sequelize.STRING,
    VGMVar:Sequelize.STRING,
    CGMHVar:Sequelize.STRING,
    ReticulocitosVar:Sequelize.STRING,
    PlaquetasVar:Sequelize.STRING,
    SolidosTotalesVar:Sequelize.STRING,
    Leucocitos_TotalesVar:Sequelize.STRING,
    NeutrófilosVar:Sequelize.STRING,
    BandasVar:Sequelize.STRING,
    LinfocitosVar:Sequelize.STRING,
    MonocitosVar:Sequelize.STRING,
    EosinófilosVar:Sequelize.STRING,
    BasofilosVar:Sequelize.STRING,

    Anisocitosis:Sequelize.STRING,
    Policromasia:Sequelize.STRING,
    PBasofilico:Sequelize.STRING,
    Hipocromía:Sequelize.STRING,
    Aglutinación:Sequelize.STRING,
    Rouleaux:Sequelize.STRING,
    Metarrubricitos:Sequelize.STRING,
    Poiquilocitosis:Sequelize.STRING,
    Tipo:Sequelize.STRING,
    NeutrofilosToxicos:Sequelize.STRING,
    LinfocitosReactivos:Sequelize.STRING,
    MieloInmaduros:Sequelize.STRING,
    Microfilarias:Sequelize.STRING,
    Macroplaquetas:Sequelize.STRING,
    Artefactos:Sequelize.STRING,

    interpretacion:Sequelize.STRING,
})

module.exports = Hemograma;