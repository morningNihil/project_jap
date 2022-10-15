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