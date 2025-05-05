import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import {L} from "leaflet";

import { Toaster, toast } from "sonner";
import "leaflet/dist/leaflet.css";

const RoutingMachine = ({ points, showInstructions }) => {
  const map = useMap();

  useEffect(() => {
    if (points.length < 2) return;

    // Importar dinámicamente leaflet-routing-machine
    const loadRouting = async () => {
      const LRM = await import("leaflet-routing-machine");
      if (!map) return;

      const routingControl = L.Routing.control({
        waypoints: points.map((p) => L.latLng(p.Latitud, p.Longitud)),
        lineOptions: { styles: [{ color: "green", weight: 5 }] },
        createMarker: () => null,
        routeWhileDragging: true,
        router: L.Routing.osrmv1({ language: "es" }),
      }).addTo(map);

      setTimeout(() => {
        const container = document.querySelector(".leaflet-routing-container");
        if (container) {
          container.style.display = showInstructions ? "block" : "none";
        }
      }, 500);

      return () => map.removeControl(routingControl);
    };

    loadRouting();
  }, [points, map, showInstructions]);

  return null;
};


const MapComponent = ({ points = [], onMapClick }) => {
  const [showInstructions, setShowInstructions] = useState(true);

  const safePoints = Array.isArray(points)
    ? points.filter((p) => p.Latitud && p.Longitud)
    : [];

  const orderedPoints = [...safePoints].sort((a, b) => a.Orden - b.Orden);
  const defaultCenter = [-31.4184, -64.1705];
  const center =
    orderedPoints.length > 0
      ? [orderedPoints[0].Latitud, orderedPoints[0].Longitud]
      : defaultCenter;

  return (
    <>
      <Toaster position="top-right" />
      <MapContainer
        className="z-0"
        center={center}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        onClick={onMapClick}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RoutingMachine
          points={orderedPoints}
          showInstructions={showInstructions}
        />

        {orderedPoints.map((punto) => (
          <Marker key={punto.id} position={[punto.Latitud, punto.Longitud]}>
            <Popup>Punto {punto.Orden}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <button
        className="px-4 py-2 mt-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
        onClick={() => setShowInstructions((prev) => !prev)}
      >
        {showInstructions ? "Ocultar Instrucciones" : "Mostrar Instrucciones"}
      </button>
    </>
  );
};

export default MapComponent;
