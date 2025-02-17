import React, { useState } from "react";
import MapComponent from "./MapComponent";
const AddPointsModal = ({ isOpen, onClose, routeId, onSavePoints }) => {
    const [points, setPoints] = useState([]);
  
    const handleMapClick = (e) => {
        console.log("Coordenadas del clic:", e.latlng);
      if (points.length < 5) {
        const { lat, lng } = e.latlng;
        const newPoint = {
          IdRuta: routeId,
          Longitud: lng,
          Latitud: lat,
          Orden: points.length + 1,
        };
        setPoints([...points, newPoint]);
      }
    };
  
    const handleSave = () => {
      if (points.length === 0) {
        alert("Por favor, agrega al menos un punto.");
        return;
      }
  
      onSavePoints(points); 
    };
  
    if (!isOpen) return null;
  

  return (
    <div className={`fixed inset-0 z-10 flex items-center justify-center ${isOpen ? "visible" : "invisible"}`}>
      {/* Fondo oscuro semi-transparente */}
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>

      {/* Contenedor del modal */}
      <div className="relative bg-white rounded-lg p-6 shadow-lg w-11/12 max-w-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Agregar Puntos</h2>

        {/* Mapa */}
        <div className="mt-4">
          <MapComponent points={points} onMapClick={handleMapClick} />
        </div>

        {/* Lista de puntos agregados */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Puntos agregados:</h3>
          <ul className="mt-2">
            {points.map((punto, index) => (
              <li key={index} className="text-sm text-gray-600">
                Punto {punto.Orden}: Lat {punto.Latitud}, Lng {punto.Longitud}
              </li>
            ))}
          </ul>
        </div>

        {/* Botones */}
        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
          >
            Siguiente
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

export default AddPointsModal;