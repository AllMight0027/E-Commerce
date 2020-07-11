import React, { useState, useEffect } from 'react'
import Base from './Base'
import { loadCart } from './helper/carthelper'
import CartLayout from './CartLayout'
import Payment from './Payment'

const Cart =() =>{

    const [cartProducts, setCartProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(()=>{
        setCartProducts(loadCart())
    },[reload])
    

    return (
        <Base title='My Cart' description=''>
            <div className="container-fluid">
                <div className="row mt-3 text=center">
                    <div className="col-sm-6">
                        {cartProducts && cartProducts.length!==0 &&
                            cartProducts.map((product,index)=>{
                            return(
                                <CartLayout product={product} setReload={setReload} reload={reload}/>
                            )
                        })}
                        {(!cartProducts || cartProducts.length===0) && <h1>Cart is empty</h1>}
                    </div>
                    <div className="col-sm-5 ml-1">
                        <h1><Payment products={cartProducts} setReload={setReload}/></h1>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default Cart