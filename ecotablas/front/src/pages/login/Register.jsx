import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { db } from "../../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();



  const saveUserToFirestore = async (user) => {
    try {
      const userDocRef = doc(db, "usuarios", user.uid); // Referencia al documento del usuario
      const userDoc = await getDoc(userDocRef); // Verifica si el documento ya existe
  
      if (!userDoc.exists()) {
        // Solo guardar si el documento no existe
        console.log("Guardando nuevo usuario...");
        await setDoc(userDocRef, {
          correo: user.email,
          role: "viewer",
        });
      } else {
        console.log("El usuario ya existe. No se guardará nuevamente.");
      }
    } catch (error) {
      console.error("Error al guardar el usuario en Firestore:", error);
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.correo,
        formData.contrasena
      );
      const user = userCredential.user;

      await saveUserToFirestore(user);

      // Redirigir al flujo de autenticación de Dropbox
      window.location.replace(
        `https://www.dropbox.com/oauth2/authorize?client_id=${clientId}&response_type=code&token_access_type=offline&redirect_uri=http://localhost:5173/gastos/vehiculos`
      );
    } catch (error) {
      setErrors((prevErrors) => [...prevErrors, error.message]);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await saveUserToFirestore(user);
      navigate("/");
    } catch (error) {
      setErrors((prevErrors) => [...prevErrors, error.message]);
    } finally {
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

  return (
    <div className="h-full min-h-screen flex justify-center items-center w-full md:p-5 font-aeonik bg-slate-900">
      <div className="p-10 h-3/4 w-full md:w-1/2 xl:w-1/3 mx-auto rounded-xl">
        <figure className="text-center font-bold text-3xl">
          <figcaption className="text-white">Crea tu cuenta</figcaption>
        </figure>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-6">
            <label htmlFor="correo" className="block text-white">
              Correo electrónico
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full border-2 text-black p-2 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contrasena" className="block text-white">
              Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className="w-full border-2 p-2 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-teal-500 hover:bg-teal-600 font-bold rounded-full px-5 py-3 transition-colors"
            disabled={loading}
          >
            Crear cuenta
          </button>
          <div className="flex flex-col mt-5">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="text-white flex justify-center bg-teal hover:-translate-y-1 transition-transform border-2 font-bold rounded-full px-5 py-3 text-center"
            >
              <img
                width="25"
                height="30"
                className="mr-5"
                src="https://img.icons8.com/fluency/48/google-logo.png"
                alt="google-logo"
              />
              Acceder con Google
            </button>
          </div>
          <div className="text-xl text-center font-normal text-white mt-4">
            ¿Ya tienes cuenta?
            <Link
              to="/login"
              className="text-semibold underline text-white mx-2"
            >
              Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
