import React, { useContext, useState } from "react";
import "./ProfileCard.css";
import axios from "axios"
import { AuthContext } from "../../context/authContext";
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
function ProfileCard({ card }) {
    return (
        <main>
                    <div className="container">
            
                    <div className="gallery">
            {card.map((card, index) => {
                return (
                   
                <Card key={index} card={card} />
               
                );
            })}
        </div></div></main>
                
    );
}


export default ProfileCard;

const Card = ({ card }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const authContext = useContext(AuthContext);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const close = () => {
        setAnchorEl(null);
    };
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const deletePost = (e, idC) => {
        e.preventDefault()
        console.log(idC)

        console.log(idC)
        axios.delete('http://localhost:5000/api/v1/post/delete', {
            data: { "id": idC }, // or data: jdId, depending on how you handle it in the back end
            headers: {
                'Content-Type': 'Application/json',
                'x-auth-token': localStorage.getItem('token'),
            }
        })

            .then((res) => {
                console.log(res.data)
                window.location.reload(false);


            }).catch(err => err.message);

    }


    return (
     
        
            <div className="gallery-item" tabindex="3">
        
        <img    src={"http://localhost:5000" + card.link} className="gallery-image" alt=""/>
               
                <div className="gallery-item-info">
              
                    <ul>
                        <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><FavoriteIcon/> 56</li>
                        <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><CommentIcon/> 2</li>
                
                  
                    </ul>
                    <ul>
                    <li className="gallery-item-likes"  onClick={handleShow}><EditIcon/> </li>
                        <li className="gallery-item-comments" onClick={e=>deletePost(e, card._id)}><DeleteIcon/> </li>

                    </ul>
        
                </div>
               
        
            </div>
        
            
        
    );
};

const Repost = ({ handleClose,id, text, picture }) => {
    const [txt, setTxt] = useState(text);
    const [link, setLink] = useState();


    const handleSubmit = (e,id) => {

        e.preventDefault();
        //console.log(name, region, description, categoriesP, categoriesO, picture)
        const params = new FormData();

        params.append("text", txt);
     


        const token = localStorage.getItem('token');
        console.log(token)
        for (var value of params.values())
        {
            console.log(value);
        }


        axios.patch(`http://localhost:5000/api/v1/post/update/${ id }`, params,{
            headers: {
                'Content-Type': 'multipart/form-data',

                'x-auth-token': localStorage.getItem('token')
            }
        })

            .then((res) => {
                console.log(res.data)
                window.location.reload(false);


            }).catch(err => err.message);

    }

    return (
        <>
            <div classNameName="form-popup">
                <div classNameName="form-container">
                    <button
                        type="button"
                        classNameName="close btn-close"
                        onClick={handleClose}
                    />
                    <label classNameName="title-label">
                        <b> Edit Post</b>
                    </label>
                    <div classNameName="desc-field">
                        <textarea
                            classNameName="field-description"
                            name="description"
                            placeholder=" Write Here .. "
                            value={txt}
                            onChange={e=> setTxt(e.target.value)}
                        />
                    </div>
                   
                    <button classNameName="button" onClick={e=> handleSubmit(e,id)}>Edit</button>
                </div>
            </div>
        </>
    );
};
