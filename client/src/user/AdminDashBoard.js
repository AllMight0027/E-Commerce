import React from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper/index'
import { Link } from 'react-router-dom'


const adminLeft = () =>{
    return(
        <div className="card">
            <h5 className="card-header bg-dark text-white text-center">Admin Navigation</h5>
            <ul className="list-group">
            <li className="list-group-item text-success font-weight-bold"><Link className='text-success' to='/admin/create/product'>Add Product</Link></li>
            <li className="list-group-item text-success font-weight-bold"><Link className='text-success' to='/admin/products'>Manage Products</Link></li>
            <li className="list-group-item text-success font-weight-bold"><Link className='text-success' to='/admin/create/category'>Add Category</Link></li>
            <li className="list-group-item text-success font-weight-bold"><Link className='text-success' to='/admin/categories'>Manage Categories</Link></li>
            <li className="list-group-item text-success font-weight-bold"><Link className='text-success' to='/admin/orders'>Manage Orders</Link></li>
            </ul>
        </div>
    )
}

const adminRight = () =>{
    return (
        <div className="card">
            <h5 className="card-header bg-dark text-white text-center">Admin Information</h5>
            <ul className="list-group">
                <li className="list-group-item font-weight-bold"><h5><span className='badge badge-success mr-2'>Name</span>{user.firstname} {user.lastname}</h5> </li>
                <li className="list-group-item font-weight-bold"><h5><span className='badge badge-success mr-2'>Email</span>{user.email}</h5> </li>
            </ul>
            </div>
    )
}

const {user} = isAuthenticated();

export default function AdminDashBoard() {
    
    return (
        <Base className='container bg-success p-4' title='Admin Dashboard' description={`Welcome ${isAuthenticated().user.firstname}`}>
        <div className="row">
        <div className="col-md-3">{adminLeft()}</div>
        <div className="col-md-9">{adminRight()}</div>
        </div>
        </Base>
    )
}
