class Cart{
    constructor(){
        var items 
    }

    onLoad(){
        const cart = sessionStorage.getItem('cart')
        if(!cart){
        }
        else{
            shoppingCart.addCart(cartItems.fetchData())
        }    
    }

    menuCart(){
        // Display
        if(counter > 1){       
            let menuCounter = document.querySelector('.menucart_counter')
            
            // <span class="menucart_counter">1</span>+
            if(menuCounter){
                menuCounter.innerHTML = counter         
            }
            else{
            document.querySelector('.menucart').innerHTML += '<span class="menucart_counter">' + counter + '</span>'
            }
        
         }
    }
    
    // Adds items to the cart
    addCart(product){
        var data = []
        var subTotal = 0
        let cartfeed = document.querySelector('#cartfeed')
        let productfeed = document.querySelector('#product')
        let gsTax = '0.02' //2% GST
              
        // VANILLA AJAX
        const cartcontent1 = '<div class="cart_item" id="' //ID
        const cartcontent2 = '"><div class="cart_row"><div class="cart_column cart_column_image"><img class="cart_image_featured" src="' //Featured Image
        const cartcontent3 = '"></div><div class="cart_column cart_column_info"><span class="cart_item_title">' //Product Title
        const cartcontent4 = '</span> </div> <div class="cart_column cart_column_qty"> <span class="cart_column_qty_label">Months to Render</span> <div class="cart_column_qty_selector"> <span class="qty_selector_btn minus"> <i class="fa-solid fa-minus" data-action="subtractvalue"></i> </span> <input type="number" class="QuantitySelector__CurrentQuantity cart-items-qty-input" min="1" max="30" value="' //Quantity
        const cartcontent5 = '" /> <span class="qty_selector_btn plus"> <i class="fa-solid fa-plus" data-action="addvalue"></i> </span> </div> </div> </div> <div class="clear_items"> <i class="fa-solid fa-trash-can" data-action="remove"></i> <label class="clear_items_label" data-action="remove"> Remove </label> </div> <div class="cart_item_cost"> <div class="cart_item_base_cost"> <span class="cost_label">Monthly Rate</span> <span class="cost_price">' //Base Cost
        const cartcontent6 = '</span> </div> <div class="cart_item_total_cost"> <span class="cost_label">Total Rate</span> <span class="cost_price">'// Total Cost
        const endcartcontent = '</span> </div> </div> </div>'
        
        if(cartfeed){
            cartfeed.innerHTML = ''
        }


        // loop on each items in the Object
        var counter = 0

        product.forEach(function(obj){
            let me = {
                "id":obj.id,
                "featured_image":obj.featured_image,
                "title":obj.title,
                "price":obj.price,
                "quantity":obj.quantity
            }

            data.push(me)

            if(cartfeed){
                var totalCost = obj.quantity * obj.price
                cartfeed.innerHTML += cartcontent1 + obj.id + cartcontent2 + obj.featured_image + cartcontent3 + obj.title + cartcontent4 + obj.quantity + cartcontent5 + toCurrencyFormat.format(obj.price) + cartcontent6 + toCurrencyFormat.format(totalCost) + endcartcontent
                subTotal = Number(subTotal) + Number(totalCost)         
            }    
            
            if(productfeed){
                // document.querySelector('.cart-items-qty-input').value = 1
                document.querySelector('.total_price').innerHTML = document.querySelector('.base_price').innerHTML

               if(obj.id == document.querySelector('.product').id){
                    var totalCost = obj.quantity * obj.price
                    document.querySelector('.cart-items-qty-input').value = obj.quantity
                    document.querySelector('.total_price').innerHTML = toCurrencyFormat.format(totalCost)
               }
            }
            
            counter++
        })
        
        if(cartfeed){
            var gsTaxTotal = Number(subTotal) * Number(gsTax)
            var grandTotal = Number(gsTaxTotal) + Number(subTotal)
            
            document.querySelector('.cart_summary_subtotal_price').innerHTML = toCurrencyFormat.format(subTotal)
            document.querySelector('.cart_summary_gst_total').innerHTML = toCurrencyFormat.format(gsTaxTotal)
            document.querySelector('.cart_summary_grand_total').innerHTML = toCurrencyFormat.format(grandTotal)
            
        }
        cartItems.pushData(data)
    }

    // Product Page Increase Quantity
    productQtyInc(pId){
        let item = cartItems.fetchData()          
        var data = []    
        var idChecker = []
        var valQTY = document.querySelector('.cart-items-qty-input').value
        var newQTY = Number(valQTY) + 1
        console.log(newQTY)
        var priceValue = document.querySelector('.base_price').innerHTML
        var parsedValue = parseFloat(priceValue.replace(/\$|,/g, ''))

            item.forEach(function(obj){
            if(obj.id == pId ){
                let me = {
                    "id":pId,
                    "featured_image": document.querySelector('.cart_image_featured').src,
                    "title": document.querySelector('.cart_item_title').innerHTML,
                    "price": parsedValue,
                    "quantity": newQTY
                }
                data.push(me)
            }
            else{
                let me = {
                    "id":obj.id,
                    "featured_image":obj.featured_image,
                    "title":obj.title,
                    "price":obj.price,
                    "quantity":obj.quantity
                }
                data.push(me)
            }
            idChecker.push(obj.id)
        })
        
        console.log(parsedValue)
        if(!idChecker.includes(pId)){
            let me = {
                "id":pId,
                "featured_image": document.querySelector('.cart_image_featured').src,
                "title": document.querySelector('.cart_item_title').innerHTML,
                "price": parsedValue,
                "quantity": newQTY
            }
            data.push(me)
        }
        valQTY = newQTY
        // cartItems.updateData(data)
        document.querySelector('.cart-items-qty-input').value = newQTY 
        document.querySelector('.total_price').innerHTML = toCurrencyFormat.format(Number(newQTY) * Number(parsedValue))
    }

    // PUSH PRODUCT PAGE UPDATE TO THE CART
    pushProductUpdate(){
        let pId = document.querySelector('.product').id
        let item = cartItems.fetchData()  
        var data = []    
        var idChecker = []
        var valQTY = document.querySelector('.cart-items-qty-input').value
        var priceValue = document.querySelector('.base_price').innerHTML
        var parsedValue = parseFloat(priceValue.replace(/\$|,/g, ''))

            item.forEach(function(obj){
            if(obj.id == pId ){
                let me = {
                    "id":pId,
                    "featured_image": document.querySelector('.cart_image_featured').src,
                    "title": document.querySelector('.cart_item_title').innerHTML,
                    "price": parsedValue,
                    "quantity": valQTY
                }
                data.push(me)
            }
            else{
                let me = {
                    "id":obj.id,
                    "featured_image":obj.featured_image,
                    "title":obj.title,
                    "price":obj.price,
                    "quantity":obj.quantity
                }
                data.push(me)
            }
            idChecker.push(obj.id)
        })
        
        console.log(parsedValue)
        if(!idChecker.includes(pId)){
            let me = {
                "id":pId,
                "featured_image": document.querySelector('.cart_image_featured').src,
                "title": document.querySelector('.cart_item_title').innerHTML,
                "price": parsedValue,
                "quantity": valQTY
            }
            data.push(me)
        }
        cartItems.updateData(data)
    }
    // Product Page Decrease Quantity
    productQtyDec(pId){
        let item = cartItems.fetchData()  
                
        
        var data = []    
        var idChecker = []
        var valQTY = document.querySelector('.cart-items-qty-input').value
        var newQTY = Number(valQTY) - 1
        console.log(newQTY)
        var priceValue = document.querySelector('.base_price').innerHTML
        var parsedValue = parseFloat(priceValue.replace(/\$|,/g, ''))

            item.forEach(function(obj){
            if(obj.id == pId ){
                let me = {
                    "id":pId,
                    "featured_image": document.querySelector('.cart_image_featured').src,
                    "title": document.querySelector('.cart_item_title').innerHTML,
                    "price": parsedValue,
                    "quantity": newQTY
                }
                data.push(me)
            }
            else{
                let me = {
                    "id":obj.id,
                    "featured_image":obj.featured_image,
                    "title":obj.title,
                    "price":obj.price,
                    "quantity":obj.quantity
                }
                data.push(me)
            }
            idChecker.push(obj.id)
        })
        
        console.log(parsedValue)
        if(!idChecker.includes(pId)){
            let me = {
                "id":pId,
                "featured_image": document.querySelector('.cart_image_featured').src,
                "title": document.querySelector('.cart_item_title').innerHTML,
                "price": parsedValue,
                "quantity": newQTY
            }
            data.push(me)
        }
        valQTY = newQTY
        // cartItems.updateData(data)
        document.querySelector('.cart-items-qty-input').value = newQTY 
        document.querySelector('.total_price').innerHTML = toCurrencyFormat.format(Number(newQTY) * Number(parsedValue))
    }



    // Increase Product Quantity in Cart
    cartQtyInc(parent){
        let item = cartItems.fetchData()     
        let productfeed = document.querySelector('#product')
        var idChecker = []
        item.forEach(function(obj){
                if(obj.id == parent ){
                    update()
                }
                idChecker.push(obj.id)
            })
        
        
        if(productfeed){
            if(!idChecker.includes(parent)){
                let pImg = document.querySelector('.cart_image_featured').src
                let pTitle = document.querySelector('.cart_item_title').innerHTML
                let pCost = document.querySelector('.base_price').innerHTML
                let pQty = document.querySelector('.cart-items-qty-input').value
                this.addProduct(parent,pImg,pTitle,pCost,pQty)
            }
        }
         

        function update(){
            var data = cartItems.fetchData()
            data.forEach(function(obj){
                var qty = Number(obj.quantity) + 1
                if(obj.id == parent ){
                    obj.quantity = qty
                }
            })
            cartItems.updateData(data)            
        }
    }
    


    // Increase Product Quantity in Cart
    cartQtyDec(parent){
        let item = cartItems.fetchData()     
        let productfeed = document.querySelector('#product')
        var idChecker = []
        item.forEach(function(obj){
                if(obj.id == parent ){
                    update()
                }
                idChecker.push(obj.id)
            })
        
        
        if(productfeed){
            if(!idChecker.includes(parent)){
                let pImg = document.querySelector('.cart_image_featured').src
                let pTitle = document.querySelector('.cart_item_title').innerHTML
                let pCost = document.querySelector('.base_price').innerHTML
                let pQty = document.querySelector('.cart-items-qty-input').value
                this.addProduct(parent,pImg,pTitle,pCost,pQty)
            }
        }
         

        function update(){
            var data = cartItems.fetchData()
            data.forEach(function(obj){
                var qty = Number(obj.quantity) - 1
                if(obj.id == parent ){
                    obj.quantity = qty
                }
            })
            cartItems.updateData(data)            
        }
    }
    

    inputUpdate(parent, value){
        let item = cartItems.fetchData()
        item.forEach(function(obj){
                if(obj.id == parent ){
                    update()
                }
            })
            

        function update(){
            var data = cartItems.fetchData()
            data.forEach(function(obj){
                if(obj.id == parent ){
                    obj.quantity = value
                }
            })
            cartItems.updateData(data)            
        }
    }    
    
    removeProduct(parent){
        let item = cartItems.fetchData()
        item.forEach(function(obj){
                if(obj.id == parent ){
                    update()                  
                }
            })
            

        function update(){
            const removeById = (item, id) => {
                const requiredIndex = item.findIndex(el => {
                   return el.id === String(id);
                });
                if(requiredIndex === -1){
                   return false;
                };
                return !!item.splice(requiredIndex, 1);
             };
             removeById(item, parent);
             cartItems.updateData(item)     
        }
    }


    // // Updates items in the cart
    // updateCart(product){
    //     // set cartItems
    //     var data = []

    //     // loop on each items in the Object
    //     product.forEach(function(obj){
    //         if(obj.id == '1987899424833' ){
    //             let me = {
    //                 "id" : obj.id,
    //                 "price":'Item Updated'

    //             }
    //             // cartItems.push(me)
    //             update(me)
    //         }
    //     })


    //     function update(obj){
    //         var data = cartItems.fetchData()
    //         data.forEach(function(obj){
    //             if(obj.id == '1987899424833' ){
    //                 obj.price = "Updated!"
    //             }
    //         })
    //         cartItems.updateData(data)              
    //     }
    // }

    // Clears items in the cart
    clearCart(){
        cartItems.clearData()
    }

    // Notify Dev for cart changes
    subscribeCart(){
        console.log('Your cart has been updated')
    }
}