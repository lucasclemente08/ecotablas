import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";
import { db, auth, provider } from '../../firebase/firebase';

const Register = () => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
  });
  const [contrasena, setContrasena] = useState("");
  const [correo, setCorreo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;

      // Guardar el rol del usuario en Firestore
      await addDoc(collection(db, "usuarios"), {
        uid: user.uid,
        nombre: formData.nombre,
        correo: formData.correo,
        rol: 'empleado'  // Asigna el rol aquí (puedes cambiarlo según tus necesidades)
      });

      console.log("User created with ID:", user.uid);
      setLoading(false);
      navigate('/'); 
    } catch (error) {
      console.error("Error creating user:", error);
      setErrors([error.message]);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setContrasena(formData.contrasena);
    setCorreo(formData.correo);
  }, [formData]);

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        // Guardar el rol del usuario en Firestore
        await addDoc(collection(db, "usuarios"), {
          uid: user.uid,
          nombre: user.displayName,
          correo: user.email,
          rol: 'empleado'
        });

        navigate('/');
      }).catch((error) => {
        console.error("Error during Google sign-in:", error);
        setErrors([error.message]);
      });
  };

  return (
    <div className="h-full min-h-screen flex justify-center items-center w-full md:p-5 font-aeonik bg-slate-900">
      <div className="p-10 h-3/4 w-full md:w-1/2 xl:w-1/3 mx-auto rounded-xl">
        <figure className='text-center font-bold text-3xl'>
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
            disabled={loading}
          >
            Crear cuenta
          </button>
          <div className='flex flex-col mt-5'>
            <button onClick={handleClick}
              type='button'
              className='text-white flex justify-center bg-teal hover:-translate-y-1 transition-transform border-2 font-bold rounded-full px-5 py-3 text-center'
            >
              <img width="25" height="30" className="mr-5" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo" />
              Acceder con Google
            </button>
          </div>
          <div className='text-xl text-center font-normal text-white mt-4'>
            ¿Ya tienes cuenta?
            <Link to='/login' className='text-semibold underline text-white mx-2'>
              Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
