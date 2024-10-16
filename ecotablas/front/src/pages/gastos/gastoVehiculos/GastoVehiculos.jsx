import React, { useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import SectionLayout from '../../../layout/SectionLayout';
import TablaHead from '../../../components/Thead';
import LoadingTable from '../../../components/LoadingTable';
import AddButton from '../../../components/buttons/addButton';
import PdfGenerator from '../../../components/buttons/PdfGenerator';
import { useEffect } from 'react';
import DeleteButton from '../../../components/buttons/deleteButton';
import axios from 'axios';
import DataView from '../../../components/buttons/DataView';
import { FaChartLine } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const GastoVehiculos = () => {
  const [showPieChart, setShowPieChart] = useState(true);
  const [showTable, setShowTable] = useState(true); // Estado para mostrar/ocultar tabla
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [dataV, setDataV] = useState([]);
  const [dataView, setDataview] = useState(false);
  const [loading, setLoading] = useState(true);

  const abrirModal = () => {
    setModalAbierto(true);
  };
  const cerrarModal = () => {
    setModalAbierto(false);
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
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
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

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const handleShowTable = () => {
    setShowTable(true);
    setShowPieChart(false); // Ocultar gráficos
  };

  const data = [
    {
      tipoGasto: 'Combustible',
      tipoComprobante: 'Factura',
      comprobante: '12345',
      proveedor: 'YPF',
      monto: '1200',
      fecha: '2023-01-15',
      descripcion: 'Carga de combustible en estación YPF',
    },
    {
      tipoGasto: 'Mantenimiento',
      tipoComprobante: 'Factura',
      comprobante: '23456',
      proveedor: 'Taller Mecánico',
      monto: '800',
      fecha: '2023-02-10',
      descripcion: 'Cambio de aceite y filtros',
    },
    {
      tipoGasto: 'Seguro',
      tipoComprobante: 'Recibo',
      comprobante: '34567',
      proveedor: 'La Caja Seguros',
      monto: '400',
      fecha: '2023-03-22',
      descripcion: 'Pago mensual de seguro vehicular',
    },
  ];

  const OpenDataview = () => {
    setDataview(true);
  };

  const fetchMaterials = () => {
    setLoading(true); 
    axios
      .get(data)
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

  useEffect(() => {
    fetchMaterials();
  }, []);

  const columns = [
    { header: 'Tipo de Gasto', dataKey: 'tipoGasto' },
    { header: 'tipo de comprobante', dataKey: 'tipoComprobante' },
    { header: 'Comprobante', dataKey: 'comprobante' },
    { header: 'Proveedor', dataKey: 'proveedor' },
    { header: 'Monto ($)', dataKey: 'monto' },
    { header: 'Fecha', dataKey: 'fecha' },
    { header: 'Descripción', dataKey: 'descripcion' },
  ];

  const titles = [
    'Tipo de comprobante',
    'Comprobante',
    'Tipo de gasto',
    'Proveedor',
    'Monto ($)',
    'Fecha',
    'Descripción',
    'Acciones',
  ];

  return (
    <SectionLayout title="Gastos de Vehículos">
      {/* Botones para cambiar entre los gráficos y las tablas */}
      <div className="flex items-center align-middle">
        <AddButton abrirModal={abrirModal} title="Añadir gastos" />
        <PdfGenerator columns={columns} data={data} title="Reporte de gastos" />
        <DataView ShowTable={handleShowTable} />

        <button
          aria-label="Ver gráfico circular"
          className={`p-2   ml-2 mt-2 mb-5 font-bold rounded text-white flex items-center justify-center ${showPieChart ? 'bg-blue-600' : 'bg-gray-500'}`}
          onClick={() => {
            setShowPieChart(true);
            setShowTable(false);
          }}
        >
          Ver Gráfico Circular <FaChartPie className="ml-2" />
        </button>

        <button
          className={`  p-2  mt-2 mb-5  ml-2 font-bold rounded text-white flex items-center justify-center ${!showPieChart ? 'bg-blue-600' : 'bg-gray-500'}`}
          onClick={() => {
            setShowPieChart(false);
            setShowTable(false);
          }}
        >
          Ver Gráfico de Líneas <FaChartLine className="ml-2" />
        </button>
      </div>

       

      

      

      {/* Renderizado condicional para la tabla y los gráficos */}
      {showTable ? (
        loading ? (
          <LoadingTable loading={loading} />
        ) : (
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <TablaHead titles={titles} />
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border-b py-3 px-4">{item.tipoGasto}</td>
                  <td className="border-b py-3 px-4">{item.tipoComprobante}</td>
                  <td className="border-b py-3 px-4">{item.tipoGasto}</td>
                  <td className="border-b py-3 px-4">{item.proveedor}</td>
                  <td className="border-b py-3 px-4">{item.monto}</td>
                  <td className="border-b py-3 px-4">{item.fecha}</td>
                  <td className="border-b py-3 px-4">{item.descripcion}</td>
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

export default GastoVehiculos;
