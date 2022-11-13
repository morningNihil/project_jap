const CARTINFO = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const CARTCONTAINER = document.getElementById('cartInfo');
const NAMECONTAINER = document.getElementById('productName');
const UNITVALUE = document.getElementById('valueItem');
const SUBTOTAL = document.getElementById('totalValue');
const INPUTVALUE = document.getElementById('unitCount');
const IMG = document.getElementById('imgSrc');


const SUBTOTALPREV = document.getElementById('subtotalPrev');
const TOTALPREV = document.getElementById('totalPrev');
const SHIPCOST = document.getElementById('shipCost');

const PREMIUMSHIP = document.getElementById('premiumShip');
const EXPRESSHIP = document.getElementById('expressShip');
const STANDARSHIP = document.getElementById('standardShip');

const CREDITCARD = document.getElementById('creditCard');
const CCNUMBER = document.getElementById('creditCardNumb');
const CCSECURITY = document.getElementById('securityCode');
const CCEXPIRE = document.getElementById('expireDate');
const BANKACC = document.getElementById('bankAccount');
const BANKACCNUMBER = document.getElementById('bankAccountNumb');

const SUBMITBTN = document.getElementById('submitCart');

const STREET = document.getElementById('calle');
const STNUMBER = document.getElementById('numeroCalle');
const CORNERSTREET = document.getElementById('esquina');
const ALERT = document.getElementById('alertBox');
const MODAL = document.getElementById('modalSelection');
const SELECTION = document.getElementById('selection');

let currentCartArray = "";



document.addEventListener("DOMContentLoaded", () => {
    getJSONData(CARTINFO).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCartArray = resultObj.data
            showCartInfo(resultObj.data.articles)
            addUp();
            getUsername();
            
        }

        console.log(getJSONData(CARTINFO));
        
   });

    

});

function showCartInfo(cartInfo) {
    IMG.innerHTML = `<img src="${cartInfo[0].image}" class="widthControl-5">`
    NAMECONTAINER.innerText = cartInfo[0].name;
    UNITVALUE.innerHTML = '$' + cartInfo[0].unitCost;
    INPUTVALUE.value = cartInfo[0].count;
    SUBTOTAL.value = cartInfo[0].unitCost;
    
    console.log(cartInfo[0].unitCost);
    console.log(cartInfo[0].unitCost * INPUTVALUE.value);
    
}


const premiumSelector = PREMIUMSHIP.onchange = function() {
    const PREMIUM = SUBTOTAL.value * 0.15;
    SHIPCOST.innerHTML = `USD ${PREMIUM}`;
    TOTALPREV.innerHTML = `USD ${PREMIUM + Number(SUBTOTAL.value)}`;

    if(!PREMIUMSHIP.checked && !EXPRESSHIP.checked && !STANDARSHIP.checked) {
        SHIPCOST.innerHTML = 0;
        TOTALPREV.innerHTML = `USD ${SUBTOTAL.value}`
        EXPRESSHIP.removeAttribute('disabled');
        STANDARSHIP.removeAttribute('disabled');
        PREMIUMSHIP.removeAttribute('disabled');
    } else if (PREMIUMSHIP.checked) {
        PREMIUMSHIP.onclick = EXPRESSHIP.disabled = true; 
        PREMIUMSHIP.onclick = STANDARSHIP.disabled = true;
    } 
}

const expressSelector = EXPRESSHIP.onchange = function() {
    const EXPRESS = SUBTOTAL.value * 0.07;
    SHIPCOST.innerHTML = `USD ${EXPRESS}`;
    TOTALPREV.innerHTML = `USD ${EXPRESS + Number(SUBTOTAL.value)}`;

    if(!PREMIUMSHIP.checked && !EXPRESSHIP.checked && !STANDARSHIP.checked) {
        SHIPCOST.innerHTML = 0;
        TOTALPREV.innerHTML = `USD ${SUBTOTAL.value}`
        EXPRESSHIP.removeAttribute('disabled');
        STANDARSHIP.removeAttribute('disabled');
        PREMIUMSHIP.removeAttribute('disabled');
    } else if (EXPRESSHIP.checked) {
        EXPRESSHIP.onclick = PREMIUMSHIP.disabled = true; 
        EXPRESSHIP.onclick = STANDARSHIP.disabled = true;
    }
}

const standardSelector = STANDARSHIP.onchange = function() {
    const STANDARD = SUBTOTAL.value * 0.05;
    SHIPCOST.innerHTML = `USD ${STANDARD}`;
    TOTALPREV.innerHTML = `USD ${STANDARD + Number(SUBTOTAL.value)}`;

    if(!PREMIUMSHIP.checked && !EXPRESSHIP.checked && !STANDARSHIP.checked) {
        SHIPCOST.innerHTML = 0;
        TOTALPREV.innerHTML = `USD ${SUBTOTAL.value}`
        EXPRESSHIP.removeAttribute('disabled');
        STANDARSHIP.removeAttribute('disabled');
        PREMIUMSHIP.removeAttribute('disabled');
    } else if (STANDARSHIP.checked) {
        STANDARSHIP.onclick = PREMIUMSHIP.disabled = true; 
        STANDARSHIP.onclick = EXPRESSHIP.disabled = true;
    }
}
const addUp = () => {
    let num1 = INPUTVALUE.value;
    let num2 = 15200;
    let addValue = num1 * num2;
    SUBTOTAL.value = addValue;
    SUBTOTALPREV.innerHTML = `USD ${addValue}`;
    TOTALPREV.innerHTML = `USD ${addValue}`;

    if (PREMIUMSHIP.checked) {
    const PREMIUM = SUBTOTAL.value * 0.15;
    SHIPCOST.innerHTML = `USD ${PREMIUM}`;
    TOTALPREV.innerHTML = `USD ${Math.floor(PREMIUM + Number(SUBTOTAL.value))}`;
    } else if (EXPRESSHIP.checked) {
    const EXPRESS = SUBTOTAL.value * 0.07;
    SHIPCOST.innerHTML = `USD ${EXPRESS}`;
    TOTALPREV.innerHTML = `USD ${Math.floor(EXPRESS + Number(SUBTOTAL.value))}`;
    } else if (STANDARSHIP.checked) {
        const STANDARD = SUBTOTAL.value * 0.07;
        SHIPCOST.innerHTML = `USD ${STANDARD}`;
        TOTALPREV.innerHTML = `USD ${Math.floor(STANDARD + Number(SUBTOTAL.value))}`;
    };
    

    
}
    
    
function removeSub() {
    SUBTOTAL.value = "15200";
    INPUTVALUE.value = "1";
    SUBTOTALPREV.innerHTML = `USD ${SUBTOTAL.value}`;
    TOTALPREV.innerHTML = `USD ${SUBTOTAL.value}`;
    if (PREMIUMSHIP.checked) {
        const PREMIUM = SUBTOTAL.value * 0.15;
        SHIPCOST.innerHTML = `USD ${PREMIUM}`;
        TOTALPREV.innerHTML = `USD ${Math.floor(PREMIUM + Number(SUBTOTAL.value))}`;
        } else if (EXPRESSHIP.checked) {
        const EXPRESS = SUBTOTAL.value * 0.07;
        SHIPCOST.innerHTML = `USD ${EXPRESS}`;
        TOTALPREV.innerHTML = `USD ${Math.floor(EXPRESS + Number(SUBTOTAL.value))}`;
        } else if (STANDARSHIP.checked) {
            const STANDARD = SUBTOTAL.value * 0.07;
            SHIPCOST.innerHTML = `USD ${STANDARD}`;
            TOTALPREV.innerHTML = `USD ${Math.floor(STANDARD + Number(SUBTOTAL.value))}`;
        };
    
}

CREDITCARD.onchange = function() {
    if (CREDITCARD.checked) {
    BANKACCNUMBER.disabled = true;
    CCEXPIRE.removeAttribute('disabled');
    CCNUMBER.removeAttribute('disabled');
    CCSECURITY.removeAttribute('disabled');
    CCEXPIRE.classList.remove('is-invalid');
    CCNUMBER.classList.remove('is-invalid');
    CCSECURITY.classList.remove('is-invalid');
    CREDITCARD.classList.remove('is-invalid');
    BANKACC.classList.remove('is-invalid')
    BANKACCNUMBER.classList.remove('is-invalid');
    SELECTION.innerText = 'Compra con crédito';
    setSuccess(MODAL);
    } 
}
console.log();
BANKACC.onchange = function() {
    if (BANKACC.checked) {
    BANKACCNUMBER.removeAttribute('disabled');
    CCEXPIRE.disabled = true;
    CCNUMBER.disabled = true;
    CCSECURITY.disabled = true;
    CCEXPIRE.classList.remove('is-invalid');
    CCNUMBER.classList.remove('is-invalid');
    CCSECURITY.classList.remove('is-invalid');
    CREDITCARD.classList.remove('is-invalid');
    BANKACC.classList.remove('is-invalid')
    BANKACCNUMBER.classList.remove('is-invalid');
    SELECTION.innerText = 'Transferencia Bancaria';
    setSuccess(MODAL);
    }
}

function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("is-valid");
  }


    function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
  
    errorDisplay.innerText = "";
    inputControl.classList.remove("error");
    inputControl.classList.add("success");
  }



function validation() {
    if (STREET.value === "") {
        STREET.classList.add('is-invalid');
        setError(STREET, 'Ingresa una calle');
    }  else {
        setSuccess(STREET);
        STREET.classList.remove('is-invalid');
        STREET.classList.add('is-valid');
    }

    if (STNUMBER.value === "") {
        STNUMBER.classList.add('is-invalid');
        setError(STNUMBER, 'Ingresa un número');
    } else {
        setSuccess(STNUMBER);
        STNUMBER.classList.remove('is-invalid');
        STNUMBER.classList.add('is-valid');
    }

    if (CORNERSTREET.value === "") {
        CORNERSTREET.classList.add('is-invalid');
        setError(CORNERSTREET, 'Ingresa una esquina');
    } else {
        setSuccess(CORNERSTREET);
        CORNERSTREET.classList.remove('is-invalid');
        CORNERSTREET.classList.add('is-valid');
    }

    if (!PREMIUMSHIP.checked && !EXPRESSHIP.checked && !STANDARSHIP.checked) {
        PREMIUMSHIP.classList.add('is-invalid');
        EXPRESSHIP.classList.add('is-invalid');
        STANDARSHIP.classList.add('is-invalid');
    } else {
        PREMIUMSHIP.classList.remove('is-invalid');
        EXPRESSHIP.classList.remove('is-invalid');
        STANDARSHIP.classList.remove('is-invalid');
    }

    if (CCNUMBER.value === "") {
        CCNUMBER.classList.add('is-invalid');
    } else {
        CCNUMBER.classList.remove('is-invalid');
        CCNUMBER.classList.add('is-valid');
    }

    if (CCEXPIRE.value === "") {
        CCEXPIRE.classList.add('is-invalid');
    } else {
        CCEXPIRE.classList.remove('is-invalid');
        CCEXPIRE.classList.add('is-valid');
    }

    if (CCSECURITY.value === "") {
        CCSECURITY.classList.add('is-invalid');
    } else {
        CCSECURITY.classList.remove('is-invalid');
        CCSECURITY.classList.add('is-valid');
    }

    if (!CREDITCARD.checked) {
        CREDITCARD.classList.add('is-invalid');
    } else {
        CREDITCARD.classList.remove('is-invalid');
    }

    if (!BANKACC.checked) {
        BANKACC.classList.add('is-invalid')
    } else {
        BANKACC.classList.remove('is-invalid');
    }

    if (BANKACCNUMBER.value === "") {
        BANKACCNUMBER.classList.add('is-invalid')
    }else {
        BANKACCNUMBER.classList.remove('is-invalid');
    }

    if (!BANKACC.checked && !CREDITCARD.checked) {
        setError(MODAL, 'Seleccione un metodo de pago ⚠')
    } 
       else {
        setSuccess(MODAL);
    }

    

}
    
    SUBMITBTN.addEventListener('click', (e) => {  

        validation();

        if (!CORNERSTREET.value ===  "" && !STNUMBER.value === "" && !STREET.value === "" && PREMIUMSHIP.checked || EXPRESSHIP.checked || STANDARSHIP.checked && !CCNUMBER.value === "" && !CCEXPIRE.value ==="" && !CCSECURITY.value === "" && CREDITCARD.checked || BANKACC.checked && !BANKACCNUMBER.value === "") {
            ALERT.innerHTML = `<div class="alert alert-success">
            <strong>Felicidades!</strong> Compra realizada con éxito!
          </div>`;
        }
})




 

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

