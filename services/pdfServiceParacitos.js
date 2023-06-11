const PDFDocument = require("pdfkit");
const PdfTable = require("voilab-pdf-table");
const PdfkitConstruct = require("pdfkit-construct");

/**
 * @params deportistasArreglo.
 * Se debe de pasar a la tabla que muestra los deportistas un arreglo de objetos que contenga los siguientes atributos:
 * numberRow, apellidos, nombres, numeroJugador.
 */

async function buildPDFParasitos(dataCallback, endCallback, solicitud, examen) {
  const pdf = new PdfkitConstruct({
    size: "A4",
    bufferPages: true,
  });

  pdf.on("data", dataCallback);
  pdf.on("end", endCallback);

  pdf.setDocumentHeader(
    {
      height: "17%",
    },
    () => {
      pdf.image("assets/img/FCN.png", 430, 68, { width: 36 });
      pdf.image("assets/img/UAQ.png", 480, 68, { width: 26 });

      pdf
        .font("Helvetica-Bold")
        .fontSize(14)
        .fillColor("#004090")
        .text("FACULTAD DE CIENCIAS NATURALES")
        .moveDown(0.2);
      pdf
        .font("Helvetica-Bold")
        .fontSize(12)
        .fillColor("#004090")
        .text("Laboratorio de Patología Veterinaria")
        .moveDown(1.2);
      pdf
        .font("Helvetica")
        .fontSize(14)
        .fillColor("#004090")
        .text("Resultados Parasitología", { align: "center" });
    }
  );

  // Tabla que muestra los datos del propietario
  pdf.addTable(
    [
      { key: "columna1", label: "Caso", align: "center" },
      { key: "columna2", label: solicitud.examen.caso, align: "center" },
    ],
    [
      { columna1: "Propietario", columna2: solicitud.usuario.nombres },
      { columna1: "Direccion", columna2: solicitud.usuario.direccion },
      { columna1: "Telefono", columna2: solicitud.usuario.telefono },
    ],
    {
      width: "fill_body",
      border: { size: 0.1, color: "#004090" },
      marginLeft: 60,
      marginRight: 60,
      headAlign: "center",
      headFont: "Helvetica",
      headFontSize: 8,
      headBackground: "#ffffff",
      headColor: "#000000",
      cellsFont: "Helvetica",
      cellsFontSize: 8,
      cellsPadding: 0.8,
      marginBottom: 16,
    }
  );

  // Tabla que muestra los datos de la mascota
  pdf.addTable(
    [
      { key: "columna1", label: "Fecha", align: "center" },
      {
        key: "columna2",
        label: solicitud.examen.fechaCreacion,
        align: "center",
      },
      { key: "columna3", label: "Hora", align: "center" },
      { key: "columna4", label: solicitud.examen.hora, align: "center" },
    ],
    [
      {
        columna1: "Especie",
        columna2: solicitud.examen.especie,
        columna3: "Nombre",
        columna4: solicitud.examen.nombreAnimal,
      },
      {
        columna1: "Raza",
        columna2: solicitud.examen.razaAnimal,
        columna3: "Edad",
        columna4: solicitud.examen.edadAnimal,
      },
      {
        columna1: "Sexo",
        columna2: solicitud.examen.sexo,
        columna3: "Castrado",
        columna4: solicitud.examen.estaCastrado,
      },
      {
        columna1: "MVZ",
        columna2: solicitud.examen.nombreMedico,
        columna3: "Expediente",
        columna4: solicitud.examen.expediente,
      },
    ],
    {
      width: "fill_body",
      border: { size: 0.1, color: "#004090" },
      marginLeft: 60,
      marginRight: 60,
      headAlign: "center",
      headFont: "Helvetica",
      headFontSize: 8,
      headBackground: "#ffffff",
      headColor: "#000000",
      cellsFont: "Helvetica",
      cellsFontSize: 8,
      cellsPadding: 0.8,
      marginBottom: 16,
    }
  );

  // Tabla que muestra los datos del previos al examen
  pdf.addTable(
    [
      {
        key: "columna1",
        label: "Examen fisico:",
        align: "center",
      },
      {
        key: "columna2",
        label: solicitud.examen.anamnesisExamenFisico,
        align: "center",
      },
    ],
    [
      {
        columna1: "Tratamiento previo:",
        columna2: solicitud.examen.tratamientosPrevios,
      },
    ],
    {
      width: "fill_body",
      border: { size: 0.1, color: "#004090" },
      marginLeft: 100,
      marginRight: 100,
      headAlign: "center",
      headFont: "Helvetica",
      headFontSize: 8,
      headBackground: "#ffffff",
      headColor: "#000000",
      cellsFont: "Helvetica",
      cellsFontSize: 8,
      cellsPadding: 0.8,
      marginBottom: 16,
    }
  );

  // Tabla que muestra los datos del examen
  pdf.addTable(
    [
      { key: "columna1", label: "Tipo de muestra", align: "center" },
      { key: "columna2", label: examen.tipoMuestra, align: "center" },
    ],
    [{ columna1: "Tipo de muestra", columna2: "Tipo de muestra" }],
    {
      width: "fill_body",
      border: { size: 0.1, color: "#004090" },
      marginLeft: 60,
      marginRight: 60,
      headAlign: "center",
      headFont: "Helvetica",
      headFontSize: 8,
      headBackground: "#ffffff",
      headColor: "#000000",
      cellsFont: "Helvetica",
      cellsFontSize: 8,
      cellsPadding: 1.5,
      marginBottom: -14,
    }
  );

  pdf.addTable(
    [
      { key: "columna1", label: "Examen microscópico", align: "center" },
      { key: "columna2", label: "", align: "center" },
    ],
    [
      {
        columna1: "                    Técnica:                        ",
        columna2: examen.tecnica,
      },
      { columna1: "Resultado:", columna2: examen.resultado },
    ],
    {
      width: "fill_body",
      border: { size: 0.1, color: "#004090" },
      marginLeft: 60,
      marginRight: 60,
      headAlign: "center",
      headFont: "Helvetica",
      headFontSize: 10,
      headBackground: "#004090",
      headColor: "#fff",
      cellsFont: "Helvetica",
      cellsFontSize: 8,
      cellsPadding: 1.5,
      marginBottom: 16,
    }
  );

  // Tabla que muestra la interpretación del médico
  pdf.addTable(
    [
      { key: "columna1", label: "", align: "left", align: "center" },
      { key: "columna2", label: "", align: "left", align: "center" },
    ],
    [{ columna1: "Observaciones:", columna2: examen.observaciones }],
    {
      width: "fill_body",
      border: { size: 0.1, color: "#004090" },
      marginLeft: 60,
      marginRight: 60,
      headAlign: "center",
      headFont: "Helvetica",
      headFontSize: 8,
      headBackground: "#004090",
      headColor: "#000000",
      cellsFont: "Helvetica",
      cellsFontSize: 8,
      cellsPadding: 1.2,
      marginBottom: 4,
    }
  );

  pdf.setDocumentFooter(
    {
      height: "10%",
    },
    () => {
      pdf
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#000000")
        .text(
          "__________________________________",
          pdf.footer.x + 60,
          pdf.footer.y - 210
        );
      pdf
        .font("Helvetica")
        .fontSize(8)
        .text(
          "Técnico en Análisis Clínicos",
          pdf.footer.x + 100,
          pdf.footer.y - 196
        );
      pdf
        .font("Helvetica")
        .fontSize(10)
        .text(
          "__________________________________",
          pdf.footer.x + 60,
          pdf.footer.y - 110
        );
      pdf
        .font("Helvetica")
        .fontSize(7)
        .text(
          "D.Cs. y Especialista certificada en Anatomopatología Veterinaria, \n CONCERVET \n VoBo. Responsable del Laboratorio de Patología Veterinaria",
          pdf.footer.x - 200,
          pdf.footer.y - 96,
          { align: "center" }
        );

      pdf
        .font("Helvetica")
        .fontSize(10)
        .text(
          "__________________________________",
          pdf.footer.x + 324,
          pdf.footer.y - 210
        );
      pdf
        .font("Helvetica")
        .fontSize(8)
        .text(
          "Practicante de Servicio Social",
          pdf.footer.x + 366,
          pdf.footer.y - 196
        );

      pdf
        .font("Helvetica")
        .fontSize(10)
        .text(
          "__________________________________",
          pdf.footer.x + 324,
          pdf.footer.y - 110
        );
      pdf
        .font("Helvetica")
        .fontSize(7)
        .text(
          "D.Cs. Certificado en Patología Clínica Veterinaria,\nCONCERVET",
          pdf.footer.x + 330,
          pdf.footer.y - 96,
          { align: "center" }
        );
      pdf.text(
        "Av. De las ciencias S/N, Delegación Santa Rosa Jáuregui CP: 76230, Juriquilla Querétaro, Tel: 4421921200 Ext. 5376\n Formato, resultados e interpretación son propiedad del Laboratorio de Patología Veterinaria FCN-UAQ\n Prohibida la reproducción total o parcial de este documento.\n Comentarios, dudas de la interpretación: patologiaveterinaria@uaq.mx",
        pdf.footer.x + 60,
        pdf.footer.y - 22,
        { align: "center" }
      );
    }
  );
  // render tables
  pdf.render();
  pdf.end();
}

module.exports = {
  buildPDFParasitos,
};
