import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

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
import NextButton from "../../components/buttons/NextButton";
import toast, { Toaster } from 'react-hot-toast';
import { editTablas, } from "../../api/TablasProducidaAPI";
import { v4 as uuidv4 } from "uuid";

const TablasProducidas = () => {
  const dispatch = useDispatch();
  const {tablas: data, loading, error } = useSelector(
    (state) => state.tablasProducidas,
  );
  const [selectedDate, setSelectedDate] = useState("");  // Store the selected date
  const [mensaje, setMensaje] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [currentItems, setCurrentItems] = useState([])
  const [tablaId, setTablaId] = useState(null);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  
  const [formValues, setFormValues] = useState({
    FechaProduccion: "",
    Dimensiones: "",
    Peso: "",
    CodigoIdentificacion: "",
    Estado: 1,
    IdTolva: "",
  });

  const columns = [
    { header: "Fecha Producción", accessor: "FechaProduccion" },
    { header: "Dimensiones", accessor: "Dimensiones" },
    { header: "Peso (kgs)", accessor: "Peso" },
    { header: "Código Identificación", accessor: "CodigoIdentificacion" },
  ];

  const titles = [...columns.map((col) => col.header), "Acciones"];

  useEffect(() => {
    dispatch(fetchTablasProducidas());
  }, [dispatch]);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const abrirModalEdit = (tabla) => {
    setTablaId(tabla.ID_Tabla);
    setFormValues({
      FechaProduccion: tabla.FechaProduccion,
      Dimensiones: tabla.Dimensiones,
      Peso: tabla.Peso,
      CodigoIdentificacion: tabla.CodigoIdentificacion,
      Estado: 1,
      IdTolva: tabla.IdTolva,
    });
    setModalEdit(true);
  };
  const cerrarModalEdit = () => setModalEdit(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormValues = {
      ...formValues,
      CodigoIdentificacion: GenerateIdentificationCode(
        formValues.Dimensiones,
        formValues.Peso,
      ),
    };

    await dispatch(addTablaProducida(newFormValues));
    toast.success("Tabla añadida con éxito!");
    await dispatch(fetchTablasProducidas());
    cerrarModal();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    await editTablas({ tablaId, formValues });
    toast.success("Registro editado con éxito!");
    cerrarModalEdit();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  // const totalPages = Math.ceil(data.length / itemsPerPage);
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const totalPeso = data.reduce(
  //   (acc, tabla) => acc + parseFloat(tabla.Peso || 0),
  //   0,
  // );
  // const totalItems = data.length;

  const dimensionesOptions = [
    { value: "1,50mts x 10cm", label: "1,50mts x 10cm" },
    { value: "1,60mts x 10cm", label: "1,60mts x 10cm" },
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
      return itemDate.toISOString().slice(0, 10) === selectedDateObj.toISOString().slice(0, 10);
    });

    setCurrentItems(filteredItems);  // Update displayed items
  };
 
  const fetchMaterials = async () => {
    try {
      const response = await fetch("http://www.ecotablasapi.somee.com/api/TablaProducidas/ListarTodo"); // Reemplaza "URL_DEL_ENDPOINT" con la URL de tu API
      if (!response.ok) {
        throw new Error("Error al obtener los datos.");
      }
      const data = await response.json();
      setFilteredMaterials(data);
      console.log(data);
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
    { label: "Fecha de Producción", key: "FechaProduccion", 
      
       
      render: (value) => (
        <td className="px-4 py-2 text-left">
        {value ? value.slice(0, 10) : "Fecha no disponible"}
      </td>
        )
    },
    { label: "Dimensiones", key: "Dimensiones", type: "text" },
    { label: "Peso", key: "Peso", type: "number" },
    { label: "Código de Identificación", key: "CodigoIdentificacion", type: "text",hasActions:true},
  ];
  


  const actions = [
    {
      allowedRoles: ["admin","editor" ],
      render: (item) => (
        <td className="px-4 py-2 flex justify-center">
             
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
            "http://www.gestiondeecotablas.somee.com/api/TablaProducidas/Borrar"
          }
          updateList={() => dispatch(fetchTablasProducidas())}
        />
      </td>
      ),
    },
  ];



  return (
    <SectionLayout title="Tablas Producidas">
  

      <div className="flex items-center">        
      <AddButtonWa abrirModal={abrirModal} title="Añadir tabla" />
      <PdfGenerator
        columns={columns}
        data={data}
        title="Reporte de Tablas Producidas"
      />

      <div className=" flex items-center justify-center">
      <input
        type="date"
        onChange={(e) => setSelectedDate(e.target.value)}  // Update the selected date state
        className="mb-2 p-2 border border-gray-300 rounded"
      />


      <button 
        onClick={filterByDate}  // Trigger the filter when clicked
        className="p-2.5 flex items-center mb-2   ml-2 bg-blue-500 text-white rounded"
      >
       <FaSearch className="mr-2 " />   Buscar por fecha 
      </button>
      {/* <button 
        onClick={setCurrentItems(data)}  // Trigger the filter when clicked
        className="p-3   ml-2 bg-slate-400 text-white rounded"
      >
        Limpiar busqueda
      </button> */}
    </div>
    </div>
  
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
            { name: "IdTolva", label: "IdTolva", type: "number" },
          ]}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cerrarModal={cerrarModal}
          values={formValues}
        />
      )}
      {modalEdit && (
        <ButtonEdit
          title="Editar Tabla Producida"
          fields={[
            {
              name: "Dimensiones",
              label: "Dimensiones",
              type: "select",
              options: dimensionesOptions,
            },
            { name: "Peso", label: "Peso (kgs)", type: "number" },
          ]}
          formValues={formValues}
          handleChange={handleChange}
          handleEditSubmit={handleEditSubmit}
          cerrarModalEdit={cerrarModalEdit}
        />
      )}

      {loading ? (
        <LoadingTable loading={loading} />
      ) : (
        <>

<TableComponent
      data={dataT}
      titles={titlesT}
      sortConfig={sortConfig}
      onSort={handleSort}
      actions={actions}
    />


          {/* <table className="table-auto w-full bg-white rounded-lg shadow-lg">
            <TablaHead titles={titles} />
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.ID_Tabla}>
 
  <td className="px-4 py-2 text-left">{item.Dimensiones}</td>
  <td className="px-4 py-2 text-right">{item.Peso}</td>
  <td className="px-4 py-2 text-right">{item.CodigoIdentificacion}</td>

                </tr>
              ))}
            </tbody>
          </table> */}
{/*          
          <div className="mt-4 text-white">
            <p>Total Peso: {totalPeso} kg</p>
            <p>Total de Items: {totalItems}</p>
          </div> */}
        </>
      )}


    </SectionLayout>
  );
};

export default TablasProducidas;
