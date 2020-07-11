export const addItemToStorageCart = (item)=>{
    let cart =[]
    if (window !== undefined) {
        if(localStorage.getItem('cart')){
            cart=JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item
        })
        localStorage.setItem('cart',JSON.stringify(cart))
    }
}

export const loadCart =() =>{
    if (window !== undefined) {
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
}

export const removeFromCart =(productId) =>{
    let cart =[]
    if (window !== undefined) {
        if(localStorage.getItem('cart')){
            cart=JSON.parse(localStorage.getItem('cart'))
        }
        // eslint-disable-next-line
        cart.map((product,index)=>{
            if(product.product._id === productId){
                cart.splice(index, 1)
            }
        })
        localStorage.setItem('cart',JSON.stringify(cart))
    }    
}

export const emptyCart = next =>{
    if(window !== undefined){
        localStorage.removeItem('cart')
        next();
    }
}
