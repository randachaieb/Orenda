import { useHistory } from 'react-router'
import './header.css'
import { AuthContext } from '../../context/authContext';
import { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import SearchBox from '../search-box/search-box';


function Header(){

    const authContext = useContext(AuthContext);
    const [isAuth, setIsauth]=useState(false)
    let history =useHistory();
    function logout(){
    
        authContext.setAuth({})
        localStorage.removeItem('token');
        window.location.reload(false);
       
    }

  

   return(
        <nav className="navb ">
  <div className="container-nav">
    
    { authContext.auth.token? (
        <>
                       <div className='search-b'>
                           <h1 className="navbar-brand mb-0 h1">ORENDA</h1>
                            <SearchBox/>
                        </div>
                        <div className="topnav">
                        <Link className="link-to-active" to="/">Cards</Link>
                       
                        <Link className="link-to-active"to="/" >Home</Link>
                       <Link className='link-to-active' to="/ProfileView" >{authContext.user.name}</Link>
                       <Link className="link-to-active" to="/"  onClick={()=>logout()}>Logout</Link>
                   </div>
        </>           
               ) : (
                       <div className="container-nav">
                           <h1 className="navbar-brand mb-0 h1">ORENDA</h1>
                   <a className='link' href='/Siginin'>you need to login</a></div>)}
  </div>
</nav>)
}
export default Header