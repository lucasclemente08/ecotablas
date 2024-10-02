import React from "react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no se muestra nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative">
        {/* Título del Modal */}
        {title && (
          <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        )}

        {/* Contenido del Modal */}
        <div>{children}</div>

        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded-full"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

// Definir los tipos de propiedades y requerimientos
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Si el modal está abierto
  onClose: PropTypes.func.isRequired, // Función para cerrar el modal
  children: PropTypes.node.isRequired, // El contenido que se pasa al modal (formulario, texto, etc.)
  title: PropTypes.string, // El título del modal
};

export default Modal;
