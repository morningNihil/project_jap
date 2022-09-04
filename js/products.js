const URL = 'https://japceibal.github.io/emercado-api/cats_products/'+ window.localStorage.getItem('catID') + '.json';

const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
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





    // document.addEventListener('DOMContentLoaded', async function() {
    // const addCars = document.querySelector('#carList')
    // const getCars = await getJSONData(URL);

    // getCars.data.products.forEach(car => {
            //addCars.innerHTML += showProducts(car)

                

    //         };
        
    // });
    // })



    // function showProducts(car) {
    
    //     return`
    //     <div class="row shadow p-0 rounded overflow-hidden mb-2">
    //         <div class="col-3 p-0">
    //             <img class="img-fluid" src=${car.image} alt="">
    //         </div>
    //         <div class="col-9 d-flex flex-column justify-content-between">
    //          <div class="productContent">
    //             <h4>${car.name}</h3>
    //             <p>${car.description}</p>
    //         </div>
    //             <div class="productDescription d-flex justify-content-between">
    //                 <p class="productSold">Vendidos: ${car.soldCount}</p>
    //                 <div class="productPrice">
    //                     <span class="currency">${car.currency}</span>
    //                     <span class="price">${car.cost}</span>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     `
    //     }





function showProducts(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let product = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
            <div class="row shadow p-0 rounded overflow-hidden mb-2">
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

        document.getElementById("carList").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showProducts();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data.products
            showProducts()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
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

    function getUsername() {
        let storedUser = localStorage.getItem('username')
        storedUser = JSON.parse(storedUser)
        document.getElementById('username').innerHTML = storedUser

    }

    getUsername();
});



 

