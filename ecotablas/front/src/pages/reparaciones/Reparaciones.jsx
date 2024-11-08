import React, { useEffect, useState } from "react";
import Home from "../home/Home";
import TablaHead from "../../components/Thead";
import LoadingTable from "../../components/LoadingTable";
import { getAllReparaciones } from "../../api/ReparacionesAPI"; // Asegúrate de que la API de reparaciones esté configurada correctamente

const Reparaciones = () => {
  const [reparaciones, setReparaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  const fetchReparaciones = async () => {
    setLoading(true);
    try {
      const res = await getAllReparaciones();
      setReparaciones(res.data);
    } catch (error) {
      setMensaje("Error al cargar las reparaciones.");
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReparaciones();
  }, []);

  const title = [
    "ID Maquinaria",
    "Detalle",
    "Fecha de Inicio",
    "Estado",
    "Costo",
  ];

  const rows = reparaciones.map((reparacion) => ({
    IdMaquinaria: reparacion.IdMaquinaria,
    Detalle: reparacion.Detalle,
    FechaInicio: reparacion.FechaInicio.slice(0, 10),
    IdEstadoReparacion: reparacion.IdEstadoReparacion,
    Costo: reparacion.Costo,
  }));

  return (
    <>
      <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Reparaciones</h2>
          {mensaje && (
            <div className="bg-blue-600 text-white py-2 px-4 rounded mb-4">
              {mensaje}
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <LoadingTable loading={loading} />
              <TablaHead titles={title} />
              <tbody>
                {rows.map((reparacion) => (
                  <tr key={reparacion.Id} className="hover:bg-gray-100">
                    <td className="border-b py-2 px-4">
                      {reparacion.IdMaquinaria}
                    </td>
                    <td className="border-b py-2 px-4">{reparacion.Detalle}</td>
                    <td className="border-b py-2 px-4">
                      {reparacion.FechaInicio}
                    </td>
                    <td className="border-b py-2 px-4">
                      {reparacion.IdEstadoReparacion}
                    </td>
                    <td className="border-b py-2 px-4">{reparacion.Costo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reparaciones;
