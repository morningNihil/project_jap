const INPUT = document.getElementsByClassName('form-control')
const PASSWORD = document.querySelector('#floatingPassword')
// const CHECKBOX = document.querySelector('#rememberMe') I'll check how this works later

    document.addEventListener('DOMContentLoaded', () => {
    const LOGINBTN = document.querySelector('#loginBtn')

        LOGINBTN.addEventListener('click', (event) => {
        event.preventDefault();
        if (Array.from(INPUT).some ( input => input.value == '') || PASSWORD.value.length < 6)  {   
            showAlertError();  
        } else {
            // showAlertSuccess() 
            window.location.href = "home.html";
        }

        })
    })
//     function showAlertSuccess() {
//     document.getElementById("alert-success").classList.add("show");
// } 
// not needed

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

