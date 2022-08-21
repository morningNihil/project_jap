const URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json'


function showCars(cars) {
    
    return`
    <div class="row shadow p-0 rounded overflow-hidden mb-2">
        <div class="col-3 p-0">
            <img class="img-fluid" src=${cars.image} alt="">
        </div>
        <div class="col-9 d-flex flex-column justify-content-between">
         <div class="productContent">
            <h4>${cars.name}</h3>
            <p>${cars.description}</p>
        </div>
            <div class="productDescription d-flex justify-content-between">
                <p class="productSold">Vendidos: ${cars.soldCount}</p>
                <div class="productPrice">
                    <span class="currency">${cars.currency}</span>
                    <span class="price">${cars.cost}</span>
                </div>
            </div>
        </div>
    </div>
    `
    };
    

document.addEventListener('DOMContentLoaded', async function() {
    const addCars = document.querySelector('#carList')

    const getCars = await getJSONData(URL);

    getCars.data.products.forEach(car => {
        addCars.innerHTML += showCars(car)
        
    });
    
    
})

