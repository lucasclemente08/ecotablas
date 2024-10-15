import { useState } from "react";

const useValidateFields = () => {
  const [mensaje, setMensaje] = useState("");

  const validateFields = (formValues, rules) => {
    let isValid = true;

    for (const rule of rules) {
      const { field, title, required } = rule;

      if (required && !formValues[field]) {
        setMensaje(`${title} es obligatorio.`);
        isValid = false;
        break; // Deja de validar en el primer error
      }
    }

    return isValid;
  };

  return { validateFields, mensaje };
};

export default useValidateFields;
