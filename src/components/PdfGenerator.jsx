import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PdfGenerator = ({ columns, data, title }) => {
  const GenerarPDF = () => {
    const doc = new jsPDF();

    // Añadir logotipo
    const logoURL = 'https://img.icons8.com/external-soft-fill-juicy-fish/60/external-eco-packaging-symbols-soft-fill-soft-fill-juicy-fish.png';
    doc.addImage(logoURL, 'PNG', 160, 10, 30, 30); // Posición y tamaño del logo

    // Añadir fecha actual
    const fechaActual = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(`Fecha: ${fechaActual}`, 14, 20); // Posición de la fecha

    // Añadir nombre de la empresa
    doc.setFontSize(14);
    doc.text("Gestión de Ecotablas", 14, 30); // Posición del nombre de la empresa

    // Título del documento
    doc.setFontSize(18);
    doc.text(title , 14, 40); // Ajusta la posición del título según el logo

    // Crear la tabla con las columnas y filas dinámicas
    doc.autoTable({
      head: [columns.map(col => col.header)], // Las cabeceras vienen desde props
      body: data.map(row => columns.map(col => row[col.dataKey])), // Mapea los datos según las columnas dinámicas
      startY: 50, // Ajusta el startY para evitar superposición con el logo y el nombre de la empresa
      margin: { top: 20, left: 14, right: 14 },
      theme: 'striped'
    });

    // Guardar el PDF
    doc.save(`Listado_de_${title}.pdf`);
  };

  return (
    <button onClick={GenerarPDF} className=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Generar PDF
    </button>
  );
};

export default PdfGenerator;
