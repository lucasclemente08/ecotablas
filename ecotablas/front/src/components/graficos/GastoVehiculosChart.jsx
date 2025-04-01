import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const GastoVehiculosChart = () => {
  const [dataV, setDataV] = useState([]);
  const [lineData, setLineData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMaterials = () => {
    setLoading(true);
    axios
      .get("http://www.ecotablasapi.somee.com/api/GastoVehiculos/ListarTodo")
      .then((response) => {
        setDataV(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const calculateLineData = () => {
    const groupedByDate = {};

    dataV.forEach((item) => {
      const date = new Date(item.Fecha);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
      groupedByDate[month] =
        (groupedByDate[month] || 0) + parseFloat(item.Monto);
    });

    const labels = Object.keys(groupedByDate).sort(); // Ordena por mes y año
    const data = labels.map((month) => groupedByDate[month]);

    setLineData({
      labels,
      datasets: [
        {
          label: "Gastos por Mes ($)",
          data,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
      ],
    });
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  useEffect(() => {
    if (dataV.length > 0) {
      calculateLineData();
    }
  }, [dataV]);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
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

  return (
    <div className="bg-blue-50 shadow-md mt-3 h-full rounded-lg p-4">
      {loading ? (
        <p>Cargando datos...</p>
      ) : lineData ? (
        <Line data={lineData} options={lineOptions} />
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </div>
  );
};

export default GastoVehiculosChart;
