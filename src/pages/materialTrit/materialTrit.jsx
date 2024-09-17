import React, { useEffect, useState } from "react";
import Home from "../home/Home";
import AddButton from "../../components/addButton";
import PdfGenerator from "../../components/PdfGenerator";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/DeleteButton";
import AddModal from "../../components/AddModal";
import ButtonEdit from "../../components/buttonEdit";
import LoadingTable from "../../components/LoadingTable";
import {
  getAllMaterials,
  addMaterial,
  editMaterial,
} from "../../api/materialTritAPI";

const MaterialTrit = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [materialId, setMaterialId] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [formValues, setFormValues] = useState({
    VolumenT: "",
    Fecha: "",
    IdMaterialClasificado: "",
  });

  const abrirModalEdit = (material) => {
    setMaterialId(material.IdMaterialTriturado);
    setFormValues({
      VolumenT: material.VolumenT,
      Fecha: material.Fecha,
      IdMaterialClasificado: material.IdMaterialClasificado,
    });
    setModalEdit(true);
  };

  const cerrarModalEdit = () => setModalEdit(false);

  const abrirModal = () => {
    setModalAbierto(true);
  };
  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await getAllMaterials();
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

  const validateForm = () => {
    let isValid = true;
    if (!formValues.VolumenT) {
      setMensaje("Volumen es obligatorio.");
      isValid = false;
    } else if (!formValues.Fecha) {
      setMensaje("Fecha es obligatoria.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const response = await addMaterial(formValues);
      setModalAbierto(false);
      setMensaje("Inserción exitosa");
      setMaterials([...materials, response.data]);
    } catch (error) {
      setMensaje("Error al agregar el material.");
      console.error("Error al agregar el material:", error);
    }
  };

  const handleEditSubmit = async () => {
    if (!validateForm()) return;
    try {
      await editMaterial(materialId, formValues);
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

  const title = ["Volumen", "Fecha de ingreso", "Acciones"];

  const columns = [
    { header: "Volumen (kgs)", dataKey: "VolumenT" },
    { header: "Fecha", dataKey: "Fecha" },
  ];

  const rows = materials.map((material) => ({
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
    { name: "Fecha", label: "Fecha", type: "date", placeholder: "Fecha *" },
    {
      name: "IdMaterialClasificado",
      label: "Material Triturado",
      type: "text",
      placeholder: "Material Triturado *",
    },
  ];

  return (
    <>
      <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">
            Materiales Triturado
          </h2>
          <AddButton
            abrirModal={abrirModal}
            title={" Añadir Materiales triturado"}
          />

          <PdfGenerator
            columns={columns}
            data={materials}
            title="Reporte de Materiales triturado"
          />

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

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
            <LoadingTable loading={loading} />
              <TablaHead titles={title} />

              <tbody>
                {materials.map((material) => (
                  <tr
                    key={material.IdMaterialTriturado}
                    className="hover:bg-gray-100 m-5"
                  >
                    <td className="border-b py-3 px-4">
                      {material.VolumenT} kgs
                    </td>
                    <td className="border-b py-3 px-4">
                      {material.Fecha.slice(0, 10)}
                    </td>
                    <td
                      className={`border-b py-3 px-4 flex justify-center ${modalAbierto ? "hidden" : ""}`}
                    >
                      <button
                        onClick={() => abrirModalEdit(material)}
                        className="bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Modificar
                      </button>
                      <DeleteButton
                        id={material.IdMaterialTriturado}
                        endpoint="http://www.trazabilidadodsapi.somee.com/api/MaterialTrit/Borrar"
                        updateList={fetchMaterials} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaterialTrit;
