import React, { useEffect, useState } from 'react'
import { getProduct } from './helper/coreapicalls'
import { API } from '../backend'
import Base from './Base'
import { Link, withRouter } from 'react-router-dom'
import { addItemToStorageCart } from './helper/carthelper'



const ProductDetails = ({match, history}) =>{

    const [product, setProduct] = useState({})


    const [addButtonVisibility, setAddButtonVisibility] =useState(true)

    const [stockId, setStockId] = useState('')

    const loadPhoto = () =>{
        getProduct(match.params.productId)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setProduct(data)
                console.log((data))
            }
        })
        .catch(e=>console.log(e))
    }

    useEffect(()=>{
        loadPhoto()
        // eslint-disable-next-line
    },[])


    const showAddToCart = addToCart =>{

        if(addToCart){
        return (
            <button
                onClick={() => {setAddButtonVisibility(false)
                    console.log(stockId)
                    addItemToStorageCart({product,stockId})
                }}
                className="btn btn-success mt-4 mb-2" style={{display:''}}
              >
                Add to Cart
            </button>
        )}
        else{
            return (
                <button
                    onClick={() => {
                        console.log('VISIT CART')
                        history.push('/cart')
                    }}
                    className="btn btn-warning mt-4 mb-2" style={{display:''}}
                  >
                    Go To Cart
                </button>
            )
        }
    }
    


    const src = `${API}product/photo/${product._id}`

    const handleChange = (event) =>{
        console.log(event.target.value)
        // eslint-disable-next-line
        {product.stock &&
            // eslint-disable-next-line
            console.log(product.stock.map((unit ,index)=>{
                if(unit.size===event.target.value){
                    
                        setStockId(unit._id)
                    
                    return(unit.units)
                    
                }
            }))            
        }
    }

    const goback = ()=>(
        <Link className='btn text-dark btn-warning mt-3' to='/'>Back</Link>
      )

    return(
        <Base title={product.name} description=''>
            <div className="container-fluid">
            {goback()}
                <div className="row mt-3">
                    <div className="col-sm-4">
                        <img
                            src={src}
                            alt="Unavailable"
                            style={{ maxHeight: "100%", maxWidth: "100%" }}
                            className="mb-3 rounded text-black"
                        />
                    </div>
                <div className="col-sm-7 ml-1">
                    <h6>Descripttion:</h6>
                    <p>{product.description}</p>
                    <select
                        placeholder="Size"
                        onChange={handleChange}
                    >
                        <option>Select Size</option>
                        {product.stock &&
                            product.stock.map((unit ,index)=>(
                                // eslint-disable-next-line
                                <option key={index} id={unit._id} value={unit._id,unit.stock}>{unit.size}</option>
                            ))            
                        }
                    </select>
                    <br/>
                    <br/>
                    {showAddToCart(addButtonVisibility)}
                </div>
                </div>
            </div>
        </Base>
    )
}

export default withRouter(ProductDetails)