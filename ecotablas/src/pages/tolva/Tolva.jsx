import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTolva,
  addTolva,
  editTolva,
  deleteTolva,
} from "../../features/tolvaSlice";
import SectionLayout from "../../layout/SectionLayout";

import PdfGenerator from "../../components/buttons/PdfGenerator";
import LoadingTable from "../../components/LoadingTable";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModalWithSelect from "../../components/AddModalWithSelect";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import NextButton from "../../components/buttons/NextButton";
import AddButtonWa from "../../components/buttons/AddButtonWa";

const Tolva = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.tolva);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [materialId, setMaterialId] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [formValues, setFormValues] = useState({
    HorarioInicio: "",
    CantidadCargada: "",
    TipoPlastico: "unico",
    Proporcion: "",
    Especificaciones: "",
  });
  const [dataLoaded, setDataLoaded] = useState(false); // Estado para verificar si los datos han sido cargados
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Cambié a 5 items por página
  const totalPages = Math.ceil(data.length / itemsPerPage); // Total de páginas

  const columns = [
    { header: "Horario de inicio", accessor: "horario_inicio" },
    { header: "Cantidad cargada (kg)", accessor: "cantidadCargada" },
    { header: "Tipo de plástico", accessor: "tipo_plastico" },
    { header: "Proporción cargada", accessor: "proporcion" },
    { header: "Especificaciones", accessor: "especificaciones" },
  ];

  const titles = [...columns.map((col) => col.header), "Acciones"];
  const optionsTipoPlastico = [
    { value: "Unico", label: "Tipo-Único" },
    { value: "Mescla", label: "Tipo-Mezcla" },
    // ... otras opciones
  ];
  useEffect(() => {
    if (!dataLoaded) {
      dispatch(fetchTolva());
      setDataLoaded(true);
    }
  }, [dispatch, dataLoaded]);

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
      setMensaje("Por favor completa todos los campos requeridos");
      return;
    }
    await dispatch(addTolva(formValues));
    setMensaje("Registro agregado exitosamente!");
    cerrarModal();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editTolva({ id: materialId, formValues }));
    setMensaje("Registro editado exitosamente!");
    cerrarModalEdit();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <SectionLayout title="Tolva">
      <AddButtonWa abrirModal={abrirModal} title="Añadir Registro" />
      <PdfGenerator columns={columns} data={data} title="Reporte de Tolva" />

      {mensaje && (
        <div className="bg-blue-600 text-white py-2 px-4 rounded mb-4">
          {mensaje}
        </div>
      )}

      {error && (
        <div className="bg-red-600 text-white py-2 px-4 rounded mb-4">
          Error: {error}
        </div>
      )}

      {modalAbierto && (
        <AddModalWithSelect
          title="Agregar Registro de Tolva"
          fields={[
            {
              name: "HorarioInicio",
              label: "Horario de inicio",
              type: "datetime-local",
            },
            {
              name: "CantidadCargada",
              label: "Cantidad cargada (kg)",
              type: "number",
            },
            {
              name: "TipoPlastico",
              label: "Tipo de plástico",
              type: "select",
              options: optionsTipoPlastico,
            },
            { name: "Proporcion", label: "Proporción cargada", type: "number" },
            {
              name: "Especificaciones",
              label: "Especificaciones",
              type: "text",
            },
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
            {
              name: "CantidadCargada",
              label: "Cantidad cargada (kg)",
              type: "number",
              placeholder: "Cantidad cargada *",
            },
            {
              name: "TipoPlastico",
              label: "Tipo de plástico",
              type: "select",
              options: optionsTipoPlastico,
            },
            {
              name: "Proporcion",
              label: "Proporción cargada",
              type: "number",
              placeholder: "Proporción *",
            },
            {
              name: "Especificaciones",
              label: "Especificaciones",
              type: "text",
              placeholder: "Especificaciones *",
            },
          ]}
          formValues={formValues}
          handleChange={handleChange}
          handleEditSubmit={handleEditSubmit}
          cerrarModalEdit={cerrarModalEdit}
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
                  <td className="px-4 py-2 ">
                    {item.HorarioInicio.slice(0, 10)}
                  </td>
                  <td className="px-4 py-2">{item.CantidadCargada}</td>
                  <td className="px-4 py-2">{item.TipoPlastico}</td>
                  <td className="px-4 py-2">{item.Proporcion}</td>
                  <td className="px-4 py-2">{item.Especificaciones}</td>
                  <td className="px-4 py-2 flex">
                    <NextButton />
                    <button
                      onClick={() => abrirModalEdit(item)}
                      className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Modificar
                    </button>
                    <DeleteButton
                      id={item.IdTolva}
                      endpoint="http://www.gestiondeecotablas.somee.com/api/Tolva/Delete"
                      updateList={() => {
                        dispatch(fetchTolva());
                        setMensaje("Registro eliminado exitosamente!");
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center bg-gray-700">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2  ml-2 hover:text-gray-400 text-white rounded-l"
            >
              Anterior
            </button>
            <span className="text-gray-300">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 hover:text-gray-400  text-white rounded-r"
            >
              Siguiente
            </button>
          </div>
          <div className="mt-4 text-white">
            <p>Total de Items: {data.length}</p>
          </div>
        </>
      )}
    </SectionLayout>
  );
};

export default Tolva;
