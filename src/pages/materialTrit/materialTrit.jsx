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
          <h2 className="text-2xl font-bold text-white mb-4">Materiales Triturado</h2>
          <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="border-b-2 py-3 px-4 text-left text-gray-600">Id Material</th>
                  <th className="border-b-2 py-3 px-4 text-left text-gray-600">Volumen</th>
                  <th className="border-b-2 py-3 px-4 text-left text-gray-600">Fecha</th>
                  {/* <th className="py-3 px-4 text-left border">Acciones</th> */}
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-100">
                    <td className="border-b py-3 px-4">{material.IdMaterialTriturado}</td>
                    <td className="border-b py-3 px-4">Volumen: {material.VolumenT} kgs</td>
                    <td className="border-b py-3 px-4">{material.Fecha}</td>
                    {/* <td className="border flex justify-center py-3 px-4">
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-red-600"
                          width={30}
                          height={30}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z" />
                        </svg>
                      </button>
                      <button className="m-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={30}
                          height={30}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            d="M7.24264 17.9967H3V13.754L14.435 2.319C14.8256 1.92848 15.4587 1.92848 15.8492 2.319L18.6777 5.14743C19.0682 5.53795 19.0682 6.17112 18.6777 6.56164L7.24264 17.9967ZM3 19.9967H21V21.9967H3V19.9967Z"
                          />
                        </svg>
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default MaterialTrit