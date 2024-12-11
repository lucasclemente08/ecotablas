import React, { useEffect, useState } from "react";
import Home from "../home/Home";
import AddButtonWa from "../../components/buttons/AddButtonWa";
import TableComponent from "../../components/TableComponent";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import { BsClipboardDataFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { GrLinkNext } from "react-icons/gr";
import Pagination from "../../components/Pagination";
import FilterButton from "../../components/buttons/FilterButton";
import DateFilter from "../../components/DateFilter";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModal from "../../components/AddModal";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import NextProcess from "../../components/buttons/NextProcess";
import VolumenTrituradoChart from "../../components/volumen/VolumenTrituradoChart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SectionLayout from "../../layout/SectionLayout";
import { FiEdit } from "react-icons/fi";
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
import AddModalWithSelect from "../../components/AddModalWithSelect";
import VolumenChart from "../../components/volumen/VolumenChart";

const MaterialTrit = () => {
  const dispatch = useDispatch();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [materialId, setMaterialId] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState([]);
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
    Estado: 1,
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
        toast.error("La cantidad es obligatoria.");
        isValid = false;
      } else if (!tolvaValues.TipoPlastico) {
        toast.error("El tipo de plástico es obligatorio.");
        isValid = false;
      } else if (!tolvaValues.Proporcion) {
        toast.error("La proporción es obligatoria.");
        isValid = false;
      } else if (!tolvaValues.Especificaciones) {
        toast.error("Las especificaciones son obligatorias.");
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
      setFilteredMaterials(res.data);
    } catch (error) {
      toast.error("Error al cargar los materiales.");
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
      toast.error("Volumen es obligatorio.");
      isValid = false;
    } else if(!formValues.VolumenTInutil) {
      toast.error("Volumen Inutil es obligatorio.");
      isValid = false;
    } else if (!formValues.Fecha) {
      toast.error("Fecha es obligatoria.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:61274/api/MaterialTrit/Insertar",
        formValues,
      )
      .then(() => {
        toast.success("Material cargado")
        cerrarModal();
        fetchMaterials();
      })
      .catch((error) => console.error("Error al agregar el material:", error));
  };
  const handleEditSubmit = async () => {
    if (!validateForm()) return;
    try {
      await editMaterialTrit(materialId, formValues);
      setModalEdit(false);
      toast.success("Modificación exitosa");
      fetchMaterials();
    } catch (error) {
      toast.error("Error al modificar el material.");
      console.error("Error al modificar el material:", error);
    }
  };

  const handleSubmitTolva = async () => {
    if (!validateTolvaForm()) return;
  
    try {
      await addTolva(tolvaValues);
      toast.success("Lote enviado a tolva");
  
      // Luego, actualiza el estado a 2
      const materialActualizado = {
        ...filteredMaterials.find((m) => m.IdMaterialTriturado === materialId),
        Estado: 2, // Establecer el estado a 2
      };
      await editMaterialTrit(materialId, materialActualizado);

      setModalTolva(false);
      fetchMaterials(); // Refrescar la lista para mostrar cambios
    } catch (error) {
      toast.error("Error al terminar el proceso.");
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

  const rows = filteredMaterials.map((material) => ({
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

  const [showTable, setShowTable] = useState(true); 

  const toggleView = () => {
    setShowTable(!showTable);  
  };

  // Paginación
  const totalItems =filteredMaterials.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMaterials.slice(indexOfFirstItem, indexOfLastItem);



  const filterByDate = () => {
    const filteredItems = filteredMaterials.filter((item) => {
      const itemDate = new Date(item.Fecha).toISOString().slice(0, 10); 
      return itemDate === selectedDate;
    });
  
    setFilteredMaterials(filteredItems);
    setCurrentPage(1); 
  };


  const totalVolumen = filteredMaterials.reduce(
    (acc, material) =>
      acc + parseFloat(material.VolumenT || 0) + parseFloat(material.VolumenTInutil || 0),
    0,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);


  const optionsTipoPlastico = [
    { value: "Unico", label: "Tipo-Único" },
    { value: "Mezcla", label: "Tipo-Mezcla" },
    // ... otras opciones
  ];


  
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
    { label: "Volumen (kgs)", key: "VolumenT", type: "number" },
    { label: "Volumen Inutil (kgs)", key: "VolumenTInutil", type: "number" },
    { label: "Fecha", key: "Fecha", type: "date" ,hasActions: true },
  
  ];


  
  const actions = [
    {
      render: (material) => (
        <td
        className={`border-b py-2 px-4 flex justify-center ${
          modalAbierto ? "hidden" : ""
        }`}
                      >
                      <button
                          onClick={() => abrirModalTolva(material.IdMaterialTriturado)}
                          className="bg-green-600 ml-2 hover:bg-green-800 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                          >
                            <GrLinkNext />
                            Terminado
                          </button>
  
                        {modalTolva &&
            <AddModalWithSelect title="Pasar a Extrucción/tolva"
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
                          className="bg-yellow-600 ml-2 hover:bg-yellow-700 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                        >
                          <FiEdit />
                          Modificar
                        </button>
                        <DeleteButton
                          id={material.IdMaterialTriturado}
                          endpoint="http://www.trazabilidadodsapi.somee.com/api/MaterialTrit/Borrar"
                          updateList={fetchMaterials}
                        />
                      </td>
      ),
    },
  ];

  return (
    <>
          <SectionLayout title="Materiales Triturados">
          <div className="flex flex-wrap items-center gap-1 ">
          <AddButtonWa
            abrirModal={abrirModal}
            title={" Añadir Materiales triturado"}
          />

          <PdfGenerator
            columns={columns}
            data={filteredMaterials}
            title="Reporte de Materiales triturado"
          />

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
<button
        onClick={toggleView}
        className="bg-blue-600 hover:bg-blue-700 flex justify-center items-center text-white font-bold py-2 mt-2 mb-5 px-4 rounded"
        >
  {showTable ? <>Ver grafico <MdDateRange className="m-1" /> </> : <>Ver Tablas <BsClipboardDataFill className="m-1" /></>}
      </button>

      <FilterButton
        data={filteredMaterials}
        dateField="Fecha"
        onFilter={setFilteredMaterials}
        onReset={() => setFilteredMaterials(filteredMaterials)}
        onPageReset={() => setCurrentPage(1)}
      />
              </div>

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

{showTable ? (
         


         <div className="overflow-x-auto">
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

  <VolumenTrituradoChart dateRange={dateRange} />
</div>
)
}

<NextProcess  linkTo="/tolva"
  hoverText="Ir al siguiente proceso"/>
  </SectionLayout>

    </>
  );
};

export default MaterialTrit;