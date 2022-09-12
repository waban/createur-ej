// variables
let shoppingCart = new Cart()
let cartItems = new dataHandler()

// Load data
window.onload = shoppingCart.onLoad()

// File uploads
let file = document.querySelector('#fileJSON')
let fileUpload = document.querySelector('#loadJSON')
if (file) {
    fileUpload.addEventListener('click', uploadJSON)
}
function uploadJSON(event) {
    console.log('Present')
    event.preventDefault()

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

// End of File Upload feature

// Event Delegation Variables
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
            shoppingCart.removeCartProduct(getId)
        }
        else {

        }
    })

    cartListener.addEventListener('change', event => {
        let trgt = event.target
        let value = trgt.value
        let getId = trgt.closest('.cart_item').id
        shoppingCart.cartInputUpdate(getId, value)
    })
}

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

    // productListener.addEventListener('change', event => {
    //     let trgt = event.target
    //     let value = trgt.value
    //     let getId = trgt.closest('.product').id
    //     shoppingCart.inputUpdate(getId, value)
    // })

    document.querySelector('#addtocart').addEventListener('click', addtocart)
    function addtocart(){
        shoppingCart.pushProductUpdate()
    }
}

