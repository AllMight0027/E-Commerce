import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { getAllProducts, deleteProduct } from './helper/adminapicall'

export default function ManageProducts() {
    
    const [products, setProducts] = useState([])

    const {user, token} = isAuthenticated();

    const preload =() =>{
        getAllProducts()
        .then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setProducts(data)
            }
        })
    }

    useEffect(()=>{
        preload()
    },[])

    const deleteThisProduct = productId =>{
        deleteProduct(productId, user._id, token)
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

    // const categoryName = (categoryId) =>{
    //     getCategory(categoryId)
    //     .then(data=>{
    //         console.log(data)
    //         return data
    //     })
    //     .catch(e=>console.log(e))
    // }

    return (
        <Base title='Manage Products' description='Update and Delete Products Here'>
            <div className="container">
                {goback()}
                <br/>
                <h3 className='text-center mt-4'>All Products</h3>
                <br/><br/>
                <div className="row">
                    {products.map((product, index)=>{
                        return(
                            <div className="col-xl-4 col-sm-12 col-md-6 mt-4">
                            <div className="card mt-2 h-100"> 
                        <div className="card-body">
                            {/*<img className="card-img-top" src={product.photo} alt={"Card image cap"}/>*/}
                            <h5 className="card-title text-dark mt-2">{product.name}</h5>
                            <p className="card-text text-dark">{`Rs.${product.price}`}</p>
                            <div className="container"><div className="row">
                                <div className="col-6"><Link to={`/admin/product/update/${product._id}`} className='btn btn-warning btn-block'>Update</Link></div>
                                <div className="col-6"><button onClick={()=>{deleteThisProduct(product._id)}} className='btn btn-danger btn-block'>Delete</button></div>
                            </div></div>
                        </div>            
                    </div></div>)
                    })}
                </div>
            </div>
        </Base>
    )
}
