const handleLogin = (event) =>{
    event.preventDefault()
    const parent = document.getElementById('success');
    const username = document.getElementById('login-username').value
    const password = document.getElementById('login-password').value 
    const info = {username,password}
    fetch("https://smart-care.onrender.com/patient/login/",{
        method:"POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(info)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.token && data.user_id){
            localStorage.setItem('token',data.token)
            localStorage.setItem('user_id',data.user_id)
            parent.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                    Login Successfull. You can go to <a href='userDetails.html?userId=${data.user_id}'> profile </a>
                    </div>
                `
        }
        else{
            parent.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    ${data.error} </a>
                    </div>
                `
        }
    })
}

const handleRegistration = (event) =>{
    event.preventDefault()
    const parent = document.getElementById('success');
    const username = document.getElementById('reg-username').value
    const first_name = document.getElementById('reg-firstname').value
    const last_name = document.getElementById('reg-lastname').value
    const email = document.getElementById('reg-email').value
    const password = document.getElementById('reg-password').value 
    const confirm_password = document.getElementById('reg-confirm-password').value 
    const info = {username,first_name,last_name,email,password,confirm_password}
    if(password === confirm_password){
        if((/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).test(password)){
            fetch("https://smart-care.onrender.com/patient/register/",{
                method:"POST",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(info)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.username){
                    parent.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    ${data.username[0]}
                    </div>
                `
                }
                else if (data.error){
                    parent.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    ${data.error}
                    </div>
                `
                }
                
                else{

                    parent.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                    ${data}
                    </div>
                `
                }
            })
        }
        else{
            
            parent.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
           Your Password must contain minimum eight characters, at least one letter, one number and one special character.
        </div>
      `
        }

    }
    else{
        const parent = document.getElementById('success');
            parent.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
           Your Password and Confirm password doesnt match.
        </div>
      `
    }
    
    
}

const handleLogout =()=>{
    localStorage.removeItem('user_id')
    localStorage.removeItem('token')
    window.location.href = 'index.html'
}