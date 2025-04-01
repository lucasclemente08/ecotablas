import React, { useState, useEffect } from "react";
import { getEmpleados, assignEmployeesToRoute } from "../api/RutasAPI";
import axios from "axios";
import { toast } from "sonner";

const ModifyEmployeesModal = ({
  isOpen,
  onClose,
  routeId,
  onModifyEmployees,
}) => {
  const [empleados, setEmpleados] = useState([]);
  const [selectedEmpleados, setSelectedEmpleados] = useState([]);
  const [empleadosR, setEmpleadosR] = useState([]);

  // Cargar empleados al abrir el modal
  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await getEmpleados();
        setEmpleados(response.data); // Ajusta según la respuesta de tu API
      } catch (error) {
        console.error("Error al cargar los empleados:", error);
        toast.error("Hubo un error al cargar los empleados.");
      }
    };
    fetchEmpleados();
  }, []);

  useEffect(() => {
    if (isOpen && routeId) {
      const fetchAssignedEmployees = async () => {
        try {
          const response = await axios.get(
            `http://www.ecotablasapi.somee.com/api/RutaxEmpleados/ListarPorId/${routeId}`,
          );
          const assigned = response.data || [];
          setSelectedEmpleados(assigned.map((emp) => emp.IdEmpleado)); // Actualizar empleados seleccionados
          setEmpleadosR(assigned); // Actualizar empleadosR
        } catch (error) {
          console.error("Error al cargar los empleados asignados:", error);
          toast.error("Hubo un problema al cargar los empleados asignados.");
        }
      };
      fetchAssignedEmployees();
    }
  }, [isOpen, routeId]);

  // Reiniciar estados al cerrar el modal
  useEffect(() => {
    if (!isOpen) {
      setSelectedEmpleados([]);
      setEmpleadosR([]);
    }
  }, [isOpen]);

  // Maneja la selección/deselección de empleados
  const handleCheckboxChange = (idEmpleado) => {
    // Actualizar la lista de empleados seleccionados
    if (selectedEmpleados.includes(idEmpleado)) {
      // Si el empleado ya está seleccionado, lo deseleccionamos
      setSelectedEmpleados(selectedEmpleados.filter((id) => id !== idEmpleado));
    } else {
      // Si el empleado no está seleccionado, lo agregamos
      setSelectedEmpleados([...selectedEmpleados, idEmpleado]);
    }

    // Actualizar el array empleadosR
    setEmpleadosR((prevEmpleadosR) => {
      // Si el empleado ya está en empleadosR, lo eliminamos
      if (prevEmpleadosR.some((emp) => emp.IdEmpleado === idEmpleado)) {
        return prevEmpleadosR.filter((emp) => emp.IdEmpleado !== idEmpleado);
      } else {
        // Si el empleado no está en empleadosR, lo agregamos
        return [...prevEmpleadosR, { IdRuta: routeId, IdEmpleado: idEmpleado }];
      }
    });
  };
  // Eliminar empleados actuales antes de asignar nuevos
  const deleteCurrentEmployees = async () => {
    try {
      await axios.delete(
        `http://www.ecotablasapi.somee.com/api/RutaxEmpleados/Delete/${routeId}`,
      );
    } catch (error) {
      console.error("Error al eliminar empleados actuales:", error);
    }
  };

  // Maneja el guardado de empleados asignados
  const handleSave = async () => {
    if (selectedEmpleados.length === 0) {
      toast.error("Por favor, selecciona al menos un empleado.");
      return;
    }

    try {
      // Eliminar empleados actuales
      await deleteCurrentEmployees();

      // Asignar nuevos empleados
      for (const empleadoRt of empleadosR) {
        await axios.post(
          "http://www.ecotablasapi.somee.com/api/RutaxEmpleados/Insertar",
          empleadoRt,
        );
      }

      // Notificar al componente padre con los empleados actualizados
      onModifyEmployees(empleadosR);

      // Cerrar el modal
      onClose();
    } catch (error) {
      console.error("Error al modificar empleados:", error);
      toast.error("Hubo un problema al modificar los empleados.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Modificar Empleados
        </h2>

        {/* Lista de empleados */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Selecciona los empleados:
          </h3>
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
                <span className="text-sm text-gray-600">
                  {empleado.Nombre} {empleado.Apellido} ({empleado.DNI})
                </span>
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
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyEmployeesModal;
