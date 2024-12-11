import React from 'react';

const ModalReparacion = ({ title, content, cerrarModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button 
            onClick={cerrarModal} 
            className="text-red-500 font-bold"
          >
            X
          </button>
        </div>
        <div className="mt-4">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ModalReparacion;