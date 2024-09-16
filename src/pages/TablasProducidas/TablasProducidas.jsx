import React from "react";
import Home from "../home/Home";
const TablasProducidas = () => {
  const data = [
    {
      ID_Tabla: 1,
      ID_Proceso: 101,
      FechaProduccion: "2023-09-12",
      Dimensiones: "10x20x5",
      Peso: 25.5,
      CodigoIdentificacion: "TAB123456",
    },
    {
      ID_Tabla: 2,
      ID_Proceso: 102,
      FechaProduccion: "2023-09-13",
      Dimensiones: "15x30x7",
      Peso: 30.7,
      CodigoIdentificacion: "TAB789012",
    },
    // Añadir más datos si es necesario
  ];

  return (
    <div className="md:flex flex-row bg-slate-900 min-h-screen">
        {" "}
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Tablas Producidas</h2>
        
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="border-b py-3 px-4">ID Tabla</th>
              <th className="border-b py-3 px-4">ID Proceso</th>
              <th className="border-b py-3 px-4">Fecha Producción</th>
              <th className="border-b py-3 px-4">Dimensiones</th>
              <th className="border-b py-3 px-4">Peso (kgs)</th>
              <th className="border-b py-3 px-4">Código Identificación</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.ID_Tabla} className="hover:bg-gray-100">
                <td className="border-b py-3 px-4">{item.ID_Tabla}</td>
                <td className="border-b py-3 px-4">{item.ID_Proceso}</td>
                <td className="border-b py-3 px-4">{item.FechaProduccion}</td>
                <td className="border-b py-3 px-4">{item.Dimensiones}</td>
                <td className="border-b py-3 px-4">{item.Peso} kgs</td>
                <td className="border-b py-3 px-4">{item.CodigoIdentificacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablasProducidas;
