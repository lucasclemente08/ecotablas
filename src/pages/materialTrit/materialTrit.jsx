import React, { useEffect,useState } from 'react'

import Home from '../home/Home';
import axios from 'axios';
const MaterialTrit = () => {
  const [materials, setMaterials] = useState([]);
  const[newMaterial, setNewMaterial] = useState(
    {
      VolumenT:'',
      Fecha:'',
      IdMaterialTriturado:''
    }
  );
  const[modalAbierto,setModalAbierto]=useState(false);

  const [mensaje, setMensaje] = useState("");

  const abrirModal = () => {
    setModalAbierto(true);
  };
  const cerrarModal = () => {
    setModalAbierto(false)
  }


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

const handleSubmit=()=>{
  axios.post(`http://www.trazabilidadodsapi.somee.com/api/MaterialTrit/Insertar`, newMaterial)
  .then((response) => {
    
    setModalAbierto(false);
    setMensaje("Inserción exitosa");
    axios.get(`http://www.trazabilidadodsapi.somee.com/api/MaterialTrit/ListarTodo`)
      .then((response) => {
    
      })
      .catch((error) => console.error('Error al obtener los datos:', error));
  })
  .catch((error) => console.error('Error al agregar el material:', error));
}

const handleChange = (e) => {
  const { name, value } = e.target;
  setNewMaterial(prevState => ({
    ...prevState,
    [name]: value
  }));
};



  return (
    <>
     <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Materiales Triturado</h2>
          <button onClick={abrirModal} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-2 mb-5 px-4 rounded">
            Agregar material triturado
          </button>

{modalAbierto && (
            <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75">
           
                </div>
              </div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div></div>
                  <div className="mt-3 text-center sm:mt-5" >
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Agregar Materiales triturado</h3>
                    <div className="mt-2">
                      <input type="text" name="VolumenT" placeholder="Volumen *" value={newMaterial.VolumenT} onChange={handleChange} className="border p-2 w-full" />
                      <input type="date" name="fecha" placeholder="Fecha *" value={newMaterial.Fecha} onChange={handleChange} className="border p-2 w-full mt-2" />
                      <input type="text" name="IdMaterialClasificado" placeholder="Material Clasificada *" value={newMaterial.IdMaterialTriturado} onChange={handleChange} className="border p-2 w-full mt-2" />
                 
                     
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
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
)

}

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