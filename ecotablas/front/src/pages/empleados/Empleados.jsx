import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { Toaster, toast } from 'sonner';
import PdfGenerator from "../../components/buttons/PdfGenerator";
import DeleteButton from "../../components/buttons/DeleteButton";
import SectionLayout from "../../layout/SectionLayout";
import AddButtonWa from "../../components/buttons/AddButtonWa";
import AddModalWithSelect from "../../components/AddModalWithSelect";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import TableComponent from "../../components/TableComponent";

const Empleados = () => {
  const [empleadosData, setEmpleadosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    DNI: "",
    Nombre: "",
    Apellido: "",
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filteredEmpleados, setFilteredEmpleados] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [empleadoSeleccionadoId, setEmpleadoSeleccionadoId] = useState("");
  const [sortConfig, setSortConfig] = useState({ campo: "", direction: "asc" });

  const [formValues, setFormValues] = useState({
    Nombre: "",
    Apellido: "",
    DNI: "",
    Calle: "",
    Numero: "",
    Piso: "",
    Dpto: "",
    CodPostal: "",
    IdLocalidad: "1",
    FechaIngreso: "",
    Telefono: "",
    Mail: "",
    IdArea: "1",
  });

  // Obtener todos los empleados
  const getEmpleados = () => {
    axios
      .get(`http://www.ecotablasapi.somee.com/api/Empleados/ListarTodo`)
      .then((response) => {
        setEmpleadosData(response.data);
        setFilteredEmpleados(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        toast.error("Error al obtener los datos");
      });
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  const handleSearch = () => {
    const filtered = empleadosData.filter(
      (empleado) =>
        empleado.DNI.includes(searchFilters.DNI) &&
        empleado.Nombre.toLowerCase().includes(searchFilters.Nombre.toLowerCase()) &&
        empleado.Apellido.toLowerCase().includes(searchFilters.Apellido.toLowerCase())
    );
    setFilteredEmpleados(filtered);
    if (filtered.length === 0) {
      toast.error("La consulta no arrojó datos!");
    }
  };

  const handleMostrarTodos = () => {
    setFilteredEmpleados(empleadosData);
    setSearchFilters({
      DNI: "",
      Nombre: "",
      Apellido: "",
    });
  };

  const abrirModal = () => {
    setFormValues({
      Nombre: "",
      Apellido: "",
      DNI: "",
      Calle: "",
      Numero: "",
      Piso: "",
      Dpto: "",
      CodPostal: "",
      IdLocalidad: "1",
      FechaIngreso: "",
      Telefono: "",
      Mail: "",
      IdArea: "1",
    });
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const abrirModalEdit = (empleado) => {
    setEmpleadoSeleccionadoId(empleado.IdEmpleado);
    setFormValues({
      Nombre: empleado.Nombre || "",
      Apellido: empleado.Apellido || "",
      DNI: empleado.DNI || "",
      Calle: empleado.Calle || "",
      Numero: empleado.Numero || "",
      Piso: empleado.Piso || "",
      Dpto: empleado.Dpto || "",
      CodPostal: empleado.CodPostal || "",
      IdLocalidad: empleado.IdLocalidad || "1",
      FechaIngreso: empleado.FechaIngreso || "",
      Telefono: empleado.Telefono || "",
      Mail: empleado.Mail || "",
      IdArea: empleado.IdArea || "1",
    });
    setModalEdit(true);
  };

  const cerrarModalEdit = () => {
    setModalEdit(false);
    // Opcional: resetear los valores al cerrar
    setFormValues({
      Nombre: "",
      Apellido: "",
      DNI: "",
      Calle: "",
      Numero: "",
      Piso: "",
      Dpto: "",
      CodPostal: "",
      IdLocalidad: "1",
      FechaIngreso: "",
      Telefono: "",
      Mail: "",
      IdArea: "1",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const verificarDNIExistente = (dni) => {
    return empleadosData.some(empleado => empleado.DNI === dni);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (verificarDNIExistente(formValues.DNI)) {
      toast.error('Ya existe un empleado con el mismo DNI');
      return;
    }

    if (!formValues.Nombre || !formValues.Apellido || !formValues.DNI || 
        !formValues.Calle || !formValues.Numero || !formValues.CodPostal || 
        !formValues.FechaIngreso || !formValues.Telefono || !formValues.Mail || 
        !formValues.IdArea) {
      toast.error('Todos los campos requeridos deben ser completados');
      return;
    }

    axios.post(`http://www.ecotablasapi.somee.com/api/Empleados/Insertar`, formValues)
      .then(() => {
        toast.success("Empleado agregado correctamente");
        cerrarModal();
        getEmpleados();
      })
      .catch(error => {
        console.error("Error al agregar el empleado:", error);
        toast.error("Error al agregar el empleado");
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    if (!formValues.Nombre || !formValues.Apellido || !formValues.DNI || 
        !formValues.Calle || !formValues.Numero || !formValues.CodPostal || 
        !formValues.FechaIngreso || !formValues.Telefono || !formValues.Mail || 
        !formValues.IdArea) {
      toast.error('Todos los campos son obligatorios!');
      return;
    }

    if (formValues.DNI.length > 8) {
      toast.error('El DNI no puede tener más de 8 dígitos');
      return;
    }

    axios.put(`http://www.ecotablasapi.somee.com/api/Empleados/Modificar/${empleadoSeleccionadoId}`, formValues)
      .then(() => {
        toast.success("Modificación exitosa");
        cerrarModalEdit();
        getEmpleados();
      })
      .catch(error => {
        console.error("Error al modificar el empleado:", error);
        toast.error("Error al modificar el empleado");
      });
  };

  const handleSort = (campo) => {
    let direction = "asc";
    if (sortConfig.campo === campo && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...filteredEmpleados].sort((a, b) => {
      if (a[campo] < b[campo]) return direction === "asc" ? -1 : 1;
      if (a[campo] > b[campo]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredEmpleados(sortedData);
    setSortConfig({ campo, direction });
  };

  const columns = [
    { header: "Nombre", accessor: "Nombre" },
    { header: "Apellido", accessor: "Apellido" },
    { header: "DNI", accessor: "DNI" },
    { header: "Código Postal", accessor: "CodPostal" },
    { header: "Fecha de Ingreso", accessor: "FechaIngreso" },
    { header: "Teléfono", accessor: "Telefono" },
    { header: "Email", accessor: "Mail" },
  ];

  const titlesT = [
    { 
      key: "Nombre", 
      label: "Nombre",
      type: "text" // Esto hará que se alinee a la izquierda
    },
    { 
      key: "Apellido", 
      label: "Apellido",
      type: "text" // Texto a la izquierda
    },
    { 
      key: "DNI", 
      label: "DNI",
      type: "number" // Números a la derecha
    },
    { 
      key: "CodPostal", 
      label: "Código Postal",
      type: "number" // Números a la derecha
    },
    { 
      key: "FechaIngreso", 
      label: "Fecha de Ingreso",
      type: "date" // Fechas centradas
    },
    { 
      key: "Telefono", 
      label: "Teléfono",
      type: "number" // Números a la derecha
    },
    { 
      key: "Mail", 
      label: "Email",
      type: "text", // Texto a la izquierda
      render: (value) => value || "No disponible"
    },
  ];

  const actions = [
    {
      allowedRoles: ["admin", "supervisor"],
      render: (item) => (
        <td className="px-4 py-2 flex">
          <button
            onClick={() => abrirModalEdit(item)}
            className="bg-yellow-700 ml-2 flex justify-center items-center hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FiEdit className="mr-1"/>
            Modificar
          </button>
          <DeleteButton
            endpoint="http://www.ecotablasapi.somee.com/api/Empleados/Borrar"
            updateList={getEmpleados}
            id={item.IdEmpleado}
          />
        </td>
      ),
    },
  ];

  return (
    <SectionLayout title="Empleados">
      <Toaster />
      <AddButtonWa abrirModal={abrirModal} title="Añadir Empleado" />
      <PdfGenerator
        columns={columns}
        data={filteredEmpleados}
        title="Reporte de Empleados"
      />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por DNI"
          value={searchFilters.DNI}
          onChange={(e) => setSearchFilters({ ...searchFilters, DNI: e.target.value })}
          className="border p-2 w-full mt-2"
        />

        {mostrarFiltros && (
          <>
            <input
              type="text"
              placeholder="Buscar por Nombre"
              value={searchFilters.Nombre}
              onChange={(e) => setSearchFilters({ ...searchFilters, Nombre: e.target.value })}
              className="border p-2 w-full mt-2"
            />
            <input
              type="text"
              placeholder="Buscar por Apellido"
              value={searchFilters.Apellido}
              onChange={(e) => setSearchFilters({ ...searchFilters, Apellido: e.target.value })}
              className="border p-2 w-full mt-2"
            />
          </>
        )}

        <div className="flex items-center mt-2">
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Buscar
          </button>
          <button
            onClick={handleMostrarTodos}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
          >
            Mostrar Todos
          </button>
          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 ml-2 rounded"
          >
            {mostrarFiltros ? "Ocultar Filtros" : "Agregar Filtros"}
          </button>
        </div>
      </div>

      {modalAbierto && (
        <AddModalWithSelect
          title="Agregar Empleado"
          fields={[
            { name: "DNI", label: "DNI", type: "text" },
            { name: "Nombre", label: "Nombre", type: "text" },
            { name: "Apellido", label: "Apellido", type: "text" },
            { name: "Calle", label: "Calle", type: "text" },
            { name: "Numero", label: "Número", type: "text" },
            { name: "Piso", label: "Piso", type: "text" },
            { name: "Dpto", label: "Dpto", type: "text" },
            { name: "CodPostal", label: "Código Postal", type: "text" },
            { name: "IdLocalidad", label: "IdLocalidad", type: "text" },
            { name: "FechaIngreso", label: "Fecha de Ingreso", type: "date" },
            { name: "Telefono", label: "Teléfono", type: "text" },
            { name: "Mail", label: "Email", type: "email" },
            { name: "IdArea", label: "IdArea", type: "text" },
          ]}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cerrarModal={cerrarModal}
          values={formValues}
        />
      )}

      {modalEdit && (
        <ButtonEdit
          title="Editar Empleado"
          fields={[
            { name: "DNI", label: "DNI", type: "text" },
            { name: "Nombre", label: "Nombre", type: "text" },
            { name: "Apellido", label: "Apellido", type: "text" },
            { name: "Calle", label: "Calle", type: "text" },
            { name: "Numero", label: "Número", type: "text" },
            { name: "Piso", label: "Piso", type: "text" },
            { name: "Dpto", label: "Dpto", type: "text" },
            { name: "CodPostal", label: "Código Postal", type: "text" },
            { name: "IdLocalidad", label: "IdLocalidad", type: "text" },
            { name: "FechaIngreso", label: "Fecha de Ingreso", type: "date" },
            { name: "Telefono", label: "Teléfono", type: "text" },
            { name: "Mail", label: "Email", type: "email" },
            { name: "IdArea", label: "IdArea", type: "text" },
          ]}
          formValues={formValues}
          handleChange={handleChange}
          handleEditSubmit={handleEditSubmit}
          cerrarModalEdit={cerrarModalEdit}
        />
      )}

      <TableComponent
        data={filteredEmpleados}
        titles={titlesT}
        sortConfig={sortConfig}
        onSort={handleSort}
        actions={actions}
        hasMaterial={true}
        loading={loading}
      />
    </SectionLayout>
  );
};

export default Empleados;