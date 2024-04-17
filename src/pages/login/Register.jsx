import React, { useState } from 'react';


const Register = () => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí deberías agregar la lógica para manejar el envío del formulario y registrar al usuario
    // Esto puede implicar enviar una solicitud HTTP a tu backend

    setLoading(true);
    setLoading(false);
  };

  return (
    <div className='relative flex h-full  w-full md:p-5 font-aeonik '>
      {/* Aquí puedes insertar tu imagen de fondo */}
      <div className='absolute inset-x-0 inset-y-0 -z-10 '>
        {/* <img src={bgImageLogin} alt='Imagen de fondo' className='w-full h-full object-cover' /> */}
      </div>
      <div className=' p-10 h-3/4  w-full md:w-1/2 xl:w-1/3 mx-auto  rounded-xl bg-light-gray'>
        <figure className='text-center font-bold text-3xl'>
          {/* Aquí puedes insertar tu logo */}
          {/* <img src={logoNoText} alt='Logo de Aventura Compartida' width={150} priority={true} className='m-auto' /> */}
          <figcaption>Crea tu cuenta</figcaption>
        </figure>
        <form className='space-y-4 max-w-lg mx-auto my-5' onSubmit={handleSubmit}>
          {/* Aquí puedes incluir los campos de tu formulario */}
          <button className='w-full text-black bg-teal hover:-translate-y-1 transition-transform border-2   font-bold rounded-full px-5 py-3 text-center text-lg'>
            Crear cuenta
          </button>
          
          <div className='text-sm text-center font-normal text-black  '>
            Ya tienes cuenta?
            {/* Aquí necesitas manejar el enrutamiento */}
            <a href='/login' className='text-semibold underline  mx-2'>
              Inicia sesión
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
