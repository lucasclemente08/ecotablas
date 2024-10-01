import React,{useState,useEffect} from "react";
import Home from "../home/Home";
import TablaHead from "../../components/Thead";
import LoadingTable from "../../components/LoadingTable";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import SectionLayout from "../../layout/SectionLayout";


const TablasProducidas = () => {
  const [loading, setLoading] = useState(true);
  const data = [
    {
      ID_Tabla: 1,
      ID_Proceso: 101,
      FechaProduccion: "2023-09-12",
      Dimensiones: "4cm x 10cm",
      Peso: 25.5,
      CodigoIdentificacion: "TAB123456",
    },
    {
      ID_Tabla: 2,
      ID_Proceso: 102,
      FechaProduccion: "2023-09-13",
      Dimensiones: "4cm x 10cm",
      Peso: 25.5,
      CodigoIdentificacion: "TAB789012",
    },
    {
      ID_Tabla: 3,
      ID_Proceso: 103,
      FechaProduccion: "2023-09-14",
      Dimensiones: "4cm x 10cm",
      Peso: 25.5,
      CodigoIdentificacion: "TAB456789",
    },
    {
      ID_Tabla: 4,
      ID_Proceso: 104,
      FechaProduccion: "2023-09-15",
      Dimensiones: "4cm x 10cm",
      Peso: 25.5,
      CodigoIdentificacion: "TAB654321",
    },
  ];
  

  const titles = [

    "Fecha Producción",
    "Dimensiones",
    "Peso (kgs)",
    "Código Identificación"
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
<SectionLayout  title="Tablas producidas">      
        {loading  ?  <LoadingTable loading={loading} /> :
         <table className="min-w-full bg-white rounded-lg shadow-md">

         <TablaHead titles={titles}/>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.ID_Tabla} className="hover:bg-gray-100">
                 
                        <td className="border-b py-3 px-4">{item.FechaProduccion}</td>
                        <td className="border-b py-3 px-4">{item.Dimensiones}</td>
                        <td className="border-b py-3 px-4">{item.Peso} kgs</td>
                        <td className="border-b py-3 px-4">{item.CodigoIdentificacion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

}
</SectionLayout>

  );
};

export default TablasProducidas;
