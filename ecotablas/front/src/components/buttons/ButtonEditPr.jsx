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
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        cerrarModalEdit();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cerrarModalEdit]);

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-gray-500 opacity-75 fixed inset-0"
        aria-hidden="true"
      ></div>
      <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
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
          {/* {error && <div className="text-red-500 mt-2">{error}</div>} */}
          <div className="mt-5 sm:mt-6">
            <button
              onClick={handleEditSubmit}
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
  );
};

export default ButtonEdit;
