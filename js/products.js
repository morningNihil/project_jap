const URL = 'https://japceibal.github.io/emercado-api/cats_products/'+ window.localStorage.getItem('catID') + '.json';

const ORDER_ASC_BY_PRICE = "▼$";
const ORDER_DESC_BY_PRICE = "▲$";
const ORDER_BY_PROD_SOLD = "Vendidos";
let currentProductArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;


function sortProduct(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLD){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function productDescription() {
    let htmlProductDescription = "";
    htmlProductDescription += `<div><h1>Productos</h1>
    <p>Verás aqui todos los productos de la categoria seleccionada. <span class="productos"></span></p></div>
    `

    document.getElementById('productDesc').innerHTML = htmlProductDescription;

};

// add to product descrption produc name from loctal storage if we ever manage to save it

productDescription();

function setProductID(productID) {
    localStorage.setItem("id", productID);
    window.location = "product-info.html"
}

function showProducts(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductArray.length; i++){
        let product = currentProductArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
        <div onclick="setProductID(${product.id})"class="row shadow p-0 rounded overflow-hidden mb-2 list-group-item-action cursor-active">
            <div class="col-3 p-0">
                <img class="img-fluid" src=${product.image} alt="">
            </div>
            <div class="col-9 d-flex flex-column justify-content-between">
             <div class="productContent">
                <h4>${product.name}</h3>
                <p>${product.description}</p>
            </div>
                <div class="productDescription d-flex justify-content-between">
                    <p class="productSold">Vendidos: ${product.soldCount}</p>
                    <div class="productPrice">
                        <span class="currency">${product.currency}</span>
                        <span class="price">${product.cost}</span>
                    </div>
                </div>
            </div>
        </div>
        `
            
        }

        document.getElementById("productList").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProduct(sortCriteria, ProductArray){
    currentSortCriteria = sortCriteria;

    if(ProductArray != undefined){
        currentProductArray = ProductArray;
    }

    currentProductArray = sortProduct(currentSortCriteria, currentProductArray);

    //Muestro las categorías ordenadas
    showProducts();
}

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

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductArray = resultObj.data.products
            showProducts();
            getUsername();
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortBySold").addEventListener("click", function(){
        sortAndShowProduct(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProducts();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProducts();
    });

    
});



 

