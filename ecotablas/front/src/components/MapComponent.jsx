import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ points, onMapClick }) => {
  return (
    <MapContainer
      center={[51.505, -0.09]} // Centro inicial del mapa
      zoom={13} // Nivel de zoom inicial
      style={{ height: "400px", width: "100%" }}
      onClick={onMapClick} // Asegúrate de que el evento onClick esté configurado
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point, index) => (
        <Marker
          key={index}
          position={[point.Latitud, point.Longitud]}
          icon={L.icon({ iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png" })}
        >
          <Popup>Punto {point.Orden}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;