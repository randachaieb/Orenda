import React, {useEffect} from 'react'
import './ProfileView.css'
import {useState} from 'react'
import avatar from'../assets/avatar.png'
import ProfileCard from '../components/ProfileCard/ProfileCard'
import Popup from '../components/ProfileCard/Popup'
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';
import { useHistory } from 'react-router'
import axios from 'axios'


function ProfileView({data , newObject}) {
    const authContext=useContext(AuthContext);
    let history =useHistory();
    function logout(){
    
        authContext.setAuth({})
        localStorage.removeItem('token');
     
        history.push('/')
    }




    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    
    const [card , setCard] = useState([])


     useEffect( async ()=>{
          axios.get('http://localhost:5000/api/v1/post', {
          headers:{
            'Content-Type':'multipart/form-data;',
            'x-auth-token': localStorage.getItem('token')
          }
        })

        .then((res)=> {
            console.log(res.data)
            const data=(res.data).reverse()
            setCard(data)


         } ).catch(err => err.message)
     

    },[])

    const SubmitPost=(newpost)=>{
           
         
            
            setShow(false);
         
        
    }


     
    
    return (
        <div className="container">
            {/* Photo Couverture */}
            <img className="photo_couverture" src="data:image/jpeg;base64,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" alt="couverture_image" />
            {/* Profile Image */}
            <img className="profile_img" src={avatar} alt="profile_img"/>
            {/* Profile Name */}
            <h1 class="profile-user-name">{authContext.user.name}</h1>
            
            <div className="profile">
                <div className="Profile_desc">
                    <div className="profile-stats">
                        {/* Profile Stat */}
                        <ul>
                            <li><span class="profile-stat-count">164</span> publications</li>
                            <li><span class="profile-stat-count">188</span> abonnés</li>
                            <li><span class="profile-stat-count">206</span> abonnements</li>
                        </ul>
                
                    </div>
                    {/* Bio  */}
                    <div className="profile-bio">
                        {authContext.user.bio ? <p>{ authContext.user.bio}</p>: <p>  you don't have bio </p>}
                        
                    </div>
                
                </div>
        
        </div>
        
        <button className="add_btn" onClick={handleShow} > Add Post </button>

        { show ? <Popup   handleClose={handleClose} SubmitPost={SubmitPost}   /> : null }

        <ProfileCard card={card} />
                 
        </div>
            )
}

    
    export default ProfileView

