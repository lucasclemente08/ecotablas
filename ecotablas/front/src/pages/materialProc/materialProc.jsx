import React, { useState, useEffect } from "react";
import axios from "axios";
import AddButton from "../../components/buttons/AddButton";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModal from "../../components/AddModal";
import ButtonEdit from "../../components/buttons/ButtonEdit";
import LoadingTable from "../../components/LoadingTable";
import TablaHead from "../../components/Thead";
import ReportButton from "../../components/buttons/ReportButton";
import NextButton from "../../components/buttons/NextButton";
import VolumenProcesadoChart from "../../components/volumen/VolumenProcesadoChart";
import DateFilter from "../../components/DateFilter";
import SectionLayout from "../../layout/SectionLayout";
const MaterialProc = () => {
  const [materials, setMaterials] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [materialId, setMaterialId] = useState(null);

  const [formValues, setFormValues] = useState({
    VolumenP: "",
    FechaIngresoP: "",
    IdIngresoMaterial: "1",
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
    setMaterialId(material.IdMaterialProcesado);

    setFormValues({
      VolumenP: material.VolumenP,
      FechaIngresoP: material.FechaIngresoP,
      IdIngresoMaterial: material.IdIngresoMaterial,
    });
    setModalEdit(true);
  };

  const cerrarModalEdit = () => setModalEdit(false);

  const handleSubmit = () => {
    axios
      .post(
        "http://www.trazabilidadodsapi.somee.com/api/MaterialPros/Insertar",
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
      !formValues.VolumenP ||
      !formValues.FechaIngresoP ||
      !formValues.IdIngresoMaterial
    ) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    axios
      .put(
        `http://www.trazabilidadodsapi.somee.com/api/MaterialPros/Modificar/${materialId}`,
        formValues,
      )
      .then(() => {
        setModalEdit(false);
        setMensaje("Modificación exitosa");
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

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://www.trazabilidadodsapi.somee.com/api/MaterialPros/ListarTodo",
      );
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = materials.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total de páginas
  const totalPages = Math.ceil(materials.length / itemsPerPage);

  const title = ["Volumen (kgs)", "Fecha de ingreso", "Acciones"];
  const columns = [
    { header: "Volumen (kgs)", dataKey: "VolumenP" },
    { header: "Fecha de ingreso", dataKey: "FechaIngresoP" },
  ];

  const fields = [
    {
      name: "VolumenP",
      label: "Volumen",
      type: "text",
      placeholder: "Volumen *",
    },
    {
      name: "FechaIngresoP",
      label: "Fecha Ingreso",
      type: "date",
      placeholder: "Fecha *",
    },
    {
      name: "IdIngresoMaterial",
      label: "ID Material",
      type: "text",
      placeholder: "ID Material *",
    },
  ];

  const totalVolumen = materials.reduce(
    (acc, material) => acc + parseFloat(material.VolumenP || 0),
    0,
  );
  const totalItems = materials.length;

  return (
    <>
      <SectionLayout title="Materiales Procesados">
        <AddButton
          abrirModal={abrirModal}
          title={"Añadir Materiales procesados"}
        />

        <PdfGenerator
          columns={columns}
          data={materials}
          title="Reporte de Materiales procesados"
        />
        <ReportButton />
        {modalAbierto && (
          <AddModal
            title="Agregar Material Procesado"
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
            <tbody className="bg-white">
              {currentItems.map((material) => (
                <tr
                  key={material.IdMaterialProcesado}
                  className="hover:bg-gray-100"
                >
                  <td className="border-b py-2 px-4">
                    Volumen: {material.VolumenP} kgs
                  </td>
                  <td className="border-b py-2 px-4">
                    {material.FechaIngresoP.slice(0, 10)}
                  </td>
                  <td
                    className={` py-2 px-4 flex justify-center ${
                      modalEdit || modalAbierto ? "hidden" : ""
                    }`}
                  >
                    <NextButton />
                    <button
                      className="bg-yellow-600 ml-2 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => abrirModalEdit(material)}
                    >
                      Modificar
                    </button>
                    <DeleteButton
                      id={material.IdMaterialProcesado}
                      endpoint="http://www.trazabilidadodsapi.somee.com/api/MaterialPros/Borrar"
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
        <div className="flex-1 flex flex-col gap-4 p-4">
          <DateFilter onFilter={handleFilter} />

          <VolumenProcesadoChart dateRange={dateRange} />
        </div>
      </SectionLayout>
    </>
  );
};

export default MaterialProc;
