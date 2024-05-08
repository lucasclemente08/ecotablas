
import React from 'react';
import { useStates } from 'react';

const empleadosData = [
  { id: 1, nombre: 'Juan Pérez', edad: 30, puesto: 'Ingeniero de Software', dni: '12345678' },
  { id: 2, nombre: 'Ana López', edad: 25, puesto: 'Analista de Datos', dni: '23456789' },
  { id: 3, nombre: 'Luis Martínez', edad: 35, puesto: 'Gerente de Proyecto', dni: '34567890' },
  { id: 4, nombre: 'María García', edad: 28, puesto: 'Diseñadora UX/UI', dni: '45678901' },
];

const Empleados=()=>{

  const [searchDNI, setSearchDNI] = useState('');
  const [filteredEmpleados, setFilteredEmpleados] = useState(empleadosData);




return(
<>
<div className="overflow-x-auto m-5">
  <div className="m-3">
  <h2  className="text-white text-3xl b-4">
  Empleados
</h2>
  </div>

<div className="bg-gray-800 p-4 rounded-md">
    
      <div className="flex items-center space-x-2 p-4">
      <label className="text-white text-lg mb-4">Buscar empleados</label>
        <input
          type="text"
          placeholder="Ingrese DNI"
          className="p-2 border border-gray-400 rounded-md w-full"
        />
        <button
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Buscar por DNI
        </button>
      </div>
    



      <table className="min-w-full border bg-white border-gray-200">

        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left border">ID</th>
            <th className="py-2 px-4 text-left border">Nombre</th>
            <th className="py-2 px-4 text-left border">Edad</th>
            <th className="py-2 px-4 text-left border">Puesto</th>
            <th className="py-2 px-4 text-left border">DNI</th>

            <th className="py-2 px-4 text-left border">Acciones</th>

          </tr>
        </thead>
        <tbody>
              {filteredEmpleados.map((empleado, index) => (
                <tr
                  key={empleado.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                >
                  <td className="py-2 px-2 border">{empleado.id}</td>
                  <td className="py-2 px-2 border">{empleado.nombre}</td>
                  <td className="py-2 px-2 border">{empleado.edad}</td>
                  <td className="py-2 px-2 border">{empleado.puesto}</td>
                  <td className="py-2 px-2 border">{empleado.dni}</td>
                  <td className="border flex">
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-red-600"
                        width={30}
                        height={30}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z" />
                      </svg>
                    </button>
                    <button className="m-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
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
</>
)
}
export default Empleados;