import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import AddButton from "../../components/buttons/AddButton";
import SectionLayout from "../../layout/SectionLayout";
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
      <SectionLayout>
        <div className="mt-5">
          {/* <AddButton abrirModal={abrirModal} title={" Añadir Area "} /> */}

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
                  <td className="py-3 px-4">{material.NombreRol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionLayout>
    </>
  );
};

export default Areas;
