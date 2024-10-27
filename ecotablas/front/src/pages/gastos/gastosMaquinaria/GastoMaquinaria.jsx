import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGastos, deleteGasto} from '../../../features/gastoMaquinariaSlice';
import SectionLayout from '../../../layout/SectionLayout';
import TablaHead from '../../../components/Thead';
import LoadingTable from '../../../components/LoadingTable';
import AddButton from '../../../components/buttons/AddButton';
import PdfGenerator from '../../../components/buttons/PdfGenerator';
import DataView from '../../../components/buttons/DataView';
import DeleteButton from '../../../components/buttons/DeleteButton';

const GastoMaquinaria = () => {
  const dispatch = useDispatch();
  const { data: dataM, loading } = useSelector((state) => state.gastoMaquinaria);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [dataView, setDataview] = useState(false);

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

  return (
    <SectionLayout title="Gasto de Maquinaria">
      <div className="flex">
        <AddButton abrirModal={abrirModal} title="Añadir Gasto de Maquinaria" />
        <PdfGenerator columns={columns} data={dataM} title="Reporte de Gastos de Maquinaria" />
        <DataView abrirModal={OpenDataview} />
      </div>
      {loading ? (
        <LoadingTable loading={loading} />
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <TablaHead titles={titles} />
          <tbody>
            {dataM.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border-b py-3 px-4">{item.tipoComprobante}</td>
                <td className="border-b py-3 px-4">{item.comprobante}</td>
                <td className="border-b py-3 px-4">{item.tipoGasto}</td>
                <td className="border-b py-3 px-4">{item.proveedor}</td>
                <td className="border-b py-3 px-4">{item.monto}</td>
                <td className="border-b py-3 px-4">{item.fecha}</td>
                <td className="border-b py-3 px-4">{item.descripcion}</td>
                <td className="border-b py-3 px-4">
                  <button
                    onClick={() => abrirModalEdit(item)}  // Puedes definir `abrirModalEdit` para editar
                    className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Modificar
                  </button>
                  <DeleteButton onClick={() => handleDelete(item.id)} />
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
