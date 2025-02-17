import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { Toaster, toast } from 'sonner';
import "leaflet/dist/leaflet.css";

const MapComponent = ({ points = [], onMapClick }) => {


  const safePoints = Array.isArray(points) ? points : [];

// if(!points || Object.keys(points).length === 0){
//   toast.success("No hay puntos en la ruta");
// }

  return (
    <>
      <Toaster />
    
    <MapContainer
      className="z-0"
      center={[-31.4184, -64.1705]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      onClick={onMapClick}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {safePoints.map((punto, index) => (
        <Marker
          key={index}
          position={[punto.Latitud, punto.Longitud]}
          >
          <Popup>Punto {punto.Orden}</Popup>
        </Marker>
      ))}
    </MapContainer>
      </>
  );
};

export default MapComponent;



