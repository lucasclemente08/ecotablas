import React, { useEffect, useState } from 'react';
import Home from '../home/Home';
import axios from 'axios';

const MaterialTrit = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    VolumenT: '',
    Fecha: '',
    IdMaterialTriturado: ''
  });
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalOpcionesAbierto, setModalOpcionesAbierto] = useState(false); // Modal para opciones
  const [mensaje, setMensaje] = useState("");

  const abrirModal = () => {
    setModalAbierto(true);
  };
  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const abrirModalMaterial = (id) => {
    setModalOpcionesAbierto(true);
    // Aquí puedes realizar alguna acción con el ID si lo necesitas
  };
  const cerrarModalMaterial = () => {
    setModalOpcionesAbierto(false);
  };

  useEffect(() => {
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
  }, []);

  const handleSubmit = () => {
    axios.post(`http://www.trazabilidadodsapi.somee.com/api/MaterialTrit/Insertar`, newMaterial)
      .then((response) => {
        setModalAbierto(false);
        setMensaje("Inserción exitosa");
        // Puedes actualizar la lista de materiales aquí si lo necesitas
      })
      .catch((error) => console.error('Error al agregar el material:', error));
  };

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
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Agregar Materiales Triturado</h3>
                      <div className="mt-2">
                        <input type="text" name="VolumenT" placeholder="Volumen *" value={newMaterial.VolumenT} onChange={handleChange} className="border p-2 w-full" />
                        <input type="date" name="Fecha" placeholder="Fecha *" value={newMaterial.Fecha} onChange={handleChange} className="border p-2 w-full mt-2" />
                        <input type="text" name="IdMaterialTriturado" placeholder="Material Clasificada *" value={newMaterial.IdMaterialTriturado} onChange={handleChange} className="border p-2 w-full mt-2" />
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
          )}

          {modalOpcionesAbierto && (
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <div className="text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Opciones</h3>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <button onClick={() => console.log("Modificar material" + id)} className="bg-gray-900 text-white font-bold py-1 px-2 rounded mr-2">
                      Modificar material
                    </button>
                    <button onClick={() => console.log("Eliminar material")} className="bg-red-700 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                      Eliminar
                    </button>
                  </div>
                  <button ></button>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="border-b-2 py-3 px-4 text-left text-gray-600">Id Material</th>
                  <th className="border-b-2 py-3 px-4 text-left text-gray-600">Volumen</th>
                  <th className="border-b-2 py-3 px-4 text-left text-gray-600">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material.IdMaterialTriturado} onClick={() => abrirModalMaterial(material.IdMaterialTriturado)} className="hover:bg-gray-100">
                    <td className="border-b py-3 px-4">{material.IdMaterialTriturado}</td>
                    <td className="border-b py-3 px-4">Volumen: {material.VolumenT} kgs</td>
                    <td className="border-b py-3 px-4">{material.Fecha.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaterialTrit;
