import React from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper/index'
import { Link } from 'react-router-dom'

export default function UserDashBoard() {

    const {user} = isAuthenticated()

    const adminLeft = () =>{
        return(
            <div className="card">
                <h5 className="card-header bg-dark text-white text-center">Navigation</h5>
                <ul className="list-group">
               <li className="list-group-item text-success font-weight-bold"><Link className='text-success' to='/user/orders'>My Orders</Link></li>
                </ul>
            </div>
        )
    }
    
    const adminRight = () =>{
        return (
            <div className="card">
                <h5 className="card-header bg-dark text-white text-center">User Information</h5>
                <ul className="list-group">
                    <li className="list-group-item font-weight-bold"><h5><span className='badge badge-success mr-2'>Name</span>{user.firstname} {user.lastname}</h5> </li>
                    <li className="list-group-item font-weight-bold"><h5><span className='badge badge-success mr-2'>Email</span>{user.email}</h5> </li>
                </ul>
                </div>
        )
    }
    return (
        <Base className='container bg-success p-4' title='User Dashboard' description={`Welcome ${user.firstname}`}>
        <div className="row">
        <div className="col-md-3">{adminLeft()}</div>
        <div className="col-md-9">{adminRight()}</div>
        </div>
        </Base>
    )
    
}
