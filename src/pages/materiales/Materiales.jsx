import React,{useEffect,useState} from 'react';
import Home from '../home/Home';
import Tablas from '../plasticos/plasticos';


import axios from 'axios';

  
  function Material() {

    const [plasticos, setPlasticos] = useState([]);




    const fetchMaterials = async () => {
      try {
        const response = await axios.get("http://www.trazabilidadodsapi.somee.com/api/TiposPlastico/ListarTodo");
        setPlasticos(response.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
  
    useEffect(() => {
      fetchMaterials();
    }, []);






    return (
      <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Materiales</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="border-b-2 py-3 px-4 text-left text-gray-600">Nombre</th>
                </tr>
              </thead>
              <tbody>
                {plasticos.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-100">
                    <td className="border-b py-3 px-4">{material.TipoPlastico}</td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
            <Tablas />
          </div>
        </div>
      </div>
    );
  }

export default Material;
