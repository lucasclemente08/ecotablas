import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SectionLayout from "../../layout/SectionLayout";
import AddButtonWa from "../../components/buttons/AddButtonWa";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import LoadingTable from "../../components/LoadingTable";
import TablaHead from "../../components/Thead";
import AddModal from "../../components/AddModal";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModalWithSelect from "../../components/AddModalWithSelect";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import NextButton from "../../components/buttons/NextButton";
import ReportButton from "../../components/buttons/ReportButton";
import { addTablas, } from "../../api/TablasProducidaAPI";
import { v4 as uuidv4 } from "uuid";
import {
  getAllTolva,
  addTolva,
  editTolva,
} from "../../api/TolvaAPI";

const Tolva = () => {
  const dispatch = useDispatch();
  const [materials, setMaterials] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalEdit, setModalEdit] = useState(false);
  const [materialId, setMaterialId] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [modalTabla, setModalTabla] = useState(false);

  const [formValues, setFormValues] = useState({
    HorarioInicio: "",
    CantidadCargada: "",
    TipoPlastico: "unico",
    Proporcion: "",
    Especificaciones: "",
    Estado: 1,
  });
  const GenerateIdentificationCode = (size, large) => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const codeUID = uuidv4().replace(/-/g, "").slice(0, 8);
    return `$${size}_${large}_${hours}_${codeUID}`;
  };
  const [tablaValues, setTablaValues] = useState({
    FechaProduccion: "",
    Dimensiones: "",
    Peso: "",
    CodigoIdentificacion: "",
    Estado: 1,
  });
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleFilter = (dates) => {
    setDateRange(dates);
  };


  const abrirModal = () => {
    setModalAbierto(true);
  };
  const cerrarModal = () => {
    setModalAbierto(false);
  };
  const abrirModalEdit = (material) => {
    setMaterialId(material.IdTolva);
    setFormValues({
      HorarioInicio: material.HorarioInicio,
      CantidadCargada: material.CantidadCargada,
      TipoPlastico: material.TipoPlastico,
      Proporcion: material.proporcion,
      Especificaciones: material.Especificaciones,
      Estado: 1,
    });
    setModalEdit(true);
  };
  const cerrarModalEdit = () => setModalEdit(false);
  
  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await getAllTolva();
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
  
  const abrirModalTabla = (id) => {
    const fechaActual = new Date().toISOString();
    setMaterialId(id);
    setTablaValues({ ...tablaValues, IdTolva: id, FechaProduccion: fechaActual, CodigoIdentificacion: GenerateIdentificationCode(tablaValues.Dimensiones,
      tablaValues.Peso,), });
    setModalTabla(true);
  };
  
  const cerrarModalTabla = () => setModalTabla(false); 

  const validateTablaForm = () => {
    let isValid = true;
    if (!tablaValues.Dimensiones) {
      setMensaje("Las dimensiones son obligatoria.");
      isValid = false;
    } else if (!tablaValues.Peso) {
      setMensaje("El peso es obligatorio.");
      isValid = false;
    } 
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const response = await addTolva(formValues);
      setModalAbierto(false);
      setMensaje("Inserción exitosa");
      setMaterials([...materials, response.data]);
    } catch (error) {
      setMensaje("Error al agregar el material.");
      console.error("Error al agregar el material:", error);
    }
  };
  const validateForm = () => {
    let isValid = true;
    if (!formValues.formValues.HorarioInicio) {
      setMensaje("El horario de inicio es obligatorio.");
      isValid = false;
    } else if(!formValues.CantidadCargada) {
      setMensaje("La cantidad es obligatoria.");
      isValid = false;
    } else if (!formValues.TipoPlastico) {
      setMensaje("El tipo de plástico es obligatorio.");
      isValid = false;
    } else if (!formValues.Proporcion) {
      setMensaje("La proporcion es obligatoria.");
      isValid = false;
    } else if (!formValues.Especificaciones) {
      setMensaje("Las especificaciones son obligatorias.");
      isValid = false;
    } 
    
    return isValid;
  };
  const handleEditSubmit = async () => {
    if (!validateForm()) return;
    try {
      await editTolva(materialId, formValues);
      setModalEdit(false);
      setMensaje("Modificación exitosa");
      fetchMaterials();
    } catch (error) {
      setMensaje("Error al modificar el material.");
      console.error("Error al modificar el material:", error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitTabla = async () => {
    if (!validateTablaForm()) return;
  
    try {
      await addTablas(tablaValues);
      setMensaje("¡Tabla producida!");
  
      // Luego, actualiza el estado a 2
      const materialActualizado = {
        ...materials.find((m) => m.IdTolva === materialId),
        Estado: 2, // Establecer el estado a 2
      };
      await editTolva(materialId, materialActualizado);

      setModalTabla(false);
      fetchMaterials(); // Refrescar la lista para mostrar cambios
    } catch (error) {
      setMensaje("Error al terminar el proceso.");
      console.error("Error al terminar el proceso:", error);
    }
  };
  const handleChangeTabla = (e) => {
    const { name, value } = e.target;
    setTablaValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = materials.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(materials.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalVolumen = materials.reduce(
    (acc, material) => acc + parseFloat(material.CantidadCargada || 0),
    0
  );
  const totalItems = materials.length;

  const optionsTipoPlastico = [
    { value: 'Unico', label: 'Tipo-Único' },
    { value: 'Mezcla', label: 'Tipo-Mezcla' },
    // ... otras opciones
  ];


  const rows = materials.map((material) => ({
    Fecha: material.HorarioInicio.slice(0, 10),
  }));

  const columns = [
    { header: "Horario de inicio", accessor: "horario_inicio" },
    { header: "Cantidad cargada (kg)", accessor: "cantidadCargada" },
    { header: "Tipo de plástico", accessor: "tipo_plastico" },
    { header: "Proporción cargada", accessor: "proporcion" },
    { header: "Especificaciones", accessor: "especificaciones" },
  ];
  const dimensionesOptions = [
    { value: "1,50mts x 10cm", label: "1,50mts x 10cm" },
    { value: "1,60mts x 10cm", label: "1,60mts x 10cm" },
  ];

  const titles = [...columns.map((col) => col.header), "Acciones"];
  return (
    <SectionLayout title="Tolva">
      <AddButtonWa abrirModal={abrirModal} title="Añadir Registro" />
      <PdfGenerator columns={columns} data={materials} title="Reporte de Tolva" />

      {mensaje && (
            <div className="bg-blue-600 text-white py-2 px-4 rounded mb-4">
              {mensaje}
            </div>
          )}
     
      {modalAbierto && (
        <AddModalWithSelect 
          title="Agregar Registro de Tolva"
          fields={[
            { name: "HorarioInicio", label: "Horario de inicio", type: "datetime-local" },
            { name: "CantidadCargada", label: "Cantidad cargada (kg)", type: "number" },
            { name: "TipoPlastico", label: "Tipo de plástico", type: "select", options: optionsTipoPlastico },
            { name: "Proporcion", label: "Proporción cargada", type: "number" },
            { name: "Especificaciones", label: "Especificaciones", type: "text" },
          ]}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cerrarModal={cerrarModal}
          values={formValues}
        />
      )}
{modalEdit && (
  <ButtonEdit
    title="Editar Registro de Tolva"
    fields={[
      { name: "CantidadCargada", label: "Cantidad cargada (kg)", type: "number", placeholder: "Cantidad cargada *" },
      { name: "TipoPlastico", label: "Tipo de plástico", type: "select", options: optionsTipoPlastico },
      { name: "Proporcion", label: "Proporción cargada", type: "number", placeholder: "Proporción *" },
      { name: "Especificaciones", label: "Especificaciones", type: "text", placeholder: "Especificaciones *" },
    ]}
    formValues={formValues}
    handleChange={handleChange}
    handleEditSubmit={handleEditSubmit}   // Cambiado a handleEditSubmit
    cerrarModalEdit={cerrarModalEdit}     // Cambiado a cerrarModalEdit
  />
)}

{modalTabla &&
          <AddModalWithSelect title="Terminar Tablas"
          fields={[
            {
              name: "Dimensiones",
              label: "Dimensiones",
              type: "select",
              options: dimensionesOptions,
            },
            { name: "Peso", label: "Peso", type: "number" },
          ]}
            handleChange={handleChangeTabla}
            handleSubmit={handleSubmitTabla}
            cerrarModal={cerrarModalTabla}
          values={tablaValues}
          />

          }

      {loading ? (
        <LoadingTable />
      ) : (
        <>
          <table className="table-auto w-full bg-white rounded-lg shadow-lg">
            <TablaHead titles={titles} />
            <tbody>
              {currentItems.map((material) => (
                <tr key={material.IdTolva}>
                  <td className="px-4 py-2 ">{material.HorarioInicio.slice(0,10)}</td>
                  <td className="px-4 py-2">{material.CantidadCargada}</td>
                  <td className="px-4 py-2">{material.TipoPlastico}</td>
                  <td className="px-4 py-2">{material.Proporcion}</td>
                  <td className="px-4 py-2">{material.Especificaciones}</td>
                  <td className="px-4 py-2 flex">
                  <button
                        onClick={() => abrirModalTabla(material.IdTolva)}
                        className="bg-green-700 ml-2 hover:bg-green-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Terminado
                      </button>
                    <button
                      onClick={() => abrirModalEdit(material)}
                      className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Modificar
                    </button>
                    <DeleteButton
                      id={material.IdTolva}
                      endpoint="http://localhost:61274/api/Tolva/Borrar"
                      updateList={fetchMaterials}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            {/* {Array.from({ length: totalPages }).map((_, index) => (
              <NextButton key={index} onClick={() => paginate(index + 1)} active={currentPage === index + 1}>
                {index + 1}
              </NextButton>
            ))} */}
          </div>
          <div className="mt-4 text-white">
            <p>Total de Volumen Cargado: {totalVolumen} kg</p>
            <p>Total de Items: {totalItems}</p>
          </div>
        </>
      )}
    </SectionLayout>
  );
};

export default Tolva;