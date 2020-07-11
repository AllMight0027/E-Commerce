import React, {useState} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper/index'
import { Link } from 'react-router-dom'
import { createStock } from './helper/adminapicall'

export default function UpdateStock({match}) {

    const {user, token} = isAuthenticated()

    const [values, setvalues] = useState({
        size:'',
        units:'',
        error: '',
        success:''
    })

    const {size, units, error, success} =values

    const handleChange = name => event =>{
        return(
            setvalues({...values, error: false, [name]:event.target.value})
        )
    }

    const onSubmit = event=>{
        event.preventDefault()
        setvalues({...values, error:false, success:false})

        createStock(match.params.productId, user._id, token, {size,units})
        .then(data=>{
            console.log(data)
            if(data.error) {
                setvalues({...values, error: data.error, success:false})
            }
            else{
                setvalues({...values,
                    error:'',
                    success: true,
                    size:'',
                    units:''
                })
            }
        })
        .catch(e=>console.log(e))
    }

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

    const goback = ()=>(
        <Link className='btn btn-outline-dark text-white btn-dark mt-3' to='/admin/dashboard'>Admin Home</Link>
    )

    return (
        <Base title='Create New Stock' description={``}>
            <div className='row bg-success p-4'>
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className='form-group'>
                            <label className='text-light font-weight-bold'>Enter Size</label>
                            <input onChange={handleChange('size')} value={size} className='form-control' type="text" autoFocus placeholder='Ex. XL'/>
                            <label className='text-light font-weight-bold'>Enter Units</label>
                            <input onChange={handleChange('units')} value={units} className='form-control' type="number" autoFocus placeholder='Ex. 40'/>
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
