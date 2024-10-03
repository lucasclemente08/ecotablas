import React, { useEffect, useState } from "react";
import SectionLayout from "../../layout/SectionLayout";
import AddButton from "../../components/buttons/AddButton";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModal from "../../components/AddModal";
import ButtonEdit from "../../components/buttons/ButtonEdit";
import LoadingTable from "../../components/LoadingTable";
import NextButton from "../../components/buttons/NextButton";
import ReportButton from "../../components/buttons/ReportButton";

const ClasificacionDeMaterial = () => {
  const [materialClasificado, setMaterialClasificado] = useState([]);

  const abrirModal = () => setModalAbierto(true);
  // Definir las columnas de la tabla
  const columns = [
    { title: "ID", field: "IdMaterialClasificado" },
    { title: "Volumen Útil", field: "VolumenUtil" },
    { title: "Volumen Inútil", field: "VolumenInutil" },
  ];

  const titles = ["Donante", "Volumen Útil ", "Volumen Inútil "];

  // const rows = materials.map((material) => ({
  //   VolumenUtil: `${material.VolumenUtil} m³`,
  //   VolumenInutil: `${material.VolumenInutil} m³`,
  // }));

  const fields = [
    {
      name: "VolumenUtil",
      label: "Volumen Útil",
      type: "text",
      placeholder: "Volumen Útil *",
    },
    {
      name: "VolumenInutil",
      label: "Volumen Inútil",
      type: "text",
      placeholder: "Volumen Inútil *",
    },
  ];

  return (
    <>
      <SectionLayout title="Clasificación de Material">
        <AddButton
          abrirModal={abrirModal}
          title="Añadir Material Clasificado"
        />
        <PdfGenerator
          columns={columns}
          data={materialClasificado}
          title="Reporte de Material Clasificado"
        />
        <ReportButton />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <TablaHead titles={titles} />
          </table>
        </div>
      </SectionLayout>
    </>
  );
};

export default ClasificacionDeMaterial;
