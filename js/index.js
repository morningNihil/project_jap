document.addEventListener('DOMContentLoaded', () => {
    const INPUT = document.getElementsByClassName('form-control');
    const PASSWORD = document.querySelector('#floatingPassword');
    const USERNAME= document.getElementById('userName');
// const CHECKBOX = document.querySelector('#rememberMe') I'll check how this works later
    
    const LOGINBTN = document.querySelector('#loginBtn')
        
    LOGINBTN.addEventListener('click', (event) => {
        event.preventDefault();
        if (Array.from(INPUT).some ( input => input.value == '') || PASSWORD.value.length < 6)  {   
            showAlertError(); 
        } else {
            addItem(USERNAME.value);
            window.location.href = "home.html";
            

        }

        })

         function addItem(item) {
             let userStorage = item;
             window.localStorage.setItem('username', JSON.stringify(userStorage));
             
        }
    })

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
    setTimeout(() => { window.location.href = "index.html"; }, 3500);
}



