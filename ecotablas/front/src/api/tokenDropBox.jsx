async function refreshDropboxToken(refreshToken, clientId, clientSecret) {
    const response = await fetch('https://api.dropboxapi.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });
  
    if (!response.ok) {
      throw new Error(`Error al refrescar el token: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.access_token; // Este es el nuevo access_token válido
  }
  
  // Uso del refresh token
  (async () => {
    try {
      const nuevoAccessToken = await refreshDropboxToken('TU_REFRESH_TOKEN', 'TU_CLIENT_ID', 'TU_CLIENT_SECRET');
      console.log('Nuevo access_token:', nuevoAccessToken);
      // Guarda el nuevo access_token donde corresponda
    } catch (error) {
      console.error(error);
    }
  })();
  