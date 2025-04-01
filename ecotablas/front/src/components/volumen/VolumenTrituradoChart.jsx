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

const VolumenTrituradoChart = ({ dateRange }) => {
  const [volumenData, setVolumenData] = useState({
    VolumenTriturado: 0,
    VolumenTInutil: 0,
  });
  const [activeSegment, setActiveSegment] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    const startDate = dateRange?.startDate || today;
    const endDate = dateRange?.endDate || today;

    axios
      .get("http://www.ecotablasapi.somee.com/api/Volumen/ObtenerVolumen", {
        params: {
          fechaInicio: startDate,
          fechaFin: endDate,
        },
      })
      .then((response) => {
        const data = response.data;
        setVolumenData(data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
      });
  }, [dateRange]);

  const totalVolumen =
    volumenData.VolumenTriturado + volumenData.VolumenTInutil;

  const chartData = {
    labels: ["Volumen Útil", "Volumen No Útil"],
    datasets: [
      {
        label: "Volumen",
        data:
          activeSegment === "util"
            ? [volumenData.VolumenTriturado, 0]
            : activeSegment === "inutil"
              ? [0, volumenData.VolumenTInutil]
              : [volumenData.VolumenTriturado, volumenData.VolumenTInutil],
        backgroundColor: ["#4CAF50", "#F44336"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const displayedText =
    activeSegment === "util"
      ? `${volumenData.VolumenTriturado} kg`
      : activeSegment === "inutil"
        ? `${volumenData.VolumenTInutil} kg`
        : `${totalVolumen} kg`;

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
      legend: {
        position: "top",
        onClick: (e, legendItem, legend) => {
          const index = legendItem.index;

          if (index === 0) {
            setActiveSegment(activeSegment === "util" ? null : "util");
          } else if (index === 1) {
            setActiveSegment(activeSegment === "inutil" ? null : "inutil");
          }
        },
      },
      title: {
        display: true,
        text: displayedText,
        position: "top",
        font: {
          size: 14,
        },
        color: "#FFFFFF",
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="flex flex-col items-center mb-8 p-4">
      <h3 className="text-lg font-semibold text-white mb-2">
        Volumen Triturado
      </h3>
      <div style={{ position: "relative", width: "300px", height: "300px" }}>
        <Doughnut data={chartData} options={options} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-bold">
          {displayedText}
        </div>
      </div>
    </div>
  );
};

export default VolumenTrituradoChart;
