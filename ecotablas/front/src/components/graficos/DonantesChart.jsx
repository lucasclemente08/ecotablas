import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DonantesChart = () => {
  const [locations, setLocations] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "http://www.gestiondeecotablas.somee.com/api/UbicacionesMapa/ListarTodo"
      );
      setLocations(response.data);
      processChartData(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const processChartData = (data) => {
    const counts = data.reduce(
      (acc, location) => {
        acc[location.TipoDonante.toLowerCase()] += 1;
        return acc;
      },
      { empresa: 0, urbanos: 0, particular: 0 }
    );

    setChartData({
      labels: ["Empresa", "Urbanos", "Particular"],
      datasets: [
        {
          label: "Cantidad por tipo de donante",
          data: [counts.empresa, counts.urbanos, counts.particular],
          backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
          borderColor: ["#388E3C", "#1976D2", "#FFA000"],
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md shadow-md w-96 mx-auto">
      <h2 className="text-center text-gray-50 font-bold text-md mb-3">Gráfico de Donantes</h2>
      {chartData ? (
        <div className="h-96 p-4 rounded-md">
          <Bar
            data={chartData}
            options={{           responsive: true,
    
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    font: { size: 15 },
                  },
                },
                title: {
                  display: true,
                  text: "Cantidad de Donantes por Tipo",
                  font: { size: 20 },
                 
                },
              },
              scales: {
                x: {
                  ticks: { font: { size: 15 } },
                },
                y: {
                  ticks: { font: { size: 15 } },
                },
              },
            }}
          />
        </div>
      ) : (
        <p className="text-center text-gray-50">Cargando datos...</p>
      )}
    </div>
  );
};

export default DonantesChart;
