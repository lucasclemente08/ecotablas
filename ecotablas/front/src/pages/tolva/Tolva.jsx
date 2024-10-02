import React, { useState, useEffect } from 'react';
import SectionLayout from '../../layout/SectionLayout';
import AddButton from '../../components/buttons/AddButton';
import PdfGenerator from '../../components/buttons/PdfGenerator';
import LoadingTable from '../../components/LoadingTable';
import TablaHead from '../../components/Thead';
import Modal from '../../components/modal';
const Tolva = () => {
  // State management
  const [modalAbierto, setModalAbierto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // Form state
  const [startTime, setStartTime] = useState('');
  const [cantidadCargada, setCantidadCargada] = useState('');
  const [tipoPlastico, setTipoPlastico] = useState('unico');
  const [proporcion, setProporcion] = useState('');
  const [especificaciones, setEspecificaciones] = useState('');

  // Columns for PdfGenerator and TablaHead
  const columns = [
    { header: 'Horario de inicio', accessor: 'startTime' },
    { header: 'Cantidad cargada (kg)', accessor: 'cantidadCargada' },
    { header: 'Tipo de plástico', accessor: 'tipoPlastico' },
    { header: 'Proporción cargada', accessor: 'proporcion' },
    { header: 'Especificaciones', accessor: 'especificaciones' },
  ];

  // Fetch data (simulated with timeout)
  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate fetching data from an API
      const fetchedData = [
        {
          ID: 1,
          startTime: '2023-09-16T08:00',
          cantidadCargada: 50,
          tipoPlastico: 'Tipo único',
          proporcion: '70% A, 30% B',
          especificaciones: 'Color azul',
        },
        {
          ID: 2,
          startTime: '2023-09-17T09:30',
          cantidadCargada: 45,
          tipoPlastico: 'Mezcla',
          proporcion: '60% A, 40% B',
          especificaciones: 'Color rojo',
        },
        // Add more entries as needed
      ];
      setData(fetchedData);
      setLoading(false);
    }, 2000); // 2-second delay to simulate loading
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new entry
    const newEntry = {
      ID: data.length + 1,
      startTime,
      cantidadCargada: parseFloat(cantidadCargada),
      tipoPlastico,
      proporcion,
      especificaciones,
    };

    // Update data state
    setData([...data, newEntry]);

    // Reset form fields
    setStartTime('');
    setCantidadCargada('');
    setTipoPlastico('unico');
    setProporcion('');
    setEspecificaciones('');

    // Close modal
    setModalAbierto(false);
  };

  return (
    <SectionLayout title="Tolva">


        <AddButton abrirModal={() => setModalAbierto(true)} title="Añadir Registro" />
        <PdfGenerator title="Registros de Tolva" data={data} columns={columns} />



      {loading ? (
        <LoadingTable loading={loading} />
      ) : (

        <table className="min-w-full bg-white rounded-lg shadow-md">
          <TablaHead titles={columns.map((col) => col.header)} />
          <tbody>
            {data.map((item) => (
              <tr key={item.ID} className="hover:bg-gray-100">
                <td className="border-b py-3 px-4">{new Date(item.startTime).toLocaleString()}</td>
                <td className="border-b py-3 px-4">{item.cantidadCargada} kg</td>
                <td className="border-b py-3 px-4">{item.tipoPlastico}</td>
                <td className="border-b py-3 px-4">{item.proporcion}</td>
                <td className="border-b py-3 px-4">{item.especificaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

   
        <Modal isOpen={modalAbierto} cerrarModal={() => setModalAbierto(false)}>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Registrar Datos de Producción</h2>
            <form onSubmit={handleSubmit}>
              {/* Horario de inicio de producción de extrusora */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Horario de inicio de producción</label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Cantidad cargada en tolva */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Cantidad cargada en tolva (kg)</label>
                <input
                  type="number"
                  value={cantidadCargada}
                  onChange={(e) => setCantidadCargada(e.target.value)}
                  required
                  min="0"
                  step="0.1"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Ingrese la cantidad en kg"
                />
              </div>

              {/* Tipo de plástico cargado */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Tipo de plástico cargado</label>
                <select
                  value={tipoPlastico}
                  onChange={(e) => setTipoPlastico(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="unico">Tipo único</option>
                  <option value="mezcla">Mezcla</option>
                </select>
              </div>

              {/* Proporción cargada */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Proporción cargada (fórmulas o porcentajes)</label>
                <input
                  type="text"
                  value={proporcion}
                  onChange={(e) => setProporcion(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Ej: 70% A, 30% B"
                />
              </div>

              {/* Especificaciones particulares */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Especificaciones particulares (ej.: Color)</label>
                <input
                  type="text"
                  value={especificaciones}
                  onChange={(e) => setEspecificaciones(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Ingrese detalles específicos"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="mr-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </Modal>
   
    </SectionLayout>
  );
};

export default Tolva;
