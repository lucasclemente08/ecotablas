
import axios from "axios";
import AddButtonWa from "../../components/buttons/AddButtonWa";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import { MdDateRange } from "react-icons/md";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModal from "../../components/AddModal";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import LoadingTable from "../../components/LoadingTable";
import TablaHead from "../../components/Thead";
import VolumenIngresadoChart from "../../components/volumen/VolumenIngresadoChart";
import DateFilter from "../../components/DateFilter";
import SectionLayout from "../../layout/SectionLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Pagination from "../../components/Pagination";
import {
  getAllMaterialClas,
  addMaterialClas,
  editMaterialClas,
} from "../../api/MaterialClasAPI";
import {
editIngresoMat,
} from "../../api/IngresoMaterialAPI";
import { useState,useEffect } from "react";
import FilterButton from "../../components/buttons/FilterButton";
import AddModalWithSelect from "../../components/AddModalWithSelect";

const EntradasDeMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [plasticos, setPlasticos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  // const [currentItems,setCurrentItems]=useState([]);
  const [materialId, setMaterialId] = useState(null);
  const [modalClasificado, setModalClasificado] = useState(false); 
  const [selectedDate, setSelectedDate] = useState("");
  
  const [filteredMaterials, setFilteredMaterials] = useState([]); // Datos filtrados
  const [formValues, setFormValues] = useState({
    VolumenM: "",
    VolumenMInutil: "",
    FechaIngresoM: "",
    IdTipoPlastico: "",
    Estado: 1,
    TipoDonante: "",
  });

  const [clasificacionValues, setClasificacionValues] = useState({
    VolumenUtil: "",
    VolumenInutil: "",
    FechaC: "",
    IdIngresoMaterial: "",
    Estado: 1,
  });

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleFilter = (dates) => {
    setDateRange(dates);
  };

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Número de elementos por página

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const abrirModalEdit = (material) => {
    setMaterialId(material.IdIngresoMaterial);

    setFormValues({
      VolumenUtil: material.VolumenM,
      VolumenInutil:material.VolumenMInutil,
      FechaIngresoM: material.FechaIngresoM,
      IdTipoPlastico: material.IdTipoPlastico,
      Estado: material.Estado,
      TipoDonante: material.TipoDonante,
    });
    setModalEdit(true);
  };

  const cerrarModalEdit = () => setModalEdit(false);

  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:61274/api/IngresoMat/Insertar",
        formValues,
      )
      .then(() => {
        cerrarModal();
        fetchMaterials();
      })
      .catch((error) => console.error("Error al agregar el material:", error));
  };

  const handleEditSubmit = () => {
    if (
      !formValues.VolumenM ||
      !formValues.VolumenMInutil ||
      !formValues.FechaIngresoM ||
      !formValues.IdTipoPlastico ||
      !formValues.Estado ||
      !formValues.TipoDonante
    ) {
      toast.warn("Todos los campos son obligatorios.");
      return;
    }

    axios.put(`http://localhost:61274/api/IngresoMat/Modificar/${materialId}`,formValues,)
      .then(() => {
        setModalEdit(false);
        toast.success("Modificación exitosa");
        fetchMaterials();
      })
      .catch((error) =>
        console.error("Error al modificar el material:", error),
      );
  };

  const abrirModalClasificado = (id) => {
    const fechaActual = new Date().toISOString();
    setMaterialId(id);
    setClasificacionValues({ ...clasificacionValues, FechaC: fechaActual, IdIngresoMaterial: id });
    setModalClasificado(true);
  };

  const cerrarModalClasificado = () => setModalClasificado(false);

  const validateClasificadoForm = () => {
    let isValid = true;
    if (!clasificacionValues.VolumenUtil) {
      setMensaje("El volumen util es obligatorio.");
      isValid = false;
    } else if (!clasificacionValues.VolumenInutil) {
      setMensaje("El volumen inutil es obligatorio.");
      isValid = false;
    } 
    return isValid;
  };

  const handleSubmitClasificado = async () => {
    if (!validateClasificadoForm()) return;
  
    try {
      await addMaterialClas(clasificacionValues);
      setMensaje("Lote enviado a clasificación");
  
      const materialActualizado = {
        ...materials.find((m) => m.IdIngresoMaterial === materialId),
        Estado: 2, 
      };
  
      await editIngresoMat(materialId, materialActualizado);

      setModalClasificado(false);
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

  const handleChangeClasificado = (e) => {
    const { name, value } = e.target;
    setClasificacionValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:61274/api/IngresoMat/ListarTodo",
      );
      setFilteredMaterials(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);


  const title = ["Volumen Util (kgs)", "Volumen Inutil (kgs)", "Fecha de ingreso","Tipo de plasticos", "Tipo Donante", "Acciones"];
  const columns = [
    { header: "Volumen Util (kgs)", dataKey: "VolumenUtil" },
    { header: "Volumen Inutil (kgs)", dataKey: "VolumenMInutil" },
    { header: "Tipo de plasticos", dataKey: "IdTipoPlastico" },

    { header: "Fecha de ingreso", dataKey: "FechaIngresoP" },
    { header: "Tipo Donante", dataKey: "TipoDonante" },
  ];

  const optionsPlasticos = plasticos.map((res) => ({
    value: res.IdTipoPlastico,   // Assigns the IdTipoPlastico to the value key
    label: `${res.TipoPlastico}`, // Converts TipoPlastico to a string and assigns it to the label key
  }));
  
  const fields = [
    {
      name: "VolumenM",
      label: "Volumen Util",
      type: "text",
      placeholder: "Volumen Util *",
    },
    {
      name: "VolumenMInutil",
      label: "Volumen Inutil",
      type: "text",
      placeholder: "Volumen Inutil *",
    },
    {
      name: "IdTipoPlastico",
      label: "Material",
      type: "select",
      options: optionsTipoPlastico
    },
    {
      name: "FechaIngresoM",
      label: "Fecha Ingreso",
      type: "date",
      placeholder: "Fecha *",
    },
    {
      name: "IdTipoPlastico",
      label: "Tipo de plasticos",
      type: "select",
      options: optionsPlasticos,

    },
    {
      name: "TipoDonante",
      label: "Tipo Donante",
      type: "select",
    options: [
      { value: "Urbanos", label: "Recolección de urbanos" },
      { value: "Empresa", label: "Empresa donante" },
      { value: "Particular", label: "Particular" },
    ],
    },
  ];
  const fetchPlasticos = async () => {
    try {
      const response = await axios.get(
        "http://www.trazabilidadodsapi.somee.com/api/TiposPlastico/ListarTodo",
      );
      setPlasticos(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  useEffect(() => {
    fetchPlasticos();
  }, []);
  
const getPlasticbyId =(id)=>{
  const plastic = plasticos.find((p) => p.IdTipoPlastico === id);
    return plastic
      ? `(${plastic.TipoPlastico})`
      : "Plastico no disponible";
}
  const [showTable, setShowTable] = useState(true); 

  const toggleView = () => {
    setShowTable(!showTable);  
  };

 

  const filterByDate = () => {
    const filteredItems = filteredMaterials.filter((item) => {
      const itemDate = new Date(item.FechaIngresoM).toISOString().slice(0, 10); 
      return itemDate === selectedDate;
    });
  
    setFilteredMaterials(filteredItems);
    setCurrentPage(1); 
  };




  


  
  const totalVolumen = filteredMaterials.reduce(
    (acc, material) =>
      acc + parseFloat(material.VolumenM || 0) + parseFloat(material.VolumenMInutil || 0),
    0,
  );
  const totalItems =filteredMaterials.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMaterials.slice(indexOfFirstItem, indexOfLastItem);
  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
  return (
    <>
      <SectionLayout title="Materiales Ingresados">
<div className="flex flex-wrap items-center gap-1 ">

        <AddButtonWa
          abrirModal={abrirModal}
          title={"Añadir Ingreso de Material"}
          />
        <PdfGenerator
          columns={columns}
          data={materials}
          title="Reporte de Materiales Ingresados"
          />
   
 
<button
        onClick={toggleView}
        className="bg-blue-600 hover:bg-blue-700 flex justify-center items-center text-white font-bold py-2 mt-2 mb-5 px-4 rounded"
        >
  {showTable ? <>Ver grafico <MdDateRange className="m-1" /> </> : <>Ver Tablas <BsClipboardDataFill className="m-1" /></>}
      </button>

      <FilterButton
        data={filteredMaterials}
        dateField="FechaIngresoM"
        onFilter={setFilteredMaterials}
        onReset={() => setFilteredMaterials(filteredMaterials)}
        onPageReset={() => setCurrentPage(1)}
      />

        </div>

        {modalAbierto && (
          <AddModalWithSelect
            title="Agregar Ingreso de Material"
            fields={fields}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            cerrarModal={cerrarModal}
            values={formValues}
          />
        )}
      <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>

        {modalEdit && (
          <ButtonEdit
            title="Material"
            fields={fields}
            id={materialId}
            formValues={formValues}
            handleChange={handleChange}
            handleEditSubmit={handleEditSubmit}
            cerrarModalEdit={cerrarModalEdit}
          />
        )}

        {modalClasificado && (
            <AddModal
              title="Enviar lote a clasificación"
              fields={[
                { name: "VolumenUtil", label: "Volumen Util", type: "number", placeholder: "Volumen Util *" },
                { name: "VolumenInutil", label: "Volumen Inutil", type: "number", placeholder: "Volumen Inutil *" }
              ]}
              handleChange={handleChangeClasificado}
              handleSubmit={handleSubmitClasificado}
              cerrarModal={cerrarModalClasificado}
              values={clasificacionValues}
            />
          )}
{showTable ? (
         


         <div className="overflow-x-auto">
         <div class="flex  p-2  items-center   shadow-md bg-gray-700 text-white flex-1 space-x-4">
           <h5>
             <span class="text-gray-400">Total de materiales ingresados:</span>
             <span class="dark:text-white"> {totalItems}</span>
           </h5>
           <h5>
             <span class="text-gray-400">Total volumen: </span>
             <span class="dark:text-white">{totalVolumen.toFixed(2)} kg</span>
           </h5>
         </div>
           <table className="min-w-full bg-white rounded-lg shadow-md">
             <LoadingTable loading={loading} />
             <TablaHead titles={title} />
             <tbody className="bg-white">
               {currentItems.map((material) => (
                 <tr key={material.IdMaterialClasificado} className="hover:bg-gray-100">
   <td className="border-b py-2 px-4 text-right">
     <span className="font-semibold lg:hidden">Volumen Útil: </span>
     {material.VolumenM} kgs
   </td>
   <td className="border-b py-2 px-4 text-right">
     <span className="font-semibold lg:hidden">Volumen Inútil: </span>
     {material.VolumenMInutil} kgs
   </td>
   <td className="border-b py-2 px-4 text-left">
     <span className="font-semibold lg:hidden">Tipo de Plástico: </span>
     {material.IdTipoPlastico}
   </td>
   <td className="border-b py-2 px-4 text-right">
     <span className="font-semibold lg:hidden">Fecha de Ingreso: </span>
     {material.FechaIngresoM.slice(0, 10)}
   </td>
   <td className="border-b py-2 px-4 text-left">
     <span className="font-semibold lg:hidden">Tipo de Donante: </span>
     {material.TipoDonante}
                   </td>
                  <td
                    className={` py-2 px-4 flex justify-center ${
                      modalEdit || modalAbierto ? "hidden" : ""
                    }`}
                  >
                    <button
                        onClick={() => abrirModalClasificado(material.IdIngresoMaterial)}
                        className="bg-green-700 ml-2 hover:bg-green-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Terminado
                      </button>
                    <button
                      className="bg-yellow-600 ml-2 hover:bg-yellow-700 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => abrirModalEdit(material)}
                    >
                              <FiEdit />
                              Modificar
                    </button>

                    <DeleteButton
                      id={material.IdIngresoMaterial}
                      endpoint="http://www.trazabilidadodsapi.somee.com/api/IngresoMat/Borrar"
                      updateList={fetchMaterials}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Controles de paginación integrados */}

          <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    paginate={paginate}
  />
        </div>    

):(

  <div className="flex-1 flex flex-col gap-4 p-4">
  <DateFilter onFilter={handleFilter} />

  <VolumenIngresadoChart dateRange={dateRange} />
</div>
     
)
}

      </SectionLayout>
    </>
  );
};

export default EntradasDeMaterial;