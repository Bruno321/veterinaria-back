/**
 * Ruta para los usuarios
 * Path: api/usuarios/
 */
const { Router } = require("express");
const router = Router();
const { veterinariosController } = require("../controllers");

router.post("/", veterinariosController.crearVeterinario);

module.exports = router;