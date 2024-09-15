import React from "react";
import Home from "../home/Home";
import VolumenChart from "../../components/VolumenChart";

const Volumen = () => {
  return (
    <div className="md:flex flex-row bg-slate-900">
      <Home />
      <div className="p-4 flex-1">
        <h2 className="text-2xl font-bold text-white mb-4">
          Gráfico de Volumen
        </h2>

        {}
        <VolumenChart />

        {}
      </div>
    </div>
  );
};

export default Volumen;
