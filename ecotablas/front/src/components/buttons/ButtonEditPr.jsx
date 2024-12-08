import { useEffect, useState } from "react";

const ButtonEdit = ({
  title,
  fields,
  formValues,
  handleChange,
  handleEditSubmit,
  cerrarModalEdit,
}) => {
  const [error, setError] = useState("");

  useEffect(() => {
    // Bloquear el scroll cuando se abre el modal
    document.body.style.overflow = "hidden";

    // Cerrar modal al presionar la tecla "Escape"
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        cerrarModalEdit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Restaurar el scroll y eliminar el listener
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cerrarModalEdit]);


  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      role="dialog"
      aria-labelledby="modal-title"
      onClick={cerrarModalEdit} // Cerrar modal si se hace clic fuera
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
      
        >
          <h3
            id="modal-title"
            className="text-lg leading-6 font-medium text-gray-900"
          >
            Editar {title}
          </h3>
          <form onSubmit={handleEditSubmit}>
            {fields.map((field) => (
              <div key={field.name} className="mt-2">
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formValues[field.name] || ""}
                    onChange={handleChange}
                    className="border p-2 w-full"
                  >
                    <option value="">Selecciona una opción</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formValues[field.name] || ""}
                    onChange={handleChange}
                    className="border p-2 w-full"
                  />
                )}
              </div>
            ))}
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                Guardar
              </button>
            </div>
          </form>
          <div className="mt-2">
            <button
              type="button"
              onClick={cerrarModalEdit}
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonEdit;
