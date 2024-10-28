import React, { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import SectionLayout from '../../../layout/SectionLayout';
import TablaHead from '../../../components/Thead';
import LoadingTable from '../../../components/LoadingTable';
import AddButton from '../../../components/buttons/AddButton';
import PdfGenerator from '../../../components/buttons/PdfGenerator';
import DeleteButton from '../../../components/buttons/DeleteButton';
import DataView from '../../../components/buttons/DataView';
import { FaChartLine, FaChartPie } from "react-icons/fa";
import axios from 'axios';
import builderApiUrl from '../../../utils/BuilderApi';
import AddModal from '../../../components/AddModal';
import AddModalWithSelect from '../../../components/AddModalWithSelect';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const GastoVehiculos = () => {

  const [showPieChart, setShowPieChart] = useState(true);
  const [showTable, setShowTable] = useState(true); 
  const [dataV, setDataV] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [trucks, setTrucks] = useState([]); 
  const [ModalAbierto,setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [mensaje, setMensaje] = useState("");



  const [formValues, setFormValues] = useState({
    TipoComprobante: "",
    Comprobante: "",
    TipoGasto: "",
    IdVehiculo: "", // ID del vehículo seleccionado
    Proveedor: "",
    Monto: "",
    Fecha: "", // Cambiar a un formato de fecha adecuado
    Descripcion: "",
  });
  


  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);
  // const URL_gastos = builderApiUrl("http://localhost:61274/api/GastoVehiculos/ListarTodo");
  const URL_trucks = builderApiUrl("Vehiculos/ListarTodo");


  const fetchMaterials = () => {
    setLoading(true); 
    axios.get("http://localhost:61274/api/GastoVehiculos/ListarTodo")
      .then((response) => {
        setDataV(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const fetchTrucks = () => {
    axios.get(URL_trucks)
      .then((response) => {
        setTrucks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching trucks:', error);
      });
  };


  useEffect(() => {
    fetchTrucks();
    fetchMaterials();
  }, []);


  const getVehicleById = (id) => {
    const vehicle = trucks.find((vehicle) => vehicle.IdVehiculo === id);
    return vehicle ? `${vehicle.Modelo} (${vehicle.Tipo})` : "Vehículo no disponible";
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  
  // Función para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos al servidor
    axios.post("http://localhost:61274/api/GastoVehiculos/CrearGastoVehiculo", formValues)
      .then((response) => {
        setMensaje("Gasto agregado con éxito");
        fetchMaterials(); // Para actualizar la tabla después de agregar el gasto
        cerrarModal(); // Cerrar el modal después de agregar
      })
      .catch((error) => {
        console.error('Error al agregar el gasto:', error);
        setMensaje("Error al agregar el gasto");
      });
  };
  


  

  const pieData = {
    labels: ['Combustible', 'Mantenimiento', 'Seguro'],
    datasets: [
      {
        label: 'Gastos por Categoría',
        data: [1200, 800, 400],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const lineData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Combustible',
        data: [1200, 1500, 1100, 1400, 1600, 1450, 1700, 1800, 2000, 2100, 2300, 2200],
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Mantenimiento',
        data: [800, 900, 1000, 950, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450],
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Seguro',
        data: [400, 450, 420, 500, 480, 460, 470, 490, 520, 540, 560, 580],
        borderColor: '#FFCE56',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
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
      type: "text",
      required: true,
    },
    {
      name: "TipoGasto",
      label: "Tipo de Gasto",
      type: "text",
      required: true,
    },
    {
      name: "IdVehiculo",
      label: "Vehículo",
      type: "select", 
      options: trucks, 
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
  
  // Opciones de configuración de gráficos
  const pieOptions = { responsive: true, maintainAspectRatio: false };
  const lineOptions = { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } };

  // Manejar mostrar tabla
  const handleShowTable = () => {
    setShowTable(true);
    setShowPieChart(false);
  };

  const titles = ['Tipo de comprobante', 'Comprobante', 'Tipo de gasto', 'Vehículo', 'Proveedor', 'Monto ($)', 'Fecha', 'Descripción', 'Acciones'];

  return (
    <SectionLayout title="Gastos de Vehículos">
      <div className="flex items-center">
        <AddButton abrirModal={abrirModal} title="Añadir gastos" />
        <PdfGenerator columns={titles} data={dataV} title="Reporte de gastos" />
        <DataView ShowTable={handleShowTable} />

        {ModalAbierto && (
          <AddModalWithSelect
            title="Agregar Gastos vehiculos"
            fields={fields}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            cerrarModal={cerrarModal}
            values={formValues}
          />
        )}

        <button
          aria-label="Ver gráfico circular"
          className={`p-2 ml-2 mt-2 mb-5 font-bold rounded text-white ${showPieChart ? 'bg-blue-600' : 'bg-gray-500'}`}
          onClick={() => { setShowPieChart(true); setShowTable(false); }}
        >
          Ver Gráfico Circular <FaChartPie className="ml-2" />
        </button>

        <button
          className={`p-2 mt-2 mb-5 ml-2 font-bold rounded text-white ${!showPieChart ? 'bg-blue-600' : 'bg-gray-500'}`}
          onClick={() => { setShowPieChart(false); setShowTable(false); }}
        >
          Ver Gráfico de Líneas <FaChartLine className="ml-2" />
        </button>
      </div>

      {/* Renderizado condicional de la tabla o gráficos */}
      {showTable ? (
        loading ? (
          <LoadingTable loading={loading} />
        ) : (
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <TablaHead titles={titles} />
            <tbody>
              {dataV.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border-b py-3 px-4">{item.TipoComprobante}</td>
                  <td className="border-b py-3 px-4">{item.Comprobante}</td>
                  <td className="border-b py-3 px-4">{item.TipoGasto}</td>
                  <td className="border-b py-3 px-4">{getVehicleById(item.IdVehiculo)}</td>
                  <td className="border-b py-3 px-4">{item.Proveedor}</td>
                  <td className="border-b py-3 px-4">{item.Monto}</td>
                  <td className="border-b py-3 px-4">{item.Fecha.slice(0,10)}</td>
                  <td className="border-b py-3 px-4">{item.Descripcion}</td>
                  <td className="border-b py-3 px-4">
                    <DeleteButton />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : showPieChart ? (
        <div className="w-full h-96">
          <Pie data={pieData} options={pieOptions} />
        </div>
      ) : (
        <div className="w-full h-96">
          <Line data={lineData} options={lineOptions} />
        </div>
      )}
    </SectionLayout>
  );
};

export default GastoVehiculos
