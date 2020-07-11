const { API } = require("../../backend");

//Product calls

//Get All Products
export const getAllProducts = () =>{
    return fetch(`${API}product`,{
        method: 'GET'
    })
    .then(res =>{
        return res.json()
    })
    .catch(e=>console.log(e))
}


//Get a Product
export const getProduct = (productId) =>{
    return fetch(`${API}product/${productId}`,{
        method: 'GET'
    })
    .then(res =>{
        return res.json()
    })
    .catch(e=>console.log(e))
}

//get all categories
export const getCategories = () =>{
    return fetch(`${API}category`,{
        method: 'GET'
    })
    .then(res =>{
        return res.json()
    })
    .catch(e=>console.log(e))
}