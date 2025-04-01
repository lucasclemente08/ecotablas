import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider, db } from "../../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
const Login = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    uid: "",
    email: "",
  });

  const userId = import.meta.env.VITE_DROPBOX_CLIENT_ID;
  const dropboxSecret = import.meta.env.VITE_DROPBOX_CLIENT_SECRET;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          setUser({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
          });

          if (!user || !user.email) {
            console.error(
              "Error: El objeto 'user' o la propiedad 'email' no están definidos.",
            );
            return;
          }

          const infoUser = user.uid;
          const docuRef = doc(db, `usuarios/${infoUser}`); // Asegúrate de que 'doc' esté definido

          // Verificar si el usuario ya existe
          const docSnap = await getDoc(docuRef);
          if (!docSnap.exists()) {
            // Si no existe, guardarlo en la base de datos
            await setDoc(docuRef, {
              correo: user.email, // Aseguramos que 'email' esté definido
              role: "viewer",
            });
          }

          navigate("/permisos");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (error) {
      setErrors([error.message]);
    }

    setLoading(false);
  };

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        if (!user || !user.email) {
          console.error(
            "Error: El objeto 'user' o la propiedad 'email' no están definidos.",
          );
          return;
        }

        const infoUser = user.uid;
        const docuRef = doc(db, `usuarios/${infoUser}`); // Asegúrate de que 'doc' esté definido

        try {
          // Verificar si el usuario ya existe
          const docSnap = await getDoc(docuRef);
          if (!docSnap.exists()) {
            // Si no existe, guardarlo en la base de datos
            await setDoc(docuRef, {
              correo: user.email, // Aseguramos que 'email' esté definido
              role: "viewer",
            });
          }

          // Navegar a la página de permisos
          navigate("/permisos");
        } catch (dbError) {
          console.error("Error al verificar o guardar el usuario:", dbError);
        }
      })
      .catch((error) => {
        // Manejo de errores
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email; // Manejar el caso donde 'customData' pueda ser undefined
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error("Error en la autenticación:", errorCode, errorMessage);
      });
  };

  return (
    <div className="relative bg-slate-900 flex h-full  w-full md:p-5 font-aeonik ">
      <div className="p-10 h-3/4 text-white w-full md:w-1/2 xl:w-1/3 mx-auto  rounded-xl bg-light-gray ">
        <figure className="text-center font-bold text-3xl">
          <img
            width="60"
            height="60"
            className="m-auto"
            src="https://img.icons8.com/external-soft-fill-juicy-fish/60/external-eco-packaging-symbols-soft-fill-soft-fill-juicy-fish.png"
            alt="external-eco-packaging-symbols-soft-fill-soft-fill-juicy-fish"
          />
          <figcaption>Accede a tu cuenta</figcaption>
        </figure>
        <form
          className="space-y-4 max-w-lg my-5 mx-auto"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-dark "
            >
              Email
            </label>
            <input
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 outline outline-1 outline-light text-gray-900 text-sm rounded-lg  focus:outline-2 block w-full p-3"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Contraseña
            </label>
            <input
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 outline outline-1  outline-light text-gray-900 text-sm rounded-lg focus:outline-2 block w-full p-3 "
              required
            />
          </div>
          <div className="flex justify-end">
            <a
              href="/login/recovery"
              className="text-sm font-normal text-dark/70 underline"
            >
              Olvidé mi contraseña
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full text-white flex justify-center  bg-teal hover:-translate-y-1 transition-transform border-2   font-bold rounded-full px-5 py-3 text-center text-lg"
            >
              Acceder
            </button>
            {errors.length > 0 && (
              <div className="text-[#B33A3A]">
                <ul className="mb-0">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            {loading && (
              <div className="flex justify-center">
                <span className="text-dark">
                  Espera un momento, estamos cargando tu información...
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleClick}
              type="button"
              className="w-full text-white flex justify-center  bg-teal hover:-translate-y-1 transition-transform border-2   font-bold rounded-full px-5 py-3 text-center text-lg"
            >
              <img
                width="30"
                height="30"
                className="mr-5"
                src="https://img.icons8.com/fluency/48/google-logo.png"
                alt="google-logo"
              />
              Acceder con Google
            </button>
            <div className="flex justify-center divide-y-2">
              <span className="text-dark">o</span>
            </div>
          </div>
        </form>
        <div className="text-sm text-center font-normal text-dark ">
          ¿No tienes cuenta?
          <Link to="/register" className=" text-semibold underline  mx-2">
            Registrarme
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
