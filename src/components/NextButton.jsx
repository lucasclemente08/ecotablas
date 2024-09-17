import React from 'react'
import { GrLinkNext } from "react-icons/gr";
const NextButton = () => {
  return (
    <>
       <button
                        className="bg-green-700 ml-2 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => console.log("Terminado button clicked")}
                      >
                        <div className="flex">
 
                        Terminado <GrLinkNext  className="m-1"/>
                        </div>
                      </button>
    
    </>
  )
}

export default NextButton