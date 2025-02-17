import React, { useState, useEffect } from "react";
import { getEmpleados, assignEmployeesToRoute } from "../api/RutasAPI";

const AssignEmployeesModal = ({ isOpen, onClose, routeId, onAssignEmployees }) => {
  const [empleados, setEmpleados] = useState([]);
  const [selectedEmpleados, setSelectedEmpleados] = useState([]);

  // Cargar empleados al abrir el modal
  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await getEmpleados();
        setEmpleados(response.data); // Ajusta según la respuesta de tu API
      } catch (error) {
        console.error("Error al cargar los empleados:", error);
        alert("Hubo un error al cargar los empleados. Por favor, inténtalo de nuevo.");
      }
    };
    fetchEmpleados();
  }, []);

  // Maneja la selección/deselección de empleados
  const handleCheckboxChange = (idEmpleado) => {
    if (selectedEmpleados.includes(idEmpleado)) {
      setSelectedEmpleados(selectedEmpleados.filter((id) => id !== idEmpleado));
    } else {
      setSelectedEmpleados([...selectedEmpleados, idEmpleado]);
    }
  };

  // Maneja el guardado de empleados asignados
  const handleSave = async () => {
    if (selectedEmpleados.length === 0) {
      alert("Por favor, selecciona al menos un empleado.");
      return;
    }

    try {
      // Asigna los empleados a la ruta en el backend
      await assignEmployeesToRoute(routeId, selectedEmpleados);
      onAssignEmployees(selectedEmpleados); // Notifica al componente padre
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al asignar empleados:", error);
      alert("Hubo un error al asignar empleados. Por favor, inténtalo de nuevo.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Asignar Empleados</h2>

        {/* Lista de empleados */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Selecciona los empleados:</h3>
          <ul className="mt-2">
            {empleados.map((empleado) => (
              <li key={empleado.IdEmpleado} className="flex items-center mt-2">
                <input
                  type="checkbox"
                  value={empleado.IdEmpleado}
                  checked={selectedEmpleados.includes(empleado.IdEmpleado)}
                  onChange={() => handleCheckboxChange(empleado.IdEmpleado)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">{empleado.Nombre}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignEmployeesModal;