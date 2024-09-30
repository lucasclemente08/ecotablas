import React, { useState, useEffect } from "react";
import Home from "../home/Home";
import AddButton from "../../components/buttons/AddButton";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import SectionLayout from "../../layout/SectionLayout";

const EmpresaDonante = () => {
  const [modalAbierto, setModalAbierto] = useState(false);

  const [EmpresaDonante, setEmpresaDonante] = useState([]);
  const empresasDonantes = [
    {
      id: 1,
      cuit: "30-12345678-9",
      nombre: "Plásticos Argentinos S.A.",
      direccion: "Av. Corrientes 1234, Buenos Aires",
      telefono: "+54 11 4321 5678",
      email: "contacto@plasticosargentinos.com",
      tipoPlastico: "PET, PEAD",
      rubro: "Fabricación de envases plásticos",
      donacionesDisponibles: "Envases descartados, plásticos reciclables",
      web: "https://www.plasticosargentinos.com",
    },
    {
      id: 2,
      cuit: "30-87654321-0",
      nombre: "Reciclados del Sur",
      direccion: "Calle Falsa 742, La Plata, Buenos Aires",
      telefono: "+54 221 444 5555",
      email: "info@recicladosdelsur.com",
      tipoPlastico: "PVC, PP",
      rubro: "Reciclado de plásticos industriales",
      donacionesDisponibles:
        "Tubos de PVC, residuos industriales de polipropileno",
      web: "https://www.recicladosdelsur.com",
    },
  ];

  useEffect(() => {
    // Solo se ejecuta una vez o cuando las dependencias cambien
    setEmpresaDonante(empresasDonantes);
  }, []);

  const abrirModal = () => setModalAbierto(true);

  const handleEdit = (empresa) => {
    console.log("Edit:", empresa);
    // Implementar lógica para abrir modal de edición
  };

  const handleDelete = (id) => {
    console.log("Delete ID:", id);
    // Implementar lógica para eliminar la empresa
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

  const rows = empresasDonantes.map((empresa) => ({
    nombre: empresa.nombre,
    direccion: empresa.direccion,
    telefono: empresa.telefono,
    email: empresa.email,
    tipoPlastico: empresa.tipoPlastico,
    rubro: empresa.rubro,
    donacionesDisponibles: empresa.donacionesDisponibles,
    web: empresa.web,
    cuit: empresa.cuit,
  }));

  const titles = [
    "Nombre",
    "Dirección",
    "Teléfono",
    "Email",
    "Tipo Plástico",
    "Rubro",
    "Donaciones Disponibles",
    "Web",
    "Acciones",
  ];

  return (
    <>
     <SectionLayout title="Empresa donantes">

          <AddButton abrirModal={abrirModal} title={"Añadir empresa donante"} />
          <PdfGenerator
            columns={columns}
            data={empresasDonantes}
            title="Reporte de empresas donantes"
          />
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <TablaHead titles={titles} />

              <tbody>
                {empresasDonantes.map((empresa) => (
                  <tr key={empresa.id} className="hover:bg-gray-100">
                    <td className="border-b py-3 px-4">{empresa.nombre}</td>
                    <td className="border-b py-3 px-4">{empresa.direccion}</td>
                    <td className="border-b py-3 px-4">{empresa.telefono}</td>
                    <td className="border-b py-3 px-4">{empresa.email}</td>
                    <td className="border-b py-3 px-4">
                      {empresa.tipoPlastico}
                    </td>
                    <td className="border-b py-3 px-4">{empresa.rubro}</td>
                    <td className="border-b py-3 px-4">
                      {empresa.donacionesDisponibles}
                    </td>
                    <td className="border-b py-3 px-4">
                      <a
                        href={empresa.web}
                        className="text-blue-600 hover:underline"
                      >
                        {empresa.web}
                      </a>
                    </td>
                    <td className="border-b py-3 px-4 flex justify-center">
                      <button
                        onClick={() => handleEdit(empresa)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Modificar
                      </button>
                      <DeleteButton />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </SectionLayout>
    </>
  );
};

export default EmpresaDonante;
