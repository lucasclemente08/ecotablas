
import axios from "axios";
import AddButtonWa from "../../components/buttons/AddButtonWa";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import { MdDateRange } from "react-icons/md";
import DeleteButton from "../../components/buttons/DeleteButton";
import { FiEdit } from "react-icons/fi";
import TableComponent from "../../components/TableComponent";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import { BsClipboardDataFill } from "react-icons/bs";
import { GrLinkNext } from "react-icons/gr";
import VolumenIngresadoChart from "../../components/volumen/VolumenIngresadoChart";
import DateFilter from "../../components/DateFilter";
import SectionLayout from "../../layout/SectionLayout";
import NextProcess from "../../components/buttons/NextProcess";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


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
    VolumenM: "" || undefined,
    VolumenMInutil: "" || undefined,
    FechaIngresoM: "" || undefined ,
    IdTipoPlastico: "" || undefined ,
    Estado: 1,
    TipoDonante: ""  || undefined,
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


  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const abrirModalEdit = (material) => {
    const MaterialSeguro = material || {};
  
    setMaterialId(MaterialSeguro.IdIngresoMaterial);
  
    setFormValues({
      VolumenM: MaterialSeguro.VolumenM || "", // Asegúrate de que coincide con la estructura de `formValues`
      VolumenMInutil: MaterialSeguro.VolumenMInutil || "",
      FechaIngresoM: MaterialSeguro.FechaIngresoM || "",
      IdTipoPlastico: MaterialSeguro.IdTipoPlastico || "",
      Estado: MaterialSeguro.Estado || 1, // Valor por defecto si está vacío
      TipoDonante: MaterialSeguro.TipoDonante || "",
    });
    setModalEdit(true);
  };
  

  const cerrarModalEdit = () => setModalEdit(false);

  const handleSubmit = () => {
    axios
      .post(
        "http://www.trazabilidadodsapi.somee.com/api/IngresoMat/Insertar",
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
        setMensaje("Modificación exitosa");
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
        ...filteredMaterials.find((m) => m.IdIngresoMaterial === materialId),
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
        "http://www.trazabilidadodsapi.somee.com/api/IngresoMat/ListarTodo",
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

    { header: "Fecha de ingreso", dataKey: "FechaIngresoM" },
    { header: "Tipo Donante", dataKey: "TipoDonante" },
  ];

  const optionsTipoPlastico = [
    { value: "PET", label: "PET" },
    { value: "Polietileno", label: "Polietileno" },
    { value: "Polipropileno", label: "Polipropileno" },
    { value: "Poliestireno", label: "Poliestireno" },
    { value: "PVC", label: "PVC" },
  ];
  
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
      name: "FechaIngresoM",
      label: "Fecha Ingreso",
      type: "date",
      placeholder: "Fecha *",
    },
    {
      name: "IdTipoPlastico",
      label: "Tipo de plasticos",
      type: "select",
      options: optionsTipoPlastico,

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
  // const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);

  
  const [sortConfig, setSortConfig] = useState({ campo: "", direction: "asc" });
  const [data, setData] = useState(filteredMaterials);
 
  useEffect(() => {
    setData(filteredMaterials);
  }, [filteredMaterials]);


  const handleSort = (campo) => {
 
    let direction = "asc";
    if (sortConfig.campo === campo && sortConfig.direction === "asc") {
      direction = "desc";
    }
  
    const sortedData = [...filteredMaterials].sort((a, b) => {
      if (a[campo] < b[campo]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[campo] > b[campo]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  
    setData(sortedData);
    setSortConfig({ campo, direction });
  };
  
  const titlesT = [
    { key: "VolumenM", label: "Volumen Util (kgs)", type: "number" },
    { key: "VolumenMInutil", label: "Volumen Inutil (kgs)", type: "number" },
    { key: "FechaIngresoM", label: "Fecha de ingreso", type: "date" },
    { key: "IdTipoPlastico", label: "Tipo de plásticos", type: "string" },
    { key: "TipoDonante", label: "Tipo Donante", type: "string" ,hasActions: true },
// Para acciones como editar o eliminar
  ];
  

  const actions = [
    {
      render: (material) => (
        <td
        className={` py-2 px-4 flex justify-center 
         
        `}
      >
        <button
            onClick={() => abrirModalClasificado(material.IdIngresoMaterial)}
            className="bg-green-600 ml-2 hover:bg-green-800 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              <GrLinkNext />
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
      ),
    },
  ];
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
          data={filteredMaterials}
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
            formValues={formValues}
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
            <AddModalWithSelect
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
             {/* <span class="dark:text-white"> {totalItems}</span> */}
           </h5>
           <h5>
             <span class="text-gray-400">Total volumen: </span>
             <span class="dark:text-white">{totalVolumen.toFixed(2)} kg</span>
           </h5>
         </div>
         <TableComponent
      data={data}
      titles={titlesT}
      sortConfig={sortConfig}
      onSort={handleSort}
      actions={actions}
    />
        </div>    

):(

  <div className="flex-1 flex flex-col gap-4 p-4">
  <DateFilter onFilter={handleFilter} />

  <VolumenIngresadoChart dateRange={dateRange} />
</div>
     
)
}
<NextProcess  linkTo="/clasificacion"
  hoverText="Ir al siguiente proceso"/>
      </SectionLayout>
    </>
  );
};

export default EntradasDeMaterial;