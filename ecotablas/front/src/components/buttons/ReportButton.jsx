import React, { useState } from "react";
import { IoMdAlert } from "react-icons/io";
import { createPortal } from "react-dom";
import { Toaster, toast } from "sonner";

const ReportButton = ({ isOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [report, setReport] = useState({
    Titulo: "",
    Descripcion: "",
    Area: "",
    FechaIncidente: "",
    Estado: "Pendiente",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !report.Titulo ||
      !report.Descripcion ||
      !report.Area ||
      !report.FechaIncidente
    ) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }
    

    setMessage("¡Reporte enviado con éxito!");
   toast.success("Se ha enviado el reporte.");
    setTimeout(() => {
      setModalOpen(false);
      setMessage("");
      // Resetear el formulario
      setReport({
        Titulo: "",
        Descripcion: "",
        Area: "",
        FechaIncidente: "",
        Estado: "Pendiente",
      });
    }, 1000);
  };

  return (
    <>
    <Toaster />
      <button
        onClick={() => setModalOpen(true)}
        className="text-white text-center font-bold py-2 px-2 rounded-full"
      >
        <div className="flex items-center">
          <IoMdAlert className="text-lg m-1" />
          {isOpen && <span>Reportar un problema</span>}
        </div>
      </button>

      {modalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-96 relative">
              <h2 className="text-xl font-bold text-black mb-4">
                Generar un reporte
              </h2>
              {message && (
                <p className={`mb-4 ${message.includes("éxito") ? "text-green-500" : "text-red-500"}`}>
                  {message}
                </p>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="Titulo"
                  >
                    Título
                  </label>
                  <input
                    type="text"
                    name="Titulo"
                    id="Titulo"
                    placeholder="Título del reporte"
                    value={report.Titulo}
                    onChange={handleChange}
                    className="border border-indigo-300 rounded w-full py-2 px-3 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="Descripcion"
                  >
                    Descripción
                  </label>
                  <textarea
                    name="Descripcion"
                    id="Descripcion"
                    placeholder="Describe el problema"
                    value={report.Descripcion}
                    onChange={handleChange}
                    className="border border-indigo-300 rounded w-full py-2 px-3 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="Area"
                  >
                    Área del problema
                  </label>
                  <select
                    name="Area"
                    id="Area"
                    value={report.Area}
                    onChange={handleChange}
                    className="border border-indigo-300 rounded w-full py-2 px-3 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">Seleccione un área</option>
                    <option value="Lavado">Lavado de material</option>
                    <option value="materialTriturado">
                      Trituración de material
                    </option>
                    <option value="materialProcesado">
                      Procesado de material
                    </option>
                    <option value="CargaMaterial">Carga de material</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="FechaIncidente"
                  >
                    Fecha del incidente
                  </label>
                  <input
                    type="date"
                    name="FechaIncidente"
                    id="FechaIncidente"
                    value={report.FechaIncidente}
                    onChange={handleChange}
                    className="border border-indigo-300 rounded w-full py-2 px-3 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default ReportButton;