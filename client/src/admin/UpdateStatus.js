import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper/index'
import { getOrder, updateOrderStatus } from './helper/adminapicall'

export default function UpdateStatus({match}) {

    const [error, setError] = useState(false)

    const [success, setSuccess] = useState(false)

    const [states, setStates] = useState()

    const [values, setvalues] = useState({
        status:'',
        order:{}
    })
    
    const {status, order} = values

    const {user, token} = isAuthenticated()

    const loadOrder = () =>{
        setStates(["Recieved", "Processing", "Shipped", "Delivered", "Cancelled"])
        getOrder(user._id, match.params.orderId , token)
        .then(data=>{
            if(data.message){
                setError(true)
            }
            else{
            setvalues({...values, order:data, status:data.status})
            document.getElementById('selectStatus').value= data.status
            console.log(data)}
        }
        )
    }

    useEffect(() => {
        loadOrder()
        // eslint-disable-next-line
    }, [])

    const handleChange = name => event =>{
        const value = event.target.value
        return(
            setvalues({...values, [name]:value})
        )
      }

    const onError = () =>(
        <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-danger" style={{display: error ? "" : 'none'}}>
                {error}
            </div>
        </div>
    )

    const onSuccess = () =>(
        <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-dark text-success" style={{display: success ? "" : 'none'}}>
                Updated Successfully
            </div>
        </div>
    )

    const onSubmit = event =>{
        event.preventDefault()
        console.log(status)
        order.status=status
        updateOrderStatus(user._id,order._id,token,order).then(data=>{
            console.log(data)
            setSuccess(true)
        })
    }

    const goback = ()=>(
        <Link className='btn btn-warning' to='/admin/orders'>All Orders</Link>
    )
    
    return (
        <Base title='Update Status' description=''>
        <div className="container">
        {goback()}
        <div className='row bg-success p-4 mt-4'>
        <div className="col-md-6 offset-sm-3 text-left">
            <form>
                <div className='form-group'>
                    <label className='text-light font-weight-bold'>Status</label>
                    <select
                    onChange={handleChange('status')}
                    className="form-control"
                    placeholder="Status"
                    id='selectStatus'
                  >
                    <option>Select Status</option>
                    {states &&
                        states.map((state ,index)=>(
                          <option value={state}>{state}</option>
                      ))            
                  }
                  </select>
                </div>
                <button onClick={onSubmit}  className="btn btn-danger btn-block" type="submit">Submit</button>
            </form>
        </div>
        </div>
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
        <br/>
        <br/>
        {onError()}
        {onSuccess()}
        </div>
        </div>
        </div>
        </Base>
    )
}
