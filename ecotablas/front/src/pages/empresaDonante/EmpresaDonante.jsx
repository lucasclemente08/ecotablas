import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEmpresaDonante,
  addEmpresaDonante,
  editEmpresaDonante,
  deleteEmpresaDonante,
} from "../../features/empresaDonanteSlice"; // Debes crear estos thunks en tu slice
import SectionLayout from "../../layout/SectionLayout";
import AddButton from "../../components/buttons/AddButton";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import LoadingTable from "../../components/LoadingTable";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModalWithSelect from "../../components/AddModalWithSelect";
import ButtonEdit from "../../components/buttons/ButtonEdit";
import NextButton from "../../components/buttons/NextButton";

const EmpresaDonante = () => {
  const dispatch = useDispatch();
  const { data,  error } = useSelector((state) => state.empresaDonante);
  const [loading,setloading] = useState(true)
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [empresaId, setEmpresaId] = useState(null);
  const [formValues, setFormValues] = useState({
    Nombre: "",
    Direccion: "",
    Telefono: "",
    Email: "",
    TipoPlastico: "unico",
    Rubro: "",
    Web: "",
    CUIT: "",
  });

  const columns = [
    { header: "Nombre", accessor: "nombre" },
    { header: "Dirección", accessor: "direccion" },
    { header: "Teléfono", accessor: "telefono" },
    { header: "Email", accessor: "email" },
    { header: "Tipo Plástico", accessor: "tipo_plastico" },
    { header: "Rubro", accessor: "rubro" },
    { header: "Web", accessor: "web" },
  ];

  const titles = [...columns.map((col) => col.header), "Acciones"];

  useEffect(() => {
    setloading(false)
    dispatch(fetchEmpresaDonante());
  }, [dispatch]);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);
  const abrirModalEdit = (empresa) => {
    setEmpresaId(empresa.idEmpresa);
    setFormValues({
      Nombre: empresa.nombre,
      Direccion: empresa.direccion,
      Telefono: empresa.telefono,
      Email: empresa.email,
      TipoPlastico: empresa.tipo_plastico,
      Rubro: empresa.rubro,
      Web: empresa.web,
      CUIT: empresa.cuit,
    });
    setModalEdit(true);
  };
  const cerrarModalEdit = () => setModalEdit(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.Nombre || !formValues.Direccion || !formValues.Telefono) {
      console.error("Por favor completa todos los campos requeridos");
      return;
    }
    await dispatch(addEmpresaDonante(formValues)); // Asegúrate de manejar la respuesta y errores aquí
    cerrarModal();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editEmpresaDonante({ id: empresaId, formValues }));
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

  return (
    <SectionLayout title="Empresas Donantes">
      <AddButton abrirModal={abrirModal} title="Añadir Empresa Donante" />
      <PdfGenerator
        columns={columns}
        data={data}
        title="Reporte de Empresas Donantes"
      />

      {error && (
        <div className="bg-red-600 text-white py-2 px-4 rounded mb-4">
          Error: {error}
        </div>
      )}
      {modalAbierto && (
        <AddModalWithSelect
          title="Agregar Empresa Donante"
          fields={[
            { name: "CUIT", label: "CUIT", type: "text" },

            { name: "Nombre", label: "Nombre", type: "text" },
            { name: "Direccion", label: "Dirección", type: "text" },
            { name: "Telefono", label: "Teléfono", type: "text" },
            { name: "Email", label: "Email", type: "email" },
            {
              name: "TipoPlastico",
              label: "Tipo de Plástico",
              type: "select",
              options: [
                { value: "Unico", label: "Tipo-Único" },
                { value: "Mezcla", label: "Tipo-Mezcla" },
              ],
            },
            { name: "Rubro", label: "Rubro", type: "text" },
            { name: "Web", label: "Web", type: "text" },
          ]}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cerrarModal={cerrarModal}
          values={formValues}
        />
      )}
      {modalEdit && (
        <ButtonEdit
          title="Editar Empresa Donante"
          fields={[
            { name: "Nombre", label: "Nombre", type: "text" },
            { name: "Direccion", label: "Dirección", type: "text" },
            { name: "Telefono", label: "Teléfono", type: "text" },
            { name: "Email", label: "Email", type: "email" },
            {
              name: "TipoPlastico",
              label: "Tipo de Plástico",
              type: "select",
              options: [
                { value: "Unico", label: "Tipo-Único" },
                { value: "Mezcla", label: "Tipo-Mezcla" },
              ],
            },
            { name: "Rubro", label: "Rubro", type: "text" },
            { name: "Web", label: "Web", type: "text" },
            { name: "CUIT", label: "CUIT", type: "text" },
          ]}
          formValues={formValues}
          handleChange={handleChange}
          handleSubmit={handleEditSubmit}
          cerrarModal={cerrarModalEdit}
        />
      )}

    <table className="min-w-full bg-white rounded-lg shadow-md">
      <TablaHead titles={titles} />
      
{loading ? (
  <LoadingTable loading={loading} />
) : (
  
      <tbody>
        {currentItems.map((item) => (
          <tr key={item.Id_empresaDonante}>
            <td className="px-4 py-2">{item.Nombre}</td>
            <td className="px-4 py-2">{item.Direccion}</td>
            <td className="px-4 py-2">{item.Telefono}</td>
            <td className="px-4 py-2">{item.Email}</td>
            <td className="px-4 py-2">{item.TipoPlastico}</td>
            <td className="px-4 py-2">{item.Rubro}</td>
            <td className="px-4 py-2">
              <a
                href={item.Web}
                className="text-blue-600 hover:underline"
              >
                {item.Web}
              </a>
            </td>
            <td className="px-4 py-2 flex">
              <NextButton />
              <button
                onClick={() => abrirModalEdit(item)}
                className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
              >
                Modificar
              </button>
              <DeleteButton
                endpoint="http://www.gestiondeecotablas.somee.com/api/EmpresaDonante/Borrar"
                updateList={() => dispatch(fetchEmpresaDonante())}
                id={item.Id_EmpresaDonante}
              />
            </td>
          </tr>
        ))}
      </tbody>
      )}
    </table>


    </SectionLayout>
  );
};

export default EmpresaDonante;
