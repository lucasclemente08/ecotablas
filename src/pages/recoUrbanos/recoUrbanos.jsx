import React, { useState } from 'react';
import Home from '../home/Home';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
// import convertirRuta from "../../components/convertirRuta"

const DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const RecoUrbanos = () => {
  L.Marker.prototype.options.icon = DefaultIcon;
  const [locations, setLocations] = useState([
    { lat: -31.41840141484594, long: -64.17054389706696 },
    { lat: -31.430469273346514, long: -64.1532139184681 },
    { lat: -31.418123123484594, long: -64.19074389706696 },
    { lat: -31.422345678901234, long: -64.160987654321 },
    { lat: -31.41900000000000, long: -64.16500000000000 }, // Nuevos puntos

    { lat: -31.43300000000000, long: -64.20900000000000 },
    { lat: -31.42150000000000, long: -64.20750000000000 },
    { lat: -31.42700000000000, long: -64.20050000000000 }
  ]);
  // Usar la primera ubicación para centrar el mapa (ajusta si es necesario)
  const centerPosition = [locations[0].lat, locations[0].long];

  return (
    <div className="md:flex flex-row bg-slate-900 min-h-screen">
      <Home />
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold text-white mb-4">Recolección de urbanos</h2>
        <div className="overflow-x-auto">
          <div className=" flex  ">
            <MapContainer id='map' className='overflow-y-auto' center={centerPosition} zoom={10} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {locations.map((location, index) => (
                <Marker key={index} position={[location.lat, location.long]}>
                  <Popup>
                    BUEN DÍA
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          {/* <convertirRuta />  */}
        </div>
      </div>
    </div>
  );
}

export default RecoUrbanos;
