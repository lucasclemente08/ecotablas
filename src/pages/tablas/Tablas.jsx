import React from 'react'
import {  Chart } from "react-charts";
import { useState,useMemo } from 'react';
import Home from '../home/Home';

const Tablas = () => {
    const myData = [
        {
          label: "Materiales ",
          data: [
            { primary: "Pvc", secondary: 500 },
            // { primary: "Plasticos", secondary: 300 },

          ]
        },
        {
          label: "Materiales ",
          data: [
            { primary: "Plasticos", secondary: 500 },
          ]
        },
        {
          label: "Series 3",
          data: [
          { primary: "Caños y tuberias", secondary: 450 }
         
           
       
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


    return (
    <> 
     <div className='md:flex flex-row bg-slate-900'>

    <div className="overflow-x-auto m-5">
   
    {/* <div className="m-3">
      <h2 className="text-white text-3xl b-4">Tablas</h2>
    

      </div> */}
      
    <div className="bg-white p-20  flex flex-col items-center rounded-md text-center">
      {/* <button 
        onClick={() => setData(myData)} 
        className="mb-4 p-2 bg-blue-500 text-white rounded">
        Reset Data
      </button> */}
      <div className=" p-32 flex items-center align-center justify-center w-full max-w-4xl">
        <Chart 
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </div>
    </div>
    </div></div>
    </>
     )
}

export default Tablas