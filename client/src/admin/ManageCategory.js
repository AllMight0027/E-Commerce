import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper/index'
import { getCategories, deleteCategory } from './helper/adminapicall'

export default function ManageCategory() {

    const {user, token} = isAuthenticated()

    const [categories, setCategories] = useState([])

    const preload = () =>{
        getCategories()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setCategories(data)
            }
        })
    }

    useEffect(()=>{
        preload()
    },[])

    const deleteThisCategory = (categoryId)=>{
        deleteCategory(categoryId,user._id,token)
        .then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                preload()
            }
        })
        .catch(e=>console.log(e))
    }

    const goback = ()=>(
        <Link className='btn btn-warning' to='/admin/dashboard'>Admin Home</Link>
    )
    return (
        <Base title='Manage Categories'>
            <div className="container">
                {goback()}
               {categories.map((category, index)=>{
                   return(
                    <div className="row mt-4 bg-success p-2 rounded">
                        <div className="col-4"><h5 className='text-dark font-weight-bold'>{index+1}) {category.name}</h5></div>
                        <div className="col-4"><Link to={`/admin/category/update/${category._id}`} className='btn btn-warning'>Update</Link></div>
                        <div className="col-4"><button onClick={()=>{deleteThisCategory(category._id)}} className='btn btn-danger'>Delete</button></div>
                </div>
                   )
               })}
                
            </div>
        </Base>
    )
}
