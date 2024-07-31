import React from 'react'
import Home from '../home/Home'
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
const recoUrbanos = () => {
  return (
    <>
    
    <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Recoleción de urbanos</h2>
          <div className="overflow-x-auto">
            <div>

            <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
   mapStyle="mapbox://styles/mapbox/streets-v9add
    />

      </div>
            </div>
            </div>
            </div>

    </>
  )
}

export default recoUrbanos