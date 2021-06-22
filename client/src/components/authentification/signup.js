
import { useState } from 'react'
import { useHistory } from 'react-router'
import axios from "axios"
import avatar from '../../assets/avatar.png'
import './auth.css'

const Signup = ()=>{
    const[ name, setName]= useState('');
    const[ bio, setBio]= useState('');
    const[ email, setEmail]= useState('');
     const[ region, setRegion]= useState('');
     const[ address, setAddress]= useState('');
     
    const[ pass, setPass]= useState('');
    const router = useHistory();

 

    function handleSubmit(e) {
    e.preventDefault()
        console.log({name , bio, email, pass, address, region})
    axios({ method: 'POST', 
    url: 'http://localhost:5000/api/v1/user', 
    headers: { 'Content-Type': 'application/json'}, 
    data: {
    name: name,
    bio: bio,
    region: region,
    address: address,
    email: email,
    password: pass,
    "isAdmin": "false",
    "isPro": "false"} 
   
        }).then((res)=> {
           
                router.push('/')
           
        },
          (error) => {
                    console.log(error);
                })};

   return( <div className='items'>
    <div className='card-signup' >
        <div className='card-content'>
          
            <div className='avt'>
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
            <label className='center' >Create an account</label>
            </div>
            <div className='space-between'>
            <div className='inputs'>
            <input  className='form-ctrl mrg-input' placeholder='Full Name'  variant='filled' type='text' onChange={e=>setName(e.target.value)}/>
            <textarea  className='form-area mrg-input' placeholder='Bio'  variant='filled' type='text' onChange={e=>setBio(e.target.value)} />
            
            </div><div className='inputs'>
                <input  className='form-ctrl mrg-input' placeholder='Region'  variant='filled' type='text' onChange={e=>setRegion(e.target.value)} />
            <input  className='form-ctrl mrg-input' placeholder='Address'  variant='filled' type='text' onChange={e=>setAddress(e.target.value)} />
            <input  className='form-ctrl mrg-input' placeholder='Email'  variant='filled' type='email' onChange={e=>setEmail(e.target.value)}/>
            <input  className='form-ctrl mrg-input' placeholder='Password' variant='filled'  type='password' onChange={e=>setPass(e.target.value)}/>
           </div>
            </div>
            <button className='btn-login mrg' onClick={e=> handleSubmit(e)}>Sign up</button>
        </div>
        <div className="create-account">
            <div className='footer-card'>
             <span className='log' onClick={e=> router.push('/')} >I already have an account</span>
              
             </div>
        </div>
    </div></div>)
}
export default Signup