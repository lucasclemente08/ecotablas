import React, { useEffect, useState } from "react";
import Home from "../home/Home";
import Tablas from "../plasticos/plasticos";

import axios from "axios";
import SectionLayout from "../../layout/SectionLayout";

function Material() {
  const [plasticos, setPlasticos] = useState([]);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(
        "http://www.trazabilidadodsapi.somee.com/api/TiposPlastico/ListarTodo",
      );
      setPlasticos(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);
  return (
    <SectionLayout title="Plásticos">
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
            {plasticos.map((material) => (
              <tr key={material.id} className="hover:bg-gray-100">
                <td className="border-b py-3 px-4">{material.TipoPlastico}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionLayout>
  );
}

export default Material;
