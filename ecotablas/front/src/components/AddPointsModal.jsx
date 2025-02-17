import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Toaster, toast } from 'sonner';
import axios from "axios";
// Componente para manejar los clics en el mapa
const ClickHandler = ({ onMapClick }) => {
  useMapEvent("click", onMapClick); // Escucha los clics en el mapa
  return null;
};

const AddPointsModal = ({ isOpen, onClose, routeId, onSavePoints }) => {
  const [points, setPoints] = useState([]);

  // Manejar clics en el mapa
  const handleMapClick = (e) => {
    console.log("Coordenadas del clic:", e.latlng); // Verifica que se detecten los clics
    if (points.length < 5) {
      const { lat, lng } = e.latlng;
      const newPoint = {
        IdRuta: routeId,
        Longitud: lng.toFixed(6),
        Latitud: lat.toFixed(6),
        Orden: points.length + 1,
      };
      setPoints([...points, newPoint]);
      toast.success("Punto agregado correctamente");
    } else {
      toast.warning("Solo se permiten 5 puntos como máximo");
    }
  };
// Guardar puntos
const handleSave = () => {
  if (points.length === 0) {
    toast.error("Por favor, agrega al menos un punto.");
    return;
  }
  console.log("Puntos a guardar:", points);

  axios
    .put(`http://www.ecotablasapi.somee.com/api/PuntosRutas/Insertar/${routeId}`, 
      points.map(punto => ({
        IdRuta: punto.IdRuta,
        Orden: punto.Orden,
        Longitud: punto.Longitud,
        Latitud: punto.Latitud,
      }))
    )
    .then((res) => {
      toast.success("Puntos guardados exitosamente.");
      onClose(); // Cerrar el modal después de guardar
    })
    .catch((error) => {
      console.error("Error al guardar los puntos:", error);
      toast.error("Hubo un problema al guardar los puntos.");
    });
};




  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-10 flex items-center justify-center ${isOpen ? "visible" : "invisible"}`}>
      <Toaster richColors position="top-right" />
      {/* Fondo oscuro semi-transparente */}
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>

      {/* Contenedor del modal */}
      <div className="relative bg-white rounded-lg p-6 shadow-lg w-11/12 max-w-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Agregar Puntos</h2>

        {/* Mapa */}
        <div className="mt-4">
          <MapContainer
            className="z-0"
            center={[-31.4184, -64.1705]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            {/* Componente que maneja los clics */}
            <ClickHandler onMapClick={handleMapClick} />

            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {points.map((punto, index) => (
              <Marker key={index} position={[punto.Latitud, punto.Longitud]}>
                <Popup>Punto {punto.Orden}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Lista de puntos agregados */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Puntos agregados:</h3>
          {points.length === 0 ? (
            <p className="text-sm text-gray-600">No hay puntos agregados.</p>
          ) : (
            <ul className="mt-2">
              {points.map((punto, index) => (
                <li key={index} className="text-sm text-gray-600">
                  Punto {punto.Orden}: Lat {punto.Latitud}, Lng {punto.Longitud}
                </li>
              ))}
            </ul>
          )}
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
