import React, { useState, useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 3000); // El toaster se cierra después de 3 segundos
    }
  }, [message, onClose]);

  if (!visible) return null;

  const getClassNames = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-lg ${getClassNames()}`}>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
