import React,{useState,useEffect} from "react";
import Home from "../home/Home";
import TablaHead from "../../components/Thead";
import LoadingTable from "../../components/LoadingTable";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import SectionLayout from "../../layout/SectionLayout";


const Maquinarias = () => {
  const [loading, setLoading] = useState(true);
  const data = [
    {
        ID_Maquinaria: 1,
        Nombre: "Maquina Extrusion",
        Tipo: "Extrusora",
        Modelo: "EX200",
        Estado: "Operativa",
        FechaAdquisicion: "2023-09-16",
    },
    {
        ID_Maquinaria: 2,
        Nombre: "Tolva de Carga",
        Tipo: "Tolva",
        Modelo: "TLX450",
        Estado: "En reparación",
        FechaAdquisicion: "2023-09-06",
    },
    {
        ID_Maquinaria: 3,
        Nombre: "Bacha Moldes",
        Tipo: "Bacha",
        Modelo: "BM300",
        Estado: "Operativa",
        FechaAdquisicion: "2023-05-10",
    },
  ];
  

  const titles = [

    "Nombre",
    "Tipo",
    "Modelo",
    "Estado",
    "Fecha de incorporación",
    "Acciones",
  ];
  const fetchMaterials = () => {
    setLoading(true); // Activa el estado de carga
    setTimeout(() => {
    ; // Simular la respuesta de una API asignando los datos hardcodeados
      setLoading(false); // Desactiva el estado de carga después del retraso
    }, 2000); // 2 segundos de espera para simular la carga
  };

  useEffect(() => {
    fetchMaterials();
  }, []);


  return (
    <SectionLayout title="Maquinarias">
      {loading ? (
        <LoadingTable loading={loading} />
      ) : (
        <>
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <TablaHead titles={titles} />
            <tbody>
              {data.map((item) => (
                <tr key={item.ID_Maquinaria} className="hover:bg-gray-100">
                  <td className="border-b py-3 px-4">{item.Nombre}</td>
                  <td className="border-b py-3 px-4">{item.Tipo}</td>
                  <td className="border-b py-3 px-4">{item.Modelo}</td>
                  <td className={`border-b py-3 px-4 ${item.Estado === "En reparación" ? "text-red-500" : "text-green-500"}`}>{item.Estado}</td>
                  <td className="border-b py-3 px-4">{item.FechaAdquisicion}</td>
                  <td className="border-b py-3 px-4 flex space-x-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Agregar Reparación
                    </button>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                      Modificar
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </SectionLayout>
  );
};

export default Maquinarias;
