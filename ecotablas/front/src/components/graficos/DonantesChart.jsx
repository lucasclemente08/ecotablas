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
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

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
        "http://www.ecotablasapi.somee.com/api/UbicacionesMapa/ListarTodo",
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
      { empresa: 0, urbanos: 0, particular: 0 },
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
      {loading ? (
        <p className="text-center text-gray-50">Cargando datos...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : chartData ? (
        <div className="h-96 rounded-md">
          <Bar
            data={chartData}
            options={{
              color: "#FFFFFF",
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  ticks: { font: { size: 15 } },
                  color: "#FFFFFF",
                  barPercentage: 0.4, // Reduce el tamaño de las barras
                },
                y: {
                  color: "#FFFFFF",
                  ticks: { font: { size: 15 } },
                },
              },
              plugins: {
                legend: {
                  labels: {
                    color: "#FFFFFF", // Color blanco para las etiquetas de la leyenda
                  },
                },
                datalabels: {
                  color: "#FFFFFF", // Número sobre las barras en blanco
                  font: {
                    weight: "bold",
                    size: 16,
                  },

                  align: "top", // Muestra los números arriba de las barras
                  anchor: "center ", // Ajusta la posición de los números
                  formatter: (value) => value, // Solo muestra el número
                },
              },
            }}
          />
        </div>
      ) : (
        <p className="text-center text-white">No hay datos para mostrar.</p>
      )}
    </div>
  );
};

export default DonantesChart;
