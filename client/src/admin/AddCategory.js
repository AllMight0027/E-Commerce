import React, {useState} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper/index'
import { Link } from 'react-router-dom'
import { postCategory } from './helper/adminapicall'




export default function AddCategory() {

    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated()

    const handleChange =(event) =>{
        setError('');
        setName(event.target.value)
        setSuccess(false)
    } 
       
    const onSubmit = event=>{
        event.preventDefault()
        setSuccess(false)
        setError('')
        
        postCategory(user._id, token, {name: name})
        .then(data=>{
            if(data.error) {
                setError(data.error)
            }
            else{
                setError('')
                setSuccess(true)
                setName('')
            }
        })
        .catch(e=>console.log(e))
    }

    const goback = ()=>(
        <Link className='btn btn-warning mt-3' to='/admin/dashboard'>Admin Home</Link>
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
            <div className="alert alert-dark text-success" style={{display: success ? "" : 'none'}}>
                Added Successfully
            </div>
        </div>
    )

    return (
        <Base title='Add Category' description='' className='container'>
            <div className='row bg-success p-4'>
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className='form-group'>
                            <label className='text-light font-weight-bold'>Category Name</label>
                            <input onChange={handleChange} value={name} className='form-control' type="text" autoFocus placeholder='Ex. Shoes'/>
                        </div>
                        <button onClick={onSubmit}  className="btn btn-danger btn-block" type="submit">Submit</button>
                        {goback()}
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <br/>
                    <br/>
                    {onSuccess()}
                    {onError()}
                </div>
            </div>
        </Base>
    )
}
