import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, Filler);

const VolumenCharts = () => {
  const [data, setData] = useState({
    VolumenIngresoMaterial: 0,
    VolumenMaterialProcesado: 0,
    VolumenMaterialTriturado: 0,
    VolumenClasificado: 0
  });

  useEffect(() => {
    axios.get('http://localhost:61274/api/Volumen/ObtenerVolumen')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los datos:', error);
      });
  }, []);

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: ${value} kg`;
          }
        }
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        position: 'top',
        font: {
          size: 14,
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };

  const chartData = (volumen, label) => ({
    labels: [label],
    datasets: [
      {
        label: label,
        data: [volumen],
        backgroundColor: ['#4CAF50'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="flex flex-wrap justify-around gap-4 p-4 bg-white rounded-md shadow-md">
      <div className="flex flex-col items-center mb-8 w-1/4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Volumen Ingreso Material</h3>
        <Doughnut data={chartData(data.VolumenIngresoMaterial, 'Volumen Ingreso Material')} options={chartOptions} />
      </div>
      <div className="flex flex-col items-center mb-8 w-1/4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Volumen Material Procesado</h3>
        <Doughnut data={chartData(data.VolumenProcesado, 'Volumen Material Procesado')} options={chartOptions} />
      </div>
      <div className="flex flex-col items-center mb-8 w-1/4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Volumen Material Trituradoooo</h3>
        <Doughnut data={chartData(data.VolumenTriturado, 'Volumen Material Triturado')} options={chartOptions} />
      </div>
      <div className="flex flex-col items-center mb-8 w-1/4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Volumen Clasificado</h3>
        <Doughnut data={chartData(data.VolumenClasificado, 'Volumen Clasificado')} options={chartOptions} />
      </div>
    </div>
  );
};

export default VolumenCharts;