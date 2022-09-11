class dataHandler{
    constructor(){        
        const cart = sessionStorage.getItem('cart')
        if(cart){
            console.log('Session Exists')
        }
        else{
            console.log('Session Does Not Exists')
            sessionStorage.setItem("cart",'')
            var jsonData
        }
    }

    // Add data in DataHandler
    pushData(data){
        let jsonData = JSON.stringify(data)
        sessionStorage.setItem("cart",jsonData)
    }

    fetchData(){
        let see = JSON.parse(sessionStorage.getItem('cart'))
        return see
    }

    // Update data in DataHandler
    updateData(data){
        var jsonItems = JSON.stringify(data)
        sessionStorage.setItem("cart", jsonItems)  
        shoppingCart.addCart(data);      
    }
}