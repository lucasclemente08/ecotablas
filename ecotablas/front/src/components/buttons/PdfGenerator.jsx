import React, { useState, useEffect } from "react";

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

  const GenerarPDF = async () => {
    const [{ jsPDF }] = await Promise.all([
      import("jspdf"),
      import("jspdf-autotable"),
    ]);
  
    const doc = new jsPDF();
  
    const logoURL =
      "https://img.icons8.com/external-soft-fill-juicy-fish/60/external-eco-packaging-symbols-soft-fill-soft-fill-juicy-fish.png";
    doc.addImage(logoURL, "PNG", 160, 10, 30, 30);
  
    const fechaActual = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Fecha: ${fechaActual}`, 14, 20);
  
    doc.setFontSize(12);
    doc.text("Gestión de Ecotablas S.A.", 14, 30);
  
    if (user) {
      doc.setFontSize(10);
      doc.text(`Usuario: ${user.displayName || "Desconocido"}`, 14, 40);
      doc.text(`Correo: ${user.email}`, 14, 50);
    } else {
      doc.setFontSize(10);
      doc.text("Usuario no autenticado", 14, 40);
    }
  
    doc.setFontSize(16);
    doc.text(title, 14, 60);
  
    doc.autoTable({
      head: [columns.map((col) => col.header)],
      body: data.map((row) => columns.map((col) => row[col.dataKey])),
      startY: 70,
      margin: { top: 20, left: 14, right: 14 },
      theme: "striped",
      didDrawPage: (data) => {
        const pageCount = doc.internal.getNumberOfPages();
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height || pageSize.getHeight();
  
        doc.setFontSize(10);
        doc.text(
          `Página ${doc.internal.getCurrentPageInfo().pageNumber} de ${pageCount}`,
          data.settings.margin.left,
          pageHeight - 10,
        );
        doc.text("Gestión de Ecotablas ", data.settings.margin.left, pageHeight - 5);
      },
    });
  
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
