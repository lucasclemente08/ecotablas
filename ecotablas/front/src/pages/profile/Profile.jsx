import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import SectionLayout from "../../layout/SectionLayout";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const basicProfile = {
          nombre: user.displayName || "Nombre no disponible",
          correo: user.email || "Correo no disponible",
          fotoUrl: user.photoURL || null,
          uid: user.uid,
          verificado: user.emailVerified,
          fechaCreacion: user.metadata?.creationTime,
          ultimoInicioSesion: user.metadata?.lastSignInTime,
        };

        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const additionalData = userDoc.data();
            setUserProfile({ ...basicProfile, ...additionalData });
          } else {
            console.warn("No se encontró información adicional en Firestore");
            setUserProfile(basicProfile);
          }
        } catch (error) {
          console.error("Error al obtener datos adicionales:", error);
          setUserProfile(basicProfile);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  if (loading) return <SectionLayout className="text-center text-white " title="Cargando Perfil" ></SectionLayout>;
  if (!userProfile) return <p className="text-center text-white">No se encontró el perfil del usuario.</p>;

  return (
    <SectionLayout title="Perfil">
      <div className="w-full font-aeonik bg-slate-900 p-8 rounded-lg shadow-md">
        {/* Foto y Nombre */}
        <div className="flex flex-col items-center mb-8">
          {userProfile.fotoUrl ? (
            <img
              src={userProfile.fotoUrl}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full border-4 border-teal-500 shadow-lg mb-4"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-2xl">?</span>
            </div>
          )}
          <h2 className="text-2xl text-teal-400 font-bold">{userProfile.nombre}</h2>
        </div>

        {/* Detalles del usuario */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white">
          <div className="bg-slate-800 p-4 rounded-md shadow-md">
            <p className="text-sm text-gray-400 uppercase">Correo</p>
            <p className="text-lg">{userProfile.correo}</p>
          </div>
          {/* <div className="bg-slate-800 p-4 rounded-md shadow-md">
            <p className="text-sm text-gray-400 uppercase">UID</p>
            <p className="text-lg">{userProfile.uid}</p>
          </div> */}
          <div className="bg-slate-800 p-4 rounded-md shadow-md">
            <p className="text-sm text-gray-400 uppercase">Verificado</p>
            <p className="text-lg">{userProfile.verificado ? "Sí" : "No"}</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-md shadow-md">
            <p className="text-sm text-gray-400 uppercase">Fecha de creación</p>
            <p className="text-lg">{userProfile.fechaCreacion}</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-md shadow-md">
            <p className="text-sm text-gray-400 uppercase">Último inicio de sesión</p>
            <p className="text-lg">{userProfile.ultimoInicioSesion}</p>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

export default Profile;
