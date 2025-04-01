import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TotalCard from "./TotalChart";
import { FaChartBar } from "react-icons/fa";
import { fetchTablasProducidas } from "../../features/tablasProducidasSlice";

const TotalTableDevelop = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.tablasProducidas,
  );

  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(fetchTablasProducidas());
  }, [dispatch]);

  const parseFecha = (fecha) => {
    try {
      const date = new Date(fecha); // Esto maneja fechas en formato ISO 8601
      return date.toISOString().slice(0, 10); // Regresa la fecha en formato 'yyyy-mm-dd'
    } catch (error) {
      console.error("Error parsing fecha:", fecha);
      return null;
    }
  };

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    const hoy = new Date().toISOString().slice(0, 10);
    const producidasHoy = data.filter((item) => {
      const fechaItem = parseFecha(item.FechaProduccion);
      return fechaItem === hoy;
    });

    setTotal(producidasHoy.length);
  }, [data]);

  return (
    <TotalCard
      title="Totales Tablas Producidas Hoy"
      value={total}
      icon={<FaChartBar />}
      iconStyle="text-blue-300 text-4xl"
      bgColor="bg-blue-600"
    />
  );
};

export default TotalTableDevelop;
