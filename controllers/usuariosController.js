
const {Usuario} = require('../models')
const bcrypt = require('bcryptjs');

exports.crearUsuario = async (req,res,next) => {
    try {
        const data = req.body
        data.contrasenia =await bcrypt.hash(data.contrasenia, 10)
        await Usuario.create(data)
        return res.status(200).json("Usuario creado exitosamente")
    } catch(e){
        console.log(e)
        return res.status(500).json({
            message: "Algo salio mal"
        });
    }
}