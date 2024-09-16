import Sidebar from "../../components/sidebar";
import profile from "../../assets/profile.jpeg";
const Profile = () => {
  const userProfile = {
    nombre: "Juan Pérez",
    correo: "juan.perez@example.com",
    telefono: "+123456789",
    ubicacion: "Córdoba,Córdoba Argentina",
    fotoUrl: profile, // Ejemplo de foto de perfil

    rol: "Recolector Senior",
    dni: "12345678",
    fechaNacimiento: "15 de julio de 1990",
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full font-aeonik bg-slate-900  p-6 ">
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

          <div className="mb-4">
            <p className="font-semibold font-md text-white">Teléfono:</p>
            <p className="text-white">{userProfile.telefono}</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold font-md text-white">Ubicación:</p>
            <p className="text-white">{userProfile.ubicacion}</p>
          </div>

          {/* <div>
        <p className="font-semibold v text-white">Descripción:</p>
        <p className="text-white">{userProfile.descripcion}</p>
      </div> */}

          <div>
            <p className="font-semibold font-md text-white">Rol:</p>
            <p className="text-white">{userProfile.rol}</p>
          </div>

          <div>
            <p className="font-semibold font-md text-white">DNI:</p>
            <p className="text-white">{userProfile.dni}</p>
          </div>

          <div>
            <p className="font-semibold font-md text-white">
              Fecha de nacimiento:
            </p>
            <p className="text-white">{userProfile.fechaNacimiento}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
