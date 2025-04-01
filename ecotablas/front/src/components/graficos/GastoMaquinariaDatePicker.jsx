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
import DatePicker from "react-datepicker"; // Necesita instalar react-datepicker
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const GastoMaquinariaDatePicker = () => {
  const [dataM, setDataM] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [lineData, setLineData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tipoGasto, setTipoGasto] = useState("Todos");

  const fetchData = () => {
    setLoading(true);
    axios
      .get("http://www.ecotablasapi.somee.com/api/GastoMaquinaria/GetAll") // Cambiar al endpoint de maquinaria
      .then((response) => {
        setDataM(response.data);
        setFilteredData(response.data); // Inicialmente, no hay filtros aplicados
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const applyFilters = () => {
    let tempData = [...dataM];

    // Filtrar por rango de fechas
    if (startDate || endDate) {
      tempData = tempData.filter((item) => {
        const date = new Date(item.Fecha);
        return (
          (!startDate || date >= startDate) && (!endDate || date <= endDate)
        );
      });
    }

    // Filtrar por tipo de gasto
    if (tipoGasto !== "Todos") {
      tempData = tempData.filter((item) => item.TipoGasto === tipoGasto);
    }

    setFilteredData(tempData);
  };

  const calculateLineData = () => {
    const groupedByDate = {};

    filteredData.forEach((item) => {
      const date = new Date(item.Fecha);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
      groupedByDate[month] =
        (groupedByDate[month] || 0) + parseFloat(item.Monto);
    });

    const labels = Object.keys(groupedByDate).sort();
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
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [startDate, endDate, tipoGasto]);

  useEffect(() => {
    if (filteredData.length > 0) {
      calculateLineData();
    } else {
      setLineData(null);
    }
  }, [filteredData]);

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
    <div className="bg-blue-50 shadow-md mt-10 rounded-lg p-4">
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div>
          <label className="block mb-1">Fecha Inicio:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Fecha Fin:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Tipo de Gasto:</label>
          <select
            value={tipoGasto}
            onChange={(e) => setTipoGasto(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="Todos">Todos</option>
            <option value="Reparación">Reparación</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
      </div>
      <div className="h-80 md:h-96 w-full">
        {loading ? (
          <p>Cargando datos...</p>
        ) : lineData ? (
          <Line data={lineData} options={lineOptions} />
        ) : (
          <p>No hay datos disponibles para los filtros aplicados.</p>
        )}
      </div>
    </div>
  );
};

export default GastoMaquinariaDatePicker;
