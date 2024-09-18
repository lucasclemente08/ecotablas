import React, { useState, useEffect } from "react";
import Home from "../home/Home";
import axios from "axios";
import PdfGenerator from "../../components/PdfGenerator";
const Areas = () => {
  const [modalAbierto, setModalAbierto] = useState(false);

  const [area, setArea] = useState([]);
  const abrirModal = () => {
    setModalAbierto(true);
  };

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(
        " http://www.trazabilidadodsapi.somee.com/api/Roles/ListarTodo",
      );
      setArea(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <>
      <div className="md:flex flex-row bg-slate-900">
        <Home />
        <div className="overflow-x-auto m-5">
          <div className="m-3">
            <h2 className="text-white text-3xl b-4">
              Áreas y turnos de trabajos
            </h2>

            <div className="mt-5">
              <button
                onClick={abrirModal}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-2 px-4 rounded"
              >
                Agregar area
              </button>
 <PdfGenerator />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr>
                    <th className="border-b-2 py-3 px-4 text-left text-gray-600">
                      Nombre
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {area.map((material) => (
                    <tr key={material.id} className="hover:bg-gray-100">
                      <td className="py-3 px-4">
                        {material.NombreRol}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Areas;
