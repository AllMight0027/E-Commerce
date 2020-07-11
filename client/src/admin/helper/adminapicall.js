const { API } = require("../../backend");

//Category Calls

//add category
export const postCategory = (userId, token, category) =>{
    return fetch(`${API}category/create/${userId}`,{
        method: 'POST',
        headers:{
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
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

//Get category by id
export const getCategory = (categoryId) =>{
    console.log(`${API}category/${categoryId}`)
    return fetch(`${API}category/${categoryId}`,{
        method: 'GET'
    })
    .then(res =>{
        return res.json()
    })
    .catch(e=>console.log(e))
}

//update category
export const updateCategory = (categoryId, userId, token, category) =>{
    return fetch(`${API}category/update/${categoryId}/${userId}`,{
        method: 'PUT',
        headers:{
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
    .then(res =>{
        return res.json()
    })
    .catch(e=>console.log(e))
}

//delete category
export const deleteCategory = (categoryId,userId,token)=>{
    return fetch(`${API}category/delete/${categoryId}/${userId}`,{
        method: 'DELETE',
        headers:{
            Authorization: token,
            Accept: 'application/json'
        }
    })
    .then(res =>{
        return res.json()
    })
    .catch(e=>console.log(e))
}


//Product Calls

//Create Product
export const postProduct = (userId, token, product) =>{
    console.log(`${API}product/create/${userId}`)
    return fetch(`${API}product/create/${userId}`,{
        method: 'POST',
        headers:{
            Authorization: token,
            Accept: 'application/json'
        },
        body: product
    })
    .then(res =>{
        return res.json()
    })
    .catch(e=>console.log(e))
}

//Add Stock
export const addStock = (productId, userId, token, stock) =>{
    return fetch(`${API}product/stock/${userId}/${productId}`,{
        method: 'PUT',
        headers:{
            Authorization: token,
            Accept: 'application/json'
        },
        body: stock
    })
    .then(res =>{
        return res.json()
    })
    .catch(e=>console.log(e))
}

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

//Update a Product
export const updateProduct = (productId, userId, token, product) =>{
    return fetch(`${API}product/update/${productId}/${userId}`,{
        method: 'PUT',
        headers:{
            Authorization: token,
            Accept: 'application/json'
        },
        body: product
    })
    .then(res =>{
        return res.json()
    })
    .catch(e=>console.log(e))
}

//Delete a Product
export const deleteProduct = (productId, userId, token) =>{
    return fetch(`${API}product/delete/${productId}/${userId}`,{
        method: 'DELETE',
        headers:{
            Authorization: token,
            Accept: 'application/json'
        }
    })
    .then(res =>{
        return res.json()
    })
    .catch(e=>console.log(e))
}

//Add stock
export const createStock = (productId, userId, token, stock) =>{
    console.log(`${API}product/stock/${userId}/${productId}`)
    return fetch(`${API}product/stock/${userId}/${productId}`,{
        method: 'POST',
        headers:{
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stock)
    })
    .then(res =>{
        return res.json()
    })
    .catch(e=>console.log(e))
}

//Get All Orders
export const getAllOrders = (userId, token)=>{
    return fetch(`${API}order/all/${userId}`,{
        method: 'GET',
        headers:{
            Authorization: token,
            Accept: 'application/json'
        }
    })
    .then(res =>{
        return res.json()
    })
    .catch(e=>console.log(e))
}

//Get Order by ID
export const getOrder = (userId, orderId ,token)=>{
    return fetch(`${API}order/${orderId}/detail/${userId}`,{
        method: 'GET',
        headers:{
            Authorization: token,
            Accept: 'application/json'
        }
    })
    .then(res =>{
        return res.json()
    })
    .catch(e=>console.log(e))
}

//update order status
export const updateOrderStatus = (userId, orderId ,token, order)=>{
    return fetch(`${API}order/${orderId}/status/${userId}`,{
        method: 'PUT',
        headers:{
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(res =>{
        return res.json()
    })
    .catch(e=>console.log(e))
}