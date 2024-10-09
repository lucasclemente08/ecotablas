import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTolva, addTolva, editTolva, deleteTolva } from "../../features/tolvaSlice";
import SectionLayout from "../../layout/SectionLayout";
import AddButton from "../../components/buttons/addButton";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import LoadingTable from "../../components/LoadingTable";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModal from "../../components/AddModal";
import ButtonEdit from "../../components/buttons/ButtonEdit";
import NextButton from "../../components/buttons/NextButton";
import ReportButton from "../../components/buttons/ReportButton";

const Tolva = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.tolva);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [materialId, setMaterialId] = useState(null);

  const [formValues, setFormValues] = useState({
    startTime: "",
    cantidadCargada: "",
    tipoPlastico: "unico",
    proporcion: "",
    especificaciones: "",
  });

  const columns = [
    { header: "Horario de inicio", accessor: "startTime" },
    { header: "Cantidad cargada (kg)", accessor: "cantidadCargada" },
    { header: "Tipo de plástico", accessor: "tipoPlastico" },
    { header: "Proporción cargada", accessor: "proporcion" },
    { header: "Especificaciones", accessor: "especificaciones" },
  ];

  const titles = [...columns.map((col) => col.header), "Acciones"];

  // Fetch data from API using Redux when component mounts
  useEffect(() => {
    dispatch(fetchTolva());
  }, [dispatch]);

  // Manejar apertura del modal de agregar
  const abrirModal = () => {
    setModalAbierto(true);
  };

  // Manejar cierre del modal de agregar
  const cerrarModal = () => {
    setModalAbierto(false);
  };

  // Manejar apertura del modal de editar
  const abrirModalEdit = (material) => {
    setMaterialId(material.ID);
    setFormValues({
      startTime: material.startTime,
      cantidadCargada: material.cantidadCargada,
      tipoPlastico: material.tipoPlastico,
      proporcion: material.proporcion,
      especificaciones: material.especificaciones,
    });
    setModalEdit(true);
  };

  // Manejar cierre del modal de editar
  const cerrarModalEdit = () => {
    setModalEdit(false);
  };

  // Manejar envío del formulario para agregar
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addTolva(formValues));
    cerrarModal();
  };

  // Manejar envío del formulario para editar
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    dispatch(editTolva({ id: materialId, formValues }));
    cerrarModalEdit();
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Totales
  const totalVolumen = data.reduce(
    (acc, material) => acc + parseFloat(material.cantidadCargada || 0),
    0
  );
  const totalItems = data.length;

  return (
    <SectionLayout title="Tolva">
          <AddButton abrirModal={abrirModal} title="Añadir Registro" />
          <PdfGenerator columns={columns} data={data} title="Reporte de Tolva" />
          <ReportButton />

          {error && <div className="bg-red-600 text-white py-2 px-4 rounded mb-4">Error: {error}</div>}

          {modalAbierto && (
            <AddModal
              title="Agregar Registro de Tolva"
              fields={[
                { name: "startTime", label: "Horario de inicio", type: "datetime-local", placeholder: "Horario de inicio *" },
                { name: "cantidadCargada", label: "Cantidad cargada (kg)", type: "number", placeholder: "Cantidad cargada *" },
                { name: "tipoPlastico", label: "Tipo de plástico", type: "select", options: ["unico", "tipo1", "tipo2"] },
                { name: "proporcion", label: "Proporción cargada", type: "number", placeholder: "Proporción *" },
                { name: "especificaciones", label: "Especificaciones", type: "text", placeholder: "Especificaciones *" },
              ]}
              formValues={formValues}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              cerrarModal={cerrarModal}
            />
          )}

          {modalEdit && (
            <ButtonEdit
              title="Editar Registro de Tolva"
              fields={[
                { name: "startTime", label: "Horario de inicio", type: "datetime-local", placeholder: "Horario de inicio *" },
                { name: "cantidadCargada", label: "Cantidad cargada (kg)", type: "number", placeholder: "Cantidad cargada *" },
                { name: "tipoPlastico", label: "Tipo de plástico", type: "select", options: ["unico", "tipo1", "tipo2"] },
                { name: "proporcion", label: "Proporción cargada", type: "number", placeholder: "Proporción *" },
                { name: "especificaciones", label: "Especificaciones", type: "text", placeholder: "Especificaciones *" },
              ]}
              formValues={formValues}
              handleChange={handleChange}
              handleSubmit={handleEditSubmit}
              cerrarModal={cerrarModalEdit}
            />
          )}

          {loading ? (
            <LoadingTable />
          ) : (
            <>
              <table className="table-auto w-full bg-white rounded-lg shadow-lg">
                <TablaHead titles={titles} />
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.ID}>
                      <td className="px-4 py-2">{item.startTime}</td>
                      <td className="px-4 py-2">{item.cantidadCargada}</td>
                      <td className="px-4 py-2">{item.tipoPlastico}</td>
                      <td className="px-4 py-2">{item.proporcion}</td>
                      <td className="px-4 py-2">{item.especificaciones}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => abrirModalEdit(item)}
                          className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                        >
                          Modificar
                        </button>
                        <DeleteButton
                          onClick={() => dispatch(deleteTolva(item.ID))}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-center">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <NextButton key={index} onClick={() => paginate(index + 1)} active={currentPage === index + 1}>
                    {index + 1}
                  </NextButton>
                ))}
              </div>
              <div className="mt-4 text-white">
                <p>Total de Volumen Cargado: {totalVolumen} kg</p>
                <p>Total de Items: {totalItems}</p>
              </div>
            </>
          )}
 
    </SectionLayout>
  );
};

export default Tolva;
