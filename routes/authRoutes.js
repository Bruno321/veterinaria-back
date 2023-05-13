/**
 * Ruta para dar acceso
 * Path: api/auth/
 */
const { Router } = require("express");
const router = Router();
const { authController } = require("../controllers");

router.post("/", authController.login);

module.exports = router;