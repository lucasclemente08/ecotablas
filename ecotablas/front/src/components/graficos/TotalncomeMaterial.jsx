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
      setData(response.data);
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    fetchMaterials();
  }, []);



  const parseFecha = (fecha) => {
    try {
      const [day, month, year] = fecha.split("/");
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error parsing fecha:", fecha);
      return null;
    }
  };

  // Cálculo de ingresos de hoy
  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    const hoy = new Date().toISOString().slice(0, 10);
    const ingresosHoy = data.filter((item) => {
      const fechaItem = parseFecha(item.FechaIngreso); // Ajusta el campo si tiene otro nombre
      return fechaItem === hoy;
    });

    setTotal(ingresosHoy.length); // Cambia esto si necesitas sumar otro valor, no solo la cantidad
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
