import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PermisosCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code'); // Obtener el código de autorización de la URL

    if (code) {

      exchangeCodeForToken(code);
    } else {

      navigate('/login');
    }
  }, [navigate]);

  // Función para intercambiar el código por un token
  const exchangeCodeForToken = async (code) => {
    const clientId = import.meta.env.VITE_DROPBOX_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_DROPBOX_CLIENT_SECRET;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173/';

    const tokenUrl = 'https://api.dropbox.com/oauth2/token';

    const body = new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    });

    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        body: body,
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;

        // Guardamos el token y el refresh token en el localStorage
        localStorage.setItem('dropboxAccessToken', accessToken);
        localStorage.setItem('dropboxRefreshToken', refreshToken);

        // Redirigir a otra página, por ejemplo, el dashboard
        navigate('/');
      } else {
        console.error('Error al intercambiar el código por el token');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
    <div className="flex items-center space-x-4 animate-pulse">
      <svg className="w-12 h-12 text-indigo-200 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      <p className="text-2xl font-semibold tracking-wider">
        Autorizando...
      </p>
    </div>
    <p className="mt-4 text-sm text-indigo-200">
      Por favor, espera mientras completamos el proceso de autorización.
    </p>
  </div>
  );
};

export default PermisosCallback;
