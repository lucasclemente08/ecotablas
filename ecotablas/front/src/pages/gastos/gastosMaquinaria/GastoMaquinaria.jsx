import React, { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGastos,
  deleteGasto,
  addGasto,
} from "../../../features/gastoMaquinariaSlice";
import SectionLayout from "../../../layout/SectionLayout";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import TablaHead from "../../../components/Thead";
import LoadingTable from "../../../components/LoadingTable";

import PdfGenerator from "../../../components/buttons/PdfGenerator";
import { FaChartLine, FaChartPie } from "react-icons/fa";
import DataView from "../../../components/buttons/DataView";
import DeleteButton from "../../../components/buttons/DeleteButton";
import AddModalWithSelect from "../../../components/AddModalWithSelect";

import { storage } from "../../../firebase/firebase"; 
import AddButtonWa from "../../../components/buttons/AddButtonWa";


const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

const GastoMaquinaria = () => {
  const dispatch = useDispatch();
  const { gastos: dataM, loading } = useSelector(
    (state) => state.gastoMaquinaria
  );

  const [modalAbierto, setModalAbierto] = useState(false);
  const [dataView, setDataView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [gastoEdit, setGastoEdit] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [modalEdit, setModalEdit] = useState(false);
  const [maquinaria, setMaquinaria] = useState([]);
  const [pieData, setPieData] = useState({});
  const [showPieChart, setShowPieChart] = useState(false);
  const [formValues, setFormValues] = useState({
    tipoGasto: "",
    tipoComprobante: "",
    Comprobante: "",
    proveedor: "",
    monto: "",
    fecha: "",
    descripcion: "",
  });

  // Variables de entorno
  const CLIENT_ID = import.meta.env.VITE_DROPBOX_CLIENT_ID;
  const CLIENT_SECRET = import.meta.env.VITE_DROPBOX_CLIENT_SECRET;

  // Cerrar Modal
  const cerrarModal = () => setModalAbierto(false);

  // Fetch inicial de datos
  useEffect(() => {
    dispatch(fetchGastos());
    fetchMaquinaria();
  }, [dispatch]);

  // Fetch maquinaria
  const fetchMaquinaria = () => {
    axios
      .get("https://www.gestiondeecotablas.somee.com/api/Maquinaria/ListarTodo")
      .then((response) => {
        setMaquinaria(response.data);
      })
      .catch((error) => console.error("Error fetching maquinaria:", error));
  };

  // Crear datos del gráfico circular
  useEffect(() => {
    if (dataM.length > 0) {
      const categories = {};
      dataM.forEach((item) => {
        categories[item.TipoGasto] =
          (categories[item.TipoGasto] || 0) + parseFloat(item.Monto);
      });

      setPieData({
        labels: Object.keys(categories),
        datasets: [
          {
            label: "Gastos por Categoría",
            data: Object.values(categories),
            backgroundColor: COLORS,
            hoverBackgroundColor: COLORS,
          },
        ],
      });
    }
  }, [dataM]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Obtener opciones para select
  const optionsMaquinaria = maquinaria.map((machine) => ({
    value: machine.Id,
    label: `${machine.Modelo} (${machine.Tipo})`,
  }));

  const fields = [
    {
      name: "tipoGasto",
      label: "Tipo de Gasto",
      type: "select",
      options: [
        { value: "Combustible", label: "Combustible" },
        { value: "Mantenimiento", label: "Mantenimiento" },
        { value: "Reparación", label: "Reparación" },
        { value: "Seguro", label: "Seguro" },
        { value: "Otros", label: "Otros" },
      ],
      required: true,
    },
    {
      name: "tipoComprobante",
      label: "Tipo de Comprobante",
      type: "select",
      options: [
        { value: "Factura", label: "Factura" },
        { value: "Recibo", label: "Recibo" },
        { value: "Boleta", label: "Boleta" },
        { value: "Otro", label: "Otro" },
      ],
      required: true,
    },
    {
      name: "comprobante",
      label: "Comprobante",
      type: "file",
      required: true,
    },
    { name: "proveedor", label: "Proveedor", type: "text", required: true },
    {
      name: "Id_Maquinaria",
      label: "Maquinaria",
      type: "select",
      options: optionsMaquinaria,
      required: true,
    },
    { name: "monto", label: "Monto ($)", type: "number", required: true },
    { name: "fecha", label: "Fecha", type: "date", required: true },
    {
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      required: true,
    },
  ];

  // Obtener el token de Dropbox
  const getAccessToken = async () => {
    const refreshToken = localStorage.getItem("dropboxRefreshToken");
    if (!refreshToken) {
      toast.error("No se obtuvo el token, acceda desde el login correctamente.");
      return null;
    }

    try {
      const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        }),
      });

      if (!response.ok) {
        toast.error("Error al obtener el access token.");
        return null;
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      toast.error("Error al conectar con Dropbox.");
      return null;
    }
  };

  const uploadToDropbox = async (file) => {
    const accessToken = await getAccessToken();
    if (!accessToken) return;

    const uploadUrl = "https://content.dropboxapi.com/2/files/upload";
   

    const dropboxArgs = JSON.stringify({
      path: `/${file.name}`,
      mode: "add",
      autorename: true,
    });
    if (!file || !file.name) {
      toast.error("El archivo no es válido.");
      return;
    }
    try {
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/octet-stream",
          "Dropbox-API-Arg": dropboxArgs,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        toast.error("Error al subir archivo a Dropbox.");
        return null;
      }
const uploadedFile = await uploadResponse.json();
console.log(uploadedFile); //



      const fileData = await uploadResponse.json();
if (!fileData.path_lower) {
  toast.error("Error al generar el enlace de Dropbox.");
  return null;
}
    } catch (error) {
      console.error("Error en Dropbox:", error);
      return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.Comprobante) {
      const URL = await uploadToDropbox(formValues.Comprobante);
      if (URL) {
        const updatedFormValues = { ...formValues, Comprobante: URL };
        axios
          .post("http://www.gestiondeecotablas.somee.com/api/GastoMaquinaria/Create", updatedFormValues)
          .then((response) => {
            toast.success("Gasto agregado con éxito");
            fetchMaterials();  // Recargar los datos de la tabla después de la inserción
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
  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataM.slice(indexOfFirstItem, indexOfLastItem);
  const columns = [
    { header: "Tipo de Gasto", dataKey: "tipoGasto" },
    { header: "Tipo de Comprobante", dataKey: "tipoComprobante" },
    { header: "Comprobante", dataKey: "comprobante" },
    { header: "Proveedor", dataKey: "proveedor" },
    { header: "Monto ($)", dataKey: "monto" },
    { header: "Fecha", dataKey: "fecha" },
    { header: "Descripción", dataKey: "descripcion" },
  ];

  const titles = [
    "Tipo de comprobante",
    "Comprobante",
    "Tipo de gasto",
    "Proveedor",
    "Monto ($)",
    "Fecha",
    "Descripción",
    "Acciones",
  ];

  const handleShowTable = () => {
    setShowTable(true);
    setShowPieChart(false);
  };

  const totalPages = Math.ceil(dataM.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return   (
<>
    <SectionLayout title="Gasto de Maquinaria">

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

      <div className="flex">
  

        <AddButtonWa
          abrirModal={() => setModalAbierto(true)}
          title="Añadir Gasto de Maquinaria"
        />
        <PdfGenerator
          columns={columns}
          data={dataM}
          title="Reporte de Gastos de Maquinaria"
        />
        <DataView ShowTable={handleShowTable} f />

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
      </div>

      {modalAbierto && (
        <AddModalWithSelect
          title="Agregar Gasto de Maquinaria"
          fields={fields}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cerrarModal={cerrarModal}
          values={formValues}
        />
      )}
      {modalEdit && (
        <AddModalWithSelect
          title="Editar Gasto de Maquinaria"
          fields={fields}
          handleFileChange={handleFileChange}
          handleChange={handleChange}
          handleSubmit={handleEditSubmit}
          cerrarModal={() => setModalEdit(false)}
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
    {dataM.map((item) => (
      <tr key={item.IdGastoMaquinaria} className="hover:bg-gray-100">
        <td className="border-b py-3 px-4">{item.TipoComprobante}</td>
        {item.Comprobante ? (
          <a
          href={`${"https://www.dropbox.com/s/"}${item.Comprobante}`}
                className="text-blue-400 "
            target="_blank"
            rel="noopener noreferrer"
        
          >
            <td className="">
            Ver Comprobante
            </td>
            
          </a>
        ) : (
          "No disponible"
        )}
        <td className="border-b py-3 px-4">{item.TipoGasto}</td>
        <td className="border-b py-3 px-4">{item.Proveedor}</td>
        <td className="border-b py-3 px-4">{item.Monto}</td>
        <td className="border-b py-3 px-4">
          {item.Fecha ? item.Fecha.slice(0, 10) : "Fecha no disponible"}
        </td>
        <td className="border-b py-3 px-4">{item.Descripcion}</td>
        <td className="border-b py-3 px-4 flex">
          <button
            onClick={() => {
              setGastoEdit(item);
              setFormValues(item);
              setModalEdit(true);
            }}
            className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Modificar
          </button>
          <DeleteButton
            endpoint="http://www.gestiondeecotablas.somee.com/api/GastoMaquinaria/Delete"
            id={item.IdGastoMaquinaria}
            updateList={() => dispatch(fetchGastos())}
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

) : null}

    </SectionLayout>
    </>
  );
};

export default GastoMaquinaria;
