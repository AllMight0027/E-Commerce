import React from 'react'
import { API } from '../backend'
import { withRouter } from 'react-router-dom'


const OrderTempelate =({order,history}) => {

    return (
        <div className="container mb-4 border-top border-bottom border-light">
        <div className="row pt-2">
        <h6>Ordered On: {order.createdAt.split('T',1)}</h6>
        </div>
        <div className="row">
        <h4>Status: <span className="text-success">{order.status} </span></h4> <small className='pl-2 pt-1'> (Updated On: {order.updatedAt.split('T',1)})</small> <br/> 
        </div>
        <div className="row pt-1">
        <h4>Products:</h4>
        </div>
        
        {order && order.products.map((product,index)=>{
            return(
                <div className="row" onClick={()=>{
                    history.push(`/product/${product.product._id}`)
                }} style={{cursor:'pointer'}}>
                <div className="col-md-3 col-sm-12 mb-3 col-xl-2">
                <img src={`${API}product/photo/${product.product._id}`} alt={product.product.name} height='150px' width='150px'/>
                </div>
                <div className="col-md-3">
                <h4>{product.product.name}</h4>     
                <h6>₹ {product.product.price}</h6>
                {
                }
                </div>
                </div>
            )
        })}

        <h4>Total Amount: <span className="text-warning"> ₹ {order.amount}</span></h4>
        
        </div>
    )
}

export default withRouter(OrderTempelate)