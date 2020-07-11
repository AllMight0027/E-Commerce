import React, { useState,useEffect } from 'react'
import {  withRouter } from 'react-router-dom'
import { loadCart, emptyCart } from './helper/carthelper'
import { getMeToken, processPayment } from './helper/paymenthelper'
import { createOrder } from './helper/orderhelper'
import { isAuthenticated } from '../auth/helper'
import DropIn from 'braintree-web-drop-in-react'


const Payment= ({
    // eslint-disable-next-line
    products, setReload = f=>f, reload = undefined, history
}) => {

    const {user, token} = isAuthenticated()
    // eslint-disable-next-line
    const [cartProducts, setCartProducts] = useState([])


    const [info, setInfo] = useState({
        clientToken : null,
        loading : false,
        success : false,
        error : '',
        instance: {}
    })
    const {success} = info

    const getToken = ((userId, token)=>{
        getMeToken(userId,token)
        .then(data=>{
            if(data.error){
                setInfo({...info, error: data.error})
            }
            else{
                const clientToken = data.clientToken
                setInfo({...info, clientToken:clientToken})
            }
        })
        .catch(e=>console.log(e))
    })

    const showBTDropIn = () =>{
        return(
            <div>
            {products && (info.clientToken !== null) && products.length > 0 ? (
                <div>
                    <DropIn
                        options={{ authorization: info.clientToken }}
                        onInstance={(instance) => (info.instance = instance)}
                    />
                    <button className='btn btn-success btn-block' onClick={onPurchase}>Buy</button>
                </div>
            ) : (
                console.log()
            ) }
            </div>
        )
    }

    useEffect(()=>{
        getToken(user._id, token)
        setCartProducts(loadCart())
        // eslint-disable-next-line
    },[])

    const onPurchase = () =>{
        setInfo({loading: true})
        let nonce;
        // eslint-disable-next-line
        let getNonce = info.instance
        .requestPaymentMethod()
        .then(data=>{
            nonce= data.nonce
            const paymentData = {
                paymentMethodNonce : nonce,
                amount: getAmount()
            }
            processPayment(user._id, token, paymentData)
            .then(res=>{
                setInfo({...info , success:true})
                console.log('PAYMENT SUCCESS')
                emptyCart(()=>{
                    console.log('CLEAR')
                })
                addOrder()
            })
            .catch(e=>setInfo({...info,error:'',success: false, loading:false}))
        })
        .catch(e=>console.log(e))
    }

    const addOrder = ()=>{
        const payedOrder ={
            products: products,
            amount : getAmount()
        }
        console.log(payedOrder)
        createOrder(user._id, token,payedOrder)
        .then(data=>{
            console.log(data)
        })
        .catch(e=>console.log(e))
    }

    const getAmount = () =>{
        let amount=0
        // eslint-disable-next-line
        products.map((product,index)=>{
            amount = amount + product.product.price
        })
        return amount
    }
    const paymentSuccess = sucess =>{
        if(sucess){
            history.push('/payment/success')
        }
    }

    return (
        <div>
            {products && products.length > 0 ? (<h3> Your Bill is ₹ {getAmount()}</h3>):()=>{}}
            {showBTDropIn()}
            {paymentSuccess(success)}
        </div>
    )
}


export default withRouter(Payment)