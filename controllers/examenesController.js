const { Examen,Examenes,Hemograma,Parasitos,Urianalisis,Solicitudes,Usuario } = require("../models");


exports.crearExamen = async (req,res,next) => {
    try {
        const data = req.body
        console.log(data)
        await Examen.update(data.informacionGeneral,{where:{id:data.informacionGeneral.id}})
        await Solicitudes.update({pendiente:1},{where:{id:data.id}})
        switch(data.tipo){
            case "hemograma":
                await Hemograma.create(data.informacionEspecifica)
                break;
            case "parasitos":
                await Parasitos.create(data.informacionEspecifica)
                break;
            case "urianalisis":
                await Urianalisis.create(data.informacionEspecifica)
                break;
        }
        return res.status(200).json("Examen llenado correctamente")
    } catch(e){
        console.log(e)
        return res.status(500).json({
            message: "Algo salio mal"
        });
    }
}

exports.obtenerExamenes = async (req,res,next) => {
    try {
        const examenes = await Examenes.findAll()
        return res.status(200).json(examenes)
    } catch(e){
        console.log(e)
        return res.status(500).json({
            message: "Algo salio mal"
        });
    }
}

exports.obtenerExamen = async (req,res,next) => {
    try {
        const examen = await Solicitudes.findOne({
            where:{id:req.params.id},
            include:[Examen,Examenes,{model:Usuario,attributes:['telefono','direccion','correo','nombres','apellidos']}]
        })
        return res.status(200).json(examen)
    } catch(e){
        console.log(e)
        return res.status(500).json({
            message: "Algo salio mal"
        });
    }
}

exports.crearSolicitud = async (req,res,next) => {
    console.log("adadad")
    try {
        // TODO lo del front
        const {solicitudData,examenData} = req.body
        solicitudData.usuarioId = req.user
        examenData.usuarioId = req.user
        const examen = await Examen.create(examenData)
        solicitudData.examenId = examen.id
        console.log(solicitudData)
        await Solicitudes.create(solicitudData)
        return res.status(200).json("Examen solicitado correctamente")
    } catch(e){
        console.log(e)
        return res.status(500).json({
            message: "Algo salio mal"
        });
    }
}

exports.obtenerSolicitudes = async (req,res,next) => {
    try {
        if(req?.query.isUser){
            const usuarioId = req.user
            const solicitudes = await Solicitudes.findAll({
                where:{usuarioId},
                include:[{model:Examen,attributes:['nombreAnimal','caso']},Examenes]
            })
            return res.status(200).json(solicitudes)
        }
        // TODO autoasignar CASO que seria el id
        const solicitudes = await Solicitudes.findAll({
            include:[{model:Examen,attributes:['nombreAnimal','caso']},Examenes,{model:Usuario,attributes:['nombres','apellidos']}]
        })
        return res.status(200).json(solicitudes)
    } catch(e){
        console.log(e)
        return res.status(500).json({
            message: "Algo salio mal"
        });
    }
}