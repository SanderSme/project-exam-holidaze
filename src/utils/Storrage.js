const accessToken = localStorage.getItem('accessToken')

function clearStorrage() {
  localStorage.clear()
}

function updateLocalStorrage(url) {
  async function getUserData() {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('userName', data.name)
      localStorage.setItem('email', data.email)
      localStorage.setItem('avatar', data.avatar)
      localStorage.setItem('venueManager', data.venueManager)
      window.location.href= '/profile'
    } else {
      console.log('There was an error');
    }
  }
  getUserData();
}
export {
  updateLocalStorrage,
  clearStorrage
};
