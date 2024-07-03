const loadDoctorDetails = () => {
    const url = new URL(window.location.href)
    const docId = new URLSearchParams(url.search).get('doctorId')
    fetch(`https://smart-care.onrender.com/doctor/list/${docId}`)
    .then(res => res.json())
    .then(data => displayDoctorDetails(data))
}

const displayDoctorDetails = (doctor) =>{
    const parent = document.getElementById('doctor-details')
    const appointment = document.getElementById('appointment-times')
    fetch(`https://testing-8az5.onrender.com/doctor/availabletime/?doctor_id=${doctor.id}`)
        .then((res) => res.json())
        .then((data) => {
          data.forEach((time) => {
        const option = document.createElement('option')
        option.value = time.id
        option.innerText = time.name
        appointment.appendChild(option)})})
    
    parent.innerHTML = `
        <div class="profile-header">
          <div class="detail-profile-pic">
            <img src="${doctor.image}" alt="Doctor" />
          </div>
          <div class="profile-info">
            <h2>${doctor.user}</h2>
            <h3>${doctor.specialization[0]}</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit amet
              hendrerit pretium nulla sed enim iaculis mi.
            </p>
            <p class="fees">Fees: ${doctor.fee} BDT</p>
            <button type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            class="appointment-btn">Take Appointment</button>
          </div>



        </div>
        <div class="ratings-section">
          <h3>RATINGS FROM PATIENTS</h3>
          <div class="ratings-container">
            <div class="rating-card">
              <div class="rating-pic">
                <img src="images/girl.png" alt="Patient" />
              </div>
              <div class="rating-info">
                <h4>Phoebe Buffay</h4>
                <p>Wow. Amazing service.</p>
                <div class="stars">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
    
    
    `

    
}

const handleAppoinment = () => {
    const url = new URL(window.location.href)
    const docId = new URLSearchParams(url.search).get('doctorId')
    const appointmentType = document.querySelector('input[name="appointment-type"]:checked').value;
    const symptoms = document.getElementById('symptoms').value;
    const appointmentTime = document.getElementById('appointment-times').value;
    console.log(appointmentTime,symptoms,appointmentType);
    const info = {
        appointment_type : appointmentType,
        appointment_status: "Pending",
        symptom: symptoms,
        cancel: false,
        patient: 1,
        doctor: docId,
        time: appointmentTime
    }
    // console.log(info);
    fetch("https://testing-8az5.onrender.com/appointment/", {
        method :"POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(info)
        
    })
    .then(res => res.json())
    .then(data => {
        if(data){
            const parent = document.getElementById('success');
            parent.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Success!</strong> Your appointment has been successfully taken.
        </div>
      `;

      $('#exampleModal').modal('hide');
        }
    })

}

loadDoctorDetails()