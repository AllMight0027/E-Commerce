import { API } from "../../backend"

export const getMyOrders = (userId,token) =>{
    console.log(`${API}user/${userId}/orders`)
    return fetch(`${API}user/${userId}/orders`,{
        method: 'GET',
        headers:{
            Accept: 'application/json',
            Authorization: token
        }
    })   
    .then(res=>{
        return res.json()
    })
    .catch(e=>console.log(e))
}
