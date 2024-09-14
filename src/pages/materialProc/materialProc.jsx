import React, { useEffect, useState } from 'react';
import Home from '../home/Home';
import axios from "axios";
import AddButton from '../../components/addButton';
import PdfGenerator from '../../components/PdfGenerator';
import TablaHead from '../../components/Thead';
import DeleteButton from '../../components/DeleteButton';
import AddModal from '../../components/AddModal';
import ButtonEdit from '../../components/buttonEdit';

const MaterialProc = () => {
  const [materials, setMaterials] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const [mensaje, setMensaje] = useState("");
  const [materialId, setMaterialId] = useState(null);
  
  const [formValues, setFormValues] = useState({
    VolumenP: '',
    FechaIngresoP: '',
    IdIngresoMaterial: '1'
  });

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const abrirModalEdit = (material) => {
    setMaterialId(material.IdMaterialProcesado); // Guardar el ID del material seleccionado
    setFormValues({
      VolumenP: material.VolumenP,
      FechaIngresoP: material.FechaIngresoP, // Formatear fecha si es necesario
      IdIngresoMaterial: material.IdIngresoMaterial,
    });
    setModalEdit(true);
  };
  
  const cerrarModalEdit = () => setModalEdit(false);

  const handleSubmit = () => {
    axios.post('http://www.trazabilidadodsapi.somee.com/api/MaterialPros/Insertar', formValues)
      .then(() => {
        cerrarModal();
        fetchMaterials();
      })
      .catch((error) => console.error('Error al agregar el material:', error));
  };

  const handleEditSubmit = () => {
    if (!formValues.VolumenP || !formValues.FechaIngresoP || !formValues.IdIngresoMaterial) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }
    
    axios.put(`http://www.trazabilidadodsapi.somee.com/api/MaterialPros/Modificar/${materialId}`, formValues)
      .then(() => {
        setModalEdit(false);
        setMensaje("Modificación exitosa");
        fetchMaterials();
      })
      .catch((error) => console.error('Error al modificar el material:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
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

  const title = ['Volumen (kgs)', 'Fecha de ingreso', 'Acciones'];

  const columns = [
    { header: "Volumen (kgs)", dataKey: "VolumenP" },
    { header: "Fecha de ingreso", dataKey: "FechaIngresoP" }
  ];

  const rows = materials.map(material => ({
    VolumenP: `${material.VolumenP} kgs`,
    FechaIngresoP: material.FechaIngresoP.slice(0, 10)
  }));

  const fields = [
    { name: 'VolumenP', label: 'Volumen', type: 'text', placeholder: 'Volumen *' },
    { name: 'FechaIngresoP', label: 'Fecha Ingreso', type: 'date', placeholder: 'Fecha *' },
    { name: 'IdIngresoMaterial', label: 'ID Material', type: 'text', placeholder: 'ID Material *' }
  ];
  
  return (
    <>
      <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Materiales Procesados</h2>
          <AddButton abrirModal={abrirModal} title={"Añadir Materiales procesados"} />

          <PdfGenerator columns={columns} data={materials} title="Reporte de Materiales procesados" />    
          
          {modalAbierto && (
            <AddModal
              title="Agregar Material Procesado"
              fields={fields}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              cerrarModal={cerrarModal}
              values={formValues}
            />
          )}

          {modalEdit && (
            <ButtonEdit
              title="Material"
              fields={fields}
              id={materialId}
              formValues={formValues}
              handleChange={handleChange}
              handleEditSubmit={handleEditSubmit}
              cerrarModalEdit={cerrarModalEdit}
  
            />
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <TablaHead titles={title} />
              <tbody>
                {materials.map((material) => (
                  <tr key={material.IdMaterialProcesado} className="hover:bg-gray-100">
                    <td className="border-b py-3 px-4">Volumen: {material.VolumenP} kgs</td>
                    <td className="border-b py-3 px-4">{material.FechaIngresoP.slice(0, 10)}</td>
                    <td className={`border-b py-3 px-4 flex justify-center ${modalEdit || modalAbierto ? 'hidden' : ''}`}>


              <button 
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105" onClick={() => abrirModalEdit(material)} >Modificar</button>
                      <DeleteButton     
                        id={material.IdMaterialProcesado}
                        endpoint="http://www.trazabilidadodsapi.somee.com/api/MaterialPros/Borrar"
                        updateList={fetchMaterials}
                      />
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
