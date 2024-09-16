import React, { useState } from "react";

const RegisterProductForm = () => {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  // Estado para errores de validación
  const [errors, setErrors] = useState({});

  // Manejo de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validar datos del formulario
  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName) {
      newErrors.productName = "El nombre del producto es obligatorio";
    }
    if (!formData.price || isNaN(parseFloat(formData.price))) {
      newErrors.price = "El precio debe ser un número válido";
    }
    if (!formData.quantity || isNaN(parseInt(formData.quantity, 10))) {
      newErrors.quantity = "La cantidad debe ser un número entero";
    }
    return newErrors;
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar formulario
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Si no hay errores, podemos simular el registro del producto
    console.log("Producto registrado:", formData);
    alert("Producto registrado con éxito");
  };

  return (
    <>
      <h2 className="text-2xl  font-semibold mb-10">Registrar Producto</h2>
      <div className="max-w-lg mx-auto flex p-10 bg-slate-400 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-2">
          <div className="mb-4  ">
            <label htmlFor="productName" className="block text-gray-700">
              Nombre del producto
            </label>
            <input
              type="text"
              name="productName"
              id="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm">{errors.productName}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Descripción
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">
              Precio
            </label>
            <input
              type="text"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700">
              Cantidad
            </label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700">
              moneda
            </label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700">
              Cantidad
            </label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">
              Categoría
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Registrar Producto
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterProductForm;
