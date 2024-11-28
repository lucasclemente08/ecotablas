import React, { useState, useEffect } from "react";
import SectionLayout from "../../layout/SectionLayout";
import MaquinariaChart from "../../components/graficos/MaquinariaChart";
import DonantesChart from "../../components/graficos/DonantesChart";
import GastoVehiculoChart from "../../components/graficos/GastoVehiculosChart";
import GastoMaquinariaChart from "../../components/graficos/GastoMaquinariaChart";
import ChartCard from "../../components/graficos/ChardCard";
import TotalCard from "../../components/graficos/TotalChart";
import { FaTruckFront } from "react-icons/fa6";

import { getAllMaquinarias } from "../../api/MaquinariasAPI";

import { FaChartBar, FaDollarSign, FaCogs } from "react-icons/fa";
import { FcShipped } from "react-icons/fc";
import ActiveMachine from "../../components/graficos/ActiveMachine";
const Estadisticas = () => {
  const [tablasProducidas, setTablasProducidas] = useState([]);
  const [tablasProducidasHoy, setTablasProducidasHoy] = useState(0);
  const [materialIngresado, setMaterialIngresado] = useState(0);

  useEffect(() => {
    // Obtener datos de tablas producidas
    fetch("http://www.gestiondeecotablas.somee.com/api/TablaProducidas/ListarTodo")
      .then((response) => response.json())
      .then((data) => setTablasProducidas(data))
      .catch((error) =>
        console.error("Error al obtener tablas producidas:", error)
      );

    // // Obtener datos de material ingresado
    // fetch("/api/material-ingresado")
    //   .then((response) => response.json())
    //   .then((data) => setMaterialIngresado(data.total || 0))
    //   .catch((error) =>
    //     console.error("Error al obtener material ingresado:", error)
    //   );


    
  }, []);

  const parseFecha = (fecha) => {
    const [day, month, year] = fecha.split("/");
    return `${year}-${month}-${day}`;
  };
  


  

  useEffect(() => {
    const hoy = new Date().toISOString().slice(0, 10);
  const maquinarias=getAllMaquinarias()
 console.log(maquinarias)
    const producidasHoy = tablasProducidas.filter((item) => {

      console.log(item.FechaProduccion)
      const fechaItem = parseFecha(item.FechaProduccion);
      return fechaItem === hoy;
    });

    console.log(producidasHoy.length)
  
    setTablasProducidasHoy(producidasHoy.length);
  }, [tablasProducidas]);

  const gastoVehiculosHoy = "$1,200"; // Ejemplo de datos
  const maquinariaOperativa = 15; // Ejemplo de datos



  return (
    <SectionLayout title="">

<div className="flex flex-wrap justify-center gap-6 mb-8">
      {/* Total Material Ingresado */}
      <TotalCard
        title="Totales Material Ingresado Hoy"
        value={`${materialIngresado} kgs`}
        icon={<FcShipped />}
        iconStyle="text-green-500 text-4xl"
        bgColor="bg-green-700"
      />
   

      {/* Total Tablas Producidas */}
      <TotalCard
        title="Totales Tablas Producidas Hoy"
        value={tablasProducidasHoy}
        icon={<FaChartBar />}
        iconStyle="text-blue-300 text-4xl"
        bgColor="bg-blue-600"
      />

      {/* Gasto en Vehículos */}
      <TotalCard
        title="Vehiculos activos"
        value={5}
        icon={<FaTruckFront />}
        iconStyle="text-yellow-400 text-4xl"
        bgColor="bg-yellow-600"
      />
   <ActiveMachine />
      {/* Maquinaria Operativa */}

    </div>


      <div className="flex flex-wrap justify-center items-start gap-6">
        {/* Maquinaria Chart */}
        <ChartCard title="Maquinaria">
          <MaquinariaChart />
        </ChartCard>

        {/* Donantes Chart */}
        <ChartCard title="Donantes">
          <DonantesChart />
        </ChartCard>

        {/* Gasto Maquinaria Chart */}
        <ChartCard title="Gastos de Maquinaria">
          <GastoMaquinariaChart />
        </ChartCard>

        {/* Gasto Vehículos Chart */}
        <ChartCard title="Gastos de Vehículos">
          <GastoVehiculoChart />
        </ChartCard>
      </div>
   

      {/* Totales */}
  
    </SectionLayout>
  );
};



export default Estadisticas;
