import React, { useEffect, useState} from "react";
import axios from "axios";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { FaEdit } from 'react-icons/fa';

import PdfGenerator from "../../components/buttons/PdfGenerator";
import { FiEdit } from "react-icons/fi";
import toast from 'react-hot-toast';
import { FaSearch, FaList, FaFilter } from 'react-icons/fa';
import DeleteButton from "../../components/buttons/DeleteButton";
import SectionLayout from "../../layout/SectionLayout";
import LoadingTable from "../../components/LoadingTable";
import AddButtonWa from "../../components/buttons/AddButtonWa";
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
  const [modalAbiertoMod, setModalAbiertoMod] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    campo: null,
    direction: "asc",
  });
  const [empleadoSeleccionadoId, setEmpleadoSeleccionadoId] = useState("");
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({
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

  const [nuevoEmpleado, setNuevoEmpleado] = useState({
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

const [mensaje,setMensaje]=useState("")

  // Obtener todos los empleados
  function getEmpleados() {
    axios
      .get(`http://www.ecotablasapi.somee.com/api/Empleados/ListarTodo`)
      .then((response) => {
        setEmpleadosData(response.data);
        setLoading(false)
        setFilteredEmpleados(response.data);
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }

  useEffect(() => {
    getEmpleados();
  }, []);


  const handleSearch = () => {
    const filtered = empleadosData.filter(
      (empleado) =>
        empleado.DNI.includes(searchFilters.DNI) &&
        empleado.Nombre.toLowerCase().includes(
          searchFilters.Nombre.toLowerCase(),
        ) &&
        empleado.Apellido.toLowerCase().includes(
          searchFilters.Apellido.toLowerCase(),
        ),
    );
    setFilteredEmpleados(filtered);
    if (filtered.length === 0) {
    
      toast('La consulta no arrojó datos!', {
        duration: 4000,
        style: { background: '#3b82f6', color: '#fff' },
        iconTheme: { primary: '#fff', secondary: '#2563eb' },
      });
    } else {
      setMensaje("");
    }
  };

  const handleMostrarTodos = () => {
    setFilteredEmpleados(empleadosData);
    setSearchFilters({
      DNI: "",
      Nombre: "",
      Apellido: "",
    });
    setMensaje("");
  };

  const abrirModal = () => {
    setModalAbierto(true);
  };

  const abrirModalModificar = async (idEmpleado) => {
    try {
      const response = await axios.get(`http://www.ecotablasapi.somee.com/api/Empleados/ListarPorId/${idEmpleado}`);
      const empleado = response.data;
  
      setEmpleadoSeleccionado({
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
      setEmpleadoSeleccionadoId(idEmpleado);
      setModalAbiertoMod(true);
    } catch (error) {
      console.error("Error al obtener los datos del empleado:", error);
    }
  };
  
  

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const cerrarModalMod = () => {
    setModalAbiertoMod(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNuevoEmpleado((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleChangeEmpleado = (e) => {
    const { name, value } = e.target;
    setEmpleadoSeleccionado((prev) => ({
      ...prev,
      [name]: value, // Actualiza el campo correspondiente
    }));
  };
  

  // Verificar si existe un empleado con el mismo DNI
  const verificarDNIExistente = () => {
    return empleadosData.some((empleado) => empleado.DNI === nuevoEmpleado.DNI);
  };

  const handleSubmit = () => {
   
    if (verificarDNIExistente()) {
      toast('Ya existe un empleado con el mismo DNI', {
        duration: 4000,
        style: { background: '#3b82f6', color: '#fff' },
        iconTheme: { primary: '#fff', secondary: '#2563eb' },
      });
      return;
    }
  
    if (
      !nuevoEmpleado.Nombre ||
      !nuevoEmpleado.Apellido ||
      !nuevoEmpleado.DNI ||
      !nuevoEmpleado.Calle ||
      !nuevoEmpleado.Numero ||
      !nuevoEmpleado.CodPostal ||
      !nuevoEmpleado.FechaIngreso ||
      !nuevoEmpleado.Telefono ||
      !nuevoEmpleado.Mail ||
      !nuevoEmpleado.IdArea
    ) {
    
      toast('Todos los campos requeridos deben ser completados', {
        duration: 4000,
        style: { background: '#3b82f6', color: '#fff' },
        iconTheme: { primary: '#fff', secondary: '#2563eb' },
      });
      return;
    }
  
    axios
      .post(
        `http://www.ecotablasapi.somee.com/api/Empleados/Insertar`,
        nuevoEmpleado,
      )
      .then((response) => {
        toast.success("Empleado agregado correctamente");
        setModalAbierto(false);
  
        axios
          .get(`http://www.ecotablasapi.somee.com/api/Empleados/ListarTodo`)
          .then((response) => {
            setEmpleadosData(response.data);
            setFilteredEmpleados(response.data);
          })
          .catch((error) =>
            toast.error("Error al obtener los datos:", error),
          );
      })
      .catch((error) => toast.error("Error al agregar el empleado:", error));
  };
  

  


  const handleSubmitModificar = () => {
    if (
      !empleadoSeleccionado.Nombre ||
      !empleadoSeleccionado.Apellido ||
      !empleadoSeleccionado.DNI ||
      !empleadoSeleccionado.Calle ||
      !empleadoSeleccionado.Numero ||
      !empleadoSeleccionado.CodPostal ||
      !empleadoSeleccionado.FechaIngreso ||
      !empleadoSeleccionado.Telefono ||
      !empleadoSeleccionado.Mail ||
      !empleadoSeleccionado.IdArea
    ) {

      toast('Todos los campos son obligatorios!', {
        duration: 4000,
        style: { background: '#3b82f6', color: '#fff' },
        iconTheme: { primary: '#fff', secondary: '#2563eb' },
      });
      return;
    }
    if (empleadoSeleccionado.DNI.length > 8) {
      toast('El DNI no puede tener más de 8 dígitos', {
        duration: 4000,
        style: { background: '#3b82f6', color: '#fff' },
        iconTheme: { primary: '#fff', secondary: '#2563eb' },
      });
      return;
    }

    axios
      .put(
        `http://www.ecotablasapi.somee.com/api/Empleados/Modificar/${empleadoSeleccionadoId}`,
        empleadoSeleccionado,
      )
      .then((response) => {
        setModalAbiertoMod(false);
        toast.success("Modificación exitosa");
        axios
          .get(
            `http://www.ecotablasapi.somee.com/api/Empleados/ListarTodo`,
          )
          .then((response) => {
            setEmpleadosData(response.data);
            setFilteredEmpleados(response.data);
          })
          .catch((error) =>
            consol.error("Error al obtener los datos:", error),
          );
      })
      .catch((error) =>
        toast.error("Error al modificar el empleado:", error),
      );
  };

  const handleSort = (campo) => {
    let direction = "asc";
    if (sortConfig.campo === campo && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedEmpleados = [...filteredEmpleados].sort((a, b) => {
      if (a[campo].toLowerCase() < b[campo].toLowerCase())
        return direction === "asc" ? -1 : 1;
      if (a[campo].toLowerCase() > b[campo].toLowerCase())
        return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredEmpleados(sortedEmpleados);
    setSortConfig({ campo, direction });
  };

  const columns = [
    { header: "Nombre", dataKey: "Nombre" },
    { header: "Apellido", dataKey: "Apellido" },
    { header: "DNI", dataKey: "DNI" },
    { header: "Código Postal", dataKey: "CodPostal" },
    { header: "Fecha de Ingreso", dataKey: "FechaIngreso" },
    { header: "Teléfono", dataKey: "Telefono" },
    { header: "Email", dataKey: "Mail" },
  ];
  const rows = filteredEmpleados.map((empleado) => ({
    Nombre: empleado.Nombre,
    Apellido: empleado.Apellido,
    DNI: empleado.DNI,
    CodPostal: empleado.CodPostal,
    FechaIngreso: empleado.FechaIngreso,
    Telefono: empleado.Telefono,
    Mail: empleado.Mail,
  }));


  const campos = [
    { name: "DNI", placeholder: "DNI *" ,  },
    { name: "Nombre", placeholder: "Nombre *" },
    { name: "Apellido", placeholder: "Apellido *" },
    { name: "Calle", placeholder: "Calle *" },
    { name: "Numero", placeholder: "Número *" },
    { name: "Piso", placeholder: "Piso" },
    { name: "Dpto", placeholder: "Dpto" },
    { name: "CodPostal", placeholder: "Código Postal *" },
    { name: "IdLocalidad", placeholder: "IdLocalidad" },
    { name: "Telefono", placeholder: "Teléfono *" },
    { name: "Mail", placeholder: "Mail *" },
  ];

  
  return (
    <>
      <SectionLayout>
        <div className="">
          <AddButtonWa abrirModal={abrirModal} title={"Añadir empleado"} />
          <PdfGenerator
            columns={columns}
            rows={rows}
            data={filteredEmpleados}
            title="Empleados"
          />

{modalAbierto && (
  <div className="fixed inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >
        &#8203;
      </span>
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Agregar Empleado
            </h3>
            <div className="mt-2">
              {/* Inputs dinámicos */}
              {campos.map((campo, index) => (
                <input
                  key={index}
                  type="text"
                  name={campo.name}
                  placeholder={campo.placeholder}
                  value={nuevoEmpleado[campo.name]}
                  onChange={handleChange}
                  className="border p-2 w-full mt-2"
                />
              ))}
              <input
                type="date"
                name="FechaIngreso"
                value={nuevoEmpleado.FechaIngreso}
                onChange={handleChange}
                className="border p-2 w-full mt-2"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm`}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
          <button
            onClick={cerrarModal}
            className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
)}

          {modalAbiertoMod && (
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <div>
          
                
                    <div className="mt-3 text-center sm:mt-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Modificar Empleado
                      </h3>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="DNI"
                          placeholder="DNI *"
                          value={empleadoSeleccionado.DNI}
                          onChange={handleChangeEmpleado}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="Nombre"
                          placeholder="Nombre *"
                          value={empleadoSeleccionado.Nombre}
                          onChange={handleChangeEmpleado}
                          className="border p-2 w-full"
                        />
                        <input
                          type="text"
                          name="Apellido"
                          placeholder="Apellido *"
                          value={empleadoSeleccionado.Apellido}
                          onChange={handleChangeEmpleado}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="Calle"
                          placeholder="Calle *"
                          value={empleadoSeleccionado.Calle}
                          onChange={handleChangeEmpleado}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="Numero"
                          placeholder="Número *"
                          value={empleadoSeleccionado.Numero}
                          onChange={handleChangeEmpleado}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="Piso"
                          placeholder="Piso"
                          value={empleadoSeleccionado.Piso}
                          onChange={handleChangeEmpleado}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="Dpto"
                          placeholder="Dpto"
                          value={empleadoSeleccionado.Dpto}
                          onChange={handleChangeEmpleado}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="CodPostal"
                          placeholder="Código Postal *"
                          value={empleadoSeleccionado.CodPostal}
                          onChange={handleChangeEmpleado}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="IdLocalidad"
                          placeholder="IdLocalidad"
                          value={empleadoSeleccionado.IdLocalidad}
                          onChange={handleChangeEmpleado}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="date"
                          name="FechaIngreso"
                          placeholder="Fecha de Ingreso (dd/mm/aaaa) *"
                          value={empleadoSeleccionado.FechaIngreso}
                          onChange={handleChangeEmpleado}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="Telefono"
                          placeholder="Teléfono *"
                          value={empleadoSeleccionado.Telefono}
                          onChange={handleChangeEmpleado}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="Mail"
                          placeholder="Mail *"
                          value={empleadoSeleccionado.Mail}
                          onChange={handleChangeEmpleado}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="IdArea"
                          placeholder="IdArea *"
                          value={empleadoSeleccionado.IdArea}
                          onChange={handleChangeEmpleado}
                          className="border p-2 w-full mt-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      onClick={handleSubmitModificar}
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={cerrarModalMod}
                      className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="">
            <input
              type="text"
              placeholder="Buscar por DNI"
              value={searchFilters.DNI}
              onChange={(e) =>
                setSearchFilters({ ...searchFilters, DNI: e.target.value })
              }
              className="border p-2 w-full mt-2"
            />

            {mostrarFiltros && (
              <>
                <input
                  type="text"
                  placeholder="Buscar por Nombre"
                  value={searchFilters.Nombre}
                  onChange={(e) =>
                    setSearchFilters({
                      ...searchFilters,
                      Nombre: e.target.value,
                    })
                  }
                  className="border p-2 w-full mt-2"
                />
                <input
                  type="text"
                  placeholder="Buscar por Apellido"
                  value={searchFilters.Apellido}
                  onChange={(e) =>
                    setSearchFilters({
                      ...searchFilters,
                      Apellido: e.target.value,
                    })
                  }
                  className="border p-2 w-full mt-2"
                />
              </>
            )}
<div className="flex items-center mt-2">
  <button
    onClick={handleSearch}
    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
  >
    <FaSearch className="w-5 h-5" />
    Buscar
  </button>
  <button
    onClick={handleMostrarTodos}
    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded flex items-center gap-2"
  >
    <FaList className="w-5 h-5" />
    Mostrar Todos
  </button>
  <button
    onClick={() => setMostrarFiltros(!mostrarFiltros)}
    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 ml-2 rounded flex items-center gap-2"
  >
    <FaFilter className="w-5 h-5" />
    {mostrarFiltros ? "Ocultar Filtros" : "Agregar Filtros"}
  </button>
</div>
          </div>
        </div>

        <table className="min-w-full bg-white mt-4">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th
                className="w-1/4 py-2 cursor-pointer"
                onClick={() => handleSort("DNI")}
              >
                DNI{" "}
                {sortConfig.campo === "DNI" &&
                  (sortConfig.direction === "asc" ? (
                    <MdExpandLess />
                  ) : (
                    <MdExpandMore />
                  ))}
              </th>
              <th
                className="w-1/4 py-2 cursor-pointer"
                onClick={() => handleSort("Nombre")}
              >
                Nombre{" "}
                {sortConfig.campo === "Nombre" &&
                  (sortConfig.direction === "asc" ? (
                    <MdExpandLess />
                  ) : (
                    <MdExpandMore />
                  ))}
              </th>
              <th
                className="w-1/4 py-2 cursor-pointer"
                onClick={() => handleSort("Apellido")}
              >
                Apellido{" "}
                {sortConfig.campo === "Apellido" &&
                  (sortConfig.direction === "asc" ? (
                    <MdExpandLess />
                  ) : (
                    <MdExpandMore />
                  ))}
              </th>
              <th
                className="w-1/4 py-2 cursor-pointer"
                onClick={() => handleSort("FechaIngreso")}
              >
                Fecha de ingreso{" "}
                {sortConfig.campo === "FechaIngreso" &&
                  (sortConfig.direction === "asc" ? (
                    <MdExpandLess />
                  ) : (
                    <MdExpandMore />
                  ))}
              </th>
              <th className="w-1/4 py-2">Piso</th>
              <th className="w-1/4 py-2">Mail</th>
              <th className="w-1/4 py-2">Acciones</th>
            </tr>
          </thead>
          {loading ? (
      <LoadingTable loading={loading} />
          ): (
            <tbody className="text-gray-700">
            {filteredEmpleados.map((empleado) => (
              <tr key={empleado.IdEmpleado}>
                <td className="text-center py-2">{empleado.DNI}</td>
                <td className="text-center py-2">{empleado.Nombre}</td>
                <td className="text-center py-2">{empleado.Apellido}</td>

                <td className="text-center py-2">{empleado.FechaIngreso}</td>
                <td className="text-center py-2">{empleado.Dpto}</td>
                <td className="text-center py-2">{empleado.Mail}</td>
                <td className="text-center py-2 flex p-2">
       

<button
          className="bg-yellow-600 ml-2 hover:bg-yellow-700 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() =>abrirModalModificar(empleado.IdEmpleado)}
        >
          <FiEdit />
          Modificar
        </button>

                  <DeleteButton
                    id={empleado.IdEmpleado}
                    endpoint="http://www.ecotablasapi.somee.com/api/Empleados/Borrar" // Ajusta el endpoint según sea necesario
                    updateList={getEmpleados} // Pasa la función para actualizar la lista
                  />
                </td>
              </tr>
            ))}
          </tbody>
          )
          }
         
        </table>
      </SectionLayout>
    </>
  );
};

export default Empleados;
