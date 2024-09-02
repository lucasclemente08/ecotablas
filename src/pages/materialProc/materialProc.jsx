import React, { useEffect, useState } from 'react';
import Home from '../home/Home';
import axios from "axios";

const MaterialProc = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    VolumenP: '',
    FechaIngresoP: '',
    IdIngresoMaterial: ''
  });
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [materialId, setMaterialId] = useState(null);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);
  const abrirModalEdit = (material) => {
    setMaterialId(material.IdMaterialProcesado);
    setNewMaterial({
      VolumenP: material.VolumenP,
      FechaIngresoP: material.FechaIngresoP,
      IdIngresoMaterial: material.IdIngresoMaterial,
    });
    setModalEdit(true);
  };
  const cerrarModalEdit = () => setModalEdit(false);

  const handleSubmit = () => {
    axios.post(`http://www.trazabilidadodsapi.somee.com/api/MaterialPros/Insertar`, newMaterial)
      .then(() => {
        setModalAbierto(false);
        setMensaje("Inserción exitosa");
        fetchMaterials();
      })
      .catch((error) => console.error('Error al agregar el material:', error));
  }

  const handleEditSubmit = () => {
    axios.put(`http://www.trazabilidadodsapi.somee.com/api/MaterialPros/Modificar/${materialId}`, newMaterial)
      .then(() => {
        setModalEdit(false);
        setMensaje("Modificación exitosa");
        fetchMaterials();
      })
      .catch((error) => console.error('Error al modificar el material:', error));
  }

  const handleDelete = (id) => {
    axios.delete(`http://www.trazabilidadodsapi.somee.com/api/MaterialPros/Borrar/${id}`)
      .then(() => {
        setMensaje("Eliminación exitosa");
        fetchMaterials();
      })
      .catch((error) => console.error('Error al eliminar el material:', error));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const fetchMaterials = async () => {
    try {
      const response = await axios.get("http://www.trazabilidadodsapi.somee.com/api/MaterialPros/ListarTodo");
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <>
      <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Materiales Procesados</h2>
          <button onClick={abrirModal} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-2 mb-5 px-4 rounded">
            Agregar material Procesado
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
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Agregar Materiales procesados</h3>
                    <div className="mt-2">
                      <input type="text" name="VolumenP" placeholder="Volumen *" value={newMaterial.VolumenP} onChange={handleChange} className="border p-2 w-full" />
                      <input type="date" name="FechaIngresoP" placeholder="Fecha *" value={newMaterial.FechaIngresoP} onChange={handleChange} className="border p-2 w-full mt-2" />
                      <input type="text" name="IdIngresoMaterial" placeholder="Material Clasificada *" value={newMaterial.IdIngresoMaterial} onChange={handleChange} className="border p-2 w-full mt-2" />
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

          {modalEdit && (
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Editar Material Procesado</h3>
                    <div className="mt-2">
                      <input type="text" name="VolumenP" placeholder="Volumen *" value={newMaterial.VolumenP} onChange={handleChange} className="border p-2 w-full" />
                      <input type="date" name="FechaIngresoP" placeholder="Fecha *" value={newMaterial.FechaIngresoP} onChange={handleChange} className="border p-2 w-full mt-2" />
                      <input type="text" name="IdIngresoMaterial" placeholder="Material Clasificada *" value={newMaterial.IdIngresoMaterial} onChange={handleChange} className="border p-2 w-full mt-2" />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button onClick={handleEditSubmit} className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                      Guardar Cambios
                    </button>
                    <button onClick={cerrarModalEdit} className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                      Cancelar
                    </button>
                  </div>
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
                  <th className="border-b-2 py-3 px-4 text-left text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material.IdMaterialProcesado} className="hover:bg-gray-100">
                    <td className="border-b py-3 px-4">{material.IdMaterialProcesado}</td>
                    <td className="border-b py-3 px-4">Volumen: {material.VolumenP} kgs</td>
                    <td className="border-b py-3 px-4">{material.FechaIngresoP.slice(0, 10)}</td>
                    <td className="border-b py-3 px-4 flex justify-center">
                    <button 
  onClick={() => abrirModalEdit(material)}
  className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
>
  Modificar
</button>

<button 
  onClick={() => handleDelete(material.IdMaterialProcesado)} 
  className="ml-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
>
  Eliminar
</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default MaterialProc;
