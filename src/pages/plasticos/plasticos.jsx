import React from 'react'

import { useState,useMemo,useEffect } from 'react';
import Home from '../home/Home';
import axios from 'axios';
const Tablas = () => {

  const [plasticos, setPlasticos] = useState([]);
  const myData = [
    {
      label: "Polietileno",
      data: [
        { primary: "Materiales", secondary: 300 },

      ]
    },
    {
      label: "Polipropileno",
      data: [
        { primary: "Materiales", secondary: 250 },
 
      ]
    },
    {
      label: "PVC",
      data: [
        { primary: "Materiales", secondary: 500 },

      ]
    },
    {
      label: "Poliestireno",
      data: [
        { primary: "Materiales", secondary: 200 },
       
      ]
    }
  ];
  
      const [data, setData] = useState(myData);

      const primaryAxis = useMemo(
        () => ({
          getValue: (datum) => datum.primary,
        }),
        []
      );
    
      const secondaryAxes = useMemo(
        () => [
          {
            getValue: (datum) => datum.secondary,
          },
        ],
        []
      );      


      const fetchMaterials = async () => {
        try {
          const response = await axios.get("http://www.trazabilidadodsapi.somee.com/api/TiposPlastico/ListarTodo");
          setPlasticos(response.data);
        } catch (error) {
          console.error("Error fetching materials:", error);
        }
      };
    
      useEffect(() => {
        fetchMaterials();
      }, []);




    return (
    <> 
     <div className='md:flex flex-row bg-slate-900'>

    <div className="overflow-x-auto m-5">      
    <div className="bg-white p-20  flex flex-col items-center rounded-md text-center">
      <div className=" p-32 flex items-center align-center justify-center w-full max-w-4xl">
      </div>
    </div>
    </div></div>
    </>
     )
}

export default Tablas