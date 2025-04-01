import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa6";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Importar desde Firebase

const PdfGenerator = ({ columns, data, title }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener el usuario autenticado desde Firebase
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null); // Si no hay usuario, puedes manejarlo aquí
      }
    });

    return () => unsubscribe(); // Limpiar el suscriptor al desmontar el componente
  }, []);

  const GenerarPDF = () => {
    const doc = new jsPDF();

    // Añadir logotipo
    const logoURL =
      "https://img.icons8.com/external-soft-fill-juicy-fish/60/external-eco-packaging-symbols-soft-fill-soft-fill-juicy-fish.png";
    doc.addImage(logoURL, "PNG", 160, 10, 30, 30); // Posición y tamaño del logo

    // Añadir fecha actual
    const fechaActual = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Fecha: ${fechaActual}`, 14, 20); // Posición de la fecha

    // Añadir nombre de la empresa
    doc.setFontSize(12);
    doc.text("Gestión de Ecotablas S.A.", 14, 30); // Posición del nombre de la empresa

    // Si el usuario está autenticado, mostrar su nombre y correo
    if (user) {
      doc.setFontSize(10);
      doc.text(`Usuario: ${user.displayName || "Desconocido"}`, 14, 40); // Nombre del usuario
      doc.text(`Correo: ${user.email}`, 14, 50); // Correo del usuario
    } else {
      doc.setFontSize(10);
      doc.text("Usuario no autenticado", 14, 40);
    }

    // Título del documento
    doc.setFontSize(16);
    doc.text(title, 14, 60); // Ajusta la posición del título según el logo

    // Crear la tabla con las columnas y filas dinámicas
    doc.autoTable({
      head: [columns.map((col) => col.header)], // Las cabeceras vienen desde props
      body: data.map((row) => columns.map((col) => row[col.dataKey])), // Mapea los datos según las columnas dinámicas
      startY: 70, // Ajusta el inicio para evitar superposición con el logo
      margin: { top: 20, left: 14, right: 14 },
      theme: "striped",
      didDrawPage: (data) => {
        // Footer dinámico en cada página
        const pageCount = doc.internal.getNumberOfPages();
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height || pageSize.getHeight();

        // Añadir footer: número de página y nombre de empresa
        doc.setFontSize(10);
        doc.text(
          `Página ${doc.internal.getCurrentPageInfo().pageNumber} de ${pageCount}`,
          data.settings.margin.left,
          pageHeight - 10,
        );
        doc.text(
          "Gestión de Ecotablas ",
          data.settings.margin.left,
          pageHeight - 5,
        );
      },
    });

    // Guardar el PDF
    doc.save(`Listado_de_${title}.pdf`);
  };

  return (
    <button
      onClick={GenerarPDF}
      className="m-2 bg-blue-500 hover:bg-blue-700 mb-5 text-white font-bold p-2 rounded"
    >
      <div className="flex items-center">
        Generar PDF <FaFilePdf className="m-1" />
      </div>
    </button>
  );
};

export default PdfGenerator;
