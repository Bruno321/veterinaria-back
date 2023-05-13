/**
 * Ruta para las acciones sobre un deportista
 * Path: pdf/
 */
const { Router } = require("express");
const router = Router();
const { pdfController } = require("../controllers");

/**
* Regresa un renderizado de la imagen
*/
router.get("/:solicitudId",
   // authorization,
   pdfController.getPdf)

module.exports = router;
