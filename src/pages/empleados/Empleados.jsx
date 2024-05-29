
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
  
  useEffect(() => {
    axios.get(`http://localhost:61274/api/Empleados/ListarTodo`)
      .then((response) => {
        setEmpleadosData(response.data);
        setFilteredEmpleados(response.data); // Inicialmente, mostrar todos los empleados
      })
      .catch((error) => console.error('Error al obtener los datos:', error)); // Manejar errores
  }, []);
  
  const handleSearch = () => {
    const filtered = empleadosData.filter(empleado => empleado.DNI.includes(searchDNI));
    setFilteredEmpleados(filtered); // Actualizar el estado con el array filtrado
    setSearchDNI(''); // Limpiar el campo de búsqueda después de la búsqueda
  };
  
  // Resto de tu componente...
  
  const handleMostrarTodos = () => {

    
    setFilteredEmpleados(empleadosData);
    setSearchDNI('');
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
<button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-2 px-4 rounded">
      Agregar empleado
    </button>
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
         <ButtonDelete />
                  <ButtonEdit empleados={empleadosData} />

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