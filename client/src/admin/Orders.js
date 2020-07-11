import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper/index'
import { getAllOrders } from './helper/adminapicall'
import { Link } from 'react-router-dom'

export default function Orders() {

    const [orders, setOrders] = useState([])

    const {user, token} =isAuthenticated()

    const loadAllOrders = () =>{
        getAllOrders(user._id, token)
        .then(data=>{
            setOrders(data)
            console.log(data)
        }
        )
    }

    useEffect(() => {
        loadAllOrders()
        // eslint-disable-next-line
    }, [])

    const goback = ()=>(
        <Link className='btn btn-warning' to='/admin/dashboard'>Admin Home</Link>
    )

    const orderCard = (order) =>(
        <div className="col-xl-4 col-sm-12 col-md-6 mt-4">
        <div className="card mt-2 h-100"> 
        <div className="card-body">
        <h5 className="card-title text-dark mt-2">{`Order Id: ${order._id}`}</h5>
        <p className="card-text text-dark">{`Order Status: ${order.status}`}</p>
        <p className="card-text text-dark">{`Amount: ₹${order.amount}`}</p>
        <div className="container"><div className="row">
            <div className="col-md-6 col-sm-12 pb-1"><Link to={`/admin/order/update/${order._id}`} className='btn btn-warning btn-block'>Status</Link></div>
            <div className="col-md-6 col-sm-12"><Link to={`/admin/order/view/${order._id}`} className='btn btn-success btn-block'>Details</Link></div>
        </div></div>
         </div>            
        </div></div>
    )

    return (
        <Base title='Manage Orders' description=''>
        <div className="container">
        {goback()}
        <div className="row">
        {orders && orders.map((order,i)=>{
            return(orderCard(order))
        })}
        </div>
        </div>
        </Base>
    )
}
