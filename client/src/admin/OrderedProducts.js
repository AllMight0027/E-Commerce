import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { getOrder } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper/index'
import { Link } from 'react-router-dom'
import OrderTempelate from '../user/OrderTempelate'

export default function OrderedProducts({match}) {

    const {user, token} =isAuthenticated()

    const [order, setOrder] = useState({})

    const goback = ()=>(
        <Link className='btn btn-warning mb-4' to='/admin/orders'>All Orders</Link>
    )

    const loadOrder = () =>{
        getOrder(user._id, match.params.orderId , token)
        .then(data=>{
            setOrder(data)
            console.log(data)
        }
        )
    }

    useEffect(() => {
        loadOrder()
        // eslint-disable-next-line
    }, [])

    return (
        <Base title='Products' description='Items in the order'>
            <div className="container">
            {goback()}
            <div className="row">
            {order.products && <OrderTempelate order={order} />}
            </div>
            </div>
        </Base>
    )
}
