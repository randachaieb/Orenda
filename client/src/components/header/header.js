


import { useHistory } from 'react-router'
import './header.css'
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';


function Header(){

    const authContext=useContext(AuthContext);
    let history =useHistory();
    function logout(){
    
        authContext.setAuth({})
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        history.push('/')
    }

   return( <nav className="navb ">
  <div className="container-nav">
    <h1 className="navbar-brand mb-0 h1">ORENDA</h1>
    { authContext.auth.email? (
                 
                        <div className="topnav">
                        <a className="active" href="#">Home</a>
                        <a href="/profile">Profile</a>
                        <a href="/contact">Contact</a>
                        <a href="/about">About</a>

                       <a className='link'  onClick={logout} >{authContext.auth.email}</a>
                        <a className="linkbi"><i className=" bi bi-card-list"></i></a>
                
                   </div>
                   
               ):(<a className='link' href='/'>you need to login</a>)}
  </div>
</nav>)
}
export default Header