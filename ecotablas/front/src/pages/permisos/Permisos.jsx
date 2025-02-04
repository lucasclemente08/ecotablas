import React from 'react';

const Permisos = () => {

  const clientId = import.meta.env.VITE_DROPBOX_CLIENT_ID;
  const redirectUri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173/');
  console.log("Redirect URI:", redirectUri);
   

  const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${clientId}&response_type=code&token_access_type=offline&redirect_uri=${redirectUri}`;
  
  return (
    <div className="bg-slate-900 min-h-screen flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md text-center">
        <a
          href={authUrl}
          className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aceptar Permisos
        </a>
        <p className="mt-4 text-gray-700">Haz clic en el enlace para autorizar la aplicación a acceder a tu Dropbox.</p>
      </div>
    </div>
  );};


export default Permisos;
