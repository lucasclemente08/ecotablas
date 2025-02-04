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
    <div style={{ 
      position: "fixed", 
      top: "20%", 
      left: "30%", 
      backgroundColor: "white", 
      padding: "20px", 
      zIndex: 1000,
      pointerEvents: "none", // Evita que el modal capture eventos
    }}>
      <div style={{ pointerEvents: "auto" }}> {/* Permite eventos en el contenido del modal */}
        <h2>Agregar Ruta</h2>
        <input
          type="text"
          placeholder="Nombre de la ruta"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
        />
        <input
          type="date"
          value={routeDate}
          onChange={(e) => setRouteDate(e.target.value)}
        />
        <button onClick={handleSave}>Guardar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
      <div style={{ pointerEvents: "auto", marginTop: "20px" }}> {/* Permite eventos en el mapa */}
        <MapComponent points={points} onMapClick={handleMapClick} />
      </div>
    </div>
  );
};

export default ModalRutas;