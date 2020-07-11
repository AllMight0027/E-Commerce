import React, { useState, useEffect } from 'react'
import { getMyOrders } from './helper/userapicalls'
import { isAuthenticated } from '../auth/helper/index'
import Base from '../core/Base'
import OrderTempelate from './OrderTempelate'


export default function MyOrders() {

    const {user,token} = isAuthenticated()
    const [orders, setOrders] = useState([])


    const loadAllOrders = () =>{
        getMyOrders(user._id,token)
        .then(data=>{
            if(data.message){
                console.log(data.message)
            }
            else{
                setOrders(data)
            }
        })
    }

    useEffect(() => {
        loadAllOrders()
        // eslint-disable-next-line
    }, [])

    return (
        <Base title='My Orders' description=''>
        <div>
        {orders && orders.map((order,index)=>{
            console.log(order)
            return <OrderTempelate order={order} />
        })}
            
        </div>
        </Base>
    )
}
