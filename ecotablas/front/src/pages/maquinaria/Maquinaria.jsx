import React, { useEffect, useState } from "react";
import Home from "../home/Home";
import AddButton from "../../components/buttons/addButton";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModal from "../../components/AddModal";
import ButtonEdit from "../../components/buttons/ButtonEdit";
import LoadingTable from "../../components/LoadingTable";
import {
  getAllMaquinarias,
  addMaquinarias,
  editMaquinarias,
  deleteMaquinarias,
} from "../../api/MaquinariasAPI";

const Maquinaria = () => {
  const [maquinarias, setMaquinarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [maquinariaId, setMaquinariaId] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [formValues, setFormValues] = useState({
    Nombre: "",
    Tipo: "",
    Modelo: "",
    IdEstado: "",
    fecha_adquisicion: "",
  });

  const abrirModalEdit = (maquinaria) => {
    setMaquinariaId(maquinaria.Id);
    setFormValues({
      Nombre: maquinaria.Nombre,
      Tipo: maquinaria.Tipo,
      Modelo: maquinaria.Modelo,
      IdEstado: maquinaria.IdEstado,
      fecha_adquisicion: maquinaria.fecha_adquisicion.slice(0, 10),
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

  const fetchMaquinarias = async () => {
    setLoading(true);
    try {
      const res = await getAllMaquinarias();
      setMaquinarias(res.data);
    } catch (error) {
      setMensaje("Error al cargar las maquinarias.");
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaquinarias();
  }, []);

  const validateForm = () => {
    let isValid = true;
    if (!formValues.Nombre) {
      setMensaje("Nombre es obligatorio.");
      isValid = false;
    } else if (!formValues.Tipo) {
      setMensaje("Tipo es obligatorio.");
      isValid = false;
    } else if (!formValues.Modelo) {
      setMensaje("Modelo es obligatorio.");
      isValid = false;
    } else if (!formValues.IdEstado) {
      setMensaje("Estado es obligatorio.");
      isValid = false;
    } else if (!formValues.fecha_adquisicion) {
      setMensaje("Fecha de adquisición es obligatoria.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
        const response = await addMaquinarias(formValues);
        // Log de respuesta para depuración
        console.log(response);
        
        // Actualiza el estado y cierra la modal
        setMaquinarias((prevMaquinarias) => [...prevMaquinarias, response.data]);
        setModalAbierto(false);
        setMensaje("Inserción exitosa");
    } catch (error) {
        setMensaje("Error al agregar la maquinaria.");
        console.error("Error al agregar la maquinaria:", error);
    }
};

  const handleEditSubmit = async () => {
    if (!validateForm()) return;
    try {
      await editMaquinarias(maquinariaId, formValues);
      setModalEdit(false);
      setMensaje("Modificación exitosa");
      fetchMaquinarias();
    } catch (error) {
      setMensaje("Error al modificar la maquinaria.");
      console.error("Error al modificar la maquinaria:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const title = ["Nombre", "Tipo", "Modelo", "Estado", "Fecha de adquisición", "Acciones"];

  const columns = [
    { header: "Nombre", dataKey: "Nombre" },
    { header: "Tipo", dataKey: "Tipo" },
    { header: "Modelo", dataKey: "Modelo" },
    { header: "Estado", dataKey: "IdEstado" },
    { header: "Fecha de adquisición", dataKey: "fecha_adquisicion" },
  ];

  const rows = maquinarias.map((maquinaria) => ({
    Nombre: maquinaria.Nombre,
    Tipo: maquinaria.Tipo,
    Modelo: maquinaria.Modelo,
    IdEstado: maquinaria.IdEstado,
    fecha_adquisicion: maquinaria.fecha_adquisicion.slice(0, 10),
  }));

  const fields = [
    {
      name: "Nombre",
      label: "Nombre",
      type: "text",
      placeholder: "Nombre *",
    },
    {
      name: "Tipo",
      label: "Tipo",
      type: "text",
      placeholder: "Tipo *",
    },
    {
      name: "Modelo",
      label: "Modelo",
      type: "text",
      placeholder: "Modelo *",
    },
    {
      name: "IdEstado",
      label: "Estado",
      type: "text",
      placeholder: "Estado *",
    },
    {
      name: "fecha_adquisicion",
      label: "Fecha de adquisición",
      type: "date",
      placeholder: "Fecha *",
    },
  ];

  return (
    <>
      <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">
            Maquinarias
          </h2>
          <AddButton
            abrirModal={abrirModal}
            title={" Añadir Maquinaria"}
          />

          <PdfGenerator
            columns={columns}
            data={maquinarias}
            title="Reporte de Maquinarias"
          />
          {mensaje && (
            <div className="bg-blue-600 text-white py-2 px-4 rounded mb-4">
              {mensaje}
            </div>
          )}
          {modalAbierto && (
            <AddModal
              title="Agregar Maquinaria"
              fields={fields}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              cerrarModal={cerrarModal}
              values={formValues}
            />
          )}
          {modalEdit && (
            <ButtonEdit
              title="Modificar Maquinaria"
              fields={fields}
              id={maquinariaId}
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
                {maquinarias.map((maquinaria) => (
                  <tr
                    key={maquinaria.Id}
                    className="hover:bg-gray-100"
                  >
                    <td className="border-b py-2 px-4">{maquinaria.Nombre}</td>
                    <td className="border-b py-2 px-4">{maquinaria.Tipo}</td>
                    <td className="border-b py-2 px-4">{maquinaria.Modelo}</td>
                    <td className="border-b py-2 px-4">{maquinaria.IdEstado}</td>
                    <td className="border-b py-2 px-4">{maquinaria.fecha_adquisicion}</td>
                    <td className="border-b py-2 px-4 flex justify-center">
                      <button
                        onClick={() => abrirModalEdit(maquinaria)}
                        className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Modificar
                      </button>
                      <DeleteButton
                        id={maquinaria.Id}
                        endpoint="http://localhost:61274/api/Maquinaria/Borrar"
                        updateList={fetchMaquinarias}
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

export default Maquinaria;