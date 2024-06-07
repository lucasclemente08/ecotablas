
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


  //get all
  useEffect(() => {
    axios.get(`https://www.trazabilidadodsapi.somee.com/api/Empleados/ListarTodo`)
      .then((response) => {
        setEmpleadosData(response.data);
        setFilteredEmpleados(response.data); 
      })
      .catch((error) => console.error('Error al obtener los datos:', error)); 
  }, []);

  
  const handleSearch = () => {
    const filtered = empleadosData.filter(empleado => empleado.DNI.includes(searchDNI));
    setFilteredEmpleados(filtered);
    setSearchDNI(''); 
  };
  

  const handleMostrarTodos = () => {

    
    setFilteredEmpleados(empleadosData);
    setSearchDNI('');
  };

 

  const abrirModal = () => {
    setModalAbierto(true);
  };
  const abrirModalModicar = (idEmpleado) => {
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
  


  const handleSubmit = () => {

    axios.post(`http://www.trazabilidadodsapi.somee.com/api/Empleados/Insertar`, nuevoEmpleado)
      .then((response) => {
      
        setModalAbierto(false);
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
  axios.delete(`http://www.trazabilidadodsapi.somee.com/api/Empleados/Borrar/${idEmpleado}`)
    .then((response) => {

      console.log('Empleado eliminado correctamente:', response.data);

      axios.get(`http://www.trazabilidadodsapi.somee.com/api/Empleados/ListarTodo`)
        .then((response) => {
          setEmpleadosData(response.data);
          setFilteredEmpleados(response.data); 
        })
        .catch((error) => console.error('Error al obtener los datos:', error)); 
    })
    .catch((error) => console.error('Error al eliminar el empleado:', error));
};



const handleSubmitModificar = (idEmpleado) => 
  {
  // if (!empleadoSeleccionado) return;
  


  axios.put(`http://www.trazabilidadodsapi.somee.com/api/Empleados/Modificar/${idEmpleado}`, empleadoSeleccionado)
    .then((response) => {
      console.log('Empleado modificado:', response.data);
      // Actualizar lista de empleados
      axios.get(`http://www.trazabilidadodsapi.somee.com/api/Empleados/ListarTodo`)
        .then((response) => {
          setEmpleadosData(response.data);
          setFilteredEmpleados(response.data);
          cerrarModal(); // Cerrar el modal después de modificar
        })
        .catch((error) => console.error('Error al obtener los datos:', error));
    })
    .catch((error) => console.error('Error al modificar el empleado:', error));
};

return(
<>


<div className=' md:flex flex-row  bg-slate-900'>

<Home />


<div className="overflow-x-auto m-5">
  <div className="m-3">
  <h2  className="text-white text-3xl b-4">
  Empleados
</h2>
<div>
      <button onClick={abrirModal} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-2 px-4 rounded">
        Agregar empleado
      </button>
      {modalAbierto && (
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Agregar nuevo empleado</h3>
                            <div className="grid grid-cols-2 gap-4">
                       
  <input type="text" name="Nombre" value={nuevoEmpleado.Nombre}   onChange={handleChange} placeholder="Nombre" className="p-2 border border-gray-400 rounded-md w-full" />
  <input type="text" name="Apellido" value={nuevoEmpleado.Apellido}   onChange={handleChange} placeholder="Apellido" className="p-2 border border-gray-400 rounded-md w-full" />
  <input type="text" name="DNI" value={nuevoEmpleado.DNI}   onChange={handleChange}  placeholder="DNI" className="p-2 border border-gray-400 rounded-md w-full" />
  <input type="text" name="Calle" value={nuevoEmpleado.Calle}   onChange={handleChange} placeholder="Calle" className="p-2 border border-gray-400 rounded-md w-full" />
  <input type="text" name="Numero" value={nuevoEmpleado.Numero}   onChange={handleChange} placeholder="Número" className="p-2 border border-gray-400 rounded-md w-full" />
  <input type="text" name="Piso" value={nuevoEmpleado.Piso}    onChange={handleChange} placeholder="Piso" className="p-2 border border-gray-400 rounded-md w-full" />
  <input type="text" name="Dpto" value={nuevoEmpleado.Dpto}     onChange={handleChange} placeholder="Departamento" className="p-2 border border-gray-400 rounded-md w-full" />
  <input type="text" name="CodPostal" value={nuevoEmpleado.CodPostal}    onChange={handleChange} placeholder="Código Postal" className="p-2 border border-gray-400 rounded-md w-full" />
  
  <select name="IdLocalidad" value={nuevoEmpleado.IdLocalidad} onChange={handleChange} className="p-2 border border-gray-400 rounded-md w-full">
  <option value="">Selecciona una Localidad</option>
  <option value="1">Localidad 1</option>
  {/* <option value="2">Localidad 2</option> */}
</select>
  <input type="text" name="FechaIngreso" value={nuevoEmpleado.FechaIngreso}   onChange={handleChange} placeholder="Fecha de Ingreso" className="p-2 border border-gray-400 rounded-md w-full" />
  <input type="text" name="Telefono" value={nuevoEmpleado.Telefono}  onChange={handleChange} placeholder="Teléfono" className="p-2 border border-gray-400 rounded-md w-full" />
  <input type="text" name="Mail" value={nuevoEmpleado.Mail}   onChange={handleChange} placeholder="Correo Electrónico" className="p-2 border border-gray-400 rounded-md w-full" />
  <select name="IdArea" value={nuevoEmpleado.IdArea} onChange={handleChange} className="p-2 border border-gray-400 rounded-md w-full">
  <option value="">Selecciona un Área</option>
  <option value="1">Área 1</option>
  {/* <option value="2">Área 2</option> */}

</select>

</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={handleSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                          Agregar
                        </button>
                        <button onClick={cerrarModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

{modalAbiertoMod &&  (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Modificar empleado</h3>
                    {/* Aquí van los campos de entrada para modificar el empleado */}
                    <input
                      type="text"
                      name="Nombre"
                      value={empleadoSeleccionado.Nombre}
                      // onChange={handleChangeEmpleado}
                      placeholder="Nombre"
                      className="p-2 border border-gray-400 rounded-md w-full"
                    />
                    {/* Agrega los demás campos de entrada similares para los demás atributos del empleado */}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleSubmitModificar} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Modificar
                </button>
                <button onClick={cerrarModalMod} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
              
    </div>
    </div>


<div className="bg-gray-800 p-4 rounded-md">
    
<div className="flex items-center space-x-2 p-4">
              <label className="text-white text-lg mb-4">Buscar empleados</label>
              <input
                type="text"
                placeholder="Ingrese DNI"
                className="p-2 border border-gray-400 rounded-md w-full"
                value={searchDNI}
                onChange={(e) => setSearchDNI(e.target.value)}
              />
              <button
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                onClick={handleSearch}
              >
                Buscar por DNI
              </button>
              <button onClick={handleMostrarTodos}
               className=" text-white p-2 rounded-md  transition duration-200">
              Mostrar todos
              </button>
            </div>
    



      <table className="min-w-full border bg-white border-gray-200">

      <thead>
    <tr className="bg-gray-200">
      <th className="py-2 px-4 text-left border">DNI</th>
      <th className="py-2 px-4 text-left border">Nombre</th>
      {/* <th className="py-2 px-4 text-left border">Calle</th>
      <th className="py-2 px-4 text-left border">Número</th>
      <th className="py-2 px-4 text-left border">Piso</th>
      <th className="py-2 px-4 text-left border">Dpto</th> */}
      <th className="py-2 px-4 text-left border">Código Postal</th>
      <th className="py-2 px-4 text-left border">Fecha de Ingreso</th>
      <th className="py-2 px-4 text-left border">Área</th>
      <th className="py-2 px-4 text-left border">Mail</th>
      <th className="py-2 px-4 text-left border">Teléfono</th>
      <th className="py-2 px-4 text-left border">Acciones</th>



    </tr>
  </thead>
          <tbody>
                {filteredEmpleados.map((empleado, index) => (
                   <tr className="bg-white" key={index}>
                   <td className="py-2 px-2 border">{empleado.DNI}</td>
                   <td className="py-2 px-2 border">{empleado.Nombre}</td>
                   {/* <td className="py-2 px-2 border">{empleado.Calle}</td> */}
                   {/* <td className="py-2 px-2 border">{empleado.Numero}</td>
                   <td className="py-2 px-2 border">{empleado.Piso}</td>
                   <td className="py-2 px-2 border">{empleado.Dpto}</td> */}
                   <td className="py-2 px-2 border">{empleado.CodPostal}</td>
                   <td className="py-2 px-2 border">{empleado.FechaIngreso}</td>
                   <td className="py-2 px-2 border">{empleado.IdArea}</td>
                   <td className="py-2 px-2 border">{empleado.Mail}</td>
                   <td className="py-2 px-2 border">{empleado.Telefono}</td>
          
                    <td className="border flex">
                    <button onClick={() => handleEliminarEmpleado(empleado.IdEmpleado)}><svg
      xmlns="http://www.w3.org/2000/svg"
      className="text-red-600"
      width={30}
      height={30}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z" />
    </svg></button>
    <button onClick={() => abrirModalModicar(empleado.IdEmpleado)}>
    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className='text-green-600'
                        width={30}
                        height={30}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M7.24264 17.9967H3V13.754L14.435 2.319C14.8256 1.92848 15.4587 1.92848 15.8492 2.319L18.6777 5.14743C19.0682 5.53795 19.0682 6.17112 18.6777 6.56164L7.24264 17.9967ZM3 19.9967H21V21.9967H3V19.9967Z"
                        />
                      </svg>
    
    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
    </div>
</div>


    
     
    
</>
)
}
export default Empleados;