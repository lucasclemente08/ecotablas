import React, { useEffect, useState} from "react";
import axios from "axios";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import PdfGenerator from "../../components/buttons/PdfGenerator";

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

  const [mensaje, setMensaje] = useState("");

  // Obtener todos los empleados
  function getEmpleados() {
    axios
      .get(`http://www.trazabilidadodsapi.somee.com/api/Empleados/ListarTodo`)
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
      setMensaje("La consulta no arrojó datos");
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

  const abrirModalModificar = (idEmpleado) => {
    setModalAbiertoMod(true);
    setEmpleadoSeleccionadoId(idEmpleado);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const cerrarModalMod = () => {
    setModalAbiertoMod(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeEmpleado = (e) => {
    const { name, value } = e.target;
    setEmpleadoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Verificar si existe un empleado con el mismo DNI
  const verificarDNIExistente = () => {
    return empleadosData.some((empleado) => empleado.DNI === nuevoEmpleado.DNI);
  };

  const handleSubmit = () => {
    if (verificarDNIExistente()) {
      setMensaje("Ya existe un empleado con el mismo DNI");
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
      setMensaje("Todos los campos requeridos deben ser completados");
      return;
    }

    if (nuevoEmpleado.DNI.length > 8) {
      setMensaje("El DNI no puede tener más de 8 dígitos");
      return;
    }

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(nuevoEmpleado.FechaIngreso)) {
      setMensaje("La fecha debe tener el formato dd/mm/aaaa");
      return;
    }

    axios
      .post(
        `http://www.trazabilidadodsapi.somee.com/api/Empleados/Insertar`,
        nuevoEmpleado,
      )
      .then((response) => {
        setModalAbierto(false);
        setMensaje("Inserción exitosa");
        axios
          .get(
            `http://www.trazabilidadodsapi.somee.com/api/Empleados/ListarTodo`,
          )
          .then((response) => {
            setEmpleadosData(response.data);
            setFilteredEmpleados(response.data);
          })
          .catch((error) =>
            console.error("Error al obtener los datos:", error),
          );
      })
      .catch((error) => console.error("Error al agregar el empleado:", error));
  };

  const handleEliminarEmpleado = (idEmpleado) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
      axios
        .delete(
          `http://www.trazabilidadodsapi.somee.com/api/Empleados/Borrar/${idEmpleado}`,
        )
        .then((response) => {
          setMensaje("Eliminación exitosa");
          axios
            .get(
              `http://www.trazabilidadodsapi.somee.com/api/Empleados/ListarTodo`,
            )
            .then((response) => {
              setEmpleadosData(response.data);
              setFilteredEmpleados(response.data);
            })
            .catch((error) =>
              console.error("Error al obtener los datos:", error),
            );
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setMensaje(
              "No es posible eliminar el registro, posee relación con otras tablas",
            );
          } else {
            console.error("Error al eliminar el empleado:", error);
          }
        });
    }
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
      setMensaje("Todos los campos requeridos deben ser completados");
      return;
    }
    if (empleadoSeleccionado.DNI.length > 8) {
      setMensaje("El DNI no puede tener más de 8 dígitos");
      return;
    }

    axios
      .put(
        `http://www.trazabilidadodsapi.somee.com/api/Empleados/Modificar/${empleadoSeleccionadoId}`,
        empleadoSeleccionado,
      )
      .then((response) => {
        setModalAbiertoMod(false);
        setMensaje("Modificación exitosa");
        axios
          .get(
            `http://www.trazabilidadodsapi.somee.com/api/Empleados/ListarTodo`,
          )
          .then((response) => {
            setEmpleadosData(response.data);
            setFilteredEmpleados(response.data);
          })
          .catch((error) =>
            console.error("Error al obtener los datos:", error),
          );
      })
      .catch((error) =>
        console.error("Error al modificar el empleado:", error),
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
                    <div></div>

                    <div className=" ">
                      {mensaje && (
                        <div className="bg-red-700 text-white p-4 rounded-lg flex items-center space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v2m0 4h.01"
                            />
                          </svg>
                          <span>{mensaje}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 text-center sm:mt-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Agregar Empleado
                      </h3>
                      <div></div>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="DNI"
                          placeholder="DNI *"
                          value={nuevoEmpleado.DNI}
                          onChange={handleChange}
                          className="border mb-2 p-2 w-full "
                        />

                        <input
                          type="text"
                          name="Nombre"
                          placeholder="Nombre *"
                          value={nuevoEmpleado.Nombre}
                          onChange={handleChange}
                          className="border p-2 w-full"
                        />
                        <input
                          type="text"
                          name="Apellido"
                          placeholder="Apellido *"
                          value={nuevoEmpleado.Apellido}
                          onChange={handleChange}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="Calle"
                          placeholder="Calle *"
                          value={nuevoEmpleado.Calle}
                          onChange={handleChange}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="Numero"
                          placeholder="Número *"
                          value={nuevoEmpleado.Numero}
                          onChange={handleChange}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="Piso"
                          placeholder="Piso"
                          value={nuevoEmpleado.Piso}
                          onChange={handleChange}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="Dpto"
                          placeholder="Dpto"
                          value={nuevoEmpleado.Dpto}
                          onChange={handleChange}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="CodPostal"
                          placeholder="Código Postal *"
                          value={nuevoEmpleado.CodPostal}
                          onChange={handleChange}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="IdLocalidad"
                          placeholder="IdLocalidad"
                          value={nuevoEmpleado.IdLocalidad}
                          onChange={handleChange}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="date"
                          name="FechaIngreso"
                          placeholder="Fecha de Ingreso (dd/mm/aaaa) *"
                          value={nuevoEmpleado.FechaIngreso}
                          onChange={handleChange}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="Telefono"
                          placeholder="Teléfono *"
                          value={nuevoEmpleado.Telefono}
                          onChange={handleChange}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="Mail"
                          placeholder="Mail *"
                          value={nuevoEmpleado.Mail}
                          onChange={handleChange}
                          className="border p-2 w-full mt-2"
                        />
                        <input
                          type="text"
                          name="IdArea"
                          placeholder="IdArea *"
                          value={nuevoEmpleado.IdArea}
                          onChange={handleChange}
                          className="border p-2 w-full mt-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      onClick={handleSubmit}
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                    >
                      Guardar
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
                    {mensaje && (
                      <div className="bg-red-700 text-white p-4 rounded-lg flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01"
                          />
                        </svg>
                        <span>{mensaje}</span>
                      </div>
                    )}
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

          <div className="mt-4">
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
                    onClick={() => abrirModalModificar(empleado.IdEmpleado)}
                    className="bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Modificar
                  </button>
                  <DeleteButton
                    id={empleado.IdEmpleado}
                    endpoint="http://www.trazabilidadodsapi.somee.com/api/Empleados/Borrar" // Ajusta el endpoint según sea necesario
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
