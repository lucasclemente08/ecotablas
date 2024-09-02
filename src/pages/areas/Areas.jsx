import React,{useState} from 'react'
import Home from '../home/Home'

const Areas = () => {
    const [modalAbierto, setModalAbierto] = useState(false);

    const abrirModal = () => {
        setModalAbierto(true);
      };
      


    return (
    <>
 <div className="md:flex flex-row bg-slate-900">
    <Home />
    <div className="overflow-x-auto m-5">
      <div className="m-3">
        <h2 className="text-white text-3xl b-4">Áreas y turnos de trabajos</h2>

<div className="mt-5">



         <button onClick={abrirModal} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-2 px-4 rounded">
            Agregar area 
          </button>
          <button
//   onClick={handlePrint}
className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 mt-2 m-2 px-4 rounded"
>
  Imprimir listado
</button> 
    </div>
    </div></div>
    </div>
    </>
  )
}

export default Areas