import React, { useState, useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import Pagination from "../../../components/Pagination";
import FilterTable from "../../../components/FilterTable";
import { FiEdit } from "react-icons/fi";
import { HiMiniLink } from "react-icons/hi2";
import TableComponent from "../../../components/TableComponent";
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
import { Toaster, toast } from "sonner";
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
import GastoVehiculosChart from "../../../components/graficos/GastoVehiculosChart";
import GastoVehiculosDataPicker from "../../../components/graficos/GastoVehiculoDataPicker";
import ButtonEdit from "../../../components/buttons/ButtonEditPr";
import ButtonEditFiles from "../../../components/ButtonEditFiles";

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
  const [accessToken, setAccessToken] = useState(null);
  const [sortedData, setSortedData] = useState([]);
  const [gastoId, setGastoid] = useState([]);
  const [comprobante, setComprobante] = useState(null);
  const [filteredData, setFilteredData] = useState([]); 
  const [selectedFilePDF, setSelectedFilePdf] = useState(null);
  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => { 
    setModalAbierto(false);

    setFormValues({ TipoComprobante: "",
    Comprobante: "comprobante",
    TipoGasto: "",
    IdVehiculo: "",
    Proveedor: "",
    Monto: "",
    Fecha: "", 
    Descripcion: "",
    });
  };

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
      .get("http://www.ecotablasapi.somee.com/api/GastoVehiculos/ListarTodo")
      .then((response) => {
        setDataV(response.data);
        console.log("Gastos de vehículos:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
  
    if (type === "file" && files && files[0]) {
      const selectedFile = files[0];
      setSelectedFilePdf(selectedFile);
   
      // Guardás el archivo en el estado principal (formValues), no solo el nombre
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: selectedFile.name,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: type === "number" ? parseFloat(value) || 0 : value,
      }));
    }
  };
  


const handleChangeEdit = (e) => {
  const { name, type, value, files } = e.target;

  if (type === "file" && files && files[0]) {
    const selectedFile = files[0];
    setSelectedFilePdf(selectedFile);
 
    // Guardás el archivo en el estado principal (formValues), no solo el nombre
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: selectedFile.name,
    }));
  } else {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  }
};

 

  const abrirModalEdit = (gasto) => {
    const gastoSeguro = gasto || {};

    setGastoid(gastoSeguro.IdGasto || "");
    setFormValues({
      TipoComprobante: gastoSeguro.TipoComprobante || "",
      comprobante: gastoSeguro.Comprobante || "",
      TipoGasto: gastoSeguro.TipoGasto || "",
      IdVehiculo: gastoSeguro.IdVehiculo || "",
      Proveedor: gastoSeguro.Proveedor || "",
      Monto: gastoSeguro.Monto || "",
      Fecha: gastoSeguro.Fecha || "",
      Descripcion: gastoSeguro.Descripcion || "",
    });

    setModalEdit(true);
  };

  const fetchTrucks = () => {
    axios
      .get("http://www.ecotablasapi.somee.com/api/Vehiculos/ListarTodo")
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
console.log("URL de Dropbox:", URL);
      if (URL) {
        const updatedFormValues = { ...formValues, Comprobante: URL };
        axios
          .post(
            "http://www.ecotablasapi.somee.com/api/GastoVehiculos/CrearGastoVehiculo",
            updatedFormValues,
          )
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
    { header: "Tipo de Gasto", dataKey: "TipoGasto" },
    { header: "Tipo de Comprobante", dataKey: "TipoComprobante" },
    { header: "Proveedor", dataKey: "Proveedor" },
    { header: "Monto ($)", dataKey: "Monto" },
    { header: "Fecha", dataKey: "Fecha" },
    { header: "Descripción", dataKey: "Descripcion" },
  ];

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    if (!gastoId) {
      toast.error("Error: No se encontró el ID del gasto.");
      return;
    }
  
    const nuevoArchivo = selectedFilePDF;
  
    let updatedFormValues = {
      ...formValues,
    };

    if (!nuevoArchivo) {
      toast.error("Error: No se ha seleccionado un archivo para cargar.");
      return;
    }
  
    toast.success("Subiendo comprobante a Dropbox...");
  
    try {
      const nuevoPath = `/comprobantes/${nuevoArchivo.name}`;
      const dropboxUrl = await uploadToDropbox(nuevoArchivo, nuevoPath);
  
      if (!dropboxUrl) {
        toast.error("Error: No se pudo generar el enlace para el comprobante.");
        return;
      }
      
       updatedFormValues = {
        ...formValues,
        Comprobante: dropboxUrl,
        IdGasto: gastoId,
      };
      delete updatedFormValues.comprobante;
    
     
      await axios.put(
        `http://www.ecotablasapi.somee.com/api/GastoVehiculos/ActualizarGastoVehiculo/${gastoId}`,
        updatedFormValues
      );
  
  
  
    
      fetchMaterials(); 
      toast.success("El gasto fue actualizado correctamente 🎉"); 
      cerrarModalEdit();
    } catch (error) {
      console.error("Error al actualizar el gasto:", error);
      toast.error("Ocurrió un error al guardar los cambios. Intentá nuevamente.");

    } finally {
      setSelectedFilePdf(null); // Limpia el archivo cargado
    }
  };
  




  const cerrarModalEdit = () => { 
    setModalEdit(false);
    setFormValues({ TipoComprobante: "",
      Comprobante: "comprobante",
      TipoGasto: "",
      IdVehiculo: "",
      Proveedor: "",
      Monto: "",
      Fecha: "", 
      Descripcion: "",
      });
    };

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

  const titlesT = [
    { key: "TipoComprobante", label: "Tipo de Comprobante" },
    {
      key: "Comprobante",
      label: "Comprobante",
      render: (value) =>
        value ? (
          <a
            href={`https://www.dropbox.com/scl/fi/${value}`}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Comprobante
          </a>
        ) : (
          "No disponible"
        ),
    },
    { key: "TipoGasto", label: "Tipo de Gasto" },
    { key: "Proveedor", label: "Proveedor" },
    { key: "Monto", label: "Monto", type: "number" },
    { key: "Fecha", label: "Fecha", type: "date" },
    { key: "Descripcion", label: "Descripción", hasActions: true },
  ];

  const CLIENT_ID = import.meta.env.VITE_DROPBOX_CLIENT_ID;
  const CLIENT_SECRET = import.meta.env.VITE_DROPBOX_CLIENT_SECRET;

  const getAccessToken = async () => {
    const refreshToken = localStorage.getItem("dropboxRefreshToken");
    if (!refreshToken) {
      console.error("No se encontró el refresh token en el localStorage.");
      return null;
    }

    const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
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
    fetchToken();
  }, []);

  const uploadToDropbox = async (file) => {
    console.log("Subiendo archivo a Dropbox:", file);
    const accessToken = await getAccessToken();
    if (!accessToken) return;

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
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/octet-stream",
          "Dropbox-API-Arg": dropboxArgs,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        console.error(
          "Error al subir el archivo a Dropbox:",
          await uploadResponse.text(),
        );
        return null;
      }

      const fileData = await uploadResponse.json();
      const filePath = fileData.path_lower;

      // 2. Verificar si ya existe un enlace compartido
      const listLinksUrl =
        "https://api.dropboxapi.com/2/sharing/list_shared_links";
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
      const shareUrl =
        "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings";
      const shareResponse = await fetch(shareUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: filePath,
          settings: { requested_visibility: "public" }, // Asegura que sea visible públicamente
        }),
      });

      if (!shareResponse.ok) {
        console.error(
          "Error al crear el enlace compartido:",
          await shareResponse.text(),
        );
        return null;
      }

      const shareData = await shareResponse.json();
      const baseUrl = "https://www.dropbox.com/scl/fi/";
      
      // Elimina la parte base de la URL
      const sharedPath = shareData.url.replace(baseUrl, "").split("?")[0];
      
      // Reconstruye la URL con el formato que desees
      const link = `${sharedPath}?dl=1`;
      
      return link;
    } catch (error) {
      console.error("Error en la solicitud a Dropbox:", error);
      return null;
    }
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = (filteredData.length > 0 ? filteredData : dataV).slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(
    (filteredData.length > 0 ? filteredData.length : dataV.length) /
      itemsPerPage,
  );

  const [sortConfig, setSortConfig] = useState({ campo: "", direction: "asc" });
  const [data, setData] = useState(dataV);

  useEffect(() => {
    setData(dataV);
  }, [dataV]);

  const handleSort = (campo) => {
    let direction = "asc";
    if (sortConfig.campo === campo && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...dataV].sort((a, b) => {
      if (a[campo] < b[campo]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[campo] > b[campo]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortConfig({ campo, direction });
  };

  const actions = [
    {
      allowedRoles: ["admin", "supervisor"],
      render: (item) => (
        <div className="flex items-center justify-start gap-2 py-1">
            <button
                        onClick={() => abrirModalEdit(item)}
                        className="bg-yellow-600 ml-2 hover:bg-yellow-700 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        <FiEdit />
                        Modificar
                      </button>
          <DeleteButton
            endpoint="http://www.ecotablasapi.somee.com/api/GastoVehiculos/EliminarGastoVehiculo"
            id={item.IdGasto}
            updateList={fetchMaterials}
          />
       </div>
      ),
    },
  ];

  const [lineData, setLineData] = useState({});

  const calculateLineData = () => {
    const groupedByDate = {};

    dataV.forEach((item) => {
      const date = new Date(item.Fecha);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
      groupedByDate[month] =
        (groupedByDate[month] || 0) + parseFloat(item.Monto);
    });

    const sortedKeys = Object.keys(groupedByDate).sort();
    const labels = sortedKeys;
    const data = sortedKeys.map((key) => groupedByDate[key]);

    return {
      labels,
      datasets: [
        {
          label: "Gastos Mensuales",
          data,
          fill: false,
          borderColor: "#7DD3FC", // Color más claro (azul pastel)
          backgroundColor: "#1D27FF", // Fondo a
          tension: 0.4,
        },
      ],
    };
  };

  useEffect(() => {
    setLineData(calculateLineData());
  }, [dataV]);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // Muestra la leyenda
        position: "top", // Posición de la leyenda
      },
      tooltip: {
        enabled: true, // Habilita los tooltips
      },
      // Configura el fondo del gráfico
      backgroundColor: {
        color: "#FFFFFF", // Fondo del gráfico (gris claro)
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Meses",
        },
      },
      y: {
        title: {
          display: true,
          text: "Monto ($)",
        },
        beginAtZero: true,
      },
    },
  };
  const total = dataV.reduce((acc, curr) => acc + parseFloat(curr.Monto), 0);
  return (
    <SectionLayout title="Gastos de Vehículos">
      <div className="flex flex-wrap items-center gap-1">
        <AddButtonWa
          abrirModal={() => setModalAbierto(true)}
          title="Añadir gastos"
        />
        <PdfGenerator columns={columns} data={dataV} title="Reporte de gastos" />
        <DataView ShowTable={handleShowTable} />

        <button
          aria-label="Ver gráficos"
          className={`p-2 ml-2 mt-2 mb-5 font-bold rounded flex items-center text-white ${showPieChart ? "bg-blue-600" : "bg-gray-500"}`}
          onClick={() => {
            setShowPieChart(true);
            setShowTable(false);
          }}
        >
          Ver Gráficos <FaChartPie className="ml-2" />
        </button>
      </div>
      {ModalAbierto && (
        <AddModalWithSelect
          title="Agregar Gastos vehiculos"
          fields={fields}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cerrarModal={cerrarModal}
          values={formValues}
          dropboxAccessToken={accessToken}
        />
      )}

      {modalEdit && (
        <ButtonEditFiles
          title="Editar Gasto de Vehículo"
          fields={fields}
          formValues={formValues}
          handleChange={handleChangeEdit}
          handleEditSubmit={handleEditSubmit} 
          cerrarModalEdit={cerrarModalEdit} 
        />
      )}

      {showTable ? (
        loading ? (
          <LoadingTable loading={loading} />
        ) : (
          <TableComponent
            data={data}
            titles={titlesT}
            sortConfig={sortConfig}
            onSort={handleSort}
            hasMaterial={true}
            actions={actions}
          />

        )
      ) : showPieChart ? (
        <div className="flex flex-row mt-20 content-center justify-center items-center h-96 ">
          <div className="flex-1 min-w-[700px] max-w-[00px]  p-4  shadow-md rounded-md">
   
            <div className="h-[500px]  mb-4">
              <GastoVehiculosDataPicker />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-96"></div>
      )}
    </SectionLayout>
  );
};

export default GastoVehiculos;
