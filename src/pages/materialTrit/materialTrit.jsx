import React, { useEffect,useState } from 'react'

import Home from '../home/Home';
import axios from 'axios';
const MaterialTrit = () => {
  const [materials, setMaterials] = useState([]);

useEffect(()=>{
  const fetchMaterials = async () => {
    try {
      const response = await axios.get("http://www.trazabilidadodsapi.somee.com/api/MaterialTrit/ListarTodo");
      setMaterials(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  fetchMaterials();
},[])






  return (
    <>
     <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Materiales Procesados</h2>
          <div className="overflow-x-auto">

          </div>
        </div>
      </div>
    
    </>
  )
}

export default MaterialTrit