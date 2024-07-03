const loadUserData = () => {
    const user_id = localStorage.getItem('user_id')
    fetch(`https://smart-care.onrender.com/users/${user_id}`)
    .then(res => res.json())
    .then(data => {
        const parent = document.getElementById('user-details')
        parent.innerHTML = 
        `
        <div class="user-card">
          <img src="images/man-1.jpg" alt="User Image" class="user-image" />
          <div class="user-info">
            <h2>${data.first_name} ${data.last_name}</h2>
            <p><strong>Username:</strong> ${data.username}</p>
            <p><strong>Email:</strong> ${data.email}</p>
          </div>
        </div>
        `
    })
}

loadUserData()