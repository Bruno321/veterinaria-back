const PDFDocument = require("pdfkit");
const PdfTable = require("voilab-pdf-table");
const PdfkitConstruct = require("pdfkit-construct");

/**
 * @params deportistasArreglo.
 * Se debe de pasar a la tabla que muestra los deportistas un arreglo de objetos que contenga los siguientes atributos:
 * numberRow, apellidos, nombres, numeroJugador.
 */

async function buildPDF(dataCallback, endCallback, solicitud, examen) {
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
        .text("Resultados Hematología", { align: "center" });
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
      marginBottom: 12,
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
      marginBottom: 12,
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
      marginBottom: 12,
    }
  );

  // Tabla que muestra los datos del previos al examen
  pdf.addTable(
    [
      { key: "columna1", label: "Mesurando", align: "center" },
      { key: "columna2", label: "Valor", align: "center" },
      { key: "columna3", label: "Variación", align: "center" },
      { key: "columna4", label: "Referencia", align: "center" },
      { key: "columna5", label: "Unidades", align: "center" },
      { key: "columna6", label: "Morfología celular", align: "center" },
      { key: "columna7", label: " ", align: "center" },
    ],
    [
      {
        columna1: "Hematocrito",
        columna2: examen.Hematocrito,
        columna3: examen.HematocritoVar,
        columna4: "0.37 - 0.55",
        columna5: "L/L",
        columna6: "Anisocitosis",
        columna7: examen.Anisocitosis,
      },
      {
        columna1: "Hemoglobina",
        columna2: examen.Hemoglobina,
        columna3: examen.HemoglobinaVar,
        columna4: "120 - 180",
        columna5: "g/L",
        columna6: "Policromasia",
        columna7: examen.Policromasia,
      },
      {
        columna1: "Eritrocitos",
        columna2: examen.Eritrocitos,
        columna3: examen.EritrocitosVar,
        columna4: "5.5 - 8.5",
        columna5: "x10^12/L",
        columna6: "P. Basofilico",
        columna7: examen.PBasofilico,
      },
      {
        columna1: "VGM",
        columna2: examen.VGM,
        columna3: examen.VGMVar,
        columna4: "60 - 70",
        columna5: "fL",
        columna6: "Hipocromía",
        columna7: examen.Hipocromía,
      },
      {
        columna1: "CGMH",
        columna2: examen.CGMH,
        columna3: examen.CGMHVar,
        columna4: "320 - 360",
        columna5: "g/L",
        columna6: "Aglutinación",
        columna7: examen.Aglutinación,
      },
      {
        columna1: "Reticulocitos",
        columna2: examen.Reticulocitos,
        columna3: examen.ReticulocitosVar,
        columna4: "<60",
        columna5: "x10^9/L",
        columna6: "Rouleaux",
        columna7: examen.Rouleaux,
      },
      {
        columna1: "Plaquetas",
        columna2: examen.Plaquetas,
        columna3: examen.PlaquetasVar,
        columna4: "200 - 600",
        columna5: "x10^9/L",
        columna6: "Metarrubricitos",
        columna7: examen.Metarrubricitos,
      },
      {
        columna1: "Sólidos Totales",
        columna2: examen.SolidosTotales,
        columna3: examen.SolidosTotalesVar,
        columna4: "60 - 75",
        columna5: "g/L",
        columna6: "Poiquilocitosis",
        columna7: examen.Poiquilocitosis,
      },
      {
        columna1: "Leucocitos Totales",
        columna2: examen.Leucocitos_Totales,
        columna3: examen.Leucocitos_TotalesVar,
        columna4: "6.0 - 17.0",
        columna5: "x10^9/L",
        columna6: "Tipo",
        columna7: examen.Tipo,
      },
      {
        columna1: "Neutrófilos",
        columna2: examen.Neutrófilos,
        columna3: examen.NeutrófilosVar,
        columna4: "3.0 - 11.5",
        columna5: "x10^9/L",
        columna6: "",
        columna7: "",
      },
      {
        columna1: "Bandas",
        columna2: examen.Bandas,
        columna3: examen.BandasVar,
        columna4: "0 - 0.3",
        columna5: "x10^9/L",
        columna6: "",
        columna7: "",
      },
      {
        columna1: "Linfocitos",
        columna2: examen.Linfocitos,
        columna3: examen.LinfocitosVar,
        columna4: "1.0 - 4.8",
        columna5: "x10^9/L",
        columna6: "Neutrofilos Toxicos",
        columna7: examen.NeutrofilosToxicos,
      },
      {
        columna1: "Monocitos",
        columna2: examen.Monocitos,
        columna3: examen.MonocitosVar,
        columna4: "0 - 1.4",
        columna5: "x10^9/L",
        columna6: "Linfocitos Reactivos",
        columna7: examen.LinfocitosReactivos,
      },
      {
        columna1: "Eosinófilos",
        columna2: examen.Eosinófilos,
        columna3: examen.EosinófilosVar,
        columna4: "0 - 0.9",
        columna5: "x10^9/L",
        columna6: "Mielo Inmaduros",
        columna7: examen.MieloInmaduros,
      },
      {
        columna1: "Basofilos",
        columna2: examen.Basofilos,
        columna3: examen.BasofilosVar,
        columna4: "Raros",
        columna5: "x10^9/L",
        columna6: "Microfilarias",
        columna7: examen.Microfilarias,
      },
      {
        columna1: "Artefactos",
        columna2: examen.Artefactos,
        columna3: "",
        columna4: "",
        columna5: "",
        columna6: "Macroplaquetas",
        columna7: examen.Macroplaquetas,
      },
    ],
    {
      width: "fill_body",
      border: { size: 0.1, color: "#004090" },
      marginLeft: 60,
      marginRight: 60,
      headAlign: "center",
      headFont: "Helvetica",
      headFontSize: 7,
      headBackground: "#004090",
      headColor: "#fff",
      cellsFont: "Helvetica",
      cellsFontSize: 8,
      cellsPadding: 1,
      marginBottom: 12,
    }
  );

  // Tabla que muestra la interpretación del médico
  pdf.addTable(
    [
      { key: "columna1", label: "", align: "left" },
      { key: "columna2", label: "", align: "left" },
    ],
    [{ columna1: "Interpretación", columna2: examen.interpretacion }],
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
          pdf.footer.y - 70
        );
      pdf
        .font("Helvetica")
        .fontSize(8)
        .text(
          "Técnico en Análisis Clínicos",
          pdf.footer.x + 100,
          pdf.footer.y - 57
        );
      pdf
        .font("Helvetica")
        .fontSize(10)
        .text(
          "__________________________________",
          pdf.footer.x + 60,
          pdf.footer.y - 22
        );
      pdf
        .font("Helvetica")
        .fontSize(6)
        .text(
          "D.Cs. y Especialista certificada en Anatomopatología Veterinaria, \n CONCERVET \n VoBo. Responsable del Laboratorio de Patología Veterinaria",
          pdf.footer.x - 200,
          pdf.footer.y - 9,
          { align: "center" }
        );

      pdf
        .font("Helvetica")
        .fontSize(10)
        .text(
          "__________________________________",
          pdf.footer.x + 324,
          pdf.footer.y - 70
        );
      pdf
        .font("Helvetica")
        .fontSize(8)
        .text(
          "Practicante de Servicio Social",
          pdf.footer.x + 366,
          pdf.footer.y - 57
        );

      pdf
        .font("Helvetica")
        .fontSize(10)
        .text(
          "__________________________________",
          pdf.footer.x + 324,
          pdf.footer.y - 22
        );
      pdf
        .font("Helvetica")
        .fontSize(6)
        .text(
          "D.Cs. Certificado en Patología Clínica Veterinaria,\nCONCERVET",
          pdf.footer.x + 330,
          pdf.footer.y - 9,
          { align: "center" }
        );
    }
  );
  // render tables
  pdf.render();
  pdf.end();
}

module.exports = {
  buildPDF,
};
