import React from 'react'
import Home from '../home/Home';
import axios from "axios"
const MaterialProc = () => {
  return (
    <>
      <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Materiales Procesado</h2>
          <div className="overflow-x-auto">

          </div>
        </div>
      </div>
    
    
    </>
  )
}

export default MaterialProc