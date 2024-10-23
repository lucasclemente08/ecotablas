import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTolva, addTolva, editTolva, deleteTolva } from "../../features/tolvaSlice";
import SectionLayout from "../../layout/SectionLayout";
import AddButton from "../../components/buttons/AddButton";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import LoadingTable from "../../components/LoadingTable";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModalWithSelect from "../../components/AddModalWithSelect";
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
    HorarioInicio: "",
    CantidadCargada: "",
    TipoPlastico: "unico",
    Proporcion: "",
    Especificaciones: "",
  });

  const columns = [
    { header: "Horario de inicio", accessor: "horario_inicio" },
    { header: "Cantidad cargada (kg)", accessor: "cantidadCargada" },
    { header: "Tipo de plástico", accessor: "tipo_plastico" },
    { header: "Proporción cargada", accessor: "proporcion" },
    { header: "Especificaciones", accessor: "especificaciones" },
  ];

  const titles = [...columns.map((col) => col.header), "Acciones"];

  useEffect(() => {
    dispatch(fetchTolva());
  }, [dispatch]);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);
  const abrirModalEdit = (material) => {
    setMaterialId(material.idTolva);
    setFormValues({
      HorarioInicio: material.horario_inicio,
      CantidadCargada: material.cantidadCargada,
      TipoPlastico: material.tipo_plastico,
      Proporcion: material.proporcion,
      Especificaciones: material.especificaciones,
    });
    setModalEdit(true);
  };
  const cerrarModalEdit = () => setModalEdit(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.HorarioInicio || !formValues.CantidadCargada) {
      console.error("Por favor completa todos los campos requeridos");
      return;
      console.log(formValues)
    }
    await dispatch(addTolva(formValues)); 
    cerrarModal();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editTolva({ id: materialId, formValues }));
    cerrarModalEdit();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalVolumen = data.reduce(
    (acc, material) => acc + parseFloat(material.cantidadCargada || 0),
    0
  );
  const totalItems = data.length;

  const optionsTipoPlastico = [
    { value: 'Unico', label: 'Tipo-Único' },
    { value: 'Mescla', label: 'Tipo-Mezcla' },
    // ... otras opciones
  ];

  return (
    <SectionLayout title="Tolva">
      <AddButton abrirModal={abrirModal} title="Añadir Registro" />
      <PdfGenerator columns={columns} data={data} title="Reporte de Tolva" />
      <ReportButton />

      {error && <div className="bg-red-600 text-white py-2 px-4 rounded mb-4">Error: {error}</div>}
      {modalAbierto && (
        <AddModalWithSelect 
          title="Agregar Registro de Tolva"
          fields={[
            { name: "HorarioInicio", label: "Horario de inicio", type: "datetime-local" },
            { name: "CantidadCargada", label: "Cantidad cargada (kg)", type: "number" },
            { name: "TipoPlastico", label: "Tipo de plástico", type: "select", options: optionsTipoPlastico },
            { name: "Proporcion", label: "Proporción cargada", type: "number" },
            { name: "Especificaciones", label: "Especificaciones", type: "text" },
          ]}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cerrarModal={cerrarModal}
          values={formValues}
        />
      )}
      {modalEdit && (
        <ButtonEdit
          title="Editar Registro de Tolva"
          fields={[
            { name: "CantidadCargada", label: "Cantidad cargada (kg)", type: "number", placeholder: "Cantidad cargada *" },
            { name: "TipoPlastico", label: "Tipo de plástico", type: "select", options: optionsTipoPlastico },
            { name: "Proporcion", label: "Proporción cargada", type: "number", placeholder: "Proporción *" },
            { name: "Especificaciones", label: "Especificaciones", type: "text", placeholder: "Especificaciones *" },
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
                <tr key={item.IdTolva}>
                  <td className="px-4 py-2">{item.HorarioInicio}</td>
                  <td className="px-4 py-2">{item.CantidadCargada}</td>
                  <td className="px-4 py-2">{item.TipoPlastico}</td>
                  <td className="px-4 py-2">{item.Proporcion}</td>
                  <td className="px-4 py-2">{item.Especificaciones}</td>
                  <td className="px-4 py-2 flex">
                    <NextButton/>
                    <button
                      onClick={() => abrirModalEdit(item)}
                      className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Modificar
                    </button>
                    <DeleteButton
                      id={item.IdTolva}
                      endpoint="http://localhost:61274/api/Tolva/Borrar"
                      updateList={fetchTolva}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            {/* {Array.from({ length: totalPages }).map((_, index) => (
              <NextButton key={index} onClick={() => paginate(index + 1)} active={currentPage === index + 1}>
                {index + 1}
              </NextButton>
            ))} */}
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
