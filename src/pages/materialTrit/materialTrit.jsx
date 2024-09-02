import React, { useEffect, useState } from 'react';
import Home from '../home/Home';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import { AiOutlineMore } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa6";


const MaterialTrit = () => {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [newMaterial, setNewMaterial] = useState({
    VolumenT: '',
    Fecha: '',
    IdMaterialTriturado: ''
  });
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalOpcionesAbierto, setModalOpcionesAbierto] = useState(false); 
  const [mensaje, setMensaje] = useState("");

  const abrirModal = () => {
    setModalAbierto(true);
  };
  
  const cerrarModal = () => {
    setModalAbierto(false);
    setSelectedMaterial(null);
  };

  const abrirModalOpciones = (material) => {
    setSelectedMaterial(material);
    setModalOpcionesAbierto(true);
  };

  const cerrarModalOpciones = () => {
    setModalOpcionesAbierto(false);
    setSelectedMaterial(null);
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
    if (selectedMaterial) {
      // Modificar material
      axios.put(`http://www.trazabilidadodsapi.somee.com/api/MaterialTrit/Modificar/${selectedMaterial.IdMaterialTriturado}`, newMaterial)
        .then((response) => {
          setModalAbierto(false);
          setMensaje("Modificación exitosa");
          // Actualizar la lista de materiales después de modificar
          setMaterials(materials.map(material => 
            material.IdMaterialTriturado === selectedMaterial.IdMaterialTriturado ? newMaterial : material
          ));
        })
        .catch((error) => console.error('Error al modificar el material:', error));
    } else {
      // Agregar nuevo material
      axios.post(`http://www.trazabilidadodsapi.somee.com/api/MaterialTrit/Insertar`, newMaterial)
        .then((response) => {
          setModalAbierto(false);
          setMensaje("Inserción exitosa");
          // Puedes actualizar la lista de materiales aquí si lo necesitas
          setMaterials([...materials, response.data]);
        })
        .catch((error) => console.error('Error al agregar el material:', error));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDelete = (id) => {
    axios.delete(`http://www.trazabilidadodsapi.somee.com/api/MaterialTrit/Borrar/${id}`)
      .then((response) => {
        setMensaje("Eliminación exitosa");
        setMaterials(materials.filter(material => material.IdMaterialTriturado !== id));
        cerrarModalOpciones();
      })
      .catch((error) => console.error('Error al eliminar el material:', error));
  };

  const handleEdit = (material) => {
    setNewMaterial(material);
    abrirModal();
  };

  const GenerarPDF = () => {
    const doc = new jsPDF();
  
    const columns = [
      { header: "Id Material", dataKey: "IdMaterialTriturado" },
      { header: "Volumen (kgs)", dataKey: "VolumenT" },
      { header: "Fecha", dataKey: "Fecha" }
    ];
  
    const rows = materials.map(material => ({
      IdMaterialTriturado: material.IdMaterialTriturado,
      VolumenT: `${material.VolumenT} kgs`,
      Fecha: material.Fecha.slice(0, 10)
    }));
  
    doc.setFontSize(18);
    doc.text("Listado de Materiales Triturados", 14, 22);
  
    doc.autoTable({
      head: [columns.map(col => col.header)],
      body: rows.map(row => columns.map(col => row[col.dataKey])),
      startY: 30,
      margin: { top: 20, left: 14, right: 14 },
      theme: 'striped'
    });
  
    doc.save("Listado_Materiales_Triturados.pdf");
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
          <button
  onClick={GenerarPDF}
  className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 mt-2 m-4 px-4 rounded inline-flex items-center"
>
  <span>Imprimir listado</span>
  <FaFilePdf className="ml-2" />
</button>
          {mensaje && (
            <div className="bg-blue-600 text-white py-2 px-4 rounded mb-4">
              {mensaje}
            </div>
          )}
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
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedMaterial ? "Modificar Material Triturado" : "Agregar Materiales Triturado"}
                      </h3>
                      <div className="mt-2">
                        <input type="text" name="VolumenT" placeholder="Volumen *" value={newMaterial.VolumenT} onChange={handleChange} className="border p-2 w-full" />
                        <input type="date" name="Fecha" placeholder="Fecha *" value={newMaterial.Fecha} onChange={handleChange} className="border p-2 w-full mt-2" />
                        <input type="text" name="IdMaterialTriturado" placeholder="Material Clasificada *" value={newMaterial.IdMaterialTriturado} onChange={handleChange} className="border p-2 w-full mt-2" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button onClick={handleSubmit} className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm">
                      {selectedMaterial ? "Guardar Cambios" : "Guardar"}
                    </button>
                    <button onClick={cerrarModal} className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {modalOpcionesAbierto && selectedMaterial && (
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Opciones del Material</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Seleccione una acción para el material {selectedMaterial.IdMaterialTriturado}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button onClick={() => handleEdit(selectedMaterial)} className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm">
                      Modificar
                    </button>
                    <button onClick={() => handleDelete(selectedMaterial.IdMaterialTriturado)} className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                      Eliminar
                    </button>
                    <button onClick={cerrarModalOpciones} className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm">
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
                  <th className="border-b-2 py-3 px-4 text-left text-gray-600">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material.IdMaterialTriturado} className="hover:bg-gray-100">
                    <td className="border-b py-3 px-4">{material.IdMaterialTriturado}</td>
                    <td className="border-b py-3 px-4">{material.VolumenT} kgs</td>
                    <td className="border-b py-3 px-4">{material.Fecha.slice(0, 10)}</td>
                    <td className="border-b py-3 px-4">
                      <button onClick={() => abrirModalOpciones(material)} className="bg-blue-600 flex items-center  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Opciones <AiOutlineMore className="m-1 text-white font-bold" />
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
};

export default MaterialTrit;
