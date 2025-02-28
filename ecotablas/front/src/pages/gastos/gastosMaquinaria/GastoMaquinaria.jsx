import React, { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination"
import { Toaster, toast } from 'sonner';


import TableComponent from "../../../components/TableComponent";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGastos,
  deleteGasto,
  addGasto,
  updateGasto,
} from "../../../features/gastoMaquinariaSlice";
import SectionLayout from "../../../layout/SectionLayout";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { RoleProvider } from "../../../context/RoleContext";
import LoadingTable from "../../../components/LoadingTable";
import PdfGenerator from "../../../components/buttons/PdfGenerator";
import { FaChartLine, FaChartPie } from "react-icons/fa";
import DataView from "../../../components/buttons/DataView";
import DeleteButton from "../../../components/buttons/DeleteButton";
import AddModalWithSelect from "../../../components/AddModalWithSelect";
import AddButtonWa from "../../../components/buttons/AddButtonWa";
import GastoMaquinariaChart from "../../../components/graficos/GastoMaquinariaChart";
import GastoMaquinariaDatePicker from "../../../components/graficos/GastoMaquinariaDatePicker";
import ButtonEdit from "../../../components/buttons/ButtonEditPr";


const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

const GastoMaquinaria = () => {
  const dispatch = useDispatch();
  const { gastos: dataM, loading } = useSelector(
    (state) => state.gastoMaquinaria
  );

  const [modalAbierto, setModalAbierto] = useState(false);
  // const [dataView, setDataView] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(5);
  const [accessToken, setAccessToken] = useState(null);
  // const [gastoEdit, setGastoEdit] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [modalEdit, setModalEdit] = useState(false);
  const [maquinaria, setMaquinaria] = useState([]);
  const[gastoId,setGastoid]=useState([])
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
  const [comprobante, setComprobante] = useState(null);
  // Variables de entorno
  const CLIENT_ID = import.meta.env.VITE_DROPBOX_CLIENT_ID;
  const CLIENT_SECRET = import.meta.env.VITE_DROPBOX_CLIENT_SECRET;

  // Cerrar Modal
  const cerrarModal = () => setModalAbierto(false);
  const abrirModalEdit = (gasto) => {
    
    const gastoSeguro = gasto || {}; 
    
    setGastoid(gastoSeguro.IdGastoMaquinaria || ""); 
    setFormValues({
      tipoGasto: gastoSeguro.TipoGasto || "",       
      tipoComprobante: gastoSeguro.TipoComprobante || "",
      Comprobante: gastoSeguro.Comprobante || "",
      proveedor: gastoSeguro.Proveedor || "",
      monto: gastoSeguro.Monto || "",
      fecha: gastoSeguro.Fecha || "",
      descripcion: gastoSeguro.Descripcion || "",
    });
  
    setModalEdit(true);
  };
  
  
  const cerrarModalEdit = () => setModalEdit(false);
  // Fetch inicial de datos
  useEffect(() => {
    dispatch(fetchGastos());
    fetchMaquinaria();
  }, [dispatch]);

  // Fetch maquinaria
  const fetchMaquinaria = () => {
    axios
      .get("http://www.ecotablasapi.somee.com/api/Maquinaria/ListarTodo")
      .then((response) => {
        setMaquinaria(response.data);
      })
      .catch((error) => console.error("Error fetching maquinaria:", error));
  };



  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    if (!gastoId) {
      toast.error("Error: No se encontró el ID del gasto.");
      return;
    }
  
    try {
      await dispatch(updateGasto({ id: gastoId, ...formValues })).unwrap();
      toast.success("Gasto actualizado con éxito");
      await dispatch(fetchGastos());
  
      cerrarModalEdit(); // Cierra el modal después de guardar
    } catch (error) {
      toast.error("Error al actualizar el gasto");
      console.error("Error al actualizar el gasto:", error);
    }
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
        // Si se seleccionó un archivo
        const selectedFile = files[0];
        console.log("Archivo seleccionado:", selectedFile.name);

        // Guardar el archivo en un estado separado
        setComprobante(selectedFile);

        // Si necesitas manejar el archivo en formValues:
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: selectedFile.name, // Guarda solo el nombre del archivo
        }));
    } else {
        // Si es un campo de texto u otro tipo de input
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }
};


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
          settings: { requested_visibility: "public" }, // Asegura que sea visible públicamente
        }),
      });
  
      if (!shareResponse.ok) {
        console.error("Error al crear el enlace compartido:", await shareResponse.text());
        return null;
      }
  
      const shareData = await shareResponse.json();
      const baseUrl = "https://www.dropbox.com/scl/fi/";

      
// Reemplaza la baseUrl, pero conserva el resto de la URL
const sharedLink = shareData.url.replace(baseUrl, "").split('?')[0];

// Reconstruye la URL con el formato correcto
const link = `${sharedLink}?dl=1`;

return link;


    } catch (error) {
      console.error("Error en la solicitud a Dropbox:", error);
      return null;
    }
  };
    const handleSubmit = async (e) => {
    e.preventDefault();

    toast.success("Subiendo comprobante a dropbox");
    const URL = await uploadToDropbox(comprobante );  

    if (URL) {
  
      const updatedFormValues = { ...formValues, comprobante: URL };

        axios
            .post(
                "http://www.ecotablasapi.somee.com/api/GastoMaquinaria/Create",
                updatedFormValues
            )
            .then(() => {
                toast.success("Gasto agregado con éxito");
                dispatch(fetchGastos()); // Recargar la tabla
                cerrarModal();
            })
            .catch((error) => {
                console.error("Error al agregar el gasto:", error);
                toast.error("Error al agregar el gasto.");
            });
    } else {
      console.error("No se pudo subir el archivo a dropbox")
        toast.error("No se pudo subir el archivo a Dropbox.");
    }
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

  const handleShowTable = () => {
    setShowTable(true);
    setShowPieChart(false);
  };



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
    { key: "Descripcion", label: "Descripción",hasActions: true  },

  ];
  const actions = [

    {
      allowedRoles: ["admin","supervisor", ],
      render: (item) => (
        <td className="border-t-2 p-2 flex flex-col md:flex-row items-center gap-2">
            <button
                        onClick={() => abrirModalEdit(item)}
                        className="bg-yellow-600 ml-2 hover:bg-yellow-700 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        <FiEdit />
                        Modificar
                      </button>
          <DeleteButton
            endpoint="http://www.ecotablasapi.somee.com/api/GastoMaquinaria/Delete"
            id={item.IdGastoMaquinaria}
            updateList={(fetchGastos())}
          />
        </td>
      ),
    },
  ];

  const pieOptions = {
    plugins: {
      legend: {
        position: "top",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  const total=dataM.reduce((acc, curr) => acc + parseFloat(curr.Monto), 0)
  
  const [sortConfig, setSortConfig] = useState({ campo: "", direction: "asc" });
  const [data, setData] = useState(dataM);
 
  useEffect(() => {
    setData(dataM);
  }, [dataM]);


  const handleSort = (campo) => {
 
    let direction = "asc";
    if (sortConfig.campo === campo && sortConfig.direction === "asc") {
      direction = "desc";
    }
  
    const sortedData = [...dataM].sort((a, b) => {
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
  

  
  
  return   (
<>
    <SectionLayout title="Gasto de Maquinaria">


    <Toaster />

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

      {modalAbierto && (
        <AddModalWithSelect
          title="Agregar Gasto de Maquinaria"
          fields={fields}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cerrarModal={cerrarModal}
          values={formValues}
          dropboxAccessToken={accessToken}
        />
      )}
      {modalEdit && (
        <ButtonEdit
          title="Gasto de Maquinaria"
          fields={fields}
          formValues={formValues}
          handleChange={handleChange}
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
      actions={actions}
    />

        )
      ) : showPieChart ? (

  <div className="flex flex-row mt-4 content-center justify-center items-center h-96 ">
          {/* <div className="mr-2  flex-1 min-w-[200px] max-w-[400px] mt-10 p-4 bg-gray-800 shadow-md rounded-md">
          <div className="h-[370px]">
            
          <Pie data={pieData} options={pieOptions} />
            </div>
            <p className=" text-centermt-2 text-center text-gray-200 ">Total de gastos: ${total} </p>
          </div> */}
 <div className="flex-1 min-w-[800px] max-w-[800px] mt-10 p-4  shadow-md rounded-md">
      
          <div className="h-[400px]">
          <GastoMaquinariaDatePicker />
          </div>
        </div>

          </div>












) : null}

    </SectionLayout>
    </>
  );
};

export default GastoMaquinaria;
