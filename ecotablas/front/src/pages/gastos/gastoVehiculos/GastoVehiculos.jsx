import React, { useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import SectionLayout from '../../../layout/SectionLayout';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const GastoVehiculos = () => {
  const [showPieChart, setShowPieChart] = useState(true); // Estado para mostrar el gráfico circular o de líneas
  const [selectedYear, setSelectedYear] = useState('2023'); // Estado del año seleccionado
  const [selectedMonth, setSelectedMonth] = useState(''); // Estado del mes seleccionado

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

  return (
    <SectionLayout title="Gastos de Vehículos">
      {/* Botones para cambiar entre los gráficos */}
      <div className="flex justify-center gap-4 mb-8">
        <button
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
{/* <div className="flex justify-center">

      Select para el mes
      <div className="flex justify-center mb-4 ">
        <label className="text-white font-semibold mr-2" htmlFor="month-select">
          Selecciona Mes:
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
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
      {/* <div className="flex justify-center m-2">
    

    
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
          </div> */} 

      {/* Mostrar el gráfico basado en el estado */}
      {showPieChart ? (
        <div className="mb-8">
          <h3 className="text-lg text-white font-semibold mb-4">Distribución de Gastos</h3>
          <div className="w-full h-64">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      ) : (
        <div className="bg-slate-800 p-4">
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
