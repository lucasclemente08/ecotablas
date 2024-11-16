import React, { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination"
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
    (state) => state.gastoMaquinaria,
  );

  const [modalAbierto, setModalAbierto] = useState(false);
  const [dataView, setDataView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [gastoEdit, setGastoEdit] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [modalEdit, setModalEdit] = useState(false);
  const [maquinaria, setMaquinaria] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [pieData, setPieData] = useState({});
  const [showPieChart, setShowPieChart] = useState(true);
  const [accessToken, setAccessToken] = useState(null);


  const [formValues, setFormValues] = useState({
    tipoGasto: "",
    tipoComprobante: "",
    comprobante: "",
    proveedor: "",
    monto: "",
    fecha: "",
    descripcion: "",
  });

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  useEffect(() => {
    dispatch(fetchGastos());
  }, [dispatch]);

  useEffect(() => {
    const calculatePieData = () => {
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
    };

    calculatePieData();
  }, [dataM]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.comprobante) {
  
      const URL = await uploadToDropbox(formValues.comprobante);  
console.log(URL);
      if (URL) {
    
        const updatedFormValues = { ...formValues, comprobante: URL };
     

    dispatch(addGasto(updatedFormValues)).then(() => {
      setModalAbierto(false);
      dispatch(fetchGastos());
    });
  };
}}
  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(addGasto(gastoEdit))
      .then(() => {
        setMensaje("Gasto actualizado con éxito");
        dispatch(fetchGastos());
        setModalEdit(false);
      })
      .catch((error) => console.error("Error al actualizar:", error));
  };

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

  const fetchMaquinaria = () => {
    axios
      .get("https://www.gestiondeecotablas.somee.com/api/Maquinaria/ListarTodo")
      .then((response) => {
        setMaquinaria(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trucks:", error);
      });
  };
  useEffect(() => {
    fetchMaquinaria();
  }, []);
  const getMachinesById = (id) => {
    const machine = maquinaria.find((machine) => machine.Id === id);
    return machine
      ? `${machine.Modelo} (${machine.Tipo})`
      : "Maquinaria no disponible";
  };

  const optionsMaquinaria = maquinaria.map((machine) => ({
    value: machine.Id,
    label: `${machine.Modelo} (${machine.Tipo})`,
  }));

  const pieOptions = { responsive: true, maintainAspectRatio: false };

  const fields = [
    {
      name: "tipoGasto",
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
      name: "tipoComprobante",
      label: "Tipo de Comprobante",
      type: "select",
      options: [
        { value: "factura", label: "Factura" },
        { value: "recibo", label: "Recibo" },
        { value: "boleta", label: "Boleta" },
        { value: "otro", label: "Otro" },
      ],
      required: true,
    },

    { name: "comprobante", label: "Comprobante", type: "file", required: true },

    { name: "comprobante", label: "Comprobante", type: "text", required: true },
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

  const handleShowTable = () => {
    setShowTable(true);
    setShowPieChart(false);
  };


  const CLIENT_ID = import.meta.env.VITE_DROPBOX_CLIENT_ID;
  const CLIENT_SECRET = import.meta.env.VITE_DROPBOX_CLIENT_SECRET;
  
  const getAccessToken = async () => {
    const refreshToken = localStorage.getItem('dropboxRefreshToken');
    if (!refreshToken) {
      console.error("No se encontró el refresh token en el localStorage.");
      return null;
    }
  
    const response = await fetch('https://api.dropboxapi.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });
  
    if (!response.ok) {
      console.error("Error al obtener el access token:", await response.text());
      return null;
    }
  
    const data = await response.json();
    return data.access_token;
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    };

    // Llamada inmediata a la función asíncrona
    fetchToken();
  }, []);
  const uploadToDropbox = async (file) => {
    const accessToken = await getAccessToken();
    if (!accessToken) return;
  
    const uploadUrl = "https://content.dropboxapi.com/2/files/upload";
    
    try {
      const dropboxArgs = JSON.stringify({
        path: `/${file.name}`,  // Verifica que file.name esté correctamente definido
        mode: "add",
        autorename: true,
        mute: false,
      });
  
      // 1. Subir el archivo a Dropbox
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
        console.error("Error al subir el archivo a Dropbox:", await uploadResponse.text());
        return null;
      }
  
      const fileData = await uploadResponse.json();
      const filePath = fileData.path_lower;
  
      // Verifica si filePath es correcto
      console.log("filePath", filePath); 
  
      // 2. Verificar si ya existe un enlace compartido
      const listLinksUrl = "https://api.dropboxapi.com/2/sharing/list_shared_links";
      const listResponse = await fetch(listLinksUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: filePath,
          settings: { requested_visibility: "public" },
        }),
      });
  
      if (!shareResponse.ok) {
        console.error("Error al crear el enlace compartido:", await shareResponse.text());
        return null;
      }
  
      const shareData = await shareResponse.json();
      
      // Verifica que shareData tenga la propiedad 'url'
      console.log("shareData", shareData);
  
      if (shareData && shareData.url) {
        const baseUrl = "https://www.dropbox.com/scl/fi/";
        const sharedLink = shareData.url.replace(baseUrl, "").split('?')[0];
        const link = `${sharedLink}?dl=1`;
        return link;
      } else {
        console.error("No se recibió un enlace válido en la respuesta:", shareData);
        return null;
      }
      
    } catch (error) {
      console.error("Error en la solicitud a Dropbox:", error);
      return null;
    }
  };
  
   


const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = dataM.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(dataM.length / itemsPerPage);
const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return   (
<>
    <SectionLayout title="Gasto de Maquinaria">
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
