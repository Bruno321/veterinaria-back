const jwt = require("jsonwebtoken");
const { Veterinario,Usuario } = require("../models");
const bcrypt = require('bcryptjs');

const tokenKey = 'debugKey'

exports.login = async (req,res,next) => {
    try {
        const {correo,contrasenia,tipo} = req.body
        let usuario
        switch(tipo){
            // es veterinario
            case 0:
                usuario = await Usuario.findOne({where:{correo}})
                break;
            // es usuario
            case 1:
                usuario = await Veterinario.findOne({where:{expediente:correo}})
                break;
                
        }
        if (!usuario){
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos"
            });
        }

        const hashPassword = await bcrypt.compare(contrasenia, usuario.dataValues.contrasenia)

        if (!hashPassword) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos"
            });
        }

        const token = jwt.sign(
            {
              "user":usuario.id,
            },
            tokenKey
          );
    
        return res.status(200).json({
            token: token,
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Algo salio mal"
        });
    }
}