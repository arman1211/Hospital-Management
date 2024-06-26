const loadServices = () =>{
    fetch(`https://testing-8az5.onrender.com/services/`)
    .then(res => res.json())
    .then(data => displayServices(data))
}
const displayServices = (services) => {
    const parent = document.getElementById('service-slider')
    services.forEach(service => {
        const li = document.createElement('li')
        li.innerHTML=(
            `
            <div class="card card-custom">
              <img src="${service.image}" alt="...">
              <div class="card-custom-body">
                <strong>${service.name}</strong>
                <p>${service.description.slice(0, 30)}...</p>
                <a class="btn btn-link" href="#">Learn more →</a>
              </div>
            </div>
            `
        )
        parent.append(li);
    })
}

const loadDoctors = (search) => {
  document.getElementById('display-doctor').innerHTML = ""
  document.getElementById('spinner').style.display = "block"
  search? console.log(search):console.log('nothing');
  const url = `https://smart-care.onrender.com/doctor/list/?search=${search ? search : ''}`
  console.log(url);
  fetch(url)
  .then(res => res.json())
  .then(data=>{
    if (data) {
      console.log(data);
      document.getElementById('spinner').style.display = "none"
      
      displayDoctor(data)
      
    }

    }
  
  )
}

const displayDoctor = (data) => {
  doctors = data.results
  const parent = document.getElementById('display-doctor')
  doctors.length > 0 ? doctors.forEach(doctor => {
    const div = document.createElement('div')
    div.classList.add('doc-card')
    div.innerHTML = `
    <a href="docDetails.html?doctorId=${doctor.id}" style="text-decoration: none;">
      <div class="doc-card-image">
        <img src="${doctor.image}" alt="Doctor" />
      </div>
      <div class="doc-card-content">
        <h2>${doctor.user}</h2>
        <h3>${doctor.designation[0]}</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit amet
          hendrerit gravida nulla sed enim iaculis mi.
        </p>
      </div>
    </a>
    `
    parent.appendChild(div)
  }) : parent.innerHTML = '<img src="images/nodata.png" alt="" />';
}

const filterBySpecialization = () => {
  fetch('https://smart-care.onrender.com/doctor/specialization/')
  .then(res => res.json())
  .then(data => {
    results = data;
    const parent = document.getElementById('filter-specialization')
    results.forEach(sp => {
      const li = document.createElement('li')
      li.classList.add('dropdown-item')
      li.innerText= `${sp.name}`
      li.addEventListener('click',()=>{
        loadDoctors(sp.name)
      })
      parent.appendChild(li)
    })
  })
}
filterBySpecialization()
const filterByDesignation = () => {
  fetch('https://smart-care.onrender.com/doctor/designation/')
  .then(res => res.json())
  .then(data => {
    results = data;
    const parent = document.getElementById('filter-designation')
    results.forEach(sp => {
      const li = document.createElement('li')
      li.classList.add('dropdown-item')
      li.innerText= `${sp.name}`
      li.addEventListener('click',()=>{
        loadDoctors(sp.name)
      })
      parent.appendChild(li)
    })
  })
}

const handleSearchDoctor = () => {
  const search = document.getElementById('input-search').value
  loadDoctors(search);
}


const loadReviews = () => {
  fetch("https://smart-care.onrender.com/doctor/reviews/")
  .then(res => res.json())
  .then(data => {
    const parent = document.getElementById("reviews")
    data.forEach(review => {
      const div = document.createElement('div')
      div.classList.add('review-card')
      div.innerHTML = `
          <div class="review-card-header">
              <div class="profile-pic">
                <img src="images/girl.png" alt="User Photo" />
              </div>
              <div class="user-info">
                <h2>Jim Carter</h2>
                <div class="rating">${review.rating}</div>
              </div>
            </div>
            <div class="card-body">
              <p class="title">“An amazing service”</p>
              <p class="description">
                ${review.body.slice(0,90)}
              </p>
            </div>
          </div>
      `
      parent.appendChild(div)
    })
  })
}

filterByDesignation()

loadReviews()
loadDoctors()

loadServices()