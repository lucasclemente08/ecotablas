
import React, { useState } from 'react';
import { IoMdAlert } from "react-icons/io";
const ReportButton = () => {
  const [modalOpen, setModalOpen] = useState(false); // Controla la visibilidad del modal
  const [report, setReport] = useState({
    title: '',
    description: '',
    area: '',
    date: '',
  });
  const [message, setMessage] = useState('');

  // Maneja el cambio en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport({
      ...report,
      [name]: value,
    });
  };

  // Simula el envío del reporte
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!report.title || !report.description || !report.area || !report.date) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

    // Simula el envío del reporte (puedes reemplazar esto con una llamada a una API)
    console.log('Reporte enviado:', report);

    setMessage('¡Reporte enviado con éxito!');
    setModalOpen(false); // Cierra el modal después de enviar el reporte
  };

  return (
    <>
      {/* Botón para abrir el modal de reporte */}
<button
  onClick={() => setModalOpen(true)}
  className="bg-gradient-to-r bg-orange-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
>
  <div className="flex">

  Reportar un problema <IoMdAlert className="m-1" />
  </div>
</button>


      {/* Modal para el formulario del reporte */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-indigo-600 mb-4">Generar un reporte</h2>
            {message && <p className="mb-4 text-red-500">{message}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="title">
                  Título
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Título del reporte"
                  value={report.title}
                  onChange={handleChange}
                  className="border border-indigo-300 rounded w-full py-2 px-3 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="description">
                  Descripción
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Describe el problema"
                  value={report.description}
                  onChange={handleChange}
                  className="border border-indigo-300 rounded w-full py-2 px-3 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Campo para elegir el área del error */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="area">
                  Área del problema
                </label>
                <select
                  name="area"
                  id="area"
                  value={report.area}
                  onChange={handleChange}
                  className="border border-indigo-300 rounded w-full py-2 px-3 focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Seleccione un área</option>
                  <option value="Lavado">Lavado de material</option>
                  <option value="materialTrit">trituración de material</option>
                  <option value="materialPro">Procesado de material</option>
                  <option value="CargaMat">Carga de material</option>
                </select>
              </div>

              {/* Campo para elegir la fecha */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="date">
                  Fecha del incidente
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={report.date}
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
        </div>
      )}
    </>
  );
};

export default ReportButton;
