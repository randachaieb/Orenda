import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import './search.css'

function SearchBox (){
    const authContext = useContext(AuthContext);
    const img = "http://localhost:5000"+authContext.user.picture;
    return(
        <form className=" banner-search">
          
                <i className="mrgn bi-search "></i>
              
    <input type="search" list='name-profile' placeholder="Search from here" className="search-input"/>
       <datalist  id="name-profile" className='op-profile'>
                <div>
                    <img src={ img}/>
                     <option >
                 
                    {authContext.user.name}
            </option>
               </div>
</datalist>
           </form>
    )

}

export default SearchBox 