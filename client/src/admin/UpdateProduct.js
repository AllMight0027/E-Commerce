import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper/index'
import { Link } from 'react-router-dom'
import { getCategories, updateProduct, getProduct } from './helper/adminapicall'

const UpdateProduct =({match}) => {

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
        updateProduct(match.params.productId,user._id, token, formData)
        .then(data=>{
            if(data.error){
                setvalues({...values, error: data.error})
            }
            else{
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

    const preload = (productId) =>{
        getProduct(productId).then(data=>{
            if(data.error){
                setvalues({...values, error:'Failed to load categories'})
            }
            else{
                preloadCategories()
                setvalues({
                    ...values, 
                    name:data.name, 
                    description:data.description, 
                    price:data.price, 
                    category: data.category._id, 
                    formData: new FormData()
                })
                
            }
        })
        .catch(e=>console.log(e))
    }

    const preloadCategories = () =>{
        getCategories().then(data=>{
            console.log(data)
            if(data.error){
                setvalues({...values, error:'Failed to load categories'})
            }
            else{
                setvalues({formData: new FormData(), categories: data})
            }
        })
        .catch(e=>console.log(e))
    }

    useEffect(()=>{
        preload(match.params.productId);
        // eslint-disable-next-line
    },[])

    const goback = ()=>(
        <Link className='btn text-dark btn-warning mt-3' to='/admin/products'>Manage Products</Link>
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
                  <div className="col-sm-12 text-left">{createdProduct} Updated Successfully</div>
                </div>
            </div>
        </div>
    )

    const updateStock = ()=>(
        <Link className='btn text-dark btn-warning mt-3 font-weight-bold' to={`/admin/product/stock/update/${match.params.productId}`}>Add New Stock</Link>
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
            Update Product
          </button>
        </form>
        
      );

    return (
        <Base title='Update Product' description='Edit the desired fields'>
            <div className="container">
            {goback()}
            <div className="row offset-1 text-right"><div className="col-10 text-right">{updateStock()}</div></div></div>
            <p className='p-2 '>{onSuccess()}{onError()}</p>
            <div className="container bg-success">
                <div className="row p-4">
                    <div className="col-10 offset-1">{createProductForm()}</div>
                </div>
            </div>
        </Base>
    )
}


export default UpdateProduct