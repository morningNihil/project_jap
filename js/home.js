document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    }); 


    function getUsername() {
        let storedUser = localStorage.getItem('username')
        storedUser = JSON.parse(storedUser)
        document.getElementById('username').innerHTML = `
        <div class="dropdown">
            <button class="btn btn-dark btn-sm mb-1 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            ${storedUser}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
                <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
                <li><a class="dropdown-item" href="index.html">Cerrar Sesion</a></li>
            </ul>
        </div>`

    }
    
    getUsername();   

});



