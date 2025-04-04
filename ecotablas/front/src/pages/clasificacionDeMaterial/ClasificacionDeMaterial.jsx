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

import { Toaster, toast } from "sonner";
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
import { editMaterialClas } from "../../api/MaterialClasAPI";
import AddModalWithSelect from "../../components/AddModalWithSelect";
const ClasificacionDeMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [originalMaterials, setOriginalMaterials] = useState([]);
  const [materialId, setMaterialId] = useState(null);
  const [modalTriturado, setModalTriturado] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [formValues, setFormValues] = useState({
    VolumenUtil: "",
    VolumenInutil: "",
    IdIngresoMaterial: 1,
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
  const cerrarModal = () => { 
    setModalAbierto(false);
    setFormValues({VolumenUtil: "",
    VolumenInutil: "",
    IdIngresoMaterial: 1,
    FechaC: "",
    Estado: 1,
  });
   };
 

  const abrirModalEdit = (material) => {
    setMaterialId(material.IdMaterialClasificado);

    setFormValues({
      VolumenUtil: material.VolumenUtil || "",
      VolumenInutil: material.VolumenInutil || "",

      FechaC: material.Fecha || "",
      IdIngresoMaterial: material.IdIngresoMaterial || "",
      Estado: material.Estado || "",
    });
    setModalEdit(true);
  };

  const cerrarModalEdit = () => { 
    setModalEdit(false);

    setFormValues({VolumenUtil: "",
      VolumenInutil: "",
      IdIngresoMaterial: 1,
      FechaC: "",
      Estado: 1,
    });
     };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://www.ecotablasapi.somee.com/api/MaterialClas/Insertar",
        formValues,
      )
      .then(() => {
        toast.success("¡Material añadido con existo!");
        cerrarModal();
        fetchMaterials();
      })
      .catch((error) => console.error("Error al agregar el material:", error));
  };

  const abrirModalTriturado = (id) => {
    const fechaActual = new Date().toISOString();
    setMaterialId(id);
    setTrituradoValues({
      ...trituradoValues,
      Fecha: fechaActual,
      IdMaterialClasificado: id,
    });
    setModalTriturado(true);
  };

  const cerrarModalTriturado = () => { 
    setModalTriturado(false);
    setTrituradoValues({ 
    VolumenT: "",
    Fecha: "",
    IdMaterialClasificado: "",
    VolumenTInutil: "",
    Estado: 1,
  });
 };
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
        ...filteredMaterials.find(
          (m) => m.IdMaterialClasificado === materialId,
        ),
        Estado: 2, // Establecer el estado a 2
      };

      await editMaterialClas(materialId, materialActualizado);

      setModalTriturado(false);
      fetchMaterials(); // Refrescar la lista para mostrar cambios
    } catch (error) {
      toast.error("Error al terminar el proceso.");
      console.error("Error al terminar el proceso:", error);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (
      !formValues.VolumenUtil ||
      !formValues.VolumenInutil ||
      !formValues.IdIngresoMaterial ||
      !formValues.FechaC
    ) {
      toast("Todos los campos son obligatorios!", {
        duration: 4000,
        style: { background: "#3b82f6", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#2563eb" },
      });
      return;
    }

    axios
      .put(
        `http://www.ecotablasapi.somee.com/api/MaterialClas/Modificar/${materialId}`,
        formValues,
      )
      .then(() => {
        setModalEdit(false);

        setFilteredMaterials((prevMaterials) =>
          prevMaterials.map((data) =>
            data.IdIngresoMaterial === materialId
              ? { ...data, ...formValues }
              : data,
          ),
        );

        toast.success("Material actualizado!", { autoClose: 3000 });
      })
      .catch((error) => {
        console.error("Error al modificar el material:", error);
        toast.error("Hubo un error al actualizar.", { autoClose: 3000 }); // ⬅️ Agregué un toast de error
      });
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
        "http://www.ecotablasapi.somee.com/api/MaterialClas/ListarTodo",
      );
      setFilteredMaterials(response.data);
      setOriginalMaterials(response.data);
      
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
  const totalItems = filteredMaterials.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMaterials.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

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
    { key: "VolumenUtil", label: "Volumen Útil (kgs)", type: "number" },
    { key: "VolumenInutil", label: "Volumen Inútil (kgs)", type: "number" },
   
    { key: "FechaC", label: "Fecha de Creación", type: "date", hasActions:true },
  
  ];

  const actions = [
    {
      allowedRoles: ["admin", "supervisor", "empleado"],
      render: (material) => (
        <div className="flex items-center justify-start gap-2 py-1">
          <button
            onClick={() => abrirModalTriturado(material.IdMaterialClasificado)}
            className="bg-green-600 ml-2 hover:bg-green-800 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            <GrLinkNext className="m-1" />
            Terminado
          </button>
        </div>
      ),
    },

    {
      allowedRoles: ["admin", "supervisor"],
      render: (material) => (
    <div className="flex items-center justify-start gap-2 py-1">
        <button
          className="bg-yellow-600 ml-2 hover:bg-yellow-700 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => abrirModalEdit(material)}
        >
          <FiEdit className="m-1" />
          Modificar
        </button>

        <DeleteButton
          id={material.IdMaterialClasificado}
          endpoint="http://www.ecotablasapi.somee.com/api/MaterialClas/Borrar"
          updateList={fetchMaterials}
    />
 </div>
      ),
    },
  ];

  return (
    <>
      <SectionLayout title="Materiales Clasificados">
      <Toaster />

 
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">

                  {/* Grupo de acciones izquierda (añadir, PDF y vista) */}
                  <div className="flex flex-wrap items-center gap-2">
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
      </div>


          {/* Grupo derecha (solo filtro) */}
          <div className="flex flex-wrap items-center gap-2">
          <FilterButton
  data={originalMaterials} // Pasa los datos originales aquí
  dateField="FechaC"
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
  {/* Versión minimalista para fondo oscuro */}
  <div className="mb-4 flex justify-center gap-6">
    <div className="text-center">
              <p class="text-sm text-gray-300">Total de materiales</p>
              <p class="text-lg font-semibold text-white"> {totalItems}</p>
              </div>
              <div className="text-center">
              <p class="text-sm text-gray-300">Volumen total</p>
              <p class="text-lg font-semibold text-white">{totalVolumen.toFixed(2)} kg</p>
              </div>
              </div>


            <TableComponent
              data={data}
              titles={titlesT}
              hasMaterial={true}
              sortConfig={sortConfig}
              onSort={handleSort}
              actions={actions}
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-4 p-4">
            <DateFilter onFilter={handleFilter} />

            <VolumenChart dateRange={dateRange} />
          </div>
        )}
        <NextProcess
          linkTo="/materialTri"
          hoverText="Ir al siguiente proceso"
        />
      </SectionLayout>
    </>
  );
};

export default ClasificacionDeMaterial;
