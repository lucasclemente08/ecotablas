import React, {useEffect, useState} from 'react'
import Home from '../home/Home'
import {useRef} from "react";
import {useReactToPrint} from "react-to-print";

import axios from "axios"

const Vehiculos = () => {

    const [vehiculo, setVehiculo] = useState([])
    const [newVehicle, setNewVehicle] = useState(
        {Marca: '', Modelo: '', Año: '', Color: '', Tipo: ''}
    );

    const [modalAbierto, setModalAbierto] = useState(false);

    const [mensaje, setMensaje] = useState("");

    const abrirModal = () => {
        setModalAbierto(true);
    };
    const cerrarModal = () => {
        setModalAbierto(false)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewVehicle(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });
    useEffect(() => {

        fetch("http://www.trazabilidadodsapi.somee.com/api/Vehiculos/ListarTodo").then(
            (response) => {
                response
                    .json()
                    .then((data) => {
                        setVehiculo(data)

                    })
                    .catch(err => {
                        console.log("error al traer la data" + err)
                    })

                }
        )

    }, [])

    const handleSubmit = () => {
        axios
            .post(
                `http://www.trazabilidadodsapi.somee.com/api/Vehiculos/Insertar`,
                newVehicle
            )
            .then((response) => {

                setModalAbierto(false);
                setMensaje("Inserción exitosa");

            })
            .catch((error) => console.error('Error al agregar el vehicle:', error));
    }

    return (
        <> 
        <div className = "md:flex flex-row bg-slate-900 min-h-screen" > <Home/>
        <div className="p-4 w-full">

            <h2 className="text-2xl font-bold text-white mb-4">Vehicúlos</h2>
            <div className="overflow-x-auto">
                <div>
                    <button
                        onClick={abrirModal}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-2 mb-5 px-4 rounded">
                        Agregar Vehiculo
                    </button>

                    <button
                        onClick={handlePrint}
                        className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 mt-2 m-2 px-4 rounded">
                        Imprimir listado
                    </button>

                    {
                        modalAbierto && (
                            <div className="fixed inset-0 overflow-y-auto">
                                <div
                                    className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                    </div>

                                    <span
                                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                        aria-hidden="true">&#8203;</span>
                                    <div
                                        className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                        <div>
                                            <div></div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">Agregar Vehiculos</h3>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="Marca"
                                                        placeholder="Marca *"
                                                        value={newVehicle.Marca}
                                                        onChange={handleChange}
                                                        className="border p-2 w-full"/>

                                                    <input
                                                        type="text"
                                                        name="Modelo"
                                                        placeholder="Modelo *"
                                                        value={newVehicle.Modelo}
                                                        onChange={handleChange}
                                                        className="border p-2 w-full mt-2"/>

                                                    <input
                                                        type="number"
                                                        name="Año"
                                                        placeholder="Año *"
                                                        value={newVehicle.Año}
                                                        onChange={handleChange}
                                                        className="border p-2 w-full mt-2"/>

                                                    <input
                                                        type="text"
                                                        name="Color"
                                                        placeholder="Color *"
                                                        value={newVehicle.Color}
                                                        onChange={handleChange}
                                                        className="border p-2 w-full mt-2"/>

                                                    <input
                                                        type="text"
                                                        name="Tipo"
                                                        placeholder="Tipo *"
                                                        value={newVehicle.Tipo}
                                                        onChange={handleChange}
                                                        className="border p-2 w-full mt-2"/>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="mt-5 sm:mt-6">
                                            <button
                                                onClick={handleSubmit}
                                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm">
                                                Guardar
                                            </button>
                                            <button
                                                onClick={cerrarModal}
                                                className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )

                    }

                </div>
                <table className="min-w-full bg-white mt-4" ref={componentRef}>
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
                        {
                            vehiculo.map((vehiculo, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{vehiculo.Marca}</td>
                                    <td className="border px-4 py-2">{vehiculo.Modelo}</td>
                                    <td className="border px-4 py-2">{vehiculo.Año}</td>
                                    <td className="border px-4 py-2">{vehiculo.Color}</td>
                                    <td className="border px-4 py-2">{vehiculo.Tipo}</td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    </div>

</>
    )
}

export default Vehiculos