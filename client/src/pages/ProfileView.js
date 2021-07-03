import React from 'react'
import './ProfileView.css'
import {useState} from 'react'
import avatar from'../assets/avatar.png'
import ProfileCard from '../components/ProfileCard/ProfileCard'
import Popup from '../components/ProfileCard/Popup'

function ProfileView({data , newObject}) {
    
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    
    const [card , setCard] = useState([{
        description : "Lorem ipsum dolor sit amet consectetur adipisicing Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam tempora exercitationem repellat, a fuga eaque eum esse, non temporibus neque sunt numquam voluptatibus natus unde facilis, nesciunt nisi. Earum?",
        img:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/07_LSG_7338_010_Heidewald_Weg_durch_den_Wald_mit_alten_Robinien.jpg/1200px-07_LSG_7338_010_Heidewald_Weg_durch_den_Wald_mit_alten_Robinien.jpg",
    },])


    const SubmitPost=(newpost)=>{
           
            setCard([...card,newpost]);
            
            setShow(false);
         
        
    }


     
    
    return (
        <div className="container">

        <div className="profile">

        
            <div className="profile-image">
                <img className="profile_img" src={avatar} alt="profile_img"/>
            </div>
            
            <div className="Profile_desc">
        
                <div className="profile-user-settings">
            
                    <h1 class="profile-user-name">Hatem Kthiri</h1>
            
                    <button class="profile-edit-btn">Edit Profile</button>
                </div>
        
                <div className="profile-stats">
            
                    <ul>
                        <li><span class="profile-stat-count">164</span> publications</li>
                        <li><span class="profile-stat-count">188</span> abonnés</li>
                        <li><span class="profile-stat-count">206</span> abonnements</li>
                    </ul>
            
                </div>
        
                <div className="profile-bio">
                    <p>  Lorem ipsum dolor sit, amet consectetur adipisicing elit </p>
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

