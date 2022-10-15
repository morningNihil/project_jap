const PRODUCTINFO = "https://japceibal.github.io/emercado-api/products/" + window.localStorage.getItem('id') + '.json';
const PRODUCT_COMMENTS = "https://japceibal.github.io/emercado-api/products_comments/" + window.localStorage.getItem('id') + '.json';
const CONTAINER = document.getElementById('container')
const COMMENTSCONT = document.getElementById('commentscont')
const ADDITIONALCONTAINER = document.getElementById('relatedProd')
let currentProductInfoArray = [];
let currentCommentArray = [];
let currentAdditionalProductArray = [];

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

document.addEventListener("DOMContentLoaded", () => {
     getJSONData(PRODUCTINFO).then(function(resultObj){
         if (resultObj.status === "ok"){
             currentProductInfoArray = resultObj.data
             CONTAINER.innerHTML += showProductInfo(resultObj.data)
             getUsername();
            
         }
         
    
        
     });

});


function showComments(commentInfo) {
    let commentsData = ""
        for (let comment of commentInfo){
        commentsData += `
        
        <div class="collapse" id="collapseExample">
            <div class="card card-body">
            <p>${starSystemv2(comment.score)}</p>
            <p><strong>${comment.user}</strong> el ${comment.dateTime}</p>

            ${comment.description}
            
            </div>
        </div>
        
        `
        
        
    } 

    return commentsData
}

document.addEventListener("DOMContentLoaded", () => {
    getJSONData(PRODUCT_COMMENTS).then(function(resultObjComm){
        if (resultObjComm.status === "ok"){
            currentCommentArray = resultObjComm.data
            COMMENTSCONT.innerHTML += showComments(resultObjComm.data)
            
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    getJSONData(PRODUCTINFO).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentAdditionalProductArray = resultObj.data
            ADDITIONALCONTAINER.innerHTML += showAdditional(resultObj.data.relatedProducts)
            
           
        }
        
   
       
    });

});

function showAdditional(addInfo) {
    let addData = ""
        for (let additional of addInfo) {
            addData +=  `
            
            <div onclick="setProductID(${additional.id})">
                <img src="${additional.image}" class="widthControl-4">
                <p>${additional.name}</p>
                <br>
            </div>
            

            `
        }

        return addData
}

function setProductID(productID) {
    localStorage.setItem("id", productID);
    window.location = "product-info.html"
}


 function starSystemv2(score) { 

     const FULLSTAR = `<span class="fa fa-star checked"></span>`
     const REGULARSTAR = `<span class="fa fa-star"></span>`

     let starScore = "";

     if (score === 1) {
         starScore = FULLSTAR + REGULARSTAR + REGULARSTAR + REGULARSTAR + REGULARSTAR;
            
     } else if (score === 2) {
         starScore = FULLSTAR + FULLSTAR + REGULARSTAR + REGULARSTAR + REGULARSTAR + REGULARSTAR ;
     }  else if (score === 3) {
         starScore = FULLSTAR + FULLSTAR + FULLSTAR + REGULARSTAR + REGULARSTAR;
     }  else if (score === 4) {
         starScore = FULLSTAR + FULLSTAR + FULLSTAR + FULLSTAR + REGULARSTAR;
     }  else if (score === 5) {
         starScore = FULLSTAR + FULLSTAR + FULLSTAR + FULLSTAR + FULLSTAR;
     } 

     
     return starScore;


 }










