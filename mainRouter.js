/**
 * Router principal con las demás rutas secundarias
 * PATH: 
 */
const { Router } = require("express");

const {
	authRoutes,
	examenesRoutes,
	usuariosRoutes,
	veterinariosRoutes,
	pdfRoute
} = require("./routes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/examenes", examenesRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/veterinarios", veterinariosRoutes);
router.use("/pdf", pdfRoute);

module.exports = router;