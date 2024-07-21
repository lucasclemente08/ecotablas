
import React, { useEffect } from 'react';
import { useState } from 'react';
import Home from '../home/Home';
import ButtonDelete from '../../components/buttonDelete';
import ButtonEdit from '../../components/buttonEdit';
import axios from 'axios';
const Empleados=()=>{

  

  const [empleadosData, setEmpleadosData] = useState([]);
  const [searchDNI, setSearchDNI] = useState("");
  const [filteredEmpleados, setFilteredEmpleados] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalAbiertoMod, setModalAbiertoMod] = useState(false);

  const [empleadoSeleccionadoId, setEmpleadoSeleccionadoId]=useState("")
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(
    {
      Nombre: '',
    Apellido: '',
    DNI: '',
    Calle: '',
    Numero: '',
    Piso: '',
    Dpto: '',
    CodPostal: '',
    IdLocalidad: '1',
    FechaIngreso: '',
    Telefono: '',
    Mail: '',
    IdArea: '1'
    }
  );

  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    Nombre: '',
    Apellido: '',
    DNI: '',
    Calle: '',
    Numero: '',
    Piso: '',
    Dpto: '',
    CodPostal: '',
    IdLocalidad: '1',
    FechaIngreso: '',
    Telefono: '',
    Mail: '',
    IdArea: '1'
  });

  const [mensaje, setMensaje] = useState(""); // Mensaje para mostrar acciones exitosas o errores

  // Obtener todos los empleados
  useEffect(() => {
    axios.get(`http://www.trazabilidadodsapi.somee.com/api/Empleados/ListarTodo`)
      .then((response) => {
        setEmpleadosData(response.data);
        setFilteredEmpleados(response.data);
      })
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);

  // Manejar búsqueda por DNI
  const handleSearch = () => {
    const filtered = empleadosData.filter(empleado => empleado.DNI.includes(searchDNI));
    setFilteredEmpleados(filtered);
    setSearchDNI('');
    if (filtered.length === 0) {
      setMensaje("La consulta no arrojó datos");
    } else {
      setMensaje("");
    }
  };

  const handleMostrarTodos = () => {
    setFilteredEmpleados(empleadosData);
    setSearchDNI('');
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
    setNuevoEmpleado(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeEmpleado = (e) => {
    const { name, value } = e.target;
    setEmpleadoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Validar campos requeridos
    if (!nuevoEmpleado.Nombre || !nuevoEmpleado.Apellido || !nuevoEmpleado.DNI || !nuevoEmpleado.Calle || !nuevoEmpleado.Numero || !nuevoEmpleado.CodPostal || !nuevoEmpleado.FechaIngreso || !nuevoEmpleado.Telefono || !nuevoEmpleado.Mail || !nuevoEmpleado.IdArea) {
      setMensaje("Todos los campos requeridos deben ser completados");
      return;
    }
    // Validar longitud de DNI
    if (nuevoEmpleado.DNI.length > 8) {
      setMensaje("El DNI no puede tener más de 8 dígitos");
      return;
    }
    // Validar formato de fecha
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(nuevoEmpleado.FechaIngreso)) {
      setMensaje("La fecha debe tener el formato dd/mm/aaaa");
      return;
    }

    axios.post(`http://www.trazabilidadodsapi.somee.com/api/Empleados/Insertar`, nuevoEmpleado)
      .then((response) => {
        
        setModalAbierto(false);
        setMensaje("Inserción exitosa");
        axios.get(`http://www.trazabilidadodsapi.somee.com/api/Empleados/ListarTodo`)
          .then((response) => {
            setEmpleadosData(response.data);
            setFilteredEmpleados(response.data);
          })
          .catch((error) => console.error('Error al obtener los datos:', error));
      })
      .catch((error) => console.error('Error al agregar el empleado:', error));
  };

  const handleEliminarEmpleado = (idEmpleado) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
      axios.delete(`http://www.trazabilidadodsapi.somee.com/api/Empleados/Borrar/${idEmpleado}`)
        .then((response) => {
          setMensaje("Eliminación exitosa");
          axios.get(`http://www.trazabilidadodsapi.somee.com/api/Empleados/ListarTodo`)
            .then((response) => {
              setEmpleadosData(response.data);
              setFilteredEmpleados(response.data);
            })
            .catch((error) => console.error('Error al obtener los datos:', error));
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setMensaje("No es posible eliminar el registro, posee relación con otras tablas");
          } else {
            console.error('Error al eliminar el empleado:', error);
          }
        });
    }
  };

  const handleSubmitModificar = () => {
    if (!empleadoSeleccionado.Nombre || !empleadoSeleccionado.Apellido || !empleadoSeleccionado.DNI || !empleadoSeleccionado.Calle || !empleadoSeleccionado.Numero || !empleadoSeleccionado.CodPostal || !empleadoSeleccionado.FechaIngreso || !empleadoSeleccionado.Telefono || !empleadoSeleccionado.Mail || !empleadoSeleccionado.IdArea) {
      setMensaje("Todos los campos requeridos deben ser completados");
      return;
    }
    if (empleadoSeleccionado.DNI.length > 8) {
      setMensaje("El DNI no puede tener más de 8 dígitos");
      return;
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(empleadoSeleccionado.FechaIngreso)) {
      setMensaje("La fecha debe tener el formato dd/mm/aaaa");
      return;
    }

    axios.put(`http://www.trazabilidadodsapi.somee.com/api/Empleados/Modificar/${empleadoSeleccionadoId}`, empleadoSeleccionado)
      .then((response) => {
        setModalAbiertoMod(false);
        setMensaje("Modificación exitosa");
        axios.get(`http://www.trazabilidadodsapi.somee.com/api/Empleados/ListarTodo`)
          .then((response) => {
            setEmpleadosData(response.data);
            setFilteredEmpleados(response.data);
          })
          .catch((error) => console.error('Error al obtener los datos:', error));
      })
      .catch((error) => console.error('Error al modificar el empleado:', error));
  };


return(
  <>
  <div className='md:flex flex-row bg-slate-900'>
    <Home />
    <div className="overflow-x-auto m-5">
      <div className="m-3">
        <h2 className="text-white text-3xl b-4">Empleados</h2>
        <div>
          <button onClick={abrirModal} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-2 px-4 rounded">
            Agregar empleado
          </button>
          {mensaje && <div className="text-white">{mensaje}</div>}
          {modalAbierto && (
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Agregar Empleado</h3>
                      <div className="mt-2">
                        <input type="text" name="Nombre" placeholder="Nombre *" value={nuevoEmpleado.Nombre} onChange={handleChange} className="border p-2 w-full" />
                        <input type="text" name="Apellido" placeholder="Apellido *" value={nuevoEmpleado.Apellido} onChange={handleChange} className="border p-2 w-full mt-2" />
                        <input type="text" name="DNI" placeholder="DNI *" value={nuevoEmpleado.DNI} onChange={handleChange} className="border p-2 w-full mt-2" />
                        <input type="text" name="Calle" placeholder="Calle *" value={nuevoEmpleado.Calle} onChange={handleChange} className="border p-2 w-full mt-2" />
                        <input type="text" name="Numero" placeholder="Número *" value={nuevoEmpleado.Numero} onChange={handleChange} className="border p-2 w-full mt-2" />
                        <input type="text" name="Piso" placeholder="Piso" value={nuevoEmpleado.Piso} onChange={handleChange} className="border p-2 w-full mt-2" />
                        <input type="text" name="Dpto" placeholder="Dpto" value={nuevoEmpleado.Dpto} onChange={handleChange} className="border p-2 w-full mt-2" />
                        <input type="text" name="CodPostal" placeholder="Código Postal *" value={nuevoEmpleado.CodPostal} onChange={handleChange} className="border p-2 w-full mt-2" />
                        <input type="text" name="IdLocalidad" placeholder="IdLocalidad" value={nuevoEmpleado.IdLocalidad} onChange={handleChange} className="border p-2 w-full mt-2" />
                        <input type="text" name="FechaIngreso" placeholder="Fecha de Ingreso (dd/mm/aaaa) *" value={nuevoEmpleado.FechaIngreso} onChange={handleChange} className="border p-2 w-full mt-2" />
                        <input type="text" name="Telefono" placeholder="Teléfono *" value={nuevoEmpleado.Telefono} onChange={handleChange} className="border p-2 w-full mt-2" />
                        <input type="text" name="Mail" placeholder="Mail *" value={nuevoEmpleado.Mail} onChange={handleChange} className="border p-2 w-full mt-2" />
                        <input type="text" name="IdArea" placeholder="IdArea *" value={nuevoEmpleado.IdArea} onChange={handleChange} className="border p-2 w-full mt-2" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button onClick={handleSubmit} className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm">
                      Guardar
                    </button>
                    <button onClick={cerrarModal} className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div>
            <input type="text" placeholder="Buscar por DNI" value={searchDNI} onChange={(e) => setSearchDNI(e.target.value)} className="border p-2 w-full mt-2" />
            <button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded">
              Buscar
            </button>
            <button onClick={handleMostrarTodos} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 ml-2 rounded">
              Mostrar Todos
            </button>
          </div>
        </div>
        <table className="min-w-full bg-white mt-4">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/4 py-2">Nombre</th>
              <th className="w-1/4 py-2">Apellido</th>
              <th className="w-1/4 py-2">DNI</th>
              <th className="w-1/4 py-2">Fecha de ingreso</th>
              <th className="w-1/4 py-2">Piso</th>
              <th className="w-1/4 py-2">Mail</th>
      
              <th className="w-1/4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredEmpleados.map((empleado) => (
              <tr key={empleado.IdEmpleado}>
                <td className="text-center py-2">{empleado.Nombre}</td>
                <td className="text-center py-2">{empleado.Apellido}</td>
                <td className="text-center py-2">{empleado.DNI}</td>
                <td className="text-center py-2">{empleado.FechaIngreso}</td>
                <td className="text-center py-2">{empleado.Dpto}</td>
                <td className="text-center py-2">{empleado.Mail}</td>
  





                <td className="text-center py-2 flex p-2">
                  <button onClick={() => abrirModalModificar(empleado.IdEmpleado)} className=" bg-gray-900 text-white font-bold py-1 px-2 rounded mr-2">
                    Modificar
                  </button>
                  <button onClick={() => handleEliminarEmpleado(empleado.IdEmpleado)} className="bg-red-700 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {mensaje && <div className="text-white mt-4">{mensaje}</div>}
      </div>
    </div>
  </div>

  {modalAbiertoMod && (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Modificar Empleado</h3>
              <div className="mt-2">
                <input type="text" name="Nombre" placeholder="Nombre *" value={empleadoSeleccionado.Nombre} onChange={handleChangeEmpleado} className="border p-2 w-full" />
                <input type="text" name="Apellido" placeholder="Apellido *" value={empleadoSeleccionado.Apellido} onChange={handleChangeEmpleado} className="border p-2 w-full mt-2" />
                <input type="text" name="DNI" placeholder="DNI *" value={empleadoSeleccionado.DNI} onChange={handleChangeEmpleado} className="border p-2 w-full mt-2" />
                <input type="text" name="Calle" placeholder="Calle *" value={empleadoSeleccionado.Calle} onChange={handleChangeEmpleado} className="border p-2 w-full mt-2" />
                <input type="text" name="Numero" placeholder="Número *" value={empleadoSeleccionado.Numero} onChange={handleChangeEmpleado} className="border p-2 w-full mt-2" />
                <input type="text" name="Piso" placeholder="Piso" value={empleadoSeleccionado.Piso} onChange={handleChangeEmpleado} className="border p-2 w-full mt-2" />
                <input type="text" name="Dpto" placeholder="Dpto" value={empleadoSeleccionado.Dpto} onChange={handleChangeEmpleado} className="border p-2 w-full mt-2" />
                <input type="text" name="CodPostal" placeholder="Código Postal *" value={empleadoSeleccionado.CodPostal} onChange={handleChangeEmpleado} className="border p-2 w-full mt-2" />
                <input type="text" name="IdLocalidad" placeholder="IdLocalidad" value={empleadoSeleccionado.IdLocalidad} onChange={handleChangeEmpleado} className="border p-2 w-full mt-2" />
                <input type="text" name="FechaIngreso" placeholder="Fecha de Ingreso (dd/mm/aaaa) *" value={empleadoSeleccionado.FechaIngreso} onChange={handleChangeEmpleado} className="border p-2 w-full mt-2" />
                <input type="text" name="Telefono" placeholder="Teléfono *" value={empleadoSeleccionado.Telefono} onChange={handleChangeEmpleado} className="border p-2 w-full mt-2" />
                <input type="text" name="Mail" placeholder="Mail *" value={empleadoSeleccionado.Mail} onChange={handleChangeEmpleado} className="border p-2 w-full mt-2" />
                <input type="text" name="IdArea" placeholder="IdArea *" value={empleadoSeleccionado.IdArea} onChange={handleChangeEmpleado} className="border p-2 w-full mt-2" />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button onClick={handleSubmitModificar} className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm">
              Guardar Cambios
            </button>
            <button onClick={cerrarModalMod} className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</>
);
};



export default Empleados;