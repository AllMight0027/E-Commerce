import React from 'react'
import { withRouter } from 'react-router-dom'
import { API } from '../backend'


const Card =({
    product,
    addToCart = false,
    removeFromCart = false,
    history,
    clicked = ()=>{}
})=> {



    const showAddToCart = addToCart =>{
        return addToCart && (
            <button
                onClick={() => {}}
                className="btn btn-block btn-success mt-2 mb-2" style={{display:''}}
              >
                Add to Cart
            </button>
        )
    }

    const showRemoveFromCart = removeFromCart =>{
        return removeFromCart && (
            <button
                onClick={() => {}}
                className="btn btn-block btn-danger mt-2 mb-2"
              >
                Remove from cart
            </button>
        )
    }

    const src = `${API}product/photo/${product._id}`

    return (
        <div className="card text-white bg-dark border border-light mt-4" onClick={clicked} style={{cursor:'pointer'}}>
        <div className="card-header lead bg-info text-dark font-weight-bold">{product.name}</div>
        <div className="card-body">
          <div className="rounded pl-2 pr-2 pt-2 text-black ml-1">
            <img
              src={src}
              alt="Unavailable"
              style={{ height:'225px', width:'225px' }}
              className="mb-3 rounded text-black"
            />
          </div>
          <div className="row pl-4 pr-4"><p className="btn btn-light rounded  btn-sm px-4 mt-2">₹ {product.price}</p></div>
          
          <div className="row pl-4 pr-4">

                <button
                onClick={() => {console.log(`${API}product/photo/${product._id}`)}}
                className="btn btn-block btn-warning mt-2 mb-2"
                >
                View Details
                </button>
            
              
                {showAddToCart(addToCart)}
                {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    )
}

export default withRouter(Card)
