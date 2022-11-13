const EMAILINPUT = document.getElementById('emailAddress');
const FIRSTNAME = document.getElementById('firstName');
const SECONDNAME = document.getElementById('secondName');
const LASTNAME = document.getElementById('lastName');
const SECLASTNAME = document.getElementById('secLastName');
const PHONENUMBER = document.getElementById('phoneNumber');
const SAVEBTN = document.getElementById('saveProfile');



function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
  
    errorDisplay.innerText = "";
    inputControl.classList.remove("error");
    
}



function setError(element) {
    const inputControl = element.parentElement;
    inputControl.classList.add("error");
    inputControl.classList.remove("is-valid");
}

function validation() {
    if (FIRSTNAME.value === "") {
        FIRSTNAME.classList.add('is-invalid');
        setError(FIRSTNAME, '');
    }  else {
        setSuccess(FIRSTNAME);
        FIRSTNAME.classList.remove('is-invalid');
    }

    if (LASTNAME.value === "") {
        LASTNAME.classList.add('is-invalid');
        setError(LASTNAME, '');
    }  else {
        setSuccess(LASTNAME);
        LASTNAME.classList.remove('is-invalid');
    }
};

function getEmail() {
    let storedUser = localStorage.getItem('username');
    storedUser = JSON.parse(storedUser);
    EMAILINPUT.value = storedUser;
}


function getUsername() {
    let storedUser = localStorage.getItem('username')
    storedUser = JSON.parse(storedUser)
    document.getElementById('username').innerHTML = `
    <div class="dropdown">
        <button class="btn btn-dark btn-sm mb-1 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" >
        ${storedUser}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
            <li><a class="dropdown-item" href="my-profile.html" onclick="saveInfo()">Mi perfil</a></li>
            <li><a class="dropdown-item" href="index.html">Cerrar Sesion</a></li>
        </ul>
    </div>`


    

}

function setInfo() {
    
    localStorage.setItem("firstName", JSON.stringify(FIRSTNAME.value));
    localStorage.setItem("lastName", JSON.stringify(LASTNAME.value));
    localStorage.setItem("secondName", JSON.stringify(SECONDNAME.value));
    localStorage.setItem("secLastName", JSON.stringify(SECLASTNAME.value));
    localStorage.setItem("phoneNumber", JSON.stringify(PHONENUMBER.value));
}

function saveInfo() {
    let storedFirstName = localStorage.getItem('firstName')
    storedFirstName = JSON.parse(storedFirstName)
    FIRSTNAME.value = storedFirstName;

    let storedLastName = localStorage.getItem('lastName')
    storedLastName = JSON.parse(storedLastName)
    LASTNAME.value = storedLastName;

    let storedSecond = localStorage.getItem('secondName')
    storedSecond = JSON.parse(storedSecond)
    SECONDNAME.value = storedSecond ;

    let storedSecLast = localStorage.getItem('secLastName')
    storedSecLast = JSON.parse(storedSecLast)
    SECLASTNAME.value = storedSecLast;

    let storedPhone = localStorage.getItem('phoneNumber')
    storedPhone = JSON.parse(storedPhone)
    PHONENUMBER.value = storedPhone;
    
}



SAVEBTN.addEventListener('click', (e) => {  

    validation();
    
})


window.addEventListener('load', () => { // on load it sets the info from the localstorage if any 
    saveInfo()
    getUsername();
    getEmail();
})