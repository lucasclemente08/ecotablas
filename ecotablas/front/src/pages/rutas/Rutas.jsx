import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalRutas from "../../components/ModalRutas";
import AddPointsModal from "../../components/AddPointsModal";
import AssignEmployeesModal from "../../components/AssignEmployeesModal";
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
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
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

  const handleSaveRoute = async (route) => {
    try {
      // Crear la ruta en el backend
      const response = await axios.post("http://localhost:61274/api/Rutas/Insertar", route);
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
        await axios.post("http://localhost:61274/api/PuntosRuta/Insertar", punto);
        toast.success("Punto guardado exitosamente.");
      }
  
      // Cerrar el modal de agregar puntos
      setIsAddPointsModalOpen(false);
  
      // Abrir el modal de asignar empleados
      setIsAssignEmployeesModalOpen(true);
  
    } catch (error) {
      console.error("Error al guardar los puntos:", error);
      toast.error("Hubo un problema al guardar los puntos.");
    }
  };
  // Maneja la asignación de empleados
  const handleAssignEmployees = async (empleadosR) => {
    console.log("Empleados a guardarr", empleadosR);
    try {
      setIsAssignEmployeesModalOpen(false);
      setNewRouteId(null);

      toast.success("Ruta creada exitosamente.");

      window.location.reload();

    } catch (error) {
      console.error("Error al asignar empleados:", error);
      alert("Hubo un error al asignar empleados. Por favor, inténtalo de nuevo.");
    }
  };

  const handleRouteClick = (route) => {
    // Cuando se selecciona una ruta, establecer la fecha sin el componente de tiempo.
    const date = new Date(route.Fecha);
    // Eliminar la parte de la hora estableciéndola a medianoche (00:00:00).
    date.setHours(0, 0, 0, 0);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  useEffect(() => {
    if (selectedDate) {
      const selectedDateObj = new Date(selectedDate);
      selectedDateObj.setDate(selectedDateObj.getDate() - 1); // Restar un día
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
        </div>
      )}
    </SectionLayout>
  );
};

export default Rutas;