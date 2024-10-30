
import SectionLayout from "../../layout/SectionLayout";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);  // State for user profile
  const [loading, setLoading] = useState(true);          // State for loading
  const [user, setUser] = useState(" ");
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (user) {
      // Create a profile object based on the user data
      const userData = {
        nombre: user.displayName || "Nombre no disponible",
        correo: user.email || "Correo no disponible",
        fotoUrl: user.photoURL || null,
      };
      setUserProfile(userData);
      setLoading(false); // Stop loading once the user data is set
    } else {
      setLoading(false); // Stop loading if no user is authenticated
    }
  }, [user]);

  if (loading) return <p>Cargando perfil...</p>;
  if (!userProfile) return <p>No se encontró el perfil del usuario.</p>;

  return (
    <SectionLayout title="Perfil">
      <div className="w-full font-aeonik bg-slate-900 p-6">
        <div className="flex items-center mb-6">
          {userProfile.fotoUrl ? (
            <img
              src={userProfile.fotoUrl}
              alt="Foto de perfil"
              className="w-16 h-16 rounded-full border-2 border-teal-500"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-white">?</span>
            </div>
          )}
          <div className="ml-4">
            <h2 className="text-xl text-white font-bold">
              {userProfile.nombre}
            </h2>
            <p className="text-white">{userProfile.correo}</p>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

export default Profile;
