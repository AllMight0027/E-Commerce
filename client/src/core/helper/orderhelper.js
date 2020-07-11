import { API } from "../../backend"

export const createOrder = (userId, token, orderData) =>{
    return fetch(`${API}order/create/${userId}`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify({order:orderData})
    })
    .then(res=>{
        console.log(res)
        return res.json()
    })
    .catch(e=>console.log(e))
}
