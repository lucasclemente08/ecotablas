import React, { useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth,provider  } from '../../firebase/firebase'
import { GoogleAuthProvider ,signInWithPopup} from "firebase/auth";

const Register = () => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
  });
  const [contrasena,setContrasena] = useState("")
  const [correo,setCorreo] = useState("")


  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

     
  createUserWithEmailAndPassword(auth, correo, contrasena)
    .then((userCredential) => {
      const user = userCredential.user;
      navigate('/')
    })
    .catch((error) => { 
      const errorCode = error.code;
      const errorMessage = error.message;
    });
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
  
  useEffect(() => {
    console.log(formData);
    setContrasena(formData.contrasena);
    setCorreo(formData.correo);
  }, [formData]); // Run this effect whenever formData changes
  
  const handleClick = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
   
      navigate('/')
      // console.log(JSON.stringify(user))
    }).catch((error) => {
    
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      
    });
 
    
  }
 

  return (
    <div className="  h-full min-h-screen flex justify-center items-center  w-full md:p-5 font-aeonik bg-slate-900  ">
    
     
      <div className=" p-10 h-3/4  w-full md:w-1/2 xl:w-1/3 mx-auto  rounded-xl ">
        <figure className='text-center font-bold text-3xl'>
        
          {/* <img src={logoNoText} alt='Logo de Aventura Compartida' width={150} priority={true} className='m-auto' /> */}
          <figcaption className="text-white">Crea tu cuenta</figcaption>
        </figure>
        <form onSubmit={handleSubmit}>
        
        <div className='mb-4 mt-6'>
          <label htmlFor='correo' className='block text-white'>Correo electrónico</label>
          <input
            type='email'
            id='correo'
            name='correo'
            value={formData.correo}
            onChange={handleChange}
            className='w-full border-2 text-black p-2 rounded-lg'
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
              <div className='flex flex-col mt-5 '>
                        <button  onClick={handleClick}
                            type='submit'
                            className=' text-white flex justify-center  bg-teal hover:-translate-y-1 transition-transform border-2   font-bold rounded-full px-5 py-3 text-center '
                        >
                            <img width="25" height="30"  className="mr-5"src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo"/>
                            Acceder con Google
                        </button>
                      
         
                    </div>
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
