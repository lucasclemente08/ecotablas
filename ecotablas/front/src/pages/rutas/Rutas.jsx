import React, { useState, useEffect } from "react";
import axios from "axios";
import SectionLayout from "../../layout/SectionLayout";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Rutas = () => {
  const [empleados, setEmpleados] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState("");
  const [inicio, setInicio] = useState(null);
  const [fin, setFin] = useState(null);
  const [rutas, setRutas] = useState([]);

  // Cargar empleados y rutas al iniciar
  useEffect(() => {
    fetchEmpleados();
    fetchRutas();
  }, []);

  const fetchEmpleados = async () => {
    const response = await axios.get("http://localhost:61274/api/Empleados/ListarTodo");
    setEmpleados(response.data);
  };

  const fetchRutas = async () => {
    const response = await axios.get("http://localhost:61274/api/Rutas/ListarTodo");
    setRutas(response.data);
  };

  const GuardarRuta = async () => {
    if (!inicio || !fin || !selectedEmpleado) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const nuevaRuta = {
      InicioLat: inicio.lat,
      InicioLong: inicio.lng,
      FinLat: fin.lat,
      FinLong: fin.lng,
      IdEmpleado: selectedEmpleado,
    };

    await axios.post("http://localhost:61274/api/Rutas/Insertar", nuevaRuta);
    fetchRutas();
  };

  const SelectLocation = ({ setLocation }) => {
    useMapEvents({
      click(e) {
        setLocation(e.latlng);
      },
    });
    return null;
  };

  return (
    <SectionLayout title="Recolección de Urbanos">
    <div>
      <h1>Asignar Rutas</h1>
      <div>
        <label>Seleccionar Empleado:</label>
        <select onChange={(e) => setSelectedEmpleado(e.target.value)} value={selectedEmpleado}>
          <option value="">-- Seleccionar --</option>
          {empleados.map((emp) => (
            <option key={emp.IdEmpleado} value={emp.IdEmpleado}>
              {emp.Nombre}
            </option>
          ))}
        </select>
      </div>

      <MapContainer center={[-31.4184, -64.1705]} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <SelectLocation setLocation={setInicio} />
        <SelectLocation setLocation={setFin} />
        {inicio && <Marker position={inicio}><Popup>Inicio</Popup></Marker>}
        {fin && <Marker position={fin}><Popup>Fin</Popup></Marker>}
      </MapContainer>

      <button onClick={GuardarRuta}>Guardar Ruta</button>

      <h2>Rutas Existentes</h2>
      <ul>
        {rutas.map((ruta) => (
          <li key={ruta.IdRuta}>
            Inicio: ({ruta.InicioLat}, {ruta.InicioLong}) - Fin: ({ruta.FinLat}, {ruta.FinLong}) - Empleado: {ruta.NombreEmpleado}
          </li>
        ))}
      </ul>
    </div>
    </SectionLayout>
  );
};

export default Rutas;