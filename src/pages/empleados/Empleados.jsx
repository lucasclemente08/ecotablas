
import React from 'react';
import { useState } from 'react';
import Home from '../home/Home';
import ButtonDelete from '../../components/buttonDelete';
import ButtonEdit from '../../components/buttonEdit';

const empleadosData = [
  { id: 1, nombre: 'Juan Pérez', edad: 30, puesto: 'Ingeniero de Software', dni: '12345678' },
  { id: 2, nombre: 'Ana López', edad: 25, puesto: 'Analista de Datos', dni: '23456789' },
  { id: 3, nombre: 'Luis Martínez', edad: 35, puesto: 'Gerente de Proyecto', dni: '34567890' },
  { id: 4, nombre: 'María García', edad: 28, puesto: 'Diseñadora UX/UI', dni: '45678901' },
];

const Empleados=()=>{

  const [searchDNI, setSearchDNI] = useState('');
  const [filteredEmpleados, setFilteredEmpleados] = useState(empleadosData);

  const handleSearch = () => {
    const filtered = empleadosData.filter(empleado => empleado.dni.includes(searchDNI));
    setFilteredEmpleados(filtered);
  };

return(
<>

<Home />
<div className='  bg-slate-900'>




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
                value={searchDNI}
                onChange={(e) => setSearchDNI(e.target.value)}
              />
              <button
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                onClick={handleSearch}
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
         <ButtonDelete />
                   <ButtonEdit />
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