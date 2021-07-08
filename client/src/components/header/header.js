import { useHistory } from 'react-router'
import './header.css'
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import {Link} from 'react-router-dom'
import SearchBox from '../search-box/search-box';


function Header(){

    const authContext=useContext(AuthContext);
    let history =useHistory();
    function logout(){
    
        authContext.setAuth({})
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        history.push('/')
    }

   return(
        <nav className="navb ">
  <div className="container-nav">
    <h1 className="navbar-brand mb-0 h1">ORENDA</h1>
    { authContext.auth.email? (
        <>
                    <div className='search-b'>
                            <SearchBox/>
                        </div>
                        <div className="topnav">
                        <Link className="link-to-active" to="/">Cards</Link>
                        <Link className="link-to-active"to="/ProfileView" >Profile</Link>
                        <Link className="link-to-active"to="/ContactUs">Contact</Link>
                        <Link className="link-to-active"to="/Acceuil" >Home</Link>
                       <Link className='link' to="/ProfileView" >{authContext.auth.email}</Link>
                       <a className="linkbi"><i className=" bi bi-card-list"></i></a>
                   </div>
        </>           
               ):(<a className='link' href='/'>you need to login</a>)}
  </div>
</nav>)
}
export default Header