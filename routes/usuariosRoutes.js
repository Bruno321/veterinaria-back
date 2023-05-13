/**
 * Ruta para los usuarios
 * Path: api/usuarios/
 */
const { Router } = require("express");
const router = Router();
const { usuariosController } = require("../controllers");

router.post("/", usuariosController.crearUsuario);

module.exports = router;