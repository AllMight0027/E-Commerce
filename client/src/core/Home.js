import React, { useState, useEffect } from 'react'
import '../styles.css'
import Base from './Base'
import Card from './Card'
import { getAllProducts, getCategories } from './helper/coreapicalls'
// import { withRouter } from 'react-router-dom'

const Home = ({history}) =>{

    const [products, setproducts] = useState([])
    const [categories, setCategories] = useState([])
    const [values, setvalues] = useState({category:''})
    const {category} = values

    const loadAllProducts = ()=>{
        getAllProducts()
        .then(data=>{
            if(data && data.error){
                console.log(data.error)
            }
            else{
                setproducts(data)
            }
        })
    }

    const loadAllCategories = () =>{
        getCategories()
        .then(data=>{
            if(data && data.error){
                console.log(data.error)
            }
            else{
                setCategories(data)
            }
        })
    }

    useEffect(()=>{
        loadAllProducts()
        loadAllCategories()
    },[])
    
    const clicked = productId => event =>{
        history.push(`/product/${productId}`)
    }

    const handleChange = name => event =>{
        const value = event.target.value
        setvalues({...values, [name]:value})
        console.log(value)
      }

    return (
        <Base title='Home Page' description='Welcome to the store'>
            <div className="text-right row">
            <div className="col-xl-3 col-md-6 col-sm-12">
            <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Category"
          >
            <option>All Categories</option>
            {categories &&
              categories.map((cate ,index)=>(
                  <option key={index} value={cate._id}>{cate.name}</option>
              ))            
          }
          </select>
          </div>
            </div>
            <div className="row text-center">
                {products && products.map((product, index)=>{
                    console.log(category)
                    if(category==='' || category ==='All Categories'){
                    return(
                        <div className="col-xl-3 col-sm-12 col-md-6 mt-2"><Card title='Here' product={product} clicked={clicked(product._id) } /></div>
                    )}
                    else{
                        if(category===product.category){
                            return(
                                <div className="col-xl-3 col-sm-12 col-md-6 mt-2"><Card title='Here' product={product} clicked={clicked(product._id) } /></div>
                            )
                        }
                    }
                    return ''
                })}
                
                
            </div>
        </Base>
    )
}

export default Home