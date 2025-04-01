import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "sonner";
import axios from "axios";

// Componente para manejar los clics en el mapa
const ClickHandler = ({ onMapClick }) => {
  useMapEvent("click", onMapClick); // Escucha los clics en el mapa
  return null;
};

const ModifyPointsModal = ({ isOpen, onClose, routeId, onModifyPoints }) => {
  const [points, setPoints] = useState([]);

  // Reiniciar el estado al abrir el modal
  useEffect(() => {
    if (isOpen && routeId) {
      const fetchCurrentPoints = async () => {
        try {
          const response = await axios.get(
            `http://www.ecotablasapi.somee.com/api/PuntosRuta/ListarPorId/${routeId}`,
          );
          setPoints(response.data || []);
        } catch (error) {
          console.error("Error al cargar los puntos actuales:", error);
          toast.error("Hubo un problema al cargar los puntos actuales.");
        }
      };
      fetchCurrentPoints();
    }
  }, [isOpen, routeId]);

  // Manejar clics en el mapa
  const handleMapClick = (e) => {
    console.log("Coordenadas del clic:", e.latlng); // Verifica que se detecten los clics

    if (points.length < 5) {
      const { lat, lng } = e.latlng;
      const newPoint = {
        IdRuta: routeId,
        Orden: points.length + 1,
        Longitud: lng.toFixed(6),
        Latitud: lat.toFixed(6),
      };
      setPoints([...points, newPoint]);
      toast.success("Punto agregado correctamente");
    } else {
      toast.warning("Solo se permiten 5 puntos como máximo");
    }
  };

  // Eliminar un punto específico
  const handleRemovePoint = (index) => {
    const updatedPoints = points.filter((_, i) => i !== index); // Eliminar el punto seleccionado
    // Reordenar los puntos restantes
    const reorderedPoints = updatedPoints.map((punto, i) => ({
      ...punto,
      Orden: i + 1,
    }));
    setPoints(reorderedPoints);
    toast.success("Punto eliminado correctamente");
  };

  // Eliminar puntos actuales antes de asignar nuevos
  const deleteCurrentPoints = async () => {
    try {
      await axios.delete(
        `http://www.ecotablasapi.somee.com/api/PuntosRuta/Delete/${routeId}`,
      );
    } catch (error) {
      console.error("Error al eliminar puntos actuales:", error);
      toast.error("Hubo un problema al eliminar los puntos actuales.");
    }
  };

  // Guardar puntos
  const handleSave = async () => {
    if (!routeId) {
      toast.error("No se ha proporcionado un ID de ruta válido.");
      return;
    }
    if (points.length === 0) {
      toast.error("Por favor, agrega al menos un punto.");
      return;
    }

    try {
      // Eliminar puntos actuales
      await deleteCurrentPoints();

      // Asignar nuevos puntos
      for (const punto of points) {
        await axios.post(
          "http://www.ecotablasapi.somee.com/api/PuntosRuta/Insertar",
          punto,
        );
      }

      onModifyPoints(points); // Notifica al componente padre
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al modificar puntos:", error);
      toast.error("Hubo un problema al modificar los puntos.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      {/* Contenedor del modal */}
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Modificar Puntos de Ruta
        </h2>

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
          <h3 className="text-lg font-semibold text-gray-800">
            Puntos agregados:
          </h3>
          {points.length === 0 ? (
            <p className="text-sm text-gray-600">No hay puntos agregados.</p>
          ) : (
            <ul className="mt-2">
              {points.map((punto, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-sm text-gray-600"
                >
                  <span>
                    Punto {punto.Orden}: Lat {punto.Latitud}, Lng{" "}
                    {punto.Longitud}
                  </span>
                  <button
                    onClick={() => handleRemovePoint(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
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

export default ModifyPointsModal;
