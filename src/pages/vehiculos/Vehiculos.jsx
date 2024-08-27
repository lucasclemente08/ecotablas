import React,{useEffect,useState} from 'react'
import Home from '../home/Home'
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";


const Vehiculos = () => {

const[vehiculo,setVehiculo]=useState([])




    // const vehiculos = [
    //     {
    //         marca: "Toyota",
    //         modelo: "Corolla",
    //         año: 2020,
    //         color: "Blanco",
    //         tipo: "Sedan",
      
    //     },
    //   ];
         // imprimir listado 
  const componentRef = useRef();

  const handlePrint = useReactToPrint({ 
    content: () => componentRef.current,
  });
useEffect(()=>{
 
fetch("http://www.trazabilidadodsapi.somee.com/api/Vehiculos/ListarTodo").then((response)=>{
  response.json().then((data)=>{
    setVehiculo(data)

  })
.catch(err=>{
  console.log("error al traer la data" + err)
})
  
})


},[])


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
        {vehiculo.map((vehiculo, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{vehiculo.Marca}</td>
            <td className="border px-4 py-2">{vehiculo.Modelo}</td>
            <td className="border px-4 py-2">{vehiculo.Año}</td>
            <td className="border px-4 py-2">{vehiculo.Color}</td>
            <td className="border px-4 py-2">{vehiculo.Tipo}</td>
        
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