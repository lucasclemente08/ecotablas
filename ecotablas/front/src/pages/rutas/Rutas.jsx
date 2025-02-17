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
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routePoints, setRoutePoints] = useState([]);
  const [newRouteId, setNewRouteId] = useState(null);

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
        setRoutePoints(points.data); 
      };
      fetchPoints();
    }
  }, [selectedRoute]);

  // Maneja la creación de la ruta
  const handleSaveRoute = async (route) => {
    try {
      const newRoute = await createRoute(route);
      setNewRouteId(newRoute.data.IdRuta); 
      setIsModalOpen(false);
      setIsAddPointsModalOpen(true);
    } catch (error) {
      console.error("Error al crear la ruta:", error);
      alert("Hubo un error al crear la ruta. Por favor, inténtalo de nuevo.");
    }
  };

  // Maneja el guardado de puntos
  const handleSavePoints = async (points) => {
    try {
      await saveRoutePoints(newRouteId, points);
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

      {/* Modal de asignar empleados */}
      <AssignEmployeesModal
        isOpen={isAssignEmployeesModalOpen}
        onClose={() => setIsAssignEmployeesModalOpen(false)}
        routeId={newRouteId}
        onAssignEmployees={handleAssignEmployees}
      />

      {/* Lista de rutas disponibles */}
      <h2 className="text-xl font-semibold mt-6 text-gray-400">Rutas Disponibles</h2>
      <ul className="mt-4 grid grid-cols-5 md:grid-cols-4 gap-4">
        {routes.map((route) => (
          <li
            key={route.IdRuta}
            onClick={() => setSelectedRoute(route)}
            className="cursor-pointer border border-gray-300 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">{route.Nombre}</h3>
            <p className="text-sm text-gray-600">
              {new Date(route.Fecha).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>

      {/* Detalles de la ruta seleccionada */}
      {selectedRoute && (
        <div className="mt-6 p-4 border rounded-lg shadow-md bg-white">
          <h3 className="text-lg font-semibold text-gray-800">
            Puntos de la Ruta: {selectedRoute.Nombre}
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