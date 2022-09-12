// For cart
let cartListener = document.querySelector('#cartfeed')
let cartSubtotal = document.querySelector('.cart_summary_subtotal_price')
let cartGstTotal = document.querySelector('.cart_summary_gst_total')
let cartGrandTotal = document.querySelector('.cart_summary_grand_total')

let cartQtyInput = document.querySelector('.cart-items-qty-input')

// For product page
let productListener = document.querySelector('#product')
let productID = document.querySelector('.product')
let productQtyInput = document.querySelector('.product-items-qty-input')
let priceValue = document.querySelector('.base_price')
let productTotal = document.querySelector('.total_price')
// Product Data
let productIMG = document.querySelector('.product_image_featured')
let productTitle = document.querySelector('.product_item_title')

// MenuCart Counter
let menuCounter = document.querySelector('.menucart_counter')
let menuCartCounter = document.querySelector('.menucart')
// Create our number formatter.
const toCurrencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

class Cart {
    constructor() {
        var items


    }

    onLoad() {
        const cart = sessionStorage.getItem('cart')
        if (cart) {
            shoppingCart.addCart(cartItems.fetchData())
        }
    }

    menuCart(counterData) {
        // Display
        if (counterData >= 1) {
            // <span class="menucart_counter">1</span>
            if (menuCounter) {
                menuCounter.innerHTML = '<span class="menucart_value">' + counterData + '</span>'
            
            }
            else {
                menuCounter.innerHTML = '<span class="menucart_value">' + counterData + '</span>'
            
            }
        }
        else {
            menuCounter.innerHTML = ''
        }
    }

    // Adds items to the cart
    addCart(cartData) {
        var counter = 0 //always reset value        
        var data = []
        var subTotal = 0
        let gsTax = '0.02' //2% GST

        // VANILLA AJAX
        const cartcontent1 = '<div class="cart_item" id="' //ID
        const cartcontent2 = '"><div class="cart_row"><div class="cart_column cart_column_image"><img class="cart_image_featured" src="' //Featured Image
        const cartcontent3 = '"></div><div class="cart_column cart_column_info"><span class="cart_item_title">' //Product Title
        const cartcontent4 = '</span> </div> <div class="cart_column cart_column_qty"> <span class="cart_column_qty_label">Months to Render</span> <div class="cart_column_qty_selector"> <span class="qty_selector_btn minus"> <i class="fa-solid fa-minus" data-action="subtractvalue"></i> </span> <input type="number" class="QuantitySelector__CurrentQuantity cart-items-qty-input" min="1" max="30" value="' //Quantity
        const cartcontent5 = '" /> <span class="qty_selector_btn plus"> <i class="fa-solid fa-plus" data-action="addvalue"></i> </span> </div> </div> </div> <div class="clear_items"> <i class="fa-solid fa-trash-can" data-action="remove"></i> <label class="clear_items_label" data-action="remove"> Remove </label> </div> <div class="cart_item_cost"> <div class="cart_item_base_cost"> <span class="cost_label">Monthly Rate</span> <span class="cost_price">' //Base Cost
        const cartcontent6 = '</span> </div> <div class="cart_item_total_cost"> <span class="cost_label">Total Rate</span> <span class="cost_price">'// Total Cost
        const endcartcontent = '</span> </div> </div> </div>'

        if (cartListener) {
            cartListener.innerHTML = ''
        }


        // loop on each items in the Object
        cartData.forEach(function (obj) {
            let me = {
                "id": obj.id,
                "featured_image": obj.featured_image,
                "title": obj.title,
                "price": obj.price,
                "quantity": obj.quantity
            }

            data.push(me)
            if (cartListener) {
                var totalCost = obj.quantity * obj.price
                cartListener.innerHTML += cartcontent1 + obj.id + cartcontent2 + obj.featured_image + cartcontent3 + obj.title + cartcontent4 + obj.quantity + cartcontent5 + toCurrencyFormat.format(obj.price) + cartcontent6 + toCurrencyFormat.format(totalCost) + endcartcontent
                subTotal = Number(subTotal) + Number(totalCost)
            }

            if (productListener) {
                productTotal.innerHTML = priceValue.innerHTML

                if (obj.id == productID.id) {
                    var totalCost = obj.quantity * obj.price
                    productQtyInput.value = obj.quantity
                    productTotal.innerHTML = toCurrencyFormat.format(totalCost)
                }
            }
            counter++
        })

        if (cartListener) {
            var gsTaxTotal = Number(subTotal) * Number(gsTax)
            var grandTotal = Number(gsTaxTotal) + Number(subTotal)

            cartSubtotal.innerHTML = toCurrencyFormat.format(subTotal)
            cartGstTotal.innerHTML = toCurrencyFormat.format(gsTaxTotal)
            cartGrandTotal.innerHTML = toCurrencyFormat.format(grandTotal)

        }
        this.menuCart(counter)//push counter value to menu cart
        cartItems.pushData(data)
        this.subscribeCart() // Callback Notification
    }

    // Increase Product Quantity in Cart
    cartQtyInc(parent) {
        let item = cartItems.fetchData()
        item.forEach(function (obj) {
            if (obj.id == parent) {
                update()
            }
        })

        function update() {
            var data = cartItems.fetchData()
            data.forEach(function (obj) {
                var qty = Number(obj.quantity) + 1
                if (obj.id == parent) {
                    obj.quantity = qty
                }
            })
            cartItems.updateData(data)
        }
    }
    // Decrease Product Quantity in Cart
    cartQtyDec(parent) {
        let item = cartItems.fetchData()
        item.forEach(function (obj) {
            if (obj.id == parent) {
                update()
            }
        })

        function update() {
            var data = cartItems.fetchData()
            data.forEach(function (obj) {
                var qty = Number(obj.quantity) - 1
                if (obj.id == parent) {
                    obj.quantity = qty
                }
            })
            cartItems.updateData(data)
        }
    }

    cartInputUpdate(parent, value) {
        let item = cartItems.fetchData()
        item.forEach(function (obj) {
            if (obj.id == parent) {
                update()
            }
        })


        function update() {
            var data = cartItems.fetchData()
            data.forEach(function (obj) {
                if (obj.id == parent) {
                    obj.quantity = value
                }
            })
            cartItems.updateData(data)
        }
    }

    removeCartProduct(parent) {
        let item = cartItems.fetchData()
        item.forEach(function (obj) {
            if (obj.id == parent) {
                update()
            }
        })


        function update() {
            const removeById = (item, id) => {
                const requiredIndex = item.findIndex(el => {
                    return el.id === String(id);
                });
                if (requiredIndex === -1) {
                    return false;
                };
                return !!item.splice(requiredIndex, 1);
            };
            removeById(item, parent);
            cartItems.updateData(item)
        }
    }


    // PRODUCT METHODS

    // Product Page Increase Quantity
    productQtyInc() {
        let priceData = priceValue.innerHTML
        var parsedValue = parseFloat(priceData.replace(/\$|,/g, ''))

        let qty = productQtyInput.value
        productQtyInput.value = Number(qty) + Number(1)
        productTotal.innerHTML = toCurrencyFormat.format(Number(productQtyInput.value) * Number(parsedValue))
    }

    // Product Page Decrease Quantity
    productQtyDec() {
        let priceData = priceValue.innerHTML
        var parsedValue = parseFloat(priceData.replace(/\$|,/g, ''))
        if (productQtyInput.value > 1) {
            productQtyInput.value = Number(productQtyInput.value) - Number(1)
            productTotal.innerHTML = toCurrencyFormat.format(Number(productQtyInput.value) * Number(parsedValue))
        }
    }

    // PUSH PRODUCT PAGE UPDATE TO THE CART
    pushProductUpdate() {
        let item = cartItems.fetchData()
        var counter = 0
        var data = []
        var idChecker = []
        var valueQTY = productQtyInput.value
        var parsedValue = parseFloat(priceValue.innerHTML.replace(/\$|,/g, ''))
        var prodID = productID.id

        let me = {
            "id": prodID,
            "featured_image": productIMG.src,
            "title": productTitle.innerHTML,
            "price": parsedValue,
            "quantity": valueQTY
        }

        if(item){
            item.forEach(function (obj) {
                if (obj.id == prodID) {
                    obj.quantity = valueQTY
                }
                idChecker.push(obj.id)
                counter++
            })
        }
        if (!idChecker.includes(prodID)) {
            item.push(me)
            counter++
        }
        cartItems.pushData(item)
        this.menuCart(counter)
    }

    // Clears items in the cart
    clearCart() {
        cartItems.clearData()
    }

    // Notify Dev for cart changes
    subscribeCart() {
        console.log('Your cart has been updated')
    }
}