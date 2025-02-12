import React, { useState } from "react";
import MapComponent from "./MapComponent";
import { createRoute, saveRoutePoints } from "../api/RutasAPI";

const ModalRutas = ({ isOpen, onClose, onSave }) => {
  const [routeName, setRouteName] = useState("");
  const [routeDate, setRouteDate] = useState("");
  const [points, setPoints] = useState([]);

  const handleMapClick = (e) => {
    console.log("Coordenadas del clic:", e.latlng); // Verifica que se detecten los clics
    if (points.length < 5) {
      const { lat, lng } = e.latlng;
      const newPoint = {
        Longitud: lng,
        Latitud: lat,
        Orden: points.length + 1,
      };
      setPoints([...points, newPoint]);
    }
  };

  const handleSave = async () => {
    console.log("Puntos a guardar:", points); // Verifica los puntos antes de guardar
    const newRoute = await createRoute({ 
      NombreRuta: routeName, 
      Fecha: routeDate 
    });
    console.log("Ruta creada:", newRoute); // Verifica la ruta creada

    if (newRoute.IdRuta) {
      await saveRoutePoints(newRoute.IdRuta, points);
      console.log("Puntos guardados en PuntosRuta"); // Verifica que se guardaron los puntos
    }

    onSave(newRoute);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className={`fixed inset-0 z-10 flex items-center justify-center ${isOpen ? "visible" : "invisible"}`}>
      {/* Fondo oscuro semi-transparente */}
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
  
      {/* Contenedor del modal */}
      <div className="relative bg-white rounded-lg p-6 shadow-lg w-11/12 max-w-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Agregar Ruta</h2>
  
        {/* Inputs */}
        <input
          type="text"
          placeholder="Nombre de la ruta"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mt-2 outline-none placeholder-gray-500"
        />
  
        <input
          type="date"
          value={routeDate}
          onChange={(e) => setRouteDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mt-2 outline-none"
        />
  
        {/* Mapa */}
        <div className="mt-4">
          <MapComponent points={points} onMapClick={handleMapClick} />
        </div>
  
        {/* Botones */}
        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default ModalRutas;
