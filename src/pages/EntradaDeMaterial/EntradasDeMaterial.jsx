import React from "react";
import Home from "../home/Home";
const EntradasDeMaterial = () => {
  return (
    <>
      <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">
            Entradas de Material
          </h2>
        </div>
      </div>
    </>
  );
};

export default EntradasDeMaterial;
