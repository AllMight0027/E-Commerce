import React from 'react'
import Base from './Base'

export default function PayemntSuccess() {
    return (
        <Base title='Payment Successfull' description=''>
        <div className="container"><div className="row"><div className="col-12 text-center">
        <img src="https://cdn1.iconfinder.com/data/icons/payment-mode/100/payment_approved-512.png" alt="Payment Successfull" height='100%' width='100%' style={{'maxHeight':'300px', 'maxWidth':'300px'}} />
        </div></div></div>
        
        </Base>
    )
}
