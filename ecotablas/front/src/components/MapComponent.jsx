import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ points, onMapClick }) => {



  return (
    <MapContainer
      className="z-0"
      center={[-31.4184, -64.1705]} // Centro inicial del mapa
      zoom={13} // Nivel de zoom inicial
      style={{ height: "400px", width: "100%" }}
      onClick={onMapClick} 
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((punto, index) => (
        <Marker
          key={index}
          position={[punto.Latitud, punto.Longitud]}
        >
          <Popup>Punto {punto.Orden}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;