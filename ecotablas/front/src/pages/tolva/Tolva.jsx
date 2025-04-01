import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SectionLayout from "../../layout/SectionLayout";
import AddButtonWa from "../../components/buttons/AddButtonWa";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import { MdDateRange } from "react-icons/md";
import LoadingTable from "../../components/LoadingTable";
import NextProcess from "../../components/buttons/NextProcess";
import { GrLinkNext } from "react-icons/gr";
import { BsClipboardDataFill } from "react-icons/bs";
import TableComponent from "../../components/TableComponent";
import { Toaster, toast } from "sonner";
import { FiEdit } from "react-icons/fi";

import Pagination from "../../components/Pagination";
import TablaHead from "../../components/Thead";
import DateFilter from "../../components/DateFilter";
import FilterButton from "../../components/buttons/FilterButton";
import AddModal from "../../components/AddModal";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModalWithSelect from "../../components/AddModalWithSelect";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import NextButton from "../../components/buttons/NextButton";
import ReportButton from "../../components/buttons/ReportButton";
import { addTablas } from "../../api/TablasProducidaAPI";
import { v4 as uuidv4 } from "uuid";
import { getAllTolva, addTolva, editTolva } from "../../api/TolvaAPI";

const Tolva = () => {
  const dispatch = useDispatch();
  const [materials, setMaterials] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalEdit, setModalEdit] = useState(false);
  const [materialId, setMaterialId] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [modalTabla, setModalTabla] = useState(false);

  const [formValues, setFormValues] = useState({
    HorarioInicio: "",
    CantidadCargada: "",
    TipoPlastico: "unico",
    Proporcion: "",
    Especificaciones: "",
    Estado: 1,
    IdMaterialTriturado: "",
  });

  const GenerateIdentificationCode = (size, large) => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const codeUID = uuidv4().replace(/-/g, "").slice(0, 8);
    return `${size}_${large}_${hours}_${codeUID}`;
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
    const fechaActual = new Date().toISOString();

    setFormValues({
      ...formValues,
      HorarioInicio: fechaActual,
    });
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
      Proporcion: material.Proporcion,
      Especificaciones: material.Especificaciones,
      Estado: 1,
      IdMaterialTriturado: material.IdMaterialTriturado,
    });
    setModalEdit(true);
  };
  const cerrarModalEdit = () => setModalEdit(false);

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await getAllTolva();
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

  const abrirModalTabla = (id) => {
    const fechaActual = new Date().toISOString();

    setTablaValues({
      ...tablaValues,
      IdTolva: id,
      FechaProduccion: fechaActual,
    });

    setMaterialId(id);
    setModalTabla(true);
  };

  const cerrarModalTabla = () => setModalTabla(false);

  const validateTablaForm = () => {
    let isValid = true;
    if (!tablaValues.Dimensiones) {
      toast.error("Las dimensiones son obligatoria.");
      isValid = false;
    } else if (!tablaValues.Peso) {
      toast.error("El peso es obligatorio.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await addTolva(formValues);
      setModalAbierto(false);
      toast.success("Inserción exitosa");
      fetchMaterials();
    } catch (error) {
      toast.error("Error al agregar el material.");
      console.error("Error al agregar el material:", error);
    }
  };
  const validateForm = () => {
    let isValid = true;
    if (!formValues.HorarioInicio) {
      toast.error("El horario de inicio es obligatorio.");
      isValid = false;
    } else if (!formValues.CantidadCargada) {
      toast.error("La cantidad es obligatoria.");
      isValid = false;
    } else if (!formValues.TipoPlastico) {
      toast.error("El tipo de plástico es obligatorio.");
      isValid = false;
    } else if (!formValues.Proporcion) {
      toast.error("La proporcion es obligatoria.");
      isValid = false;
    } else if (!formValues.Especificaciones) {
      toast.error("Las especificaciones son obligatorias.");
      isValid = false;
    } else if (!formValues.IdMaterialTriturado) {
      toast.error("El ID del material triturado es obligatorio.");
      isValid = false;
    }

    return isValid;
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await editTolva(materialId, formValues);
      setModalEdit(false);
      toast.success("Modificación exitosa");
      fetchMaterials();
    } catch (error) {
      toast.error("Error al modificar el material.");
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
    // Generar el código de identificación
    const code = GenerateIdentificationCode(
      tablaValues.Peso,
      tablaValues.Dimensiones,
    );

    // Validar el formulario antes de proceder
    if (!validateTablaForm()) return;

    try {
      // Asegúrate de pasar correctamente los valores de tablaValues y el nuevo campo CódigoIdentificacion
      await addTablas({ ...tablaValues, CodigoIdentificacion: code });

      toast.success("¡Tabla producida!");

      // Actualizar el estado de la tolva a 2
      const materialActualizado = {
        ...filteredMaterials.find((m) => m.IdTolva === materialId),
        Estado: 2, // Establecer el estado a 2
      };

      // Editar el material
      await editTolva(materialId, materialActualizado);

      setModalTabla(false);
      fetchMaterials(); // Refrescar la lista para mostrar cambios
    } catch (error) {
      toast.error("Error al terminar el proceso.");
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
  const totalItems = filteredMaterials.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMaterials.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);

  const filterByDate = () => {
    const filteredItems = filteredMaterials.filter((item) => {
      const itemDate = new Date(item.HorarioInicio).toISOString().slice(0, 10);
      return itemDate === selectedDate;
    });

    setFilteredMaterials(filteredItems);
    setCurrentPage(1);
  };

  const totalVolumen = filteredMaterials.reduce(
    (acc, material) => acc + parseFloat(material.CantidadCargada || 0),
    0,
  );

  const optionsTipoPlastico = [
    { value: "Unico", label: "Tipo-Único" },
    { value: "Mezcla", label: "Tipo-Mezcla" },
  ];

  const rows = filteredMaterials.map((material) => ({
    Fecha: material.HorarioInicio.slice(0, 10),
  }));

  const columns = [
    { header: "Horario de inicio", accessor: "HorarioInicio" },
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
    {
      label: "Horario Inicio",
      key: "HorarioInicio",
      render: (value) => (
        <td className="border-b px-4 py-2 text-right">
          <span className="font-semibold lg:hidden">Horario de Inicio: </span>
          {value ? value.slice(0, 10) : "Sin horario"}
        </td>
      ),
    },
    { label: "Cantidad Cargada (kg)", key: "CantidadCargada", type: "number" },
    { label: "Tipo de Plástico", key: "TipoPlastico", type: "text" },
    { label: "Proporción (%)", key: "Proporcion", type: "number" },
    {
      label: "Especificaciones",
      key: "Especificaciones",
      type: "text",
      hasActions: true,
    },
  ];

  const actions = [
    {
      allowedRoles: ["admin", "supervisor", "empleado"],
      render: (material) => (
        <div className="flex items-center justify-start gap-2 py-1">
          <button
            onClick={() => abrirModalTabla(material.IdTolva)}
            className="bg-green-600 ml-2 hover:bg-green-800 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            <GrLinkNext className="mr-2" />
            Terminado
          </button>
        </div>
      ),
    },

    {
      allowedRoles: ["admin", "supervisor"],

      render: (material) => (
        <td className="border-b px-4 py-2 flex justify-center">
          <button
            onClick={() => abrirModalEdit(material)}
            className="bg-yellow-600 ml-2 hover:bg-yellow-700 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FiEdit />
            Modificar
          </button>
          <DeleteButton
            id={material.IdTolva}
            endpoint="http://www.ecotablasapi.somee.com/api/Tolva/Delete"
            updateList={fetchMaterials}
          />
        </td>
      ),
    },
  ];

  return (
    <SectionLayout title="Tolva">
      <Toaster />
      <div className="flex flex-wrap items-center gap-1 ">
        <AddButtonWa abrirModal={abrirModal} title="Añadir Registro" />
        <PdfGenerator
          columns={columns}
          data={materials}
          title="Reporte de Tolva"
        />

        <FilterButton
          data={filteredMaterials}
          dateField="HorarioInicio"
          onFilter={setFilteredMaterials}
          onReset={() => setFilteredMaterials(filteredMaterials)}
          onPageReset={() => setCurrentPage(1)}
        />
      </div>

      {modalAbierto && (
        <AddModalWithSelect
          title="Agregar Registro de Tolva"
          fields={[
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
            { name: "Proporcion", label: "Proporción cargada", type: "number" },
            {
              name: "Especificaciones",
              label: "Especificaciones",
              type: "text",
            },
            {
              name: "IdMaterialTriturado",
              label: "IdMaterialTriturado",
              type: "text",
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
          title="Editar Registro de Tolva"
          fields={[
            {
              name: "CantidadCargada",
              label: "Cantidad cargada (kg)",
              type: "number",
              placeholder: "Cantidad cargada *",
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
              placeholder: "Proporción *",
            },
            {
              name: "Especificaciones",
              label: "Especificaciones",
              type: "text",
              placeholder: "Especificaciones *",
            },
          ]}
          formValues={formValues}
          handleChange={handleChange}
          handleEditSubmit={handleEditSubmit}
          cerrarModalEdit={cerrarModalEdit}
        />
      )}

      {modalTabla && (
        <AddModalWithSelect
          title="Terminar Tablas"
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
      )}

      {loading ? (
        <LoadingTable loading={loading} />
      ) : (
        <>
          <div className="mt-4 text-white">
            <p>Total de Volumen Cargado: {totalVolumen} kg</p>
            <p>Total de Items: {totalItems}</p>
          </div>

          <TableComponent
            data={data}
            hasMaterial={true}
            titles={titlesT}
            sortConfig={sortConfig}
            onSort={handleSort}
            actions={actions}
          />
        </>
      )}

      <NextProcess linkTo="/tablas" hoverText="Ir al siguiente proceso" />
    </SectionLayout>
  );
};

export default Tolva;
