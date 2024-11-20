import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import SectionLayout from "../../layout/SectionLayout";
import { toast } from "react-toastify";
import TablaHead from "../../components/Thead";
import L from "leaflet";
import DeleteButton from "../../components/buttons/DeleteButton";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import office from "../../assets/office.png";
import ecoTruck from "../../assets/ecoTruck.png";
import individual from "../../assets/individual.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import icon from "leaflet/dist/images/marker-icon.png";
import Toast from "../../components/Toast";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
const RecoUrbanos = () => {
  const [showMap, setShowMap] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); 
  const [locations, setLocations] = useState([]);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [newUbicacion, setNewUbicacion] = useState({
    Nombre: "",
    Lat: "",
    Long: "",
    TipoDonante: "",
  });
  const [modalEdit, setModalEdit] = useState(false);
  const [IdUbicacion, setIdUbicacion] = useState(null);
  const columns = [
    { header: "Nombre", accessor: "Nombre" },
    { header: "Tipo de Donante", accessor: "TipoDonante" },
    { header: "Latitud", accessor: "Lat" },
    { header: "Longitud", accessor: "Long" },
  ];
  const titles = [...columns.map((col) => col.header), "Acciones"];
  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);
  useEffect(() => {
    fetchLocations();
  }, []);

  const DefaultIcon = L.icon({
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUbicacion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const centerPosition =
    locations.length > 0
      ? [locations[0].Lat, locations[0].Long]
      : [-31.4184, -64.1705];

  const handleSubmit = () => {
    if (!newUbicacion.Nombre || !newUbicacion.Lat || !newUbicacion.Long) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

 
    axios
      .post(
        `http://www.gestiondeecotablas.somee.com/api/UbicacionesMapa/Insertar`,
        newUbicacion,
      )
      .then((response) => {
        setModalAbierto(false);
        // setMensaje("Inserción exitosa");
        // Refrescar la lista de ubicaciones después de insertar
        toast.success("Registro editado con éxito!");
      
      
        fetchLocations()
      })
      .catch((error) => console.error("error al obtener los datos:", error));
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "http://www.gestiondeecotablas.somee.com/api/UbicacionesMapa/ListarTodo",
      );
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const toggleMap = () => setShowMap(!showMap);

  // Definimos íconos personalizados
  const handleIcon = (tipoDonante) => {
    const normalizedTipo = tipoDonante.toLowerCase();
    switch (normalizedTipo) {
      case "empresa":
        return L.icon({
          iconUrl: office,
          iconSize: [30, 41],
          // shadowUrl: iconShadow,
        });
      case "urbanos":
        return L.icon({
          iconUrl: ecoTruck,
          iconSize: [30, 41],
          // shadowUrl: iconShadow,
        });
      case "particular":
        return L.icon({
          iconUrl: individual,
          iconSize: [30, 41],
          // shadowUrl: iconShadow,
        });
      default:
        return L.icon({
          iconUrl: L.Icon.Default.prototype.options.iconUrl,
          iconSize: [30, 41],
          shadowUrl: iconShadow,
        });
    }
  };


 
    const handleEdit = (location) => {
      setIdUbicacion(location.IdUbicacion)
      setNewUbicacion({
        Nombre: location.Nombre || "",
        Lat: location.Lat || "",
        Long: location.Long || "",
        TipoDonante: location.TipoDonante || ""
      });
      setModalEdit(true); 
    };

    const handleEditSubmit = async (event) => {
      event.preventDefault(); 
      try {
        await axios.put(`http://www.gestiondeecotablas.somee.com/api/UbicacionesMapa/Modificar/${IdUbicacion}`, newUbicacion);
        fetchLocations();
        setModalEdit(false); 
      } catch (error) {
        console.error("Error al editar ubicación:", error);
      }
    };

    const cerrarModalEdit = () => {
      setModalEdit(false);
    };


const fields = [
  {
    name: "Nombre",
    label: "Nombre de la Ubicación",
    type: "text"
  },
  {
    name: "Lat",
    label: "Latitud",
    type: "number"
  },
  {
    name: "Long",
    label: "Longitud",
    type: "number"
  },
  {
    name: "TipoDonante",
    label: "Tipo de Donante",
    type: "select",
    options: [
      { value: "Urbanos", label: "Recolección de urbanos" },
      { value: "Empresa", label: "Empresa donante" },
      { value: "Particular", label: "Particular" },
    ],
  }
];


  return (
    <SectionLayout title="Recolección de Urbanos">
 
 {modalEdit && (
            <ButtonEdit
              title="Recoleccion Urbanos"
              fields={fields}
              id={IdUbicacion}
              formValues={newUbicacion}
              handleChange={handleChange}
              handleEditSubmit={handleEditSubmit}
              cerrarModalEdit={cerrarModalEdit}
            />
          )}



         <Toast message={toastMessage} type={toastType}  />
      <div className="overflow-x-auto">
        {modalAbierto && (
      <div className="fixed inset-0 overflow-y-auto">
  <div className="flex items-center justify-center min-h-screen p-2  text-center sm:block">
    <div
      className="fixed inset-0 transition-opacity"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <span
      className="hidden sm:inline-block sm:align-middle sm:h-screen"
      aria-hidden="true"
    >
      &#8203;
    </span>
    <div className="inline-block align-bottom bg-white rounded-lg px-6 pt-8 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:p-8 w-full max-w-2xl">
      <div>
        <h3 className="text-lg  leading-6 font-medium text-gray-900">
          Agregar Ubicación
        </h3>
        <div className="mt-1">
        <label className="block mt-2 text-sm font-medium text-gray-700">
        Nombre de la parada *
          </label>
          <input
            type="text"
            name="Nombre"
            placeholder="Nombre de la parada"
            value={newUbicacion.Nombre}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <label className="block mt-2 text-sm font-medium text-gray-700">
            Tipo de Donante *
          </label>
          <select
            id="TipoDonante"
            name="TipoDonante"
            value={newUbicacion.TipoDonante}
            onChange={handleChange}
            className="border p-2 w-full mt-1"
          >
            <option value="Empresa">Empresa donante</option>
            <option value="Urbanos">Recolección de urbanos</option>
            <option value="Particular">Particular</option>
          </select>
        </div>
        <div>
          <p className="mt-2 font-semibold">
            Presionar en el mapa para seleccionar la ubicación.
          </p>
        </div>
        <div className="p-2 flex justify-center">
        <MapContainer
                    className="overflow-y-auto w-4 "
                    center={centerPosition}
                    zoom={12}
                    scrollWheelZoom={false}
                    whenReady={(map) => {
                      map.target.on("click", function (e) {
                        const { lat, lng } = e.latlng;
                        setNewUbicacion({
                          Nombre: "",
                          Lat: lat.toFixed(6),
                          Long: lng.toFixed(6),
                        });
                        L.marker([lat, lng], { icon: DefaultIcon }).addTo(
                          map.target,
                        );
                      });
                    }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locations.map((location, index) => (
                      <Marker
                        key={index}
                        position={[location.Lat, location.Long]}
                        icon={handleIcon(location.TipoDonante)}
                      >
                        <Popup>{[location.Nombre, location.TipoDonante]}</Popup>
                      </Marker>
                    ))}
                  </MapContainer>
        </div>
              <p className="text-center text-sm mb-1 text-gray-500">{`lat:${newUbicacion.Lat} |  long:${newUbicacion.Long}`}</p>
        <div className="flex justify-end space-x-4 mt-4 ">
     
          <button
            onClick={cerrarModal}
            className=" inline-flex justify-center w-full rounded-md border border-transparent shadow-sm p-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

        )}
      </div>
      <button
        onClick={abrirModal}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-2 mb-5 px-4 rounded"
      >
        Agregar ubicación
      </button>
      <button
        onClick={toggleMap}
        className="px-4 py-2 m-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out"
      >
        {showMap ? "Ocultar Mapa" : "Mostrar Mapa"}
      </button>


      {showMap && !modalAbierto && (
          <div className="mt-5  rounded-lg overflow-hidden h-[600px]">
            <MapContainer center={centerPosition} zoom={12} className="w-full h-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {locations.map((location, index) => (
                <Marker key={index} position={[location.Lat, location.Long]} icon={handleIcon(location.TipoDonante)}>
                  <Popup>{location.Nombre} - {location.TipoDonante}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
     


      {showMap ? (
    <>
    </>
      ) : (
        <table className="table-auto w-full bg-white rounded-lg shadow-lg mt-4">
          <TablaHead titles={titles} />
          <tbody>
            {locations.map((location) => (
              <tr key={location.Nombre}>
                <td className="px-4 py-2">{location.Nombre}</td>
                <td className="px-4 py-2">{location.TipoDonante}</td>
                <td className="px-4 py-2">{location.Lat}</td>
                <td className="px-4 py-2">{location.Long}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(location)}
                    className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Modificar
                  </button>
                  <DeleteButton
                    id={location.IdUbicacion}
                    endpoint={
                      "http://www.gestiondeecotablas.somee.com/api/UbicacionesMapa/Delete"
                    }
                    updateList={fetchLocations}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </SectionLayout>
  );
};

export default RecoUrbanos;
