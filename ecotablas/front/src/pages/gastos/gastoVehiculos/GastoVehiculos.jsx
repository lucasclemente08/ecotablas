import React, { useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import SectionLayout from '../../../layout/SectionLayout';

import AddButton from '../../../components/buttons/addButton';
import PdfGenerator from '../../../components/buttons/PdfGenerator';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const GastoVehiculos = () => {
  const [showPieChart, setShowPieChart] = useState(true); 
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedMonth, setSelectedMonth] = useState(''); 
  const [modalAbierto, setModalAbierto] = useState(false);

const abrirModal =()=>{
  setModalAbierto(true);
}
const cerrarModal = () => {
  setModalAbierto(false);
};

  const pieData = {
    labels: ['Combustible', 'Mantenimiento', 'Seguro'],
    datasets: [
      {
        label: 'Gastos por Categoría',
        data: [1200, 800, 400], // Datos simulados
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Datos para el gráfico de líneas (por mes filtrado)
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

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false, // Permite ajustar el tamaño manualmente
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

  const columns = [
    { header: "Tipo de Gasto", dataKey: "tipoGasto" },
    { header: "Monto ($)", dataKey: "monto" },
    { header: "Fecha", dataKey: "fecha" },
    { header: "Descripción", dataKey: "descripcion" },
  ];
  const data = [
    { tipoGasto: 'Combustible', monto: '1200', fecha: '2023-01-15', descripcion: 'Carga de combustible en estación YPF' },
    { tipoGasto: 'Mantenimiento', monto: '800', fecha: '2023-02-10', descripcion: 'Cambio de aceite y filtros' },
    { tipoGasto: 'Seguro', monto: '400', fecha: '2023-03-22', descripcion: 'Pago mensual de seguro vehicular' },
    { tipoGasto: 'Combustible', monto: '1500', fecha: '2023-04-18', descripcion: 'Carga de combustible en estación Shell' },
    { tipoGasto: 'Mantenimiento', monto: '950', fecha: '2023-05-25', descripcion: 'Revisión de frenos y balanceo de ruedas' },
    { tipoGasto: 'Seguro', monto: '500', fecha: '2023-06-13', descripcion: 'Pago trimestral del seguro' },
    // Añadir más registros según sea necesario
  ];
    


  const filteredLineData = {
    ...lineData,
    datasets: lineData.datasets.map((dataset) => ({
      ...dataset,
      data: selectedMonth ? [dataset.data[selectedMonthIndex]] : dataset.data,
    })),
  };
  

  return (
    <SectionLayout title="Gastos de Vehículos">
      {/* Botones para cambiar entre los gráficos */}

      <AddButton abrirModal={abrirModal} title={"Añadir empresa gastos"} />
        <PdfGenerator
          columns={columns}
          data={data}
          title="Reporte de gastos "
        />
      <div className="flex justify-center gap-4 mb-8">
      <button
  aria-label="Ver gráfico circular"
  className={`py-2 px-4 font-bold text-white rounded ${showPieChart ? 'bg-blue-600' : 'bg-gray-500'}`}
  onClick={() => setShowPieChart(true)}
>
  Ver Gráfico Circular
</button>

        <button
          className={`py-2 px-4 font-bold text-white rounded ${!showPieChart ? 'bg-blue-600' : 'bg-gray-500'}`}
          onClick={() => setShowPieChart(false)}
        >
          Ver Gráfico de Líneas
        </button>
      </div>
<div className="flex justify-center">

      {/* Select para el mes */}
      <div className="flex justify-center p-1 items-center">
        <label className="text-white font-semibold mr-2" htmlFor="month-select">
          Selecciona Mes:
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border m-2 border-gray-300 p-2 rounded-md"
        >
          <option value="">Todos los Meses</option>
          {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map(
            (month) => (
              <option key={month} value={month}>
                {month}
              </option>
            )
          )}
        </select>
      </div>

      {/* Select para el año */}
      <div className="flex justify-center p-1 items-center">
    

    
        <label className="text-white font-semibold mr-2" htmlFor="year-select">
          Selecciona Año:
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          {['2022', '2023', '2024'].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
          </div>

      {/* Mostrar el gráfico basado en el estado */}
      {showPieChart ? (
        <div className="mb-8">
          <h3 className="text-lg text-white font-semibold mb-4">Distribución de Gastos</h3>
          <div className="w-full h-64">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      ) : (
        <div className="bg-zinc-800 p-4">
          <h3 className="text-lg text-white font-semibold mb-4">Evolución de Gastos por Mes ({selectedYear})</h3>
          <div className="w-full h-64">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      )}
    </SectionLayout>
  );
};

export default GastoVehiculos;
