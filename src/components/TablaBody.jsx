import React from 'react'

const TablaBody = ({key}) => {
  return (

    <tr key={material.IdMaterialProcesado} className="hover:bg-gray-100">
                 
                 <td className="border-b py-3 px-4">Volumen: {material.VolumenP} kgs</td>
                 <td className="border-b py-3 px-4">{material.FechaIngresoP.slice(0, 10)}</td>
                 <td className="border-b py-3 px-4 flex justify-center">
                 <button onClick={() => abrirModalEdit(material)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                    Modificar
                    </button>
                    <button 
                    onClick={() => handleDelete(material.IdMaterialProcesado)} 
                    className="ml-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
 >
                    Eliminar
                    </button>

                 </td>
               </tr>
    
  )
}

export default TablaBody