const getUserInfo = async () => {
    const accessToken = localStorage.getItem('dropboxAccessToken');
  
    const response = await fetch('https://api.dropbox.com/2/users/get_current_account', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  
    const data = await response.json();
    console.log(data);
  };
  