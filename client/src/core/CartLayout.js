import React, { useState, useEffect } from 'react'
import { API } from '../backend'
import { removeFromCart } from './helper/carthelper'
import { loadCart } from './helper/carthelper'


export default function CartLayout({
    product,
    setReload = f=>f,
    reload = undefined
}) {

    // eslint-disable-next-line
    const [cartProducts, setCartProducts] = useState([])
    useEffect(()=>{
        setCartProducts(loadCart())
    },[])

    const showRemoveFromCart = () =>{
        return (
            <button
                onClick={() => {
                    removeFromCart(product.product._id)
                    setReload(!reload)

                }}
                className="btn btn-danger mt-2 mb-2"
              >
                Remove from cart
            </button>
        )
    }

    return (
        <div className='contianer mt-3 border border-success p-2'>
        <div className="row">
            <div className="col-xl-4 pb-1 pt-1">
                <img src={`${API}product/photo/${product.product._id}`} alt={product.product.name} height='150px' width='150px'/>
            </div>
            <div className="col-xl-7 ml-1 pt-1">
                <h5>{product.product.name}</h5>
                {/* eslint-disable-next-line*/}
                {product.product.stock.map((unit ,index)=>{
                    if(unit._id===product.stockId){
                        return <p>{unit.size}</p>
                    }
                }
                )}
                <h6>₹ {product.product.price}</h6>
                <span>{showRemoveFromCart()}</span>
            </div>
        </div>            
        </div>
    )
}
