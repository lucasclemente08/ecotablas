import React from "react";
import SectionLayout from "../../layout/SectionLayout";
import MaquinariaChart from "../../components/graficos/MaquinariaChart";
import DonantesChart from "../../components/graficos/donantesChart";
import GastoVehiculoChart from "../../components/graficos/GastoVehiculosChart"

const Estadisticas = () => {
  return (
    <SectionLayout title="">
      {/* <div className="flex flex-wrap justify-center items-start gap-6"> */}
        {/* Gráfico de Maquinaria */}
        {/* <div className="flex-1 min-w-[300px] max-w-[500px] p-4 bg-gray-800 shadow-md rounded-md">
          <h2 className="text-lg font-medium text-white text-center mb-4">
            Maquinaria
          </h2>
          <div className="h-[370px]">
            <MaquinariaChart  className="h-96"/>
          </div>
        </div> */}

        {/* Gráfico de Donantes */}
        {/* <div className="flex-1 min-w-[300px] max-w-[500px] p-4 bg-gray-800 shadow-md rounded-md">
          <h2 className="text-lg font-medium text-white text-center mb-4">
            Donantes
          </h2>
          <div className="h-[370px]">
            <DonantesChart />
          </div>
        </div> */}

        {/* Gráfico de Gastos de Vehículos */}
        {/* <div className="flex-1 min-w-[300px] max-w-[500px] p-4 bg-gray-800 shadow-md rounded-md">
          <h2 className="text-lg font-medium text-white text-center mb-4">
            Gastos de Vehículos
          </h2>
          <div className="h-[370px]">
        <GastoVehiculoChart />
          </div>
        </div>
      </div> */}
    </SectionLayout>
  );
};

export default Estadisticas;
