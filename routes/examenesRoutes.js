/**
 * Ruta para los examenes
 * Path: api/examenes/
 */
const { Router } = require("express");
const router = Router();
const { examenesController } = require("../controllers");
const {authorization} = require("../middlewares")

// Crea un examen
router.post("/",authorization, examenesController.crearExamen);

// regresa los tipos de examenes
router.get("/", examenesController.obtenerExamenes);

// regresa la informacion de un examen
router.get("/hecho/:id",authorization, examenesController.obtenerExamen);

// Crea la solicitud de un examen
router.post("/solicitud",authorization, examenesController.crearSolicitud);

// sin id: regresa todas las solicitudes y sus examenes, con id regresa las del usuario
router.get("/solicitud",authorization, examenesController.obtenerSolicitudes);

module.exports = router;