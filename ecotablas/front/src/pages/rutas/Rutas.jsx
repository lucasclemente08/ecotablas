import React, { useState, useEffect } from "react";
import RouteFormModal from "../../components/ModalRutas";
import MapComponent from "../../components/MapComponent";
import SectionLayout from "../../layout/SectionLayout";
import { getRoutes, createRoute, getRoutePoints } from "../../api/RutasAPI";

const Rutas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routePoints, setRoutePoints] = useState([]);

  // Cargar rutas al iniciar
  useEffect(() => {
    const fetchRoutes = async () => {
      const data = await getRoutes();
      setRoutes(data);
    };
    fetchRoutes();
  }, []);

  // Cargar puntos de la ruta seleccionada
  useEffect(() => {
    if (selectedRoute) {
      const fetchPoints = async () => {
        const points = await getRoutePoints(selectedRoute.IdRuta);
        setRoutePoints(points);
      };
      fetchPoints();
    }
  }, [selectedRoute]);

  const handleSaveRoute = async (route) => {
    const newRoute = await createRoute(route);
    setRoutes([...routes, newRoute]);
  };

  return (
    <SectionLayout>
    <div>
      <h1>Rutas y Empleados</h1>
      <button onClick={() => setIsModalOpen(true)}>Agregar Ruta</button>
      <RouteFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRoute}
      />

      <h2>Rutas Disponibles</h2>
      <ul>
        {routes.map((route) => (
          <li key={route.IdRuta} onClick={() => setSelectedRoute(route)}>
             <strong>{route.Nombre}</strong> - {new Date(route.Fecha).toLocaleDateString()}
          </li>
        ))}
      </ul>

      {selectedRoute && (
        <div>
          <h3>Puntos de la Ruta: {selectedRoute.Nombre}</h3>
          <MapComponent points={routePoints} />
        </div>
      )}
    </div>
    </SectionLayout>
  );
};

export default Rutas;
