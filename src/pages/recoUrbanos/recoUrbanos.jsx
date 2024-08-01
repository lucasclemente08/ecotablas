import React,{useEffect} from 'react'
import Home from '../home/Home'
import L from 'leaflet';

const recoUrbanos = () => {


useEffect(() => {
  const map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

  return () => {
    map.remove();
  };
}, []);









  return (
    <>
    
    <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Recoleción de urbanos</h2>
          <div className="overflow-x-auto">
            <div className="">
            <div id="map" className=" w-full sm:w-1/2 md:w-3/4 lg:w-full" ></div>
      </div>
            </div>
            </div>
            </div>

    </>
  )
}

export default recoUrbanos