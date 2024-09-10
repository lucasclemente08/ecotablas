import React, { useState, useEffect, useRef } from 'react';
import Home from '../home/Home';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useReactToPrint } from "react-to-print";
import axios from 'axios';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const RecoUrbanos = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [newUbicacion, setNewUbicacion] = useState({
    Nombre: '',
    Lat: '',
    Long: ''
  });
  const [locations, setLocations] = useState([]);

  // Centrar el mapa en la primera ubicación o en una ubicación por defecto
  const centerPosition = locations.length > 0 ? [locations[0].Lat, locations[0].Long] : [-31.4184, -64.1705];
  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({ 
    content: () => componentRef.current,
  });

  useEffect(() => {
    fetch("http://www.trazabilidadodsapi.somee.com/api/UbicacionesMapa/ListarTodo")
      .then(response => response.json())
      .then(data => setLocations(data))
      .catch(err => console.log("error al traer la data: " + err));
  }, []);

  const handleSubmit = () => {
    axios.post(`http://www.trazabilidadodsapi.somee.com/api/UbicacionesMapa/Insertar`, newUbicacion)
      .then((response) => {
        setModalAbierto(false);
        setMensaje("Inserción exitosa");
        // Refrescar la lista de ubicaciones después de insertar
        axios.get(`http://www.trazabilidadodsapi.somee.com/api/UbicacionesMapa/ListarTodo`)
          .then((response) => setLocations(response.data))
          .catch((error) => console.error('Error al obtener los datos:', error));
      })
      .catch((error) => console.error('error al obtener los datos:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUbicacion(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setNewUbicacion({ Nombre: '', Lat: lat.toFixed(6), Long: lng.toFixed(6) });
  };
  
  const abrirModal = () => {
    setModalAbierto(true);
  };
  
  const cerrarModal = () => {
    setModalAbierto(false);
  }  
  return (
    <div className="md:flex flex-row bg-slate-900 min-h-screen">
      <Home />
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold text-white mb-4">Recolección de urbanos</h2>
        <div className="overflow-x-auto">
          {modalAbierto && (
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-6 px-4 pb-20 text-center sm:block">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle  sm:p-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Agregar Ubicacion</h3>
                    <div className="mt-2">
                      <input type="text" name="Nombre" placeholder="Nombre de la parada *" value={newUbicacion.Nombre} onChange={handleChange} className="border p-2 w-full" />
                      <input type="text" name="Lat" placeholder="Latitud *" value={newUbicacion.Lat} onChange={handleChange} className="border p-2 w-full mt-2" />
                      <input type="text" name="Long" placeholder="Longitud *" value={newUbicacion.Long} onChange={handleChange} className="border p-2 w-full mt-2" />
                    </div>
                  </div>
                  <div className="p-2  flex justify-center">
                  <MapContainer         
                className="overflow-y-auto w-4 "
                center={centerPosition}
                zoom={12}
                scrollWheelZoom={false}
                whenReady={(map) => {
                  map.target.on('click', function (e) {
                    const { lat, lng } = e.latlng;
                    setNewUbicacion({ Nombre: '', Lat: lat.toFixed(6), Long: lng.toFixed(6) });
                    L.marker([lat, lng], { icon: DefaultIcon }).addTo(map.target);
                  });
                }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location, index) => (
                  <Marker key={index} position={[location.Lat, location.Long]}>
                    <Popup>{location.Nombre}</Popup>
                  </Marker>
                ))}
              </MapContainer>
              </div>
                  <div className="mt-2 sm:mt-2">
                    <button onClick={handleSubmit} className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm">
                      Guardar
                    </button>
                    <button onClick={cerrarModal} className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div>
          <button onClick={abrirModal} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-2 mb-5 px-4 rounded">
            Agregar ubicación
          </button>
            <button onClick={handlePrint} className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 mt-2 m-2 px-4 rounded">
              Imprimir listado
            </button>
          </div>

          <div className="flex mt-5">
            {!modalAbierto && (
              <MapContainer
                id="map"
                className="overflow-y-auto"
                center={centerPosition}
                zoom={12}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location, index) => (
                  <Marker key={index} position={[location.Lat, location.Long]}>
                    <Popup>{location.Nombre}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoUrbanos;
