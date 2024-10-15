import React, { useState, useEffect } from "react";
import Home from "../home/Home";
import TablaHead from "../../components/Thead";
import LoadingTable from "../../components/LoadingTable";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import SectionLayout from "../../layout/SectionLayout";
import AddButton from "../../components/buttons/addButton";
import axios from "axios";

import AddModalWithSelect from "../../components/AddModalWithSelect";
const TablasProducidas = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedDimension, setSelectedDimension] = useState({});

  const [formValues, setFormValues] = useState({
    ID_Proceso: "1",
    FechaProduccion: "",
    Dimensiones: "",
    Peso: "",
    CodigoIdentificacion: "",
  });


  const identificationCode=(dimensiones,peso)=>{

  } 
  // Columnas para la tabla
  const columns = [
    { header: "Fecha Producción", accessor: "FechaProduccion" },
    { header: "Dimensiones", accessor: "Dimensiones" },
    { header: "Peso (kgs)", accessor: "Peso" },
    { header: "Código Identificación", accessor: "CodigoIdentificacion" },
  ];
  const handleDimensionChange = (id, value) => {
    setSelectedDimension((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  
  const titles = [
    "Fecha Producción",
    "Dimensiones",
    "Peso (kgs)",
    "Código Identificación",
  ];

  // Función para obtener datos de la API
  const fetchMaterials = () => {
    setLoading(true); // Activa el estado de carga
    axios.get("http://localhost:61274/api/TablaProducidas/GetAll")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // Desactiva el estado de carga
      });
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // Maneja el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:61274/api/TablaProducidas/Create", formValues)
      .then((response) => {
        fetchMaterials(); 
        cerrarModal(); 
      })
      .catch((error) => {
        console.error("Error adding new table:", error);
      });
  };

  const abrirModal = () => {
    setModalAbierto(true);
  }
  const cerrarModal = () => {
    setModalAbierto(false);
    // Restablecer el formulario
    setFormValues({
      ID_Proceso: "",
      FechaProduccion: "",
      Dimensiones: "",
      Peso: "",
      CodigoIdentificacion: "",
    });
};
const dimensionesOptions = [
  "1,60mts x 10cm",
  "1,50mts x 10cm"
];


  return (
    <SectionLayout title="Tablas producidas">
      <AddButton abrirModal={abrirModal} title="Añadir tabla" />

      <PdfGenerator title="Tablas producidas" data={data} columns={columns} />
{modalAbierto && 
  <AddModalWithSelect
  title="Agregar Tabla Producida"
  fields={[
    // { name: "ID_Proceso", label: "ID Proceso", type: "text" }, // Campo de texto
    { name: "FechaProduccion", label: "Fecha Producción", type: "date" }, // Campo de fecha
    {
      name: "Dimensiones",
      label: "Dimensiones",
      type: "select",
      options: dimensionesOptions, // Opciones de dimensiones
    },
    { name: "Peso", label: "Peso (kgs)", type: "number" },
    // { name: "CodigoIdentificacion", label: "Código Identificación" },
  ]}
  handleChange={handleChange}
  handleSubmit={handleSubmit}
  cerrarModal={cerrarModal}
  values={formValues}
/>



}
    
      {loading ? (
        <LoadingTable loading={loading} />
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <TablaHead titles={titles} />
          <tbody>
            {data.map((item) => (
              <tr key={item.ID_Tabla} className="hover:bg-gray-100">
                <td className="border-b py-3 px-4">{item.FechaProduccion.slice(0, 10)}</td>
              <td className="border-b py-3 px-4">{item.Dimensiones}</td>

                <td className="border-b py-3 px-4">{item.Peso} kgs</td>
                <td className="border-b py-3 px-4">{item.CodigoIdentificacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </SectionLayout>
  );
};

export default TablasProducidas;
