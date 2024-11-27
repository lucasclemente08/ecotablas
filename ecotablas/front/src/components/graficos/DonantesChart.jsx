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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://www.gestiondeecotablas.somee.com/api/UbicacionesMapa/ListarTodo"
      );
      const data = response.data || [];
      setLocations(data);
      processChartData(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setError("No se pudo cargar la información de los donantes.");
    } finally {
      setLoading(false);
    }
  };

  const processChartData = (data) => {
    // Inicializar el contador para cada tipo de donante
    const counts = data.reduce(
      (acc, location) => {
        if (location.TipoDonante) {
          acc[location.TipoDonante.toLowerCase()] += 1;
        }
        return acc;
      },
      { empresa: 0, urbanos: 0, particular: 0 }
    );

    // Actualizar los datos para el gráfico
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
    <div className="bg-gray-800 p-4 rounded-md shadow-md mx-auto">
      {/* <h2 className="text-center text-gray-50 font-bold text-md mb-3">
      Cantidad de Donantes por Tipo
      </h2> */}
      {loading ? (
        <p className="text-center text-gray-50">Cargando datos...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : chartData ? (
        <div className="h-96 rounded-md">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
         
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
        <p className="text-center text-gray-50">No hay datos para mostrar.</p>
      )}
    </div>
  );
};

export default DonantesChart;
