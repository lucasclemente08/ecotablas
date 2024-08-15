import React from 'react'
import Home from '../home/Home'
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";


const Vehiculos = () => {

    const vehiculos = [
        {
            marca: "Toyota",
            modelo: "Corolla",
            año: 2020,
            color: "Blanco",
            tipo: "Sedan",
      
        },
        {
            marca: "Ford",
            modelo: "Mustang",
            año: 2019,
            color: "Rojo",
            tipo: "Deportivo",
 
        },
        {
            marca: "Chevrolet",
            modelo: "Silverado",
            año: 2021,
            color: "Negro",
            tipo: "Pickup",
          
        },
        {
            marca: "Honda",
            modelo: "Civic",
            año: 2018,
            color: "Azul",
            tipo: "Sedan",
     
        }];
         // imprimir listado 
  const componentRef = useRef();

  const handlePrint = useReactToPrint({ 
    content: () => componentRef.current,
  });



  return (
    <>
    <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">

          <h2 className="text-2xl font-bold text-white mb-4">Vehicúlos</h2>
          <div className="overflow-x-auto">
            <div>
            <button
  onClick={handlePrint}
  className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 mt-2 m-2 px-4 rounded"
>
  Imprimir listado
</button>
            </div>
          <table className="min-w-full bg-white mt-4" ref={componentRef}  >
          <thead className="bg-gray-800 text-white">
            <tr>
            <th className="w-1/4 py-2">Marca</th>
          <th className="w-1/4 py-2">Modelo</th>
          <th className="w-1/4 py-2">Año</th>
          <th className="w-1/4 py-2">Color</th>
          <th className="w-1/4 py-2">Tipo</th>
   
            </tr>
          </thead>
          
          
          <tbody>
        {vehiculos.map((vehiculo, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{vehiculo.marca}</td>
            <td className="border px-4 py-2">{vehiculo.modelo}</td>
            <td className="border px-4 py-2">{vehiculo.año}</td>
            <td className="border px-4 py-2">{vehiculo.color}</td>
            <td className="border px-4 py-2">{vehiculo.tipo}</td>
        
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

export default Vehiculos