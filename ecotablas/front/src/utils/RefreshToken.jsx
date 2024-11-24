const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('dropboxRefreshToken');
  
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: import.meta.env.VITE_DROPBOX_CLIENT_ID,
      client_secret: import.meta.env.VITE_DROPBOX_CLIENT_SECRET,
    });
  
    const response = await fetch('https://api.dropbox.com/oauth2/token', {
      method: 'POST',
      body: body,
    });
  
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('dropboxAccessToken', data.access_token);
    }
  };
  