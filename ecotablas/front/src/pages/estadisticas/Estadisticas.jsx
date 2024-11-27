import React, { useState, useEffect } from "react";
import SectionLayout from "../../layout/SectionLayout";
import MaquinariaChart from "../../components/graficos/MaquinariaChart";
import DonantesChart from "../../components/graficos/DonantesChart";
import GastoVehiculoChart from "../../components/graficos/GastoVehiculosChart";
import GastoMaquinariaChart from "../../components/graficos/GastoMaquinariaChart";
import { getAllTablas } from "../../api/TablasProducidaAPI";
const Estadisticas = () => {
  // Estados para almacenar los totales de las API
  const [tablasProducidas, setTablasProducidas] = useState(0);
  const [materialIngresado, setMaterialIngresado] = useState(0);

  useEffect(() => {
    // Obtener los totales de las API
getAllTablas()
    // Obtener total de Tablas Producidas
    fetch('/api/tablas-producidas')
      .then(response => response.json())
      .then(data => {
        // Asumimos que la respuesta tiene un campo `total` con el valor
        setTablasProducidas(data.total);
      })
      .catch(error => console.error('Error fetching tablas producidas:', error));

    // Obtener total de Material Ingresado
    fetch('/api/material-ingresado')
      .then(response => response.json())
      .then(data => {
        // Asumimos que la respuesta tiene un campo `total` con el valor
        setMaterialIngresado(data.total);
      })
      .catch(error => console.error('Error fetching material ingresado:', error));
  }, []);

  return (
    <SectionLayout title="Estadísticas">
      <div className="flex flex-wrap justify-center items-start gap-6">




        {/* Maquinaria Chart */}
        <div className="flex-1 min-w-[300px] max-w-[500px] p-4 bg-gray-800 shadow-md rounded-md">
          <h2 className="text-lg font-medium text-white text-center mb-4">Maquinaria</h2>
          <div className="h-[400px]">
            <MaquinariaChart className="h-full" />
          </div>
        </div>

        {/* Donantes Chart */}
        <div className="flex-1 min-w-[400px] max-w-[300px] p-4 bg-gray-800 shadow-md rounded-md">
          <h2 className="text-lg font-medium text-white text-center mb-4">Donantes</h2>
          <div className="h-[400px]">
            <DonantesChart className="h-full" />
          </div>
        </div>

        {/* Gasto Maquinaria Chart */}
        <div className="flex-1 min-w-[300px] max-w-[500px] p-4 bg-gray-800 shadow-md rounded-md">
          <h2 className="text-lg font-medium text-white text-center mb-4">Gastos de Maquinaria</h2>
          <div className="h-[400px]">
            <GastoMaquinariaChart className="h-full" />
          </div>
        </div>

        {/* Gasto Vehículos Chart */}
        <div className="flex-1 min-w-[300px] max-w-[500px] p-4 bg-gray-800 shadow-md rounded-md">
          <h2 className="text-lg font-medium text-white text-center mb-4">Gastos de Vehículos</h2>
          <div className="h-[400px]">
            <GastoVehiculoChart className="h-full" />
          </div>
        </div>

      </div>

      {/* Totales de Tablas Producidas y Material Ingresado */}
      <div className="flex flex-wrap justify-center gap-6 mt-8">
      <div className="flex-1 min-w-[300px] max-w-[500px] p-4 bg-gray-800 shadow-md rounded-md">
          <h2 className="text-lg font-medium text-white text-center mb-4">Totales Material Ingresado hoy</h2>
          <div className="text-white text-center">
            <p className="text-xl font-semibold">{7590}kgs</p>
          </div>
        </div>

        {/* Total Tablas Producidas */}

      <div className="flex-1 flex flex-col min-w-[300px] max-w-[500px] p-4 bg-gray-800 shadow-md rounded-md">
    
    
          <h2 className="text-lg font-medium text-white text-center mb-4">Totales Tablas Producidas hoy:</h2>
      {/* <img width="40" height="40" src="https://img.icons8.com/office/40/wood.png" alt="wood"/> */}
          <div className="text-white text-center">


            <p className="text-xl font-semibold">{7} </p>
          </div>
        </div>

        {/* Total Material Ingresado */}
     

      </div>
    </SectionLayout>
  );
};

export default Estadisticas;
