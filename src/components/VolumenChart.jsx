import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, Filler);

const VolumenChart = () => {
  const [volumenData, setVolumenData] = useState({
    VolumenUtil: 0,
    VolumenInutil: 0,
  });

  useEffect(() => {
    axios
      .get("http://www.trazabilidadodsapi.somee.com/api/Volumen/ObtenerVolumen")
      .then((response) => {
        setVolumenData(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
      });
  }, []);

  const totalVolumen = volumenData.VolumenUtil + volumenData.VolumenInutil;

  const chartData = {
    labels: ["Volumen Útil", "Volumen No Útil"],
    datasets: [
      {
        label: "Volumen",
        data: [volumenData.VolumenUtil, volumenData.VolumenInutil],
        backgroundColor: ["#4CAF50", "#F44336"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: ${value} kg`;
          },
        },
      },
      datalabels: {
        display: false,
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Total: ${totalVolumen} kg`,
        position: "top",
        font: {
          size: 16,
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <h3 className="text-xl font-semibold text-white mb-2">Volumen Total</h3>
      <div style={{ position: "relative", width: "40%", height: "40%" }}>
        {" "}
        {}
        <Doughnut data={chartData} options={options} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-bold">
          {totalVolumen} kg
        </div>
      </div>
    </div>
  );
};

export default VolumenChart;
