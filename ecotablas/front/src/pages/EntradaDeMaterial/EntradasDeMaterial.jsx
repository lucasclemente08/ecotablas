import React,{useState} from "react";
import SectionLayout from "../../layout/SectionLayout";


import TablaHead from "../../components/Thead";
import AddButton from "../../components/buttons/addButton";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import DeleteButton from "../../components/buttons/DeleteButton";


import LoadingTable from "../../components/LoadingTable";
import ReportButton from "../../components/buttons/ReportButton";
import NextButton from "../../components/buttons/NextButton";

import DateFilter from "../../components/DateFilter";

const EntradasDeMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [materialId, setMaterialId] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: new Date(), endDate: new Date() });
  
  const handleFilter = (dates) => {
    setDateRange(dates);
  };

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  // Definir columnas para el generador de PDF

 const Donantes = [
    {
      id: 1,
      vehiculo: "Vehículo 1",
      tipoRecolector: "Donante",
      empresa: "Empresa A",
      tipoPlastico: "PET",
      volumen: "100 kg",
      fecha: "2023-09-15"
    },
    // Puedes agregar más datos aquí
  ];


  const titles = ["Vehículo", "Tipo de Recolector", "Empresa", "Tipo de Plástico", "Volumen", "Fecha","Acciones"];


  const columns = [
  
    { Header: "Vehículo", accessor: "vehiculo" },
    { Header: "Tipo de Recolector", accessor: "tipoRecolector" },
    { Header: "Empresa", accessor: "empresa" },
    { Header: "Tipo de Plástico", accessor: "tipoPlastico" },
    { Header: "Volumen", accessor: "volumen" },
    { Header: "Fecha", accessor: "fecha" }
  ];
  
  return (
    <SectionLayout title="Entradas de Material">
   
   <AddButton abrirModal={abrirModal} title="Ingresar material" />
          <PdfGenerator
            columns={columns}
            data={Donantes}
            title="Ingreso de material"
          />

<ReportButton/>
<div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <TablaHead titles={titles} />
              <tbody>
              {Donantes.map((donante) => (
              <tr key={donante.id} className="hover:bg-gray-100">
                <td className="border-b py-3 px-4">{donante.vehiculo}</td>
                <td className="border-b py-3 px-4">{donante.tipoRecolector}</td>
                <td className="border-b py-3 px-4">{donante.empresa}</td>
                <td className="border-b py-3 px-4">{donante.tipoPlastico}</td>
                <td className="border-b py-3 px-4">{donante.volumen}</td>
                <td className="border-b py-3 px-4">{donante.fecha}</td>
                <td>
                <NextButton />
                      <button
                        onClick={() => abrirModalEdit(material)}
                        className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Modificar
                      </button>
                      <DeleteButton
                        id={donante.id}
                        endpoint="http://www.trazabilidadodsapi.somee.com/api/MaterialTrit/Borrar"
                        updateList={donante} 
                      />
                </td>
              </tr>
            ))}
                    </tbody>
              </table>
              </div>

    </SectionLayout>
  );
};

export default EntradasDeMaterial;
