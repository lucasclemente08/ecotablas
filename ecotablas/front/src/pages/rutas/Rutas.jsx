import React, { useState, useEffect } from "react";
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

const Rutas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPointsModalOpen, setIsAddPointsModalOpen] = useState(false);
  const [isAssignEmployeesModalOpen, setIsAssignEmployeesModalOpen] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute,setSelectedRoute] = useState(null);
  const [routePoints, setRoutePoints] = useState([]);
  const [newRouteId, setNewRouteId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);;

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
      // Crear la ruta
      await createRoute(route);
      console.log("Ruta creada exitosamente");
  
      // Obtener todas las rutas y buscar la más reciente
      const { data: rutas } = await getRoutes();
  
      // Encontrar la última ruta (suponiendo que el ID es incremental)
      const newRoute = rutas.reduce((latest, current) =>
        current.Fecha > latest.Fecha ? current : latest
      );
  
      if (newRoute?.IdRuta) {
        setNewRouteId(newRoute.IdRuta);
        console.log("ID de la nueva ruta:", newRoute.IdRuta);
      } else {
        console.warn("No se encontró la nueva ruta.");
      }
  
      setIsModalOpen(false);
      setIsAddPointsModalOpen(true);
  
    } catch (error) {
      console.error("Error al crear la ruta:", error);
      alert("Hubo un error al crear la ruta. Por favor, inténtalo de nuevo.");
    }
  };

  // Maneja el guardado de puntos
  const handleSavePoints = async (points) => {
    console.log("Puntos guardados exitosamente:", points);
    try {
      await saveRoutePoints(points);
      setIsAddPointsModalOpen(false);
      setIsAssignEmployeesModalOpen(true);

    } catch (error) {
      console.error("Error al guardar los puntos:", error);
      alert("Hubo un error al guardar los puntos. Por favor, inténtalo de nuevo.");
    }
  };

  // Maneja la asignación de empleados
  const handleAssignEmployees = async (empleados) => {
    try {
      await assignEmployeesToRoute(newRouteId, empleados);
      setIsAssignEmployeesModalOpen(false);
      setNewRouteId(null);
      alert("Ruta creada exitosamente.");
    } catch (error) {
      console.error("Error al asignar empleados:", error);
      alert("Hubo un error al asignar empleados. Por favor, inténtalo de nuevo.");
    }
  };
  const handleRouteClick = (route) => {
    // When selecting a route, set the date without the time component.
    const date = new Date(route.Fecha);
    // Remove the time part by setting it to midnight (00:00:00).
    date.setHours(0, 0, 0, 0);
    setSelectedDate(date.toISOString().split('T')[0]);
  };
  
  useEffect(() => {
    if (selectedDate) {
      const selectedDateObj = new Date(selectedDate);
      selectedDateObj.setDate(selectedDateObj.getDate() - 1); // Subtract one day
      selectedDateObj.setHours(0, 0, 0, 0); // Ensure no time component
  
      const filtered = routes.filter((route) => {
        const routeDate = new Date(route.Fecha);
        routeDate.setHours(0, 0, 0, 0); // Set route date to midnight (00:00:00)
        return routeDate.getTime() === selectedDateObj.getTime(); // Compare dates ignoring time
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
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRoute}
      />

      {/* Modal de agregar puntos */}
      <AddPointsModal
        isOpen={isAddPointsModalOpen}
        onClose={() => setIsAddPointsModalOpen(false)}
        routeId={newRouteId}
        onSavePoints={handleSavePoints}
      />

    
        <AssignEmployeesModal
          isOpen={isAssignEmployeesModalOpen}
          onClose={() => setIsAssignEmployeesModalOpen(false)}
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