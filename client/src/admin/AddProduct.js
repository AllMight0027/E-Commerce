import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper/index'
import { Link } from 'react-router-dom'
import { getCategories, postProduct } from './helper/adminapicall'

export default function AddProduct() {

    let productId = ''

    const {user, token} = isAuthenticated()

    const [values, setvalues] = useState({
        name:'',
        description:'',
        price:'',
        category:'',
        photo:'',
        categories:'',
        error:'',
        createdProduct:'',
        isRedirected:false,
        formData:''
    })

    const {name, description, price, categories,createdProduct,error,formData} = values

    const onSubmit=(event)=>{
        event.preventDefault();
        setvalues({...values, error:''})
        postProduct(user._id, token, formData)
        .then(data=>{
            if(data.error){
                setvalues({...values, error: data.error})
            }
            else{
                console.log(data._id)
                productId = data._id
                console.log(productId)
                setvalues({
                    name:'',
                    description:'',
                    price:'',
                    error:'',
                    isRedirected: true,
                    photo:'',
                    createdProduct: data.name
                })
            }
        })
        .catch(e=>console.log(e))
    }

    const handleChange = name => event =>{
      const value = name === 'photo' ? event.target.files[0] : event.target.value
      formData.set(name, value)
      return(
          setvalues({...values, [name]:value})
      )
    }

    const preload = () =>{
        getCategories().then(data=>{
            console.log(data)
            if(data.error){
                setvalues({...values, error:'Failed to load categories'})
            }
            else{
                setvalues({...values, formData: new FormData(), categories: data})
            }
        })
        .catch(e=>console.log(e))
    }

    useEffect(()=>{
        preload();
        // eslint-disable-next-line
    },[])

    const goback = ()=>(
      <Link className='btn text-dark btn-warning mt-3' to='/admin/dashboard'>Admin Home</Link>
    )

    const onError = () =>(
        <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-danger" style={{display: error ? "" : 'none'}}>
                {error}
            </div>
        </div>
    )

    const onSuccess = () =>(
        <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-dark text-success container-fluid" style={{display: createdProduct ? "" : 'none'}}>
                <div className="row">
                  <div className="col-sm-9 text-left">{createdProduct} Added Successfully</div>
                  <div className="col-sm-3 text-right"><Link to={`/admin/products`} className='text-right btn btn-warning'>Add Stock</Link></div> 
                </div>
            </div>
        </div>
    )

    const createProductForm = () => (
        <form >
          <span className='font-weight-bold'>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-dark">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="Choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select Category</option>
              {categories &&
                categories.map((cate ,index)=>(
                    <option key={index} value={cate._id}>{cate.name}</option>
                ))            
            }
            </select>
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-warning">
            Create Product
          </button>
        </form>
        
      );

    return (
        <Base title='Add Product' description='Enter the product details below'>
            <div className="container">
            {goback()}
            <p className='p-2'>{onSuccess()}{onError()}</p>
            <div className="container-fluid bg-success">
                <div className="row p-4">
                    <div className="col-10 offset-1">{createProductForm()}</div>
                </div>
            </div>
            </div>
        </Base>
    )
}
