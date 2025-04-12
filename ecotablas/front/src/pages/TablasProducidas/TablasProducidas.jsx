import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { addTablas, getAllTablas } from "../../api/TablasProducidaAPI";
import {
  fetchTablasProducidas,
  addTablaProducida,
  editTablaProducida,
  deleteTablaProducida,
} from "../../features/tablasProducidasSlice";
import SectionLayout from "../../layout/SectionLayout";

import TableComponent from "../../components/TableComponent";
import AddButtonWa from "../../components/buttons/AddButtonWa";
import { BsClipboardDataFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import LoadingTable from "../../components/LoadingTable";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModalWithSelect from "../../components/AddModalWithSelect";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import FilterButton from "../../components/buttons/FilterButton";
import NextButton from "../../components/buttons/NextButton";
import DateFilter from "../../components/DateFilter";
import { Toaster, toast } from 'sonner';
import { editTablas, } from "../../api/TablasProducidaAPI";
import { v4 as uuidv4 } from "uuid";

const TablasProducidas = () => {
  const dispatch = useDispatch();
  const {
    tablas: data,
    loading,
    error,
  } = useSelector((state) => state.tablasProducidas);
  const [selectedDate, setSelectedDate] = useState(""); // Store the selected date
  const [mensaje, setMensaje] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [showTable, setShowTable] = useState(true); 
  const [currentItems, setCurrentItems] = useState([])
  const [tablaId, setTablaId] = useState(null);
  const [originalMaterials, setOriginalMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);

  const [formValues, setFormValues] = useState({
    FechaProduccion: "",
    Dimensiones: "",
    Peso: "",
    CodigoIdentificacion: "",
    Estado: "producida", // Valor por defecto: producida
    IdTolva: 20,
  });

  const columns = [
    { header: "Fecha Producción", accessor: "FechaProduccion" },
    { header: "Dimensiones", accessor: "Dimensiones" },
    { header: "Peso (kgs)", accessor: "Peso" },
    { header: "Código Identificación", accessor: "CodigoIdentificacion" },
    { header: "Estado", accessor: "Estado" },
  ];

  const titles = [...columns.map((col) => col.header), "Acciones"];

  useEffect(() => {
    dispatch(fetchTablasProducidas());
  }, [dispatch]);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => { 
    setModalAbierto(false);
    setFormValues ({
      FechaProduccion: "",
      Dimensiones: "",
      Peso: "",
      CodigoIdentificacion: "",
      Estado: "producida",
      IdTolva: 20,
    });
     };

     const abrirModalEdit = (tabla) => {
      setTablaId(tabla.ID_Tabla);

    setFormValues({
      FechaProduccion: tabla.FechaProduccion,
      Dimensiones: tabla.Dimensiones,
      Peso: tabla.Peso,
      CodigoIdentificacion: tabla.CodigoIdentificacion,
      Estado: tabla.Estado,
      IdTolva: tabla.IdTolva,
    });
    setModalEdit(true);
  };
  const cerrarModalEdit = () => { 
    setModalEdit(false);
    setFormValues ({
      FechaProduccion: "",
      Dimensiones: "",
      Peso: "",
      CodigoIdentificacion: "",
      Estado: "producida",
      IdTolva: 20,
    });
     };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormValues = {
      ...formValues,
      CodigoIdentificacion: GenerateIdentificationCode(
        formValues.Dimensiones,
        formValues.Peso,
        formValues.IdTolva,
        formValues.Estado
      ),
    };

    await addTablas(newFormValues);
    toast.success("Tabla añadida con éxito!");
    await fetchMaterials();
    cerrarModal();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await editTablas( tablaId, formValues );
    toast.success("Registro editado con éxito!");
    setFilteredMaterials((prevMaterials) =>
      prevMaterials.map((data) =>
        data.ID_Tabla === tablaId ? { ...data, ...formValues } : data,
      ),
    );
    cerrarModalEdit();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 
  
  // const totalPages = Math.ceil(data.length / itemsPerPage);
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPeso = filteredMaterials.reduce(
 (acc, tabla) => acc + parseFloat(tabla.Peso || 0),
 0,
);
const totalItems = filteredMaterials.length;

  const dimensionesOptions = [
    { value: "1,50mts x 10cm", label: "1,50mts x 10cm" },
    { value: "1,60mts x 10cm", label: "1,60mts x 10cm" },
  ];

  const estadoOptions = [
    { value: "producida", label: "Producida" },
    { value: "defectuosa", label: "Defectuosa" },
  ];

  const GenerateIdentificationCode = (size, large) => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const codeUID = uuidv4().replace(/-/g, "").slice(0, 8);
    return `$${size}_${large}_${hours}_${codeUID}`;
  };
  const handleChangeState = async (item) => {
    try {
      await editTablas(item.ID_Tabla, {
        ...item,
        Estado: 2, // Cambiar siempre a 2
      });
      toast.success("¡Tabla terminada!");
      dispatch(fetchTablasProducidas()); // Actualizar la lista
    } catch (error) {
      toast.error("Error al cambiar el estado de las tablas.");
      console.error("Error al cambiar el estado:", error);
    }
  };

  const filterByDate = () => {
    const selectedDateObj = new Date(selectedDate);
    const filteredItems = data.filter((item) => {
      const itemDate = new Date(item.FechaProduccion);
      return (
        itemDate.toISOString().slice(0, 10) ===
        selectedDateObj.toISOString().slice(0, 10)
      );
    });

    setCurrentItems(filteredItems); // Update displayed items
  };

  const fetchMaterials = async () => {
    try {
      const response = await fetch(
        "http://www.ecotablasapi.somee.com/api/TablaProducidas/ListarTodo",
      ); // Reemplaza "URL_DEL_ENDPOINT" con la URL de tu API
      if (!response.ok) {
        throw new Error("Error al obtener los datos.");
      }
      const data = await response.json();
      setFilteredMaterials(data);
      setOriginalMaterials(data);

    } catch (error) {
      toast.error("Error al cargar los materiales.");
      console.error("Error fetching data: ", error);
    } finally {
      // Opcional: acciones después de completar la solicitud
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const [sortConfig, setSortConfig] = useState({ campo: "", direction: "asc" });
  const [dataT, setDataT] = useState(filteredMaterials);

  useEffect(() => {
    setDataT(filteredMaterials);
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

    setDataT(sortedData);
    setSortConfig({ campo, direction });
  };

  const titlesT = [
    { label: "Fecha de Producción", key: "FechaProduccion", type:"date",
      
       
      render: (value) => (
        <td className="flex justify-center items-center">
        {value ? value.slice(0, 10) : "Fecha no disponible"}
      </td>
        )
    },
    { label: "Dimensiones", key: "Dimensiones", type: "number" },
    { label: "Peso (kgs)", key: "Peso", type: "number" },
    { label: "Código de Identificación", key: "CodigoIdentificacion", type: "text",hasActions:true},
    { 
      label: "Estado", 
      key: "Estado", 
      type: "text",
      render: (value) => (
        <td className="flex justify-center items-center">
          <span 
            className={`w-full h-full flex items-center justify-center ${
              value === "producida" 
                ? "bg-green-100 text-green-800 w-full h-full py-2 px-4 rounded flex items-center justify-center" 
                : "bg-red-100 text-red-800 w-full h-full py-2 px-4 rounded flex items-center justify-center"
            }`}
          >
            {value === "producida" ? "Producida" : "Defectuosa"}
          </span>
        </td>
      )
    },
  ];

  const actions = [
    {
      allowedRoles: ["admin", "supervisor"],
      render: (item) => (
        <div className="flex items-center justify-start gap-2 py-1">
             
        <button
          onClick={() => abrirModalEdit(item)}
          className="bg-yellow-600 ml-2 hover:bg-yellow-700 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FiEdit  className="mr-2"/>
          Modificar
        </button>
        <DeleteButton
          id={item.ID_Tabla}
          endpoint={
            "http://www.ecotablasapi.somee.com/api/TablaProducidas/Borrar"
          }
          updateList={fetchMaterials}
        />
      </div>
      ),
    },
  ];

  return (
    <SectionLayout title="Tablas Producidas">
      <Toaster />

    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">     

                        {/* Grupo de acciones izquierda (añadir, PDF y vista) */}
                        <div className="flex flex-wrap items-center gap-2">
      <AddButtonWa abrirModal={abrirModal} title="Añadir tabla" />
      <PdfGenerator
        columns={columns}
        data={data}
        title="Reporte de Tablas Producidas"
      />
    </div>
          {/* Grupo derecha (solo filtro) */}
          <div className="flex flex-wrap items-center gap-2">
          <FilterButton
  data={originalMaterials} // Pasa los datos originales aquí
  dateField="FechaProduccion"
  onFilter={(filtered) => {
    setFilteredMaterials(filtered);
    setCurrentPage(1);
  }}
  onReset={() => {
    setFilteredMaterials(originalMaterials); // Restablece a los datos originales
    setCurrentPage(1);
  }}
  onPageReset={() => setCurrentPage(1)}
/>
          </div>
        </div>

          {mensaje && (
            <div className="bg-blue-600 text-white py-2 px-4 rounded mb-4">
              {mensaje}
            </div>
          )}
  
      {modalAbierto && (
        <AddModalWithSelect
          title="Agregar Tabla Producida"
          fields={[
            {
              name: "FechaProduccion",
              label: "Fecha Producción",
              type: "date",
            },
            {
              name: "Dimensiones",
              label: "Dimensiones",
              type: "select",
              options: dimensionesOptions,
            },
            { name: "Peso", label: "Peso (kgs)", type: "number" },
            {
              name: "Estado",
              label: "Estado",
              type: "select",
              options: estadoOptions,
            },
          ]}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cerrarModal={cerrarModal}
          values={formValues}
        />
      )}
      {modalEdit && (
        <ButtonEdit
          title="Tabla Producida"
          fields={[
            {
              name: "Dimensiones",
              label: "Dimensiones",
              type: "select",
              options: dimensionesOptions,
            },
            { name: "Peso", label: "Peso (kgs)", type: "number" },
            {
              name: "Estado",
              label: "Estado",
              type: "select",
              options: estadoOptions,
            },
          ]}
          formValues={formValues}
          handleChange={handleChange}
          handleEditSubmit={handleEditSubmit}
          cerrarModalEdit={cerrarModalEdit}
        />
      )}

{showTable ? (


<div className="overflow-x-auto">
  {/* Versión minimalista para fondo oscuro */}
  <div className="mb-4 flex justify-center gap-6">
    <div className="text-center">
      <p className="text-sm text-gray-300">Total de tablas</p>
      <p className="text-lg font-semibold text-white"> {totalItems}</p>
    </div>
    <div className="text-center">
      <p className="text-sm text-gray-300">Tablas producidas</p>
      <p className="text-lg font-semibold text-white">
        {filteredMaterials.filter(t => t.Estado === "producida").length}
      </p>
    </div>
    <div className="text-center">
      <p className="text-sm text-gray-300">Tablas defectuosas</p>
      <p className="text-lg font-semibold text-white">
        {filteredMaterials.filter(t => t.Estado === "defectuosa").length}
      </p>
    </div>
    <div className="text-center">
      <p className="text-sm text-gray-300">Peso total</p>
      <p className="text-lg font-semibold text-white">{totalPeso.toFixed(2)} kg</p>
    </div>
  </div>
<TableComponent
      data={dataT}
      titles={titlesT}
      sortConfig={sortConfig}
      onSort={handleSort}
      actions={actions}
      hasMaterial={true}
    />

</div>  
     
):(
<div className="flex-1 flex flex-col gap-4 p-4">

</div>
   
)
}

 </SectionLayout>


);
};

export default TablasProducidas;