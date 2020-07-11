const { API } = require("../../backend");

export const getMeToken = (userId, token) =>{
    console.log(`${API}payment/gettoken/${userId}`)
    return fetch(`${API}payment/gettoken/${userId}`,{
        method: 'GET',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(e=>console.log(e))
}

export const processPayment = (userId, token, paymentInfo) =>{
    return fetch(`${API}payment/braintree/${userId}`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify(paymentInfo)
    })
    .then(res=>{
        return res.json()
    })
    .catch(e=>console.log(e))
}