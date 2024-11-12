import React, { useState, useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import Pagination from "../../../components/Pagination"
import FilterTable from "../../../components/FilterTable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SectionLayout from "../../../layout/SectionLayout";
import TablaHead from "../../../components/Thead";
import LoadingTable from "../../../components/LoadingTable";

import PdfGenerator from "../../../components/buttons/PdfGenerator";
import DeleteButton from "../../../components/buttons/DeleteButton";
import DataView from "../../../components/buttons/DataView";
import { FaChartLine, FaChartPie } from "react-icons/fa";
import axios from "axios";
import builderApiUrl from "../../../utils/BuilderApi";
import AddModalWithSelect from "../../../components/AddModalWithSelect";
import AddButtonWa from "../../../components/buttons/AddButtonWa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const GastoVehiculos = () => {
  const [showPieChart, setShowPieChart] = useState(true);
  const [showTable, setShowTable] = useState(true);
  const [dataV, setDataV] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trucks, setTrucks] = useState([]);
  const [pieData, setPieData] = useState({});
  const [ModalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [gastoEdit, setGastoEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [filteredData, setFilteredData] = useState([]);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const [formValues, setFormValues] = useState({
    TipoComprobante: "",
    Comprobante: "comprobante",
    TipoGasto: "",
    IdVehiculo: "",
    Proveedor: "",
    Monto: "",
    Fecha: "", 
    Descripcion: "",
  });

  const URL_trucks = builderApiUrl("Vehiculos/ListarTodo");

  const fetchMaterials = () => {
    setLoading(true);
    axios
      .get(
        "https://www.gestiondeecotablas.somee.com/api/GastoVehiculos/ListarTodo",
      )
      .then((response) => {
        setDataV(response.data);

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: files ? files[0] : value,
    }));
  };
  
  const fetchTrucks = () => {
    axios
      .get(URL_trucks)
      .then((response) => {
        setTrucks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trucks:", error);
      });
  };

  useEffect(() => {
    fetchTrucks();
    fetchMaterials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formValues.Comprobante) {
  
      const URL = await uploadToDropbox(formValues.Comprobante);  
      console.log("URL: " + URL);
      if (URL) {
    
        const updatedFormValues = { ...formValues, Comprobante: URL };
        axios
          .post("https://www.gestiondeecotablas.somee.com/api/GastoVehiculos/CrearGastoVehiculo", updatedFormValues)
          .then((response) => {
            toast.success("Gasto agregado con éxito");
            fetchMaterials();
            cerrarModal();
          })
          .catch((error) => {
            console.error("Error al agregar el gasto:", error);
            toast.error("Error al agregar el gasto");
          });
      } else {
        toast.error("No se pudo subir el archivo a Dropbox");
      }
    }
  };
  
  useEffect(() => {
    const calculatePieData = () => {
      const categories = {};
      dataV.forEach((item) => {
        categories[item.TipoGasto] =
          (categories[item.TipoGasto] || 0) + parseFloat(item.Monto);
      });

      setPieData({
        labels: Object.keys(categories),
        datasets: [
          {
            label: "Gastos por Categoría",
            data: Object.values(categories),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
          },
        ],
      });
    };

    calculatePieData();
  }, [dataV]);

  const getVehicleById = (id) => {
    const vehicle = trucks.find((vehicle) => vehicle.IdVehiculo === id);
    return vehicle
      ? `${vehicle.Modelo} (${vehicle.Tipo})`
      : "Vehículo no disponible";
  };

  const optionsVehiculo = trucks.map((res) => ({
    value: res.IdVehiculo,
    label: `${res.Modelo} (${res.Tipo})`,
  }));

  const pieOptions = { responsive: true, maintainAspectRatio: false };

  const handleShowTable = () => {
    setShowTable(true);
    setShowPieChart(false);
  };
  

  const fields = [
    {
      name: "TipoComprobante",
      label: "Tipo de Comprobante",
      type: "text",
      required: true,
    },
    {
      name: "Comprobante",
      label: "Comprobante",
      type: "file",

      required: true,
    },
    {
      name: "TipoGasto",
      label: "Tipo de Gasto",
      type: "select",
      options: [
        { value: "Combustible", label: "Combustible" },
        { value: "Mantenimiento", label: "Mantenimiento" },
        { value: "Reparacion", label: "Reparación" },
        { value: "Seguro", label: "Seguro" },
        { value: "Otros", label: "Otros" },
      ],
      required: true,
    },
    {
      name: "IdVehiculo",
      label: "Vehículo",
      options: optionsVehiculo,
      type: "select",

      required: true,
    },
    {
      name: "Proveedor",
      label: "Proveedor",
      type: "text",
      required: true,
    },
    {
      name: "Monto",
      label: "Monto",
      type: "number",
      required: true,
    },
    {
      name: "Fecha",
      label: "Fecha",
      type: "date",
      required: true,
    },
    {
      name: "Descripcion",
      label: "Descripción",
      type: "textarea",
      required: true,
    },
  ];
  const columns = [
    { field: "TipoComprobante", label: "Tipo de Comprobante" },
    { field: "Monto", label: "Monto" },
    { field: "Fecha", label: "Fecha" },
    { field: "Proveedor", label: "Proveedor" },
  ];
  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://www.gestiondeecotablas.somee.com/api/GastoVehiculos/ActualizarGastoVehiculo/${id}`,
        formValues,
      )
      .then((response) => {
        toast.success("Gasto actualizado con éxito"); // Notificación de éxito
        fetchMaterials();
        cerrarModalEdit();
      })
      .catch((error) => {
        console.error("Error al actualizar el gasto:", error);
        toast.error("Error al actualizar el gasto"); // Notificación de error
      });
  };
  const cerrarModalEdit = () => setModalEdit(false);

  const titles = [
    "Tipo de comprobante",
    "Comprobante",
    "Tipo de gasto",
    "Vehículo",
    "Proveedor",
    "Monto ($)",
    "Fecha",
    "Descripción",
    "Acciones",
  ];
 

  const dropboxToken = import.meta.env.VITE_API_KEY_DROPBOX;
  const uploadToDropbox = async (file) => {
    const uploadUrl = "https://content.dropboxapi.com/2/files/upload";
  
    try {
      const dropboxArgs = JSON.stringify({
        path: `/${file.name}`,
        mode: "add",
        autorename: true,
        mute: false,
      });
  
      // 1. Subir el archivo a Dropbox
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${dropboxToken}`,
          "Content-Type": "application/octet-stream",
          "Dropbox-API-Arg": dropboxArgs,
        },
        body: file,
      });
  
      if (!uploadResponse.ok) {
        console.error("Error al subir el archivo a Dropbox:", await uploadResponse.text());
        return null;
      }
  
      const fileData = await uploadResponse.json();
      const filePath = fileData.path_lower;
  
      // 2. Verificar si ya existe un enlace compartido
      const listLinksUrl = "https://api.dropboxapi.com/2/sharing/list_shared_links";
      const listResponse = await fetch(listLinksUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${dropboxToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: filePath }),
      });
  
      if (listResponse.ok) {
        const listData = await listResponse.json();
        if (listData.links && listData.links.length > 0) {
          // Si ya existe un enlace compartido, usar el primero
          const existingLink = listData.links[0].url.replace("?dl=0", "?dl=1");
          return existingLink;
        }
      }
  
      // 3. Crear un enlace compartido si no existe
      const shareUrl = "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings";
      const shareResponse = await fetch(shareUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${dropboxToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: filePath,
          settings: { requested_visibility: "public" }, // Asegura que sea visible públicamente
        }),
      });
  
      if (!shareResponse.ok) {
        console.error("Error al crear el enlace compartido:", await shareResponse.text());
        return null;
      }
  
      const shareData = await shareResponse.json();
      const baseUrl = "https://www.dropbox.com/scl/fi/";
      const sharedLink = shareData.url.replace(baseUrl, "").split('?')[0];
      

      const link = `${sharedLink}?dl=1`;
      console.log(link);
      return link;      
      
    } catch (error) {
      console.error("Error en la solicitud a Dropbox:", error);
      return null;
    }
  };
  


const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = dataV.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(dataV.length / itemsPerPage);
const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <SectionLayout title="Gastos de Vehículos">
      <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
<FilterTable
        data={dataV}
        columns={columns}
        onFilteredDataChange={setFilteredData}
      />
      <div className="flex items-center">
        <AddButtonWa
          abrirModal={() => setModalAbierto(true)}
          title="Añadir gastos"
        />
        <PdfGenerator columns={titles} data={dataV} title="Reporte de gastos" />
        <DataView ShowTable={handleShowTable} />

        {mensaje && (
          <div className="bg-blue-600 text-white py-2 px-4 rounded mb-4">
            {mensaje}
          </div>
        )}


        <button
          aria-label="Ver gráfico circular"
          className={`p-2 ml-2 mt-2 mb-5 font-bold rounded flex items-center text-white ${showPieChart ? "bg-blue-600" : "bg-gray-500"}`}
          onClick={() => {
            setShowPieChart(true);
            setShowTable(false);
          }}
        >
          Ver Gráfico Circular <FaChartPie className="ml-2" />
        </button>
        {/* 
        <button
          className={`p-2 mt-2 mb-5 ml-2 font-bold rounded text-white ${!showPieChart ? 'bg-blue-600' : 'bg-gray-500'}`}
          onClick={() => { setShowPieChart(false); setShowTable(false); }}
        >
          Ver Gráfico de Líneas <FaChartLine className="ml-2" />
        </button> */}
      </div>
      {ModalAbierto && (
        <AddModalWithSelect
        
          title="Agregar Gastos vehiculos"
          fields={fields}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cerrarModal={cerrarModal}
        
          values={formValues}
          dropboxAccessToken={dropboxToken}
        />
      )}

      {modalEdit && (
        <AddModalWithSelect
          title="Editar Gasto de Vehículo"
          fields={fields}
          handleChange={handleChange}
          handleSubmit={handleEditSubmit} // Cambia el manejador al de edición
          cerrarModal={cerrarModalEdit} // Cambia al cierre de modal de edición
          values={formValues}
        />
      )}

      {showTable ? (
        loading ? (
          <LoadingTable loading={loading} />
        ) : (
      <div className="">
            <table className="min-w-full bg-white rounded-lg shadow-md">
            <TablaHead titles={titles} />
            <tbody>
              {dataV.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100 ">
                  <td className="border-b py-3 px-4">{item.TipoComprobante}</td>
                                <td className="border-b py-3 px-4">
                                {item.Comprobante ? (
          <a
          href={`${"https://www.dropbox.com/scl/fi/"}${item.Comprobante}`}
            className="text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Comprobante
          </a>
        ) : (
          "No disponible"
        )}
              </td>
                  <td className="border-b py-3 px-4">{item.TipoGasto}</td>
                  <td className="border-b py-3 px-4">
                    {getVehicleById(item.IdVehiculo)}
                  </td>
                  <td className="border-b py-3 px-4">{item.Proveedor}</td>
                  <td className="border-b py-3 px-4">{item.Monto}</td>
                  <td className="border-b py-3 px-4">
                  {item.Fecha ? item.Fecha.slice(0, 10) : "Fecha no disponible"}
                  </td>
                  <td className="border-b py-3 px-4">{item.Descripcion}</td>
                  <td className="border-b py-3 px-4 flex items-center">
                    <button
                      onClick={() => {
                        setGastoEdit(item); // Almacenar el gasto seleccionado
                        setFormValues(item); // Rellenar el formulario con los valores del gasto
                        setModalEdit(true); // Mostrar el modal de edición
                      }}
                      className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Modificar
                    </button>

                    <DeleteButton
                      endpoint={
                        "http://www.gestiondeecotablas.somee.com/api/GastoVehiculos/EliminarGastoVehiculo"
                      }
                      id={item.IdGasto}
                      updateList={fetchMaterials}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </div>
        )
      ) : showPieChart ? (
        <div className="w-full h-96">
          <Pie data={pieData} options={pieOptions} />
        </div>
      ) : (
        <div className="w-full h-96">
          {/* <Line data={lineData} options={lineOptions} /> */}
        </div>
      )}
    </SectionLayout>
  );
};

export default GastoVehiculos;
