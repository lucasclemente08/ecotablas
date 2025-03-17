import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalRutas from "../../components/ModalRutas";
import AddPointsModal from "../../components/AddPointsModal";
import AssignEmployeesModal from "../../components/AssignEmployeesModal";
import ModifyEmployeesModal from "../../components/ModifyEmployeesModal";
import ModifyPointsModal from "../../components/ModifyPointsModal"; 
import MapComponent from "../../components/MapComponent";
import {
  getRoutes,
  createRoute,
  getRoutePoints,
  saveRoutePoints,
  assignEmployeesToRoute,
} from "../../api/RutasAPI";
import AddButtonWa from "../../components/buttons/AddButtonWa";
import SectionLayout from "../../layout/SectionLayout";
import { toast } from "sonner"; // Importar toast para mostrar mensajes

const Rutas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPointsModalOpen, setIsAddPointsModalOpen] = useState(false);
  const [isAssignEmployeesModalOpen, setIsAssignEmployeesModalOpen] = useState(false);
  const [isModifyEmployeesModalOpen, setIsModifyEmployeesModalOpen] = useState(false);
  const [isModifyPointsModalOpen, setIsModifyPointsModalOpen] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [assignedEmployees, setAssignedEmployees] = useState([]); 
  const [empleados, setEmpleados] = useState([]);
  const [routePoints, setRoutePoints] = useState([]);
  const [newRouteId, setNewRouteId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  // Cargar rutas al iniciar
  useEffect(() => {
    const fetchRoutes = async () => {
      const data = await getRoutes();
      setRoutes(data.data); // Ajusta según la respuesta de tu API
    };
    fetchRoutes();
  }, []);

  // Cargar puntos de la ruta seleccionada
  useEffect(() => {
    if (selectedRoute) {
      const fetchPoints = async () => {
        const points = await getRoutePoints(selectedRoute.IdRuta);
        setRoutePoints(points.data || []); // Ajusta según la respuesta de tu API
      };
      fetchPoints();
    }
  }, [selectedRoute]);

  useEffect(() => {
    const fetchEmpleados = async () => {
      const response = await axios.get("http://www.ecotablasapi.somee.com/api/Empleados/ListarTodo");
      setEmpleados(response.data || []);
    };
    fetchEmpleados();
  }, []);
  const getNombreEmpleado = (idEmpleado) => {
    const empleado = empleados.find((e) => e.IdEmpleado === idEmpleado);
    return empleado ? `${empleado.Nombre} ${empleado.Apellido} (${empleado.DNI})` : "Desconocido";
  };
  {assignedEmployees.map((empleado) => (
    <li key={empleado.IdEmpleado} className="text-gray-600">
      {getNombreEmpleado(empleado.IdEmpleado)}
    </li>
  ))}
  const handleSaveRoute = async (route) => {
    try {
      // Crear la ruta en el backend
      const response = await axios.post("http://www.ecotablasapi.somee.com/api/Rutas/Insertar", route);
      console.log("Ruta creada exitosamente");
  
      // Obtener el IdRuta de la respuesta
      const idRuta = response.data.IdRuta;
      setNewRouteId(idRuta); // Guardar el ID de la ruta
      console.log("ID de la nueva ruta:", idRuta);
  
      // Cerrar el modal de creación de ruta y abrir el modal de agregar puntos
      setIsModalOpen(false);
      setIsAddPointsModalOpen(true);
  
    } catch (error) {
      console.error("Error al crear la ruta:", error);
      alert("Hubo un error al crear la ruta. Por favor, inténtalo de nuevo.");
    }
  };
  // Maneja el guardado de puntos
  const handleSavePoints = async (points) => {
    console.log("Puntos a guardar:", points);
  
    try {
      // Enviar los puntos uno por uno
      for (const punto of points) {
        await axios.post("http://www.ecotablasapi.somee.com/api/PuntosRuta/Insertar", punto);
       
      }
      toast.success("Punto guardado exitosamente.");
      // Cerrar el modal de agregar puntos
      setIsAddPointsModalOpen(false);
     
      // Abrir el modal de asignar empleados
      setIsAssignEmployeesModalOpen(true);
  
    } catch (error) {
      console.error("Error al guardar los puntos:", error);
      toast.error("Hubo un problema al guardar los puntos.");
    }
  };

  const handleModifyPoints = async (points) => {
    try {
      setRoutePoints(points); // Actualizar la lista de puntos
      setIsModifyPointsModalOpen(false); // Cerrar el modal
      toast.success("Puntos modificados correctamente.");
    } catch (error) {
      console.error("Error al modificar puntos:", error);
      toast.error("Hubo un problema al modificar los puntos.");
    }
  };
  // Maneja la asignación de empleados
  const handleAssignEmployees = async (empleadosR) => {
    console.log("Empleados a guardarr", empleadosR);
    try {
      setIsAssignEmployeesModalOpen(false);

      toast.success("Empleado asignado exitosamente.");
      setNewRouteId(null);

      

      window.location.reload();

    } catch (error) {
      console.error("Error al asignar empleados:", error);
      alert("Hubo un error al asignar empleados. Por favor, inténtalo de nuevo.");
    }
  };

  const handleModifyEmployees = async (empleadosR) => {
    console.log("Empleados a guardarr", empleadosR);
    try {
      // Actualizar el estado de empleados asignados
      setAssignedEmployees(empleadosR);
  
      // Cerrar el modal
      setIsModifyEmployeesModalOpen(false);
  
      toast.success("Empleados modificados correctamente.");
    } catch (error) {
      console.error("Error al modificar empleados:", error);
      toast.error("Hubo un problema al modificar los empleados.");
    }
  };
  const handleDeleteRoute = async () => {
    if (!selectedRoute) return;

    try {
      // Eliminar la ruta (esto debería activar la eliminación en cascada en la BD)
      await axios.delete(`http://www.ecotablasapi.somee.com/api/Rutas/Delete/${selectedRoute.IdRuta}`);
      toast.success("Ruta eliminada correctamente.");

      // Actualizar la lista de rutas
      const updatedRoutes = routes.filter((route) => route.IdRuta !== selectedRoute.IdRuta);
      setRoutes(updatedRoutes);
      setFilteredRoutes(updatedRoutes);

      // Limpiar la ruta seleccionada
      setSelectedRoute(null);
      setRoutePoints([]);
      setAssignedEmployees([]);
    } catch (error) {
      console.error("Error al eliminar la ruta:", error);
      toast.error("Hubo un problema al eliminar la ruta.");
    }
  };


  const handleRouteClick = async (route) => {
    // Establecer la ruta seleccionada
    setSelectedRoute(route);
  
    try {
      // Obtener los puntos de la ruta usando ListarPorId
      const pointsResponse = await axios.get(`http://www.ecotablasapi.somee.com/api/PuntosRuta/ListarPorId/${route.IdRuta}`);
      setRoutePoints(pointsResponse.data || []);
      console.log(pointsResponse);
      // Obtener los empleados asignados usando ListarPorId
      const employeesResponse = await axios.get(`http://www.ecotablasapi.somee.com/api/RutaxEmpleados/ListarPorId/${route.IdRuta}`);
      setAssignedEmployees(employeesResponse.data || []);
      console.log("Empleados asignados:", employeesResponse.data);
    } catch (error) {
      console.error("Error al obtener datos de la ruta:", error);
      toast.error("Hubo un problema al cargar los datos de la ruta.");
    }
  };
  useEffect(() => {
    if (selectedDate) {
      const selectedDateObj = new Date(selectedDate);
      selectedDateObj.setDate(selectedDateObj.getDate() + 1); // Restar un día
      selectedDateObj.setHours(0, 0, 0, 0); // Asegurar que no haya componente de tiempo

      const filtered = routes.filter((route) => {
        const routeDate = new Date(route.Fecha);
        routeDate.setHours(0, 0, 0, 0); // Establecer la fecha de la ruta a medianoche (00:00:00)
        return routeDate.getTime() === selectedDateObj.getTime(); // Comparar fechas ignorando la hora
      });
      setFilteredRoutes(filtered);
    } else {
      setFilteredRoutes(routes);
    }
  }, [selectedDate, routes]);

  return (
    <SectionLayout title={"Rutas y Empleados"}>
      <AddButtonWa abrirModal={() => setIsModalOpen(true)} title={"Agregar Ruta"} />

      {/* Modal de creación de ruta */}
      <ModalRutas
        isOpen={isModalOpen}
        onClose={() => { 
          setIsModalOpen(false);
          setNewRouteId(null); // Reiniciar el ID de la ruta
          setSelectedRoute(null); // Reiniciar la ruta seleccionada
          setRoutePoints([]); // Reiniciar los puntos de la ruta
        }}
        onSave={handleSaveRoute}
      />

      {/* Modal de agregar puntos */}
      <AddPointsModal
        isOpen={isAddPointsModalOpen}
        onClose={() => {
          setIsAddPointsModalOpen(false);
          setRoutePoints([]); // Reiniciar los puntos de la ruta
        }}
        routeId={newRouteId}
        onSavePoints={handleSavePoints}
      />
            <ModifyPointsModal
        isOpen={isModifyPointsModalOpen}
        onClose={() => setIsModifyPointsModalOpen(false)}
        routeId={selectedRoute?.IdRuta}
        onModifyPoints={handleModifyPoints}
      />


      {/* Modal de asignar empleados */}
      <AssignEmployeesModal
        isOpen={isAssignEmployeesModalOpen}
        onClose={() => {
          setIsAssignEmployeesModalOpen(false);
          setNewRouteId(null); // Reiniciar el ID de la ruta
        }}
        routeId={newRouteId}
        onAssignEmployees={handleAssignEmployees}
      />

      <ModifyEmployeesModal
        isOpen={isModifyEmployeesModalOpen}
        onClose={() => setIsModifyEmployeesModalOpen(false)}
        routeId={selectedRoute?.IdRuta}
        onModifyEmployees={handleModifyEmployees}
      />

      <h2 className="text-xl font-semibold mt-6 text-gray-400">Rutas Disponibles</h2>

      <div className="mt-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm mb-4"
        />

        {selectedDate && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRoutes.map((route) => (
              <div
                key={route.IdRuta}
                className="p-4 border bg-slate-100 border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRouteClick(route)}
              >
                <h3 className="text-lg font-semibold text-gray-800">{route.NombreRuta}</h3>
                <p className="text-gray-600">{new Date(route.Fecha).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detalles de la ruta seleccionada */}
      {selectedRoute && (
        <div className="mt-6 p-4 border rounded-lg shadow-md bg-white">
          <h3 className="text-lg font-semibold text-gray-800">
            Puntos de la Ruta: {selectedRoute.NombreRuta}
          </h3>
          <div className="mt-4">
            <MapComponent points={routePoints} />
          </div>
          {/* Botón para modificar puntos */}
          <button
            onClick={() => setIsModifyPointsModalOpen(true)}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
          >
            Modificar Puntos
          </button>
          {/* Botón para eliminar ruta */}
          <button
            onClick={handleDeleteRoute}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
          >
            Eliminar Ruta
          </button>
                    {/* Mostrar empleados asignados */}
                    <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Empleados Asignados</h3>
            <ul className="mt-2">
              {assignedEmployees.map((empleado) => (
                <li key={empleado.IdEmpleado} className="text-gray-600">
                  {getNombreEmpleado(empleado.IdEmpleado)}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsModifyEmployeesModalOpen(true)}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
            >
              Modificar Empleados
            </button>
          </div>
        </div>
      )}
    </SectionLayout>
  );
};

export default Rutas;