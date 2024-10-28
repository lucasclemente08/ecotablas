import React, { useState, useEffect } from 'react';
import SectionLayout from '../../../layout/SectionLayout';
import TablaHead from '../../../components/Thead';
import LoadingTable from '../../../components/LoadingTable';
import AddButton from '../../../components/buttons/addButton';
import PdfGenerator from '../../../components/buttons/PdfGenerator';
import axios from 'axios';
import { BsClipboardDataFill } from "react-icons/bs";
import DataView from '../../../components/buttons/DataView';
import DeleteButton from '../../../components/buttons/DeleteButton';

const GastoMaquinaria = () => {
  const [dataM, setDataM] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [dataView, setDataview] = useState(false)


  const abrirModal = () => {
    setModalAbierto(true);
  };
  const data = [
    {
      tipoGasto: 'Reparación',
      tipoComprobante: 'Factura',
      id_maquinaria: 1,
      comprobante: '123456',
      proveedor: 'Taller Industrial',
      monto: '5000',
      fecha: '2023-07-12',
      descripcion: 'Reparación de motor de maquinaria agrícola',
    },
    {
      tipoGasto: 'Mantenimiento',
      tipoComprobante: 'Factura',
      id_maquinaria: 2,
      comprobante: '654321',
      proveedor: 'Proveedor de Repuestos',
      monto: '3000',
      fecha: '2023-08-05',
      descripcion: 'Cambio de piezas y mantenimiento preventivo',
    },
    {
      tipoGasto: 'Seguro',
      tipoComprobante: 'Recibo',
      id_maquinaria: 2,
      comprobante: '987654',
      proveedor: 'Seguros Rurales',
      monto: '1200',
      fecha: '2023-09-22',
      descripcion: 'Pago anual del seguro de maquinaria',
    },
    {
      tipoGasto: 'Combustible',
      tipoComprobante: 'Boleta',
      id_maquinaria: 2,
      comprobante: '789123',
      proveedor: 'Estación de Servicio',
      monto: '1500',
      fecha: '2023-10-10',
      descripcion: 'Carga de combustible para tractor',
    },
  ];
  
const OpenDataview=() => {
  setDataview(true)
}

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const fetchMaquinariaData = () => {
    setLoading(true);

    axios.get(data) 
      .then((response) => {
        setDataM(data);
      })
      .catch((error) => {
        console.error("Error fetching machinery data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMaquinariaData();
  }, []);

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
      <DataView abrirModal={OpenDataview}/>
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
                        onClick={() => abrirModalEdit(material)}
                        className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Modificar
                      </button>

                  <DeleteButton/>
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
