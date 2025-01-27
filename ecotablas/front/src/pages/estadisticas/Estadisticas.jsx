import React, { useState, useEffect } from "react";
import SectionLayout from "../../layout/SectionLayout";
import MaquinariaChart from "../../components/graficos/MaquinariaChart";
import DonantesChart from "../../components/graficos/DonantesChart";
import GastoVehiculoChart from "../../components/graficos/GastoVehiculosChart";
import GastoMaquinariaChart from "../../components/graficos/GastoMaquinariaChart";
import ChartCard from "../../components/graficos/ChardCard";
import TotalCard from "../../components/graficos/TotalChart";
import { FaTruckFront } from "react-icons/fa6";
import TotalTableDevelop from "../../components/graficos/TotalTableDevelop";
import { getAllMaquinarias } from "../../api/MaquinariasAPI";

import { FaChartBar, FaDollarSign, FaCogs } from "react-icons/fa";
import { FcShipped } from "react-icons/fc";
import ActiveMachine from "../../components/graficos/ActiveMachine";
import ActiveCars from "../../components/graficos/ActiveCars";
import TotalIncomeMaterial from "../../components/graficos/TotalncomeMaterial";
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

   

    
  }, []);

  const parseFecha = (fecha) => {
    const [day, month, year] = fecha.split("/");
    return `${year}-${month}-${day}`;
  };
    
  useEffect(() => {
    const hoy = new Date().toISOString().slice(0, 10);
  const maquinarias=getAllMaquinarias()

    const producidasHoy = tablasProducidas.filter((item) => {
      const fechaItem = parseFecha(item.FechaProduccion);
      return fechaItem === hoy;
    });

    console.log(producidasHoy.length)
  
    setTablasProducidasHoy(producidasHoy.length);
  }, [tablasProducidas]);




  return (
    <SectionLayout title="">

<div className="flex flex-wrap justify-center gap-6 mb-8">
      {/* Total Material Ingresado */}
    <TotalIncomeMaterial />
   
<TotalTableDevelop/>
 


    
    <ActiveCars />

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
