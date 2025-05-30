import React, { useState, useEffect } from "react";

import { FiEdit } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEmpresaDonante,
  addEmpresaDonante,
  editEmpresaDonante,
  deleteEmpresaDonante,
} from "../../features/empresaDonanteSlice"; // Debes crear estos thunks en tu slice
import SectionLayout from "../../layout/SectionLayout";
import AddButtonWa from "../../components/buttons/AddButtonWa";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import LoadingTable from "../../components/LoadingTable";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModalWithSelect from "../../components/AddModalWithSelect";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import NextButton from "../../components/buttons/NextButton";
import axios from "axios";
import TableComponent from "../../components/TableComponentResp";
import { Toaster, toast } from "sonner";
const EmpresaDonante = () => {
  const dispatch = useDispatch();
  const { data: data, error } = useSelector((state) => state.empresaDonante);

  const [loading, setloading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [empresaId, setEmpresaId] = useState(null);
  const [formValues, setFormValues] = useState({
    Nombre: "",
    Direccion: "",
    Telefono: "",
    Email: "",
    TipoPlastico: "",
    Rubro: "",
    Web: "",
    CUIT: "",
  });

  const columns = [
    { header: "Nombre", dataKey: "Nombre" },
    { header: "Dirección", dataKey: "Direccion" },
    { header: "Teléfono", dataKey: "Telefono" },
    { header: "Email", dataKey: "Email" },

  ];

  const titles = [...columns.map((col) => col.header), "Acciones"];

  useEffect(() => {
    setloading(false);
    dispatch(fetchEmpresaDonante());
  }, [dispatch]);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => { 
    setModalAbierto(false);
    formValues({
    Nombre: "",
    Direccion: "",
    Telefono: "",
    Email: "",
    TipoPlastico: "",
    Rubro: "",
    Web: "",
    CUIT: "",
     });
      };
  const abrirModalEdit = (empresa) => {
    setEmpresaId(empresa.Id_empresaDonante); // Asegurar que se guarde correctamente el ID
    console.log(empresaId);
    setFormValues({
      Nombre: empresa.Nombre || "",
      Direccion: empresa.Direccion || "",
      Telefono: empresa.Telefono || "",
      Email: empresa.Email || "",
      TipoPlastico: empresa.Tipo_plastico || "",
      Rubro: empresa.Rubro || "",
      Web: empresa.Web || "",
      DonacionesDisponibles: empresa.DonacionesDisponibles || "",
      CUIT: empresa.Cuit || "",
    });
    setModalEdit(true);
  };

  const cerrarModalEdit = () => {
    setModalEdit(false);

    setFormValues({
      Nombre: "",
      Direccion: "",
      Telefono: "",
      Email: "",
      TipoPlastico: "",
      Rubro: "",
      Web: "",
      CUIT: "",
       });
        };
        const handleSubmit = async (e) => {
          e.preventDefault();
          if (!formValues.Nombre || !formValues.Direccion || !formValues.Telefono) {
            toast.error("Por favor completa todos los campos requeridos");
            return;
          }
        
          try {
            const response = await axios.post(
              "http://www.ecotablasapi.somee.com/api/EmpresaDonante/Insertar",
              formValues
            );
        
            if (response.data) {
              // Actualizar el estado global usando Redux
              dispatch(fetchEmpresaDonante());
              toast.success("Empresa agregada correctamente");
              cerrarModal();
            } else {
              throw new Error("Respuesta vacía del servidor");
            }
          } catch (error) {
            console.error("Error al agregar empresa:", error);
            toast.error(`Error al agregar: ${error.message}`);
          }
        };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!formValues.Nombre || !formValues.Direccion || !formValues.Telefono) {
      toast.error("Por favor completa todos los campos requeridos");
    }

    axios
      .put(
        `http://www.ecotablasapi.somee.com/api/EmpresaDonante/Modificar/${empresaId}`,
        formValues,
      )
      .then(() => {
        setModalEdit(false);
        dispatch(fetchEmpresaDonante())

        toast.success("Material actualizado!", { autoClose: 3000 });
      })
      .catch((error) => {
        console.error("Error al modificar el material:", error);
        toast.error("Hubo un error al actualizar.", { autoClose: 3000 }); // ⬅️ Agregué un toast de error
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const titlesT = [
    {
      key: "Nombre",
      label: "Nombre",
      type: "text", // Texto alineado a la izquierda
    },
    {
      key: "Direccion",
      label: "Dirección",
      type: "text", // Texto alineado a la izquierda
    },
    {
      key: "Telefono",
      label: "Teléfono",
      type: "number", // Números alineados a la derecha
    },
    {
      key: "Email",
      label: "Email",
      type: "text", // Texto alineado a la izquierda
    },
    
    {
      key: "TipoPlastico",
      label: "Tipo de Plástico",
      type: "text", // Texto alineado a la izquierda
    },
    {
      key: "Rubro",
      label: "Rubro",
      type: "text", // Texto alineado a la izquierda
    },
    {
      key: "Web",
      label: "Web",
      type: "text", // Texto alineado a la izquierda (aunque el render personalizado sobrescribe esto)
      render: (value) =>
        value ? (
          <a href={value} className="text-blue-600 font-normal hover:underline">
            {value}
          </a>
        ) : (
          "No disponible"
        ),
      hasActions: true,
    },
    {
      key: "DonacionesDisponibles",
      label: "Donaciones Disponibles",
      type: "text", // Números alineados a la derecha
    },
  ];
  const actions = [
    {
      allowedRoles: ["admin", "supervisor"],
      render: (item) => (
        <div className="flex items-center justify-start gap-2 py-1">

        <button
          onClick={() => abrirModalEdit(item)}
          className="bg-yellow-600 ml-2 hover:bg-yellow-700 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
              <FiEdit  className="mr-1"/>
          Modificar
        </button>
        <DeleteButton
          endpoint="http://www.ecotablasapi.somee.com/api/EmpresaDonante/Borrar"
          updateList={() => dispatch(fetchEmpresaDonante())}
          id={item.Id_empresaDonante}
        />
    </div>
      ),
    },
  ];
  const [sortConfig, setSortConfig] = useState({ campo: "", direction: "asc" });
  const [dataE, setDataE] = useState(data);
  useEffect(() => {
    setDataE(data);
  }, [data]);

  const handleSort = (campo) => {
    let direction = "asc";
    if (sortConfig.campo === campo && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...dataE].sort((a, b) => {
      if (a[campo] < b[campo]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[campo] > b[campo]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    console.log(sortedData);
    setDataE(sortedData);

    setSortConfig({ campo, direction });
  };
  return (
    <SectionLayout title="Empresas Donantes">
      <Toaster />
      <AddButtonWa abrirModal={abrirModal} title="Añadir Empresa Donante" />
      <PdfGenerator
        columns={columns}
        data={data}
        title="Reporte de Empresas Donantes"
      />

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
            {
              name: "DonacionesDisponibles",
              label: "Donaciones Disponibles",
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
          title="Empresa Donante"
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
            {
              name: "DonacionesDisponibles",
              label: "Donaciones Disponibles",
              type: "text",
            },
            { name: "CUIT", label: "CUIT", type: "text" },
          ]}
          formValues={formValues}
          handleChange={handleChange}
          handleEditSubmit={handleEditSubmit}
          cerrarModalEdit={cerrarModalEdit}
        />
      )}

<div className="overflow-x-auto">
      <TableComponent
      data={dataE}
      titles={titlesT}
      sortConfig={sortConfig}
      onSort={handleSort}
      actions={actions}
      hasMaterial={true}
    />
 </div>    
      {/* <tbody>
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
            
          </tr>
        ))}
      </tbody> */}
    </SectionLayout>
  );
};

export default EmpresaDonante;
