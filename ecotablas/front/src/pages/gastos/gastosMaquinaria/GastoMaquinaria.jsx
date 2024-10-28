import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGastos, deleteGasto,addGasto} from '../../../features/gastoMaquinariaSlice';
import SectionLayout from '../../../layout/SectionLayout';
import TablaHead from '../../../components/Thead';
import LoadingTable from '../../../components/LoadingTable';
import AddButton from '../../../components/buttons/AddButton';
import PdfGenerator from '../../../components/buttons/PdfGenerator';
import DataView from '../../../components/buttons/DataView';
import DeleteButton from '../../../components/buttons/DeleteButton';
import AddModalWithSelect from '../../../components/AddModalWithSelect';

const GastoMaquinaria = () => {
  const dispatch = useDispatch();


const { gastos: dataM, loading } = useSelector((state) => state.gastoMaquinaria);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [dataView, setDataview] = useState(false);
  const [gastoEdit, setGastoEdit] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);

  const abrirModalEdit = (gasto) => {
    setGastoEdit(gasto);
    setFormValues(gasto); // Pobla formValues con los valores actuales del gasto
    setModalEdit(true);
  };
  
  const cerrarModalEdit = () => setModalEdit(false);
  
  const abrirModal = () => {
    setModalAbierto(true);
  };

  const OpenDataview = () => {
    setDataview(true);
  };

  useEffect(() => {
    dispatch(fetchGastos());
  
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteGasto(id));
  };

  const columns = [
    { header: "Tipo de Gasto", dataKey: "tipoGasto" },
    { header: "Tipo de Comprobante", dataKey: "tipoComprobante" },
    { header: "Comprobante", dataKey: "comprobante" },
    { header: "Proveedor", dataKey: "proveedor" },
    { header: "Monto ($)", dataKey: "monto" },
    { header: "Fecha", dataKey: "fecha" },
    { header: "Descripción", dataKey: "descripcion" },
  ];

  const titles = [
    "Tipo de comprobante",
    "Comprobante",
    "Tipo de gasto",
    "Proveedor",
    "Monto ($)",
    "Fecha",
    "Descripción",
    "Acciones"
  ];
// Definir los campos para el modal
const fields = [
  { name: "tipoGasto", label: "Tipo de Gasto", type: "text", required: true },
  { name: "tipoComprobante", label: "Tipo de Comprobante", type: "text", required: true },
  { name: "comprobante", label: "Comprobante", type: "text", required: true },
  { name: "proveedor", label: "Proveedor", type: "text", required: true },
  { name: "monto", label: "Monto ($)", type: "number", required: true },
  { name: "fecha", label: "Fecha", type: "date", required: true },
  { name: "descripcion", label: "Descripción", type: "textarea", required: true },
];

// Valores iniciales del formulario
const [formValues, setFormValues] = useState({
  tipoGasto: "",
  tipoComprobante: "",
  comprobante: "",
  proveedor: "",
  monto: "",
  fecha: "",
  descripcion: "",
});

// Manejo de cambios en el formulario
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormValues((prevValues) => ({
    ...prevValues,
    [name]: value,
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();

  dispatch(addGasto(formValues)).then(() => {
    setModalAbierto(false); 
      dispatch(fetchGastos());
  });
};
const handleEditSubmit = (e) => {
  e.preventDefault();
  axios.put(`http://localhost:61274/api/GastoVehiculos/Actualizar/${gastoEdit.IdGastoVehiculo}`, formValues)
    .then(() => {
      setMensaje("Gasto actualizado con éxito");
      fetchMaterials(); // Actualiza la tabla
      cerrarModalEdit();
    })
    .catch(error => console.error("Error al actualizar:", error));
};


const cerrarModal = () => setModalAbierto(false)

  return (
    <SectionLayout title="Gasto de Maquinaria">
      <div className="flex">
        <AddButton abrirModal={abrirModal} title="Añadir Gasto de Maquinaria" />
        <PdfGenerator columns={columns} data={dataM} title="Reporte de Gastos de Maquinaria" />
        <DataView abrirModal={OpenDataview} />
      </div>
      {modalAbierto && (
  <AddModalWithSelect
    title="Agregar Gasto de Maquinaria"
    fields={fields}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    cerrarModal={cerrarModal}
    values={formValues}
  />
)}

{modalEdit && (
  <AddModalWithSelect
    title="Editar Gasto Vehículo"
    fields={fields}
    handleChange={handleChange}
    handleSubmit={handleEditSubmit}
    cerrarModal={cerrarModalEdit}
    values={gastoEdit} // Carga los valores actuales
  />
)}
      {loading ? (
        <LoadingTable loading={loading} />
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <TablaHead titles={titles} />
          <tbody>
            {dataM.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border-b py-3 px-4">{item.TipoComprobante}</td>
                <td className="border-b py-3 px-4">{item.Comprobante}</td>
                <td className="border-b py-3 px-4">{item.TipoGasto}</td>
                <td className="border-b py-3 px-4">{item.Proveedor}</td>
                <td className="border-b py-3 px-4">{item.Monto}</td>
                <td className="border-b py-3 px-4 ">{item.Fecha.slice(0,10)}</td>
                <td className="border-b py-3 px-4">{item.Descripcion}</td>
                <td className="border-b py-3 px-4 flex">
                  <button
                    onClick={() => abrirModalEdit(item)}  // Puedes definir `abrirModalEdit` para editar
                    className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Modificar
                  </button>
                  <DeleteButton onClick={() => handleDelete(item.IdGastoMaquinaria)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </SectionLayout>
  );
};

export default GastoMaquinaria;
