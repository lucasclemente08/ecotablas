import React, { useState } from 'react';


const Register = () => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();


    setLoading(true);
    setLoading(false);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  return (
    <div className="  h-full min-h-screen flex justify-center items-center  w-full md:p-5 font-aeonik bg-slate-900  ">
    
     
      <div className=" p-10 h-3/4  w-full md:w-1/2 xl:w-1/3 mx-auto  rounded-xl ">
        <figure className='text-center font-bold text-3xl'>
        
          {/* <img src={logoNoText} alt='Logo de Aventura Compartida' width={150} priority={true} className='m-auto' /> */}
          <figcaption className="text-white">Crea tu cuenta</figcaption>
        </figure>
        <form onSubmit={handleSubmit}>
        <div className='mb-4 text-white'>
          <label htmlFor='nombre' className=' text-white block '>Nombre</label>
          <input
            type='text'
            id='nombre'
            name='nombre'
            value={formData.nombre}
            onChange={handleChange}
            className='w-full border-2 p-2 rounded-lg'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='correo' className='block text-white'>Correo electrónico</label>
          <input
            type='email'
            id='correo'
            name='correo'
            value={formData.correo}
            onChange={handleChange}
            className='w-full border-2 p-2 rounded-lg'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='contrasena' className='block text-white'>Contraseña</label>
          <input
            type='password'
            id='contrasena'
            name='contrasena'
            value={formData.contrasena}
            onChange={handleChange}
            className='w-full border-2 p-2 rounded-lg'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full text-white bg-teal-500 hover:bg-teal-600 font-bold rounded-full px-5 py-3 transition-colors'
        >
          Crear cuenta
        </button>
          
          <div className='text-xl text-center font-normal text-white mt-4 '>
            Ya tienes cuenta?
       
            <a href='/login' className='text-semibold underline text-white  mx-2'>
              Inicia sesión
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
