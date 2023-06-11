const {
  Examen,
  Hemograma,
  Parasitos,
  Solicitudes,
  Urianalisis,
  Examenes,
  Usuario,
} = require("../models");
const { buildPDF } = require("../services/pdfService");
const { buildPDFParasitos } = require("../services/pdfServiceParacitos");
const { buildPDFUrinalisis } = require("../services/pdfServiceUrinalisis");

/* Genera el PDF  */
exports.getPdf = async (req, res, next) => {
  try {
    const { solicitudId } = req.params;

    // Función que toma de la api los datos
    let solicitud = await Solicitudes.findOne({
      where: { id: solicitudId },
      include: [{ model: Examenes, attributes: ["nombre"] }, Examen, Usuario],
    });
    solicitud = solicitud.get({ plain: true });

    let examen;
    console.log("--------", solicitud.examene.nombre);

    switch (solicitud.examene.nombre) {
      case "Hemograma":
        let examen1 = await Hemograma.findOne({
          where: { examenId: solicitud.examenId },
        });
        examen = examen1.dataValues;
        // Generar PDF para Hemograma
        const hemogramaStream = res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment;filename=resultados-hemograma.pdf`,
        });
        buildPDF(
          (chunk) => hemogramaStream.write(chunk),
          () => hemogramaStream.end(),
          solicitud,
          examen
        );
        break;
      case "Parasitología":
        let examen2 = await Parasitos.findOne({
          where: { examenId: solicitud.examenId },
        });
        examen = examen2.dataValues;
        // Generar PDF para Parasitología
        const parasitologiaStream = res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment;filename=resultados-parasitologia.pdf`,
        });
        buildPDFParasitos(
          (chunk) => parasitologiaStream.write(chunk),
          () => parasitologiaStream.end(),
          solicitud,
          examen
        );
        break;
      case "Urianálisis":
        let examen3 = await Urianalisis.findOne({
          where: { examenId: solicitud.examenId },
        });
        examen = examen3.dataValues;
        // Generar PDF para Urianálisis
        const urinalisisStream = res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment;filename=resultados-urinalisis.pdf`,
        });
        buildPDFUrinalisis(
          (chunk) => urinalisisStream.write(chunk),
          () => urinalisisStream.end(),
          solicitud,
          examen
        );
        break;
    }
    console.log("Esta es una solicitud", solicitud);
    console.log("Este es un examen", examen);

    // -----

    // const stream = res.writeHead(200, {
    //   "Content-Type": "application/pdf",
    //   "Content-Disposition": `attachment;filename=resultados-examen.pdf`,
    //   // "Content-Disposition": `attachment;filename=resultados-examen-${solicitud.examene.nombre}.pdf`,
    // });
    // buildPDF(
    //   (chunk) => stream.write(chunk),
    //   () => stream.end(),
    //   solicitud,
    //   examen
    // );

    // -----
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      message: "Algo salio mal",
    });
  }
};
