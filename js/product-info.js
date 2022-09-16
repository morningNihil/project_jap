const PRODUCTINFO = "https://japceibal.github.io/emercado-api/products/" + window.localStorage.getItem('id') + '.json';
console.log(PRODUCTINFO);
const CONTAINER = document.getElementById('container')

function getUsername() {
            let storedUser = localStorage.getItem('username')
            storedUser = JSON.parse(storedUser)
            document.getElementById('username').innerHTML = storedUser
    
};

function showProductInfo(productInfo) {
    return ` 
<div class="content">
    <div>
        <h1>${productInfo.name}</h1>
        <hr>
        <p><strong>Descripción</strong>: <br> ${productInfo.description}</p>
        <p><strong>Precio</strong>: <br> ${productInfo.currency} ${productInfo.cost}</p>
        <p><strong>Cantidad Vendidos</strong>: <br> ${productInfo.soldCount}</p>
        <p><strong>Categoría</strong>: <br> ${productInfo.category}</p>
    </div>


    <div id="carouselExampleFade" class="carousel slide carousel-fade widthControl" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="${productInfo.images[0]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="${productInfo.images[1]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="${productInfo.images[2]}" class="d-block w-100" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
        </button>
    </div>
</div>
    `

    
};

 let currentProductArray = [];

 document.addEventListener("DOMContentLoaded", () => {
     getJSONData(PRODUCTINFO).then(function(resultObj){
         if (resultObj.status === "ok"){
             currentProductArray = resultObj.data
             CONTAINER.innerHTML += showProductInfo(resultObj.data)
             getUsername();
            
         }
         
    
        
     });

});




