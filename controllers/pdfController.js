const { Examen,Hemograma,Parasitos,Solicitudes,Urianalisis,Examenes } = require("../models") 
const {buildPDF} = require('../services/pdfService')
/* Genera el PDF  */
exports.getPdf = async (req,res,next) => {
    try {
        const {solicitudId} = req.params
        let tableData = [
            {
                numberRow: 0,
                apellidos:"e.apellidos",
                nombres:"nombres",
                numJugador:"numJugador"
            },
            {
                numberRow: 1,
                apellidos:"apellidos",
                nombres:"nombres",
                numJugador:"numJugador"
            }
        ]

        // TODO con deporte
        let solicitud = await Solicitudes.findOne({
            where:{id:solicitudId},
            include:[{model:Examenes,attributes:['nombre']},Examen]
        })
        solicitud = solicitud.get({plain:true})

        let examen 
        console.log("--------",solicitud.examene.nombre)

        switch(solicitud.examene.nombre){
            case 'Urianálisis':
                examen2 = await Urianalisis.findOne({where:{examenId:solicitud.examenId}})
                examen = examen2.dataValues
                break;
            case 'Parasitología':
                examen2 = await Parasitos.findOne({where:{examenId:solicitud.examenId}})
                examen = examen2.dataValues
                break;
            case 'Hematología':
                examen2 = await Hemograma.findOne({where:{examenId:solicitud.examenId}})
                examen = examen2.dataValues
                break;
        }
        console.log(solicitud)
        console.log(examen)
        
        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            // nombre del equipo
            'Content-Disposition': `attachment;filename=deportistas.pdf`
            
        });
        buildPDF(
            (chunk) => stream.write(chunk),
            () => stream.end(),
            tableData,
            solicitud
        )
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            ok: false,
            message: "Algo salio mal"
        });
    }
}