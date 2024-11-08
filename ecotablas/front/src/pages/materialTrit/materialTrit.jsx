import React, { useEffect, useState } from "react";
import Home from "../home/Home";
import AddButton from "../../components/buttons/AddButton";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModal from "../../components/AddModal";
import ButtonEdit from "../../components/buttons/ButtonEdit";
import LoadingTable from "../../components/LoadingTable";
import NextButton from "../../components/buttons/NextButton";
import NextModal from "../../components/NextModal";
import { useDispatch } from "react-redux";
import { addTolva } from "../../features/tolvaSlice";

import ReportButton from "../../components/buttons/ReportButton";
import {
  getAllMaterials,
  addMaterial,
  editMaterial,
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
  const [modalAbiertoNext, setModalAbiertoNext] = useState(false);

  const [formValues, setFormValues] = useState({
    VolumenT: "",
    Fecha: "",
    IdMaterialClasificado: "",
  });
  const [formValuesTolva, setFormValuesTolva] = useState({
    IdMaterialTriturado: "",
    HorarioInicio: "",
    CantidadCargada: "",
    TipoPlastico: "",
    Proporcion: "",
    Especificaciones: "",
  });

  const abrirModalEdit = (material) => {
    setMaterialId(material.IdMaterialTriturado);
    setFormValues({
      VolumenT: material.VolumenT,
      Fecha: material.Fecha,
      IdMaterialClasificado: material.IdMaterialClasificado,
    });
    setModalEdit(true);
  };

  const cerrarModalEdit = () => setModalEdit(false);

  const abrirModalNext = (material) => {
    setFormValuesTolva((prevState) => ({
      ...prevState,
      IdMaterialTriturado: material.IdMaterialTriturado,
    }));
    setModalAbiertoNext(true);
  };

  const cerrarModalNext = () => {
    setModalAbiertoNext(false);
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
      const res = await getAllMaterials();
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
    } else if (!formValues.Fecha) {
      setMensaje("Fecha es obligatoria.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const response = await addMaterial(formValues);
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
      await editMaterial(materialId, formValues);
      setModalEdit(false);
      setMensaje("Modificación exitosa");
      fetchMaterials();
    } catch (error) {
      setMensaje("Error al modificar el material.");
     
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
    setFormValuesTolva((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const title = ["Volumen", "Fecha de ingreso", "Acciones"];

  const columns = [
    { header: "Volumen (kgs)", dataKey: "VolumenT" },
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
    (acc, material) => acc + parseFloat(material.VolumenT || 0),
    0,
  );
  const totalItems = materials.length;

  const handleSubmitNext = async (e) => {
    e.preventDefault();

    if (!formValuesTolva.HorarioInicio || !formValuesTolva.CantidadCargada) {
      console.error("Por favor completa todos los campos requeridos");
      return;
    }

    await dispatch(addTolva(formValuesTolva));
    axios.delet;

    cerrarModalNext();
    setMensaje("Material pasado a extrucción/tolva correctamente");
  };

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
          <AddButton
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
                      {material.VolumenT} kgs
                    </td>
                    <td className="border-b py-2 px-4">
                      {material.Fecha.slice(0, 10)}
                    </td>
                    <td
                      className={`border-b py-2 px-4 flex justify-center ${modalAbierto ? "hidden" : ""}`}
                    >
                      <NextButton abrirModal={() => abrirModalNext(material)} />

                      {modalAbiertoNext && (
                        <NextModal
                          title="Pasar a Extrucción/tolva"
                          id={material.IdMaterialTriturado}
                          fields={[
                            {
                              name: "IdMaterialTriturado",
                              label:
                                "ID Material triturado (Id no modificable)",
                              type: "text",
                            },

                            {
                              name: "HorarioInicio",
                              label: "Horario de inicio",
                              type: "datetime-local",
                            },
                            {
                              name: "CantidadCargada",
                              label: "Cantidad cargada (kg)",
                              type: "number",
                            },
                            {
                              name: "TipoPlastico",
                              label: "Tipo de plástico",
                              type: "select",
                              options: optionsTipoPlastico,
                            },
                            {
                              name: "Proporcion",
                              label: "Proporción cargada",
                              type: "number",
                            },
                            {
                              name: "Especificaciones",
                              label: "Especificaciones",
                              type: "text",
                            },
                          ]}
                          handleSubmitNext={handleSubmitNext}
                          handleChangeNext={handleChangeTolva}
                          cerrarModal={cerrarModalNext}
                          values={formValuesTolva}
                        />
                      )}

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
