import React, { useState, useEffect } from "react";
import axios from "axios";
import AddButtonWa from "../../components/buttons/AddButtonWa";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import { MdDateRange } from "react-icons/md";
import DeleteButton from "../../components/buttons/DeleteButton";
import { BsClipboardDataFill } from "react-icons/bs";
import TableComponent from "../../components/TableComponent";
import { FiEdit } from "react-icons/fi";
import { GrLinkNext } from "react-icons/gr";
import AddModal from "../../components/AddModal";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import LoadingTable from "../../components/LoadingTable";
import TablaHead from "../../components/Thead";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../components/Pagination";
import VolumenChart from "../../components/volumen/VolumenChart";
import FilterButton from "../../components/buttons/FilterButton";
import DateFilter from "../../components/DateFilter";
import NextProcess from "../../components/buttons/NextProcess";
import SectionLayout from "../../layout/SectionLayout";
import {
  getAllMaterialTrit,
  addMaterialTrit,
  editMaterialTrit,
} from "../../api/materialTritAPI";
import {
editMaterialClas,
} from "../../api/MaterialClasAPI";
import AddModalWithSelect from "../../components/AddModalWithSelect";
const ClasificacionDeMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [materialId, setMaterialId] = useState(null);
  const [modalTriturado, setModalTriturado] = useState(false); 
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [formValues, setFormValues] = useState({
    VolumenUtil: "",
    VolumenInutil: "",
    IdIngresoMaterial: "",
    FechaC: "",
    Estado: 1,
  });


  const [trituradoValues, setTrituradoValues] = useState({
    VolumenT: "",
    Fecha: "",
    IdMaterialClasificado: "",
    VolumenTInutil: "",
    Estado: 1,
  });

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleFilter = (dates) => {
    setDateRange(dates);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const abrirModalEdit = (material) => {
    setMaterialId(material.IdMaterialClasificado);

    setFormValues({
      VolumenUtil: material.VolumenUtil,
      VolumenInutil: material.VolumenInutil,
      // IdIngresoMaterial: material.IdIngresoMaterial,
      FechaC: material.Fecha,
    });
    setModalEdit(true);
  };

  const cerrarModalEdit = () => setModalEdit(false);
  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:61274/api/MaterialClas/Insertar",
        formValues,
      )
      .then(() => {
        toast.success("Material cargado")
        cerrarModal();
        fetchMaterials();
      })
      .catch((error) => console.error("Error al agregar el material:", error));
  };

  const abrirModalTriturado = (id) => {
    const fechaActual = new Date().toISOString();
    setMaterialId(id);
    setTrituradoValues({ ...trituradoValues, Fecha: fechaActual, IdMaterialClasificado: id,});
    setModalTriturado(true);
  };

  const cerrarModalTriturado = () => setModalTriturado(false);

  const validateTrituradoForm = () => {
    let isValid = true;
    if (!trituradoValues.VolumenT) {
      toast.error("El volumen util es obligatorio.");
      isValid = false;
    } else if (!trituradoValues.VolumenTInutil) {
      toast.error("El volumen inutil es obligatorio.");
      isValid = false;
    } 
    return isValid;
  };

  const handleSubmitTriturado = async () => {
    if (!validateTrituradoForm()) return;
  
    try {
      await addMaterialTrit(trituradoValues);
      toast.success("Lote enviado a trituración!");
      // Luego, actualiza el estado a 2
      const materialActualizado = {
        ...filteredMaterials.find((m) => m.IdMaterialClasificado === materialId),
        Estado: 2, // Establecer el estado a 2
      };
      console.log (materialActualizado)
      await editMaterialClas(materialId, materialActualizado);

      setModalTriturado(false);
      fetchMaterials(); // Refrescar la lista para mostrar cambios
    } catch (error) {
      toast.error("Error al terminar el proceso.");
      console.error("Error al terminar el proceso:", error);
    }
  };


  const handleEditSubmit = () => {
    if (
      !formValues.VolumenUtil ||
      !formValues.VolumenInutil ||
      !formValues.IdIngresoMaterial ||
      !formValues.FechaC
    ) {
      toast.info("Todos los campos son obligatorios.");
      return;
    }

    axios
      .put(
        `http://localhost:61274/api/MaterialClas/Modificar/${materialId}`,
        formValues,
      )
      .then(() => {
        setModalEdit(false);
        toast.success("Material actualizado!");
        fetchMaterials();
      })
      .catch((error) =>
        console.error("Error al modificar el material:", error),
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeTriturado = (e) => {
    const { name, value } = e.target;
    setTrituradoValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://www.trazabilidadodsapi.somee.com/api/MaterialClas/ListarTodo",
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
      const itemDate = new Date(item.FechaC).toISOString().slice(0, 10); 
      return itemDate === selectedDate;
    });
  
    setFilteredMaterials(filteredItems);
    setCurrentPage(1); 
  };


  const title = [
    "Volumen Util (kgs)",
    "Volumen Inutil (kgs)",
    "Fecha de ingreso",
    "Acciones",
  ];
  const columns = [
    { header: "Volumen Util (kgs)", dataKey: "VolumenUtil" },
    { header: "Volumen Inutil (kgs)", dataKey: "VolumenInutil" },
    { header: "Fecha de ingreso", dataKey: "FechaC" },
  ];

  const fields = [
    {
      name: "VolumenUtil",
      label: "Volumen Util",
 
      type: "text",
      placeholder: "VolumenUtil *",
   
    },
    {
      name: "VolumenInutil",
      label: "Volumen Inutil",
      type: "text",
      placeholder: "VolumenInutil *",
    },
    {
      name: "FechaC",
      label: "Fecha Ingreso",
      type: "date",
      placeholder: "Fecha *",
    },
    // {
    //   name: "IdIngresoMaterial",
    //   label: "ID Material",
    //   type: "text",

    //   placeholder: "ID Material *",
    // },
  ];

  const totalVolumen = filteredMaterials.reduce(
    (acc, material) =>
      acc +
      parseFloat(material.VolumenUtil || 0) +
      parseFloat(material.VolumenInutil || 0),
    0,
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);

  
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
    { key: "VolumenUtil", label: "Volumen Útil", type: "number" },
    { key: "VolumenInutil", label: "Volumen Inútil", type: "number" },
   
    { key: "FechaC", label: "Fecha de Creación", type: "date", hasActions:true },
  
  ];
  
  

  const actions = [
    {
      render: (material) => (
        <td
        className={`border-b py-2 px-4 flex justify-center `}
      >
        <button
          onClick={() => abrirModalTriturado(material.IdMaterialClasificado)}
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
          id={material.IdMaterialClasificado}
          endpoint="http://www.trazabilidadodsapi.somee.com/api/MaterialClas/Borrar"
          updateList={fetchMaterials}
    />
  </td>
      ),
    },
  ];

  return (
    <>
      <SectionLayout title="Materiales Clasificados">
      <div className="flex flex-wrap items-center gap-1 ">
        <AddButtonWa
          abrirModal={abrirModal}
          title={"Añadir Materiales Clasificados"}
        />


        <PdfGenerator
          columns={columns}
          data={filteredMaterials}
          title="Reporte de Materiales Clasificados"
        />

<button
        onClick={toggleView}
        className="bg-blue-600 hover:bg-blue-700 flex justify-center items-center text-white font-bold py-2 mt-2 mb-5 px-4 rounded"
        >
  {showTable ? <>Ver grafico <MdDateRange className="m-1" /> </> : <>Ver Tablas <BsClipboardDataFill className="m-1" /></>}
      </button>

      <FilterButton
        data={filteredMaterials}
        dateField="FechaC"
        onFilter={setFilteredMaterials}
        onReset={() => setFilteredMaterials(filteredMaterials)}
        onPageReset={() => setCurrentPage(1)}
      />
              </div>


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
        {modalAbierto && (
          <AddModalWithSelect
            title="Agregar Material Clasificado"
            fields={fields}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            cerrarModal={cerrarModal}
            values={formValues}
          />
        )}

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
               {modalTriturado && (
            <AddModalWithSelect
              title="Enviar lote a trituración"
              fields={[
                { name: "VolumenT", label: "Volumen Util", type: "number", placeholder: "Volumen Util *" },
                { name: "VolumenTInutil", label: "Volumen Inutil", type: "number", placeholder: "Volumen Inutil *" }
              ]}
              handleChange={handleChangeTriturado}
              handleSubmit={handleSubmitTriturado}
              cerrarModal={cerrarModalTriturado}
              values={trituradoValues}
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


              {/* <table className="min-w-full bg-white rounded-lg shadow-md">
                <LoadingTable loading={loading} />
                <TablaHead titles={title} />
                <tbody className="bg-white">
                  {currentItems.map((material) => (
                    <tr
                      key={material.IdMaterialClasificado}
                      className="hover:bg-gray-100"
                    >
                      <td className="border-b py-2 px-4 text-right">
                        <span className="font-semibold lg:hidden">Volumen Útil: </span>
                        {material.VolumenUtil} kgs
                      </td>
                      <td className="border-b py-2 px-4 text-right">
                        <span className="font-semibold lg:hidden">Volumen Inútil: </span>
                        {material.VolumenInutil} kgs
                      </td>
                      <td className="border-b py-2 px-4 text-right">
                        <span className="font-semibold lg:hidden">Fecha: </span>
                        {material.FechaC.slice(0, 10)}
                      </td>
                     
                </tr>
              ))}
            </tbody>
          </table> */}
          {/* Controles de paginación integrados */}
{/* 
          <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    paginate={paginate}
  /> */}
        </div>    

):(

  <div className="flex-1 flex flex-col gap-4 p-4">
  <DateFilter onFilter={handleFilter} />

  <VolumenChart dateRange={dateRange} />
</div>
     
)
}
<NextProcess  linkTo="/materialTri"
  hoverText="Ir al siguiente proceso"/>
            </SectionLayout>
            </>

  );
};

export default ClasificacionDeMaterial;