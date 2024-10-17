import React, { useState, useEffect } from "react";
import axios from "axios"; // Importa axios
import Home from "../home/Home";
import AddButton from "../../components/buttons/addButton";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import SectionLayout from "../../layout/SectionLayout";
import Modal from "../../components/Modal";

const API_URL = "http://localhost:61274/api/EmpresasDonantes/ListarTodo"; // Reemplaza con la URL de tu API

const EmpresaDonante = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [empresasDonantes, setEmpresasDonantes] = useState([]);
  const [currentEmpresa, setCurrentEmpresa] = useState(null);

  useEffect(() => {
    const fetchEmpresasDonantes = async () => {
      try {
        const response = await axios.get(API_URL);
        setEmpresasDonantes(response.data);
      } catch (error) {
        console.error("Error al cargar las empresas donantes:", error);
      }
    };

    fetchEmpresasDonantes();
  }, []); // Solo se ejecuta una vez al montar el componente

  const abrirModal = (empresa = null) => {
    setCurrentEmpresa(empresa);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setCurrentEmpresa(null);
    setModalAbierto(false);
  };

  const handleSave = async (empresa) => {
    if (empresa.id) {
      // Editar empresa existente
      try {
        await axios.put(`${API_URL}/${empresa.id}`, empresa); // Actualiza en la API
        setEmpresasDonantes((prev) =>
          prev.map((e) => (e.id === empresa.id ? empresa : e))
        );
      } catch (error) {
        console.error("Error al actualizar la empresa:", error);
      }
    } else {
      // Añadir nueva empresa
      try {
        const response = await axios.post(API_URL, empresa); // Crea en la API
        setEmpresasDonantes((prev) => [...prev, { ...empresa, id: response.data.id }]);
      } catch (error) {
        console.error("Error al añadir la empresa:", error);
      }
    }
    cerrarModal();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`); // Elimina de la API
      setEmpresasDonantes((prev) => prev.filter((empresa) => empresa.id !== id));
    } catch (error) {
      console.error("Error al eliminar la empresa:", error);
    }
  };

  const columns = [
    { header: "Nombre", dataKey: "nombre" },
    { header: "Dirección", dataKey: "direccion" },
    { header: "Teléfono", dataKey: "telefono" },
    { header: "Email", dataKey: "email" },
    { header: "Tipo Plástico", dataKey: "tipoPlastico" },
    { header: "Rubro", dataKey: "rubro" },
    { header: "Donaciones Disponibles", dataKey: "donacionesDisponibles" },
    { header: "Web", dataKey: "web" },
    { header: "CUIT", dataKey: "cuit" },
  ];

  const titles = [
    "Nombre",
    "Dirección",
    "Teléfono",
    "Email",
    "Tipo Plástico",
    "Rubro",
    // "Donaciones Disponibles",
    "Web",
    "Acciones",
  ];

  return (
    <>
      <SectionLayout title="Empresa donantes">
        <AddButton abrirModal={() => abrirModal()} title={"Añadir empresa donante"} />
        <PdfGenerator
          columns={columns}
          data={empresasDonantes}
          title="Reporte de empresas donantes"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <TablaHead titles={titles} />
            <tbody className="overflow-y-auto">
              {empresasDonantes.map((empresa) => (
                <tr key={empresa.id} className="hover:bg-gray-100">
                  <td className="border-b py-3 px-4">{empresa.Nombre}</td>
                  <td className="border-b py-3 px-4">{empresa.Direccion}</td>
                  <td className="border-b py-3 px-4">{empresa.Telefono}</td>
                  <td className="border-b py-3 px-4">{empresa.Email}</td>
                  <td className="border-b py-3 px-4">{empresa.TipoPlastico}</td>
                  <td className="border-b py-3 px-4">{empresa.Rubro}</td>
                  {/* <td className="border-b py-3 px-4">{empresa.DonacionesDisponibles}</td> */}
                  <td className="border-b py-3 px-4">
                    <a
                      href={empresa.Web}
                      className="text-blue-600 hover:underline"
                    >
                      {empresa.Web}
                    </a>
                  </td>
                  <td className="border-b py-3 px-4 flex justify-center">
                    <button
                      onClick={() => abrirModal(empresa)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Modificar
                    </button>
                    <DeleteButton onClick={() => handleDelete(empresa.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionLayout>

      {/* Modal para agregar/editar empresas */}
      {modalAbierto && (
        <Modal 
          empresa={currentEmpresa}
          onClose={cerrarModal}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default EmpresaDonante;
