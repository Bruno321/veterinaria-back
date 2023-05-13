const Examen = require('./Examen')
const Examenes = require('./Examenes')
const Hemograma = require('./Hemograma')
const Parasitos = require('./Parasitos')
const Solicitudes = require('./Solicitudes')
const Urianalisis = require('./Urianalisis')
const Usuario = require('./Usuario')
const Veterinario = require('./Veterinario')

Hemograma.belongsTo(Examen)
Parasitos.belongsTo(Examen)
Urianalisis.belongsTo(Examen)

// Hemograma.belongsTo(Solicitudes)
// Parasitos.belongsTo(Solicitudes)
// Urianalisis.belongsTo(Solicitudes)

Solicitudes.belongsTo(Usuario)
Solicitudes.belongsTo(Examenes)
Solicitudes.belongsTo(Examen)

module.exports = {
    Examen,
    Examenes,
    Hemograma,
    Parasitos,
    Solicitudes,
    Urianalisis,
    Usuario,
    Veterinario,
}