import React, { useState, useEffect } from "react";
import TotalCard from "./TotalChart";
import { FaChartBar } from "react-icons/fa";
import axios from "axios";

const TotalIncomeMaterial = () => {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(
        "http://www.ecotablasapi.somee.com/api/IngresoMat/ListarTodo",
      );
      if (response && response.data) {
        setData(response.data);
      } else {
        console.error("Respuesta inesperada de la API:", response);
      }
    } catch (error) {
      console.log("Error fetching materials:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const parseFecha = (fecha) => {
    try {
      const date = new Date(fecha); // Esto maneja fechas en formato ISO 8601
      return date.toISOString().slice(0, 10); // Regresa la fecha en formato 'yyyy-mm-dd'
    } catch (error) {
      console.error("Error parsing fecha:", fecha);
      return null;
    }
  };

  // Cálculo de ingresos de hoy
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const hoy = new Date().toISOString().slice(0, 10);
      const ingresosHoy = data.filter((item) => {
        const fechaItem = parseFecha(item.FechaIngresoM); // Ajusta el campo si tiene otro nombre
        return fechaItem === hoy;
      });
      setTotal(ingresosHoy.length); // Cambia esto si necesitas sumar otro valor, no solo la cantidad
    }
  }, [data]);

  return (
    <TotalCard
      title="Totales Ingresos de Material Hoy"
      value={total}
      icon={<FaChartBar />}
      iconStyle="text-green-300 text-4xl"
      bgColor="bg-green-600"
    />
  );
};

export default TotalIncomeMaterial;
