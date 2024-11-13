import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PermisosCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code'); // Obtener el código de autorización de la URL

    if (code) {
      // Si tenemos el código, intercambiamos el código por un token
      exchangeCodeForToken(code);
    } else {
      // Si no hay código, redirigimos a la página principal o de error
      navigate('/');
    }
  }, [navigate]);

  // Función para intercambiar el código por un token
  const exchangeCodeForToken = async (code) => {
    const clientId = import.meta.env.VITE_DROPBOX_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_DROPBOX_CLIENT_SECRET;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173/gastos/vehiculos';

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
        navigate('/dashboard');
      } else {
        console.error('Error al intercambiar el código por el token');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div>
      <p>Autorizando...</p>
    </div>
  );
};

export default PermisosCallback;
