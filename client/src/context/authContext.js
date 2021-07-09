import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const AuthContext=React.createContext();
export  function AuthProvider(props){
    const [auth, setAuth]=useState({
      
    });
    const [user, setUser]=useState({
      
    });


    useEffect ( async()=>{
     
     
        const token=localStorage.getItem('token');

        if(token){
            setAuth({ token });
            axios.get('http://localhost:5000/api/v1/user/me', {
          headers:{
            'Content-Type':'multipart/form-data;',
            'x-auth-token': localStorage.getItem('token')
          }
        })

        .then((res)=> {
            console.log(res.data)
            setUser(res.data)
            

         } ).catch(err => err.message)
        }
    }, [])

    return(
        <AuthContext.Provider value={{auth, setAuth, user, setUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}