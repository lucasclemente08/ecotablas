import React, { useEffect, useState } from "react";
import Home from "../home/Home";
import AddButtonWa from "../../components/buttons/AddButtonWa";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModal from "../../components/AddModal";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import LoadingTable from "../../components/LoadingTable";
// import { addTolva } from "../../features/tolvaSlice";
import { useSelector, useDispatch } from "react-redux";
import {addTolva} from "../../api/TolvaAPI";


import {
  getAllMaterialTrit,
  addMaterialTrit,
  editMaterialTrit,
} from "../../api/materialTritAPI";

import { Await } from "react-router-dom";

const MaterialTrit = () => {
  const dispatch = useDispatch();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [materialId, setMaterialId] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [modalTolva,setModalTolva] = useState(false);

  const [formValues, setFormValues] = useState({
    VolumenT: "",
    Fecha: "",
    IdMaterialClasificado: "",
    VolumenTInutil: "",
    Estado: 1,
  });
  const [tolvaValues, setTolvaValues] = useState({
    IdMaterialTriturado:"",
    HorarioInicio: "",
    CantidadCargada: "",
    TipoPlastico: "",
    Proporcion: "",
    Especificaciones: "",
  });

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleFilter = (dates) => {
    setDateRange(dates);
  };

  const abrirModalEdit = (material) => {
    setMaterialId(material.IdMaterialTriturado);
    setFormValues({
      VolumenT: material.VolumenT,
      VolumenTInutil: material.VolumenTInutil,
      Fecha: material.Fecha,
      IdMaterialClasificado: material.IdMaterialClasificado,
      Estado: material.Estado,
    });
    setModalEdit(true);
  };

  const cerrarModalEdit = () => setModalEdit(false);


  const abrirModalTolva = (id) => {
    const fechaActual = new Date().toISOString();
    setMaterialId(id);
    setTolvaValues({ ...tolvaValues, IdMaterialTriturado: id, HorarioInicio: fechaActual,});
    setModalTolva(true);
  };
  
  const cerrarModalTolva = () => setModalTolva(false);


    const validateTolvaForm = () => {
      let isValid = true;
      if (!tolvaValues.CantidadCargada) {
        setMensaje("La cantidad es obligatoria.");
        isValid = false;
      } else if (!tolvaValues.TipoPlastico) {
        setMensaje("El tipo de plástico es obligatorio.");
        isValid = false;
      } else if (!tolvaValues.Proporcion) {
        setMensaje("La proporción es obligatoria.");
        isValid = false;
      } else if (!tolvaValues.Especificaciones) {
        setMensaje("Las especificaciones son obligatorias.");
        isValid = false;
      } 
      return isValid;
    };



  const abrirModal = () => {
    setModalAbierto(true);
  };
  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await getAllMaterialTrit();
      setMaterials(res.data);
    } catch (error) {
      setMensaje("Error al cargar los materiales.");
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMaterials();
  }, []);

  const validateForm = () => {
    let isValid = true;
    if (!formValues.VolumenT) {
      setMensaje("Volumen es obligatorio.");
      isValid = false;
    } else if(!formValues.VolumenTInutil) {
      setMensaje("Volumen Inutil es obligatorio.");
      isValid = false;
    } else if (!formValues.Fecha) {
      setMensaje("Fecha es obligatoria.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const response = await addMaterialTrit(formValues);
      setModalAbierto(false);
      setMensaje("Inserción exitosa");
      setMaterials([...materials, response.data]);
    } catch (error) {
      setMensaje("Error al agregar el material.");
      console.error("Error al agregar el material:", error);
    }
  };

  const handleEditSubmit = async () => {
    if (!validateForm()) return;
    try {
      await editMaterialTrit(materialId, formValues);
      setModalEdit(false);
      setMensaje("Modificación exitosa");
      fetchMaterials();
    } catch (error) {
      setMensaje("Error al modificar el material.");
      console.error("Error al modificar el material:", error);
    }
  };

  const handleSubmitTolva = async () => {
    if (!validateTolvaForm()) return;
  
    try {
      await addTolva(tolvaValues);
      setMensaje("Lote enviado a tolva");
  
      // Luego, actualiza el estado a 2
      const materialActualizado = {
        ...materials.find((m) => m.IdMaterialTriturado === materialId),
        Estado: 2, // Establecer el estado a 2
      };
      await editMaterialTrit(materialId, materialActualizado);

      setModalTolva(false);
      fetchMaterials(); // Refrescar la lista para mostrar cambios
    } catch (error) {
      setMensaje("Error al terminar el proceso.");
      console.error("Error al terminar el proceso:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeTolva = (e) => {
    const { name, value } = e.target;
    setTolvaValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const title = ["Volumen Util", "Volumen Inutil", "Fecha de ingreso", "Acciones"];

  const columns = [
    { header: "Volumen (kgs)", dataKey: "VolumenT" },
    { header: "Volumen Inutil (kgs)", dataKey: "VolumenTInutil" },
    { header: "Fecha", dataKey: "Fecha" },
  ];

  const rows = materials.map((material) => ({
    VolumenT: `${material.VolumenT} kgs`,
    Fecha: material.Fecha.slice(0, 10),
  }));

  const fields = [
    {
      name: "VolumenT",
      label: "Volumen",
      type: "text",
      placeholder: "Volumen *",
    },
    {
      name: "VolumenTInutil",
      label: "Volumen Inutil",
      type: "text",
      placeholder: "Volumen *",
    },
    { name: "Fecha", label: "Fecha", type: "date", placeholder: "Fecha *" },
    {
      name: "IdMaterialClasificado",
      label: "Material Triturado",
      type: "text",
      placeholder: "Material Triturado *",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = materials.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total de páginas
  const totalPages = Math.ceil(materials.length / itemsPerPage);

  const totalVolumen = materials.reduce(
    (acc, material) =>
      acc + parseFloat(material.VolumenT || 0) + parseFloat(material.VolumenTInutil || 0),
    0,
  );
  const totalItems = materials.length;


  const optionsTipoPlastico = [
    { value: "Unico", label: "Tipo-Único" },
    { value: "Mescla", label: "Tipo-Mezcla" },
    // ... otras opciones
  ];

  return (
    <>
      <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">
            Materiales Triturado
          </h2>
          <AddButtonWa
            abrirModal={abrirModal}
            title={" Añadir Materiales triturado"}
          />

          <PdfGenerator
            columns={columns}
            data={materials}
            title="Reporte de Materiales triturado"
          />


          {mensaje && (
            <div className="bg-blue-600 text-white py-2 px-4 rounded mb-4">
              {mensaje}
            </div>
          )}

          {modalAbierto && (
            <AddModal
              title="Agregar Material Triturado"
              fields={fields}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              cerrarModal={cerrarModal}
              values={formValues}
            />
          )}
            {modalEdit && (
              <ButtonEdit
                title="Material Triturado"
                fields={fields}
                id={materialId}
                formValues={formValues}
                handleChange={handleChange}
                handleEditSubmit={handleEditSubmit}
                cerrarModalEdit={cerrarModalEdit}
              />
          )}
          <div class="flex  p-2  items-center   shadow-md bg-gray-700 text-white flex-1 space-x-4">
            <h5>
              <span class="text-gray-400">Total de materiales:</span>
              <span class="dark:text-white"> {totalItems}</span>
            </h5>
            <h5>
              <span class="text-gray-400">Total volumen: </span>
              <span class="dark:text-white">{totalVolumen.toFixed(2)} kg</span>
            </h5>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <LoadingTable loading={loading} />
              <TablaHead titles={title} />

              <tbody>
                {currentItems.map((material) => (
                  <tr
                    key={material.IdMaterialTriturado}
                    className="hover:bg-gray-100 m-5"
                  >
                    <td className="border-b py-2 px-4">
                     Volumen Util: {material.VolumenT} kgs
                    </td>
                  <td className="border-b py-2 px-4">
                    Volumen Inutil: {material.VolumenTInutil} kgs
                  </td>
                    <td className="border-b py-2 px-4">
                      {material.Fecha.slice(0, 10)}
                    </td>
                    <td
                      className={`border-b py-2 px-4 flex justify-center ${modalAbierto ? "hidden" : ""}`}
                    >
                    <button
                        onClick={() => abrirModalTolva(material.IdMaterialTriturado)}
                        className="bg-green-700 ml-2 hover:bg-green-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Terminado
                      </button>

                      {modalTolva &&
          <AddModal title="Pasar a Extrucción/tolva"
          fields={[
            { name: "CantidadCargada", label: "Cantidad cargada (kg)", type: "number" },
            { name: "TipoPlastico", label: "Tipo de plástico", type: "select", options: optionsTipoPlastico },
            { name: "Proporcion", label: "Proporción cargada", type: "number" },
            { name: "Especificaciones", label: "Especificaciones", type: "text" },
          ]}
            handleChange={handleChangeTolva}
            handleSubmit={handleSubmitTolva}
            cerrarModal={cerrarModalTolva}
          values={tolvaValues}
          />

          }





                      
                      <button
                        onClick={() => abrirModalEdit(material)}
                        className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Modificar
                      </button>
                      <DeleteButton
                        id={material.IdMaterialTriturado}
                        endpoint="http://www.trazabilidadodsapi.somee.com/api/MaterialTrit/Borrar"
                        updateList={fetchMaterials}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Controles de paginación integrados */}
            <div className="flex justify-between items-center bg-gray-700">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2  ml-2 hover:text-gray-400 text-white rounded-l"
              >
                Anterior
              </button>
              <span className="text-gray-300">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 hover:text-gray-400  text-white rounded-r"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaterialTrit;
