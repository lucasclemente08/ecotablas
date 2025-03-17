import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { Toaster, toast } from "sonner";
import "leaflet/dist/leaflet.css";

const RoutingMachine = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (points.length < 2) return; // No crear ruta si hay menos de 2 puntos

    const routingControl = L.Routing.control({
      waypoints: points.map((p) => L.latLng(p.Latitud, p.Longitud)),
      lineOptions: { styles: [{ color: "blue", weight: 5 }] },
      createMarker: () => null, // Evita crear marcadores extra
      routeWhileDragging: true,
    }).addTo(map);

    return () => map.removeControl(routingControl); // Limpiar ruta al desmontar o actualizar
  }, [points, map]);

  return null;
};

const MapComponent = ({ points = [], onMapClick }) => {
  const safePoints = Array.isArray(points) ? points.filter(p => p.Latitud && p.Longitud) : [];

  const orderedPoints = [...safePoints].sort((a, b) => a.Orden - b.Orden);
  const defaultCenter = [-31.4184, -64.1705];
  const center = orderedPoints.length > 0 ? [orderedPoints[0].Latitud, orderedPoints[0].Longitud] : defaultCenter;


  return (
    <>
      <Toaster />
      <MapContainer
        className="z-0"
        center={center}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        onClick={onMapClick}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RoutingMachine points={orderedPoints} />

        {orderedPoints.map((punto) => (
          <Marker key={punto.Orden} position={[punto.Latitud, punto.Longitud]}>
            <Popup>Punto {punto.Orden}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapComponent;


