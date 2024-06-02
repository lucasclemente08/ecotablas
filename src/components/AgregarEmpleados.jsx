import { useState } from 'react';

const AgregarEmpleadoModal = ({ isOpen, onClose, onAgregarEmpleado }) => {
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    Nombre: '',
    Apellido: '',
    DNI: '',
    Calle: '',
    Numero: '',
    Piso: '',
    Dpto: '',
    CodPostal: '',
    IdLocalidad: '',
    FechaIngreso: '',
    Telefono: '',
    Mail: '',
    IdArea: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onAgregarEmpleado(nuevoEmpleado);
    onClose();
  };

  return (
    <div className={`fixed inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Agregar nuevo empleado</h3>
                <div className="grid grid-cols-2 gap-4">
  <input type="text" name="Nombre" value={nuevoEmpleado.Nombre} onChange={handleChange} className="border border-gray-300 p-2 rounded-md" placeholder="Nombre" />
  <input type="text" name="Apellido" value={nuevoEmpleado.Apellido} onChange={handleChange} className="border border-gray-300 p-2 rounded-md" placeholder="Apellido" />
  <input type="text" name="DNI" value={nuevoEmpleado.DNI} onChange={handleChange} className="border border-gray-300 p-2 rounded-md" placeholder="DNI" />
  <input type="text" name="Calle" value={nuevoEmpleado.Calle} onChange={handleChange} className="border border-gray-300 p-2 rounded-md" placeholder="Calle" />
  <input type="text" name="Numero" value={nuevoEmpleado.Numero} onChange={handleChange} className="border border-gray-300 p-2 rounded-md" placeholder="Número" />
  <input type="text" name="Piso" value={nuevoEmpleado.Piso} onChange={handleChange} className="border border-gray-300 p-2 rounded-md" placeholder="Piso" />
  <input type="text" name="Dpto" value={nuevoEmpleado.Dpto} onChange={handleChange} className="border border-gray-300 p-2 rounded-md" placeholder="Departamento" />
  <input type="text" name="CodPostal" value={nuevoEmpleado.CodPostal} onChange={handleChange} className="border border-gray-300 p-2 rounded-md" placeholder="Código Postal" />
  <input type="text" name="IdLocalidad" value={nuevoEmpleado.IdLocalidad} onChange={handleChange} className="border border-gray-300 p-2 rounded-md" placeholder="Id de Localidad" />
  <input type="text" name="FechaIngreso" value={nuevoEmpleado.FechaIngreso} onChange={handleChange} className="border border-gray-300 p-2 rounded-md" placeholder="Fecha de Ingreso" />
  <input type="text" name="Telefono" value={nuevoEmpleado.Telefono} onChange={handleChange} className="border border-gray-300 p-2 rounded-md" placeholder="Teléfono" />
  <input type="text" name="Mail" value={nuevoEmpleado.Mail} onChange={handleChange} className="border border-gray-300 p-2 rounded-md" placeholder="Correo Electrónico" />
  <input type="text" name="IdArea" value={nuevoEmpleado.IdArea} onChange={handleChange} className="border border-gray-300 p-2 rounded-md" placeholder="Id de Área" />
</div>

              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick={handleSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
              Agregar
            </button>
            <button onClick={cerrarMO} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarEmpleadoModal;
