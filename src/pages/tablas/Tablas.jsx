import React from 'react'
import {  Chart } from "react-charts";
import { useState,useMemo } from 'react';


const Tablas = () => {
    const myData = [
        {
          label: "Plastic",
          data: [
            { primary: "121", secondary: 30 },
            { primary: "Category 2", secondary: 80 },
            { primary: "Category 3", secondary: 45 }
          ]
        },
        {
          label: "Series 2",
          data: [
            { primary: "123", secondary: 60 },
            { primary: "Category 2", secondary: 20 },
            { primary: "Category 3", secondary: 75 }
          ]
        },
        {
          label: "Series 3",
          data: [
            { primary: "123", secondary: 50 },
            { primary: "Category 2", secondary: 90 },
            { primary: "Category 3", secondary: 40 }
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
    <div className="bg-white p-20 m-3 flex flex-col items-center rounded-md text-center">
      {/* <button 
        onClick={() => setData(myData)} 
        className="mb-4 p-2 bg-blue-500 text-white rounded">
        Reset Data
      </button> */}
      <div className=" p-20 flex items-center align-center justify-center w-full max-w-4xl">
        <Chart 
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </div>
    </div>
    </>
     )
}

export default Tablas