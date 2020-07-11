import React, {useState} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper/index'

const Signup = () =>{

    const [values, setvalues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {firstname, lastname, email, password, error, success} = values

    const handleChange = name => event =>{
        return(
            setvalues({...values, error: false, [name]:event.target.value})
        )
    }

    const onSubmit = event =>{
        event.preventDefault()
        setvalues({...values, error:false})
        signup({firstname, lastname, email, password})
        .then(data=>{
            if(data.error){
                setvalues({...values, error: data.error, success: false})
            }
            else{
                setvalues({
                    ...values,
                    firstname:'',
                    email:'',
                    lastname:'',
                    success: true,
                    error:'',
                    password:''
                })
            }
        })
        .catch(e=>console.log(e))
    }

    const onSuccess = () =>(
        <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-success" style={{display: success ? "" : 'none'}}>
                New Account Created. <Link to='/signin'>Log in</Link>
            </div>
        </div>
    )

    const onError = () =>(
        <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-danger" style={{display: error ? "" : 'none'}}>
                {error}
            </div>
        </div>
    )

    const signupForm =() =>{
        return(
            <div className='row'>
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className='form-group'>
                            <label className='text-light'>First Name</label>
                            <input onChange={handleChange('firstname')} className='form-control' type="text" value={firstname}/>
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Last Name</label>
                            <input onChange={handleChange('lastname')} className='form-control' type="text" value={lastname}/>
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Email</label>
                            <input onChange={handleChange('email')} className='form-control' type="email" value={email}/>
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Password</label>
                            <input onChange={handleChange('password')} className='form-control' type="password" value={password}/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    return(
        <Base title='Sign Up Page' description='Signup here please'>
        {onError()}
        {onSuccess()}    
        {signupForm()}
        </Base>
    )
}

export default Signup;