let file = document.querySelector('#fileJSON')
if (document.querySelector('#loadJSON')) {
    document.querySelector('#loadJSON').addEventListener('click', uploadJSON)
}

// Create our number formatter.
const toCurrencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

let shoppingCart = new Cart()
let cartItems = new dataHandler()

window.onload = shoppingCart.onLoad()

function uploadJSON(event) {
    // event.preventDefault()

    // If there's no file, do nothing
    if (!file.value.length) return

    // Create a new FileReader() object
    let reader = new FileReader()

    // Setup the callback event to run when the file is read
    reader.onload = readFile;

    // Read the file
    reader.readAsText(file.files[0])


}
function readFile(event) {
    items = JSON.parse(event.target.result)
    shoppingCart.addCart(items)
}



// Vanilla AJAX
// function removeCartItems(){
//     document.getElementById('cartfeed').remove() //Deleting AJAX
// }


// Event Delegation
let cartListener = document.querySelector('#cartfeed')
if (cartListener) {

    cartListener.addEventListener('click', event => {
        let trgt = event.target
        let act = trgt.dataset.action
        let getId = trgt.closest('.cart_item').id
        if (act == 'addvalue') {
            shoppingCart.cartQtyInc(getId)
        }
        else if (act == 'subtractvalue') {
            shoppingCart.cartQtyDec(getId)
        }
        else if (act == 'remove') {
            shoppingCart.removeProduct(getId)
        }
        else {

        }
    })

    cartListener.addEventListener('change', event => {
        let trgt = event.target
        let value = trgt.value
        let getId = trgt.closest('.cart_item').id
        shoppingCart.inputUpdate(getId, value)
    })
}



let productListener = document.querySelector('#product')
if (productListener) {

    productListener.addEventListener('click', event => {
        let trgt = event.target
        let act = trgt.dataset.action
        let getId = trgt.closest('.product')
        if(getId){
            getId = trgt.closest('.product')
        }
        if (act == 'addvalue') {
            shoppingCart.productQtyInc(getId)
        }
        else if (act == 'subtractvalue') {
            shoppingCart.productQtyDec(getId)
        }
    })

    productListener.addEventListener('change', event => {
        let trgt = event.target
        let value = trgt.value
        let getId = trgt.closest('.product').id
        shoppingCart.inputUpdate(getId, value)
    })

    document.querySelector('#addtocart').addEventListener('click', addtocart)
    function addtocart(){
        shoppingCart.pushProductUpdate()
    }
}

