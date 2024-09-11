import React, { useEffect, useState } from 'react';
import Home from '../home/Home';
import axios from 'axios';
import AddButton from '../../components/addButton';
import PdfGenerator from '../../components/PdfGenerator';
import TablaHead from '../../components/Thead';
import DeleteButton from '../../components/DeleteButton';
import AddModal from '../../components/AddModal';


const MaterialTrit = () => {
  const [materials, setMaterials] = useState([]);

  const [modalAbierto, setModalAbierto] = useState(false);
 
  const [mensaje, setMensaje] = useState("");

  const [formValues, setFormValues] = useState({
    VolumenT: '',
    Fecha: '',
    IdMaterialClasificado:''
  });

  const abrirModal = () => { setModalAbierto(true);};
  const cerrarModal = () => {setModalAbierto(false);};

    const fetchMaterials = async () => {
      try {
        const response = await axios.get("http://www.trazabilidadodsapi.somee.com/api/MaterialTrit/ListarTodo");
        setMaterials(response.data);
      
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
  useEffect(() => {
    fetchMaterials();
  }, []);


  const handleSubmit = () => {
    if (!formValues.VolumenT || !formValues.Fecha) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }
      axios.post(`http://www.trazabilidadodsapi.somee.com/api/MaterialTrit/Insertar`, formValues)
        .then((response) => {
          setModalAbierto(false);
          setMensaje("Inserción exitosa");
          setMaterials([...materials, response.data]);
        })
        .catch((error) => {
          setMensaje("Error al agregar el material.");
          console.error('Error al agregar el material:', error);
        });
    
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

// titles for table headers
  const title=[
    'Volumen',
    'Fecha de ingreso',
    'Acciones'
  ]
  
  // elemente about the table (thead)
  const columns = [
    { header: "Volumen (kgs)", dataKey: "VolumenT" },
    { header: "Fecha", dataKey: "Fecha" }
  ];

  const rows = materials.map(material => ({
    VolumenT: `${material.VolumenT} kgs`,
    Fecha: material.Fecha.slice(0, 10)
  }));

  //  input fields
  const fields = [
    { name: 'VolumenT', label: 'Volumen', type: 'text', placeholder: 'Volumen *' },
    { name: 'Fecha', label: 'Fecha', type: 'date', placeholder: 'Fecha *' },
    { name: 'IdMaterialClasificado', label: 'Material Triturado', type: 'text', placeholder: 'Material Triturado *' }
  ];

  return (
    <>
      <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Materiales Triturado</h2>
          <AddButton abrirModal={abrirModal} title={" Añadir Materiales triturado"} />

          <PdfGenerator columns={columns} data={materials} title="Reporte de Materiales triturado" />

          {mensaje && (
            <div className="bg-blue-600 text-white py-2 px-4 rounded mb-4">
              {mensaje}
            </div>
          )}
          {modalAbierto && (
         <AddModal
         title="Agregar Material Triturado"
         fields={fields}
         handleChange={handleChange}
         handleSubmit={handleSubmit}
         cerrarModal={cerrarModal}
         values={formValues}
       />
        
        )}

          
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
     
  <TablaHead titles={title} />

              <tbody>
                {materials.map((material) => (
                  <tr key={material.IdMaterialTriturado} className="hover:bg-gray-100 m-5">
                    
                    <td className="border-b py-3 px-4">{material.VolumenT} kgs</td>
                    <td className="border-b py-3 px-4">{material.Fecha.slice(0, 10)}</td>
                    <td className="border-b py-3 px-4">
                                                  <button 
  onClick={() => abrirModalEdit(material)}
  className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
>
  Modificar
</button>
<DeleteButton     
id={material.IdMaterialTriturado}
                  endpoint="http://www.trazabilidadodsapi.somee.com/api/MaterialTrit/Borrar" // Ajusta el endpoint según sea necesario
                 updateList={fetchMaterials} // Pasa la función para actualizar la lista
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
};

export default MaterialTrit;
