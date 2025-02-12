import React, { useState, useEffect } from "react";
import RouteFormModal from "../../components/ModalRutas";
import MapComponent from "../../components/MapComponent";
import SectionLayout from "../../layout/SectionLayout";
import { getRoutes, createRoute, getRoutePoints } from "../../api/RutasAPI";
import AddButtonWa from "../../components/buttons/AddButtonWa";

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


  const abrirModal = () => {
    setIsModalOpen(true);
  }
    
  return (
    <SectionLayout title={"Rutas y Empleados"}>

   

  <AddButtonWa
   abrirModal ={abrirModal}
    title={"Agregar Ruta"}
  />
    

  <RouteFormModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onSave={handleSaveRoute}
  />

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


  {selectedRoute && (
    <div className="mt-6 p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold text-gray-800">
        Puntos de la Ruta: {selectedRoute.Nombre}
      </h3>
      

    </div>
  )}
<div className="mt-4">
        <MapComponent points={routePoints} />
      </div>
    </SectionLayout>
  );
};

export default Rutas;
