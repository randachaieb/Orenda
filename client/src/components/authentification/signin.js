 



import { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { AuthContext } from '../../context/authContext';
import avatar from '../../assets/avatar.png'
import axios from 'axios';
import './auth.css'
const Signin = ()=>{

    const router = useHistory()
    const[ email, setEmail]= useState('');
    const[ error, setError]= useState('');
     const[ token, setToken]= useState('');
    const[ password, setPass]= useState(''); 
    const authContext=useContext(AuthContext);
    function login(){
       
        const data={email, password}
         console.log(data)
       axios({ method: 'POST', 
    url: 'http://localhost:5000/api/v1/auth', 
    headers: { 'Content-Type': 'application/json'}, 
    data:data
        }).then ((res)=>{
           console.log(res.data)
            setToken(res.data.token)
            localStorage.setItem('token', token);
            localStorage.setItem('email',email);
            
        })
        if(token=='' ){
            setError('Wrong details!')
        }
        authContext.setAuth({token,email})
    }

   return( <div className='items'>
    <div className='card-signin' >
      
      <div className='card-content'>
        
         
            <div className=' avt'>
                 <div className='av-align'>
            <img
        src={avatar}
        className='avatar'
        alt="Login"
        width={110}
        height={110}
      />
      </div>
      </div> 
      <div className='mrg'>
            <label className='center' >Log in to your account </label>
            
            </div>
            <input  className='form-ctrl mrg-input' placeholder='Email'  variant='filled' mb={3} type='email' onChange={e=>setEmail(e.target.value)}/>
            <input  className='form-ctrl mrg-input' placeholder='Password' variant='filled' mb={6} type='password' onChange={e=>setPass(e.target.value)}/>
            {
                  error!=''?
                  <div class="alert alert-danger" role="alert">
         {error}
        </div> : null
                }
           
            <button className='btn-login mrg' onClick={e=>login(e)}>Login</button>
        </div>
        <div className="create-account">
            <div className='footer-card'>
             <span className='log' onClick={e=> router.push('/signup')} >Create an account</span>
              <span className='log' onClick={e=> router.push('/forgot')}  >Forgot password?</span>
             </div>
        </div>
        </div>
    </div>)
}
export default Signin