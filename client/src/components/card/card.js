import React, { useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import image from "./images.jpg";
import axios from 'axios'
import "./cards.css";
export default function Card(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const close = () => {
        setAnchorEl(null);
    };
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const deleteCard = (e, idC) => {
        e.preventDefault()
        console.log(idC)
        
        console.log(idC)
        axios.delete('http://localhost:5000/api/v1/card/card_delete', {"id": idC},  { 
          headers:{
                'Content-Type': 'Application/json',
                'x-auth-token': localStorage.getItem('token')
          }
        })

        .then((res)=> {
            console.log(res.data)
            window.location.reload(false);


         } ).catch(err => err.message);
        
    }

    return (
        <div className="card" style={{ width: "18rem;", margin: "25px" }}>
            <div className="cards-dots">
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreHorizIcon fontSize="large" style={{ color: "#333332" }} />
                </IconButton>

                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={close}
                    PaperProps={{
                        style: {
                            marginLeft: "1%",
                            marginTop: "4.6%",
                            maxHeight: 48 * 4.5,
                            width: "20ch",
                            display: "flex",
                            flexDirection: "column",
                        },
                    }}
                >
                    <MenuItem onClick={close}>
                        <div className="UP_Menu_Item">
                            <MenuItem onClick={handleShow}>Edit</MenuItem>
                            <MenuItem onClick={e=>deleteCard(e, props.id)}>Delete</MenuItem>
                        </div>
                    </MenuItem>
                </Menu>
            </div>
            {show ? <PopupForm handleClose={handleClose}
                idCard={props.id}
                nameCard={props.name}
                regionCard={props.region}
                categoryCard={props.category}
                descriptionCard={props.description}
                piCard={props.picture}
                /> : null}
            <img
                src={"http://localhost:5000" + props.picture}
                className="card-img-top"
                alt="..."
            ></img>
            <div className="card-body">
               
                <div className="title-region">
                    {/* <h5>{props.category}</h5> */ }
 <h5 className="card-title">{props.name}</h5>
                   
                    <p className="text-muted">
                        <i class="mr bi-geo-alt-fill"></i>
                        {props.region}
                    </p>
                </div>
               
                <p className="card-text">{props.description.replace(/^(.{70}[^\s]*).*/, "$1")}</p>
                 <span className='cat'>{props.category[0]}</span>
                 {props.category[1]?
                <span className='cat'>{props.category[1]}</span> :null
                }
                
            </div>
            <div className="bottom">
                <a className="links"> <i class="bi bi-display"></i> view website</a>
            </div>
            
        </div>
    );
}

// popup window
const PopupForm = ({ handleClose, SubmitPost, idCard, nameCard, regionCard, categoryCard, descriptionCard, piCard }) => {
    //New Empty Object To get Post Value

    const [name, setName] = useState(nameCard);
    const [region, setRegion] = useState(regionCard);
    const [categoriesO, setCategoriesO] = useState(categoryCard[0]);
    const [categoriesP, setCategoriesP] = useState(categoryCard[1]);
    const [description, setDescription] = useState(descriptionCard);
    const [picture, setPicture] = useState();

 console.log(nameCard, regionCard, descriptionCard,categoryCard,piCard, idCard)
        const handleSubmit = (e, idCard) => {
        
            e.preventDefault();
            const cat = [categoriesO, categoriesP];
            console.log(cat)
       
        const params = new FormData();
        params.append("categories[]",cat[0]);
        params.append("categories[]",cat[1]);
        params.append("name", name);
        params.append("region", region);
            params.append("description", description);
            if (picture)
            {
                params.append("picture", picture);
            }
        
        const token = localStorage.getItem('token');
        console.log(token)
        for (var value of params.values()) {
   console.log(value);
}
        

        axios.patch(`http://localhost:5000/api/v1/card/update/${idCard}`,params, {
          headers:{
                'Content-Type': 'multipart/form-data;',
                
                'x-auth-token': localStorage.getItem('token')
          }
        })

        .then((res)=> {
            console.log(res.data)
            window.location.reload(false);


         } ).catch(err => err.message);
     
    }
   

    return (
        <>
            <div className="form-pop">
                <div className="content">
                    <button
                        type="button"
                        class="close btn-close"
                        onClick={handleClose}
                    />
                    <input
                        type="file"
                        placeholder="enter img"
                        
                        onChange={(e) => setPicture(e.target.files[0])}
                    />
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="enter title"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="select-box">
                        <select
                            onChange={(e) => setCategoriesP(e.target.value)}
                            value={categoriesP}
                        >
                            <option>Places By Category</option>
                            <option value="Training centers">
                                Training centers
                            </option>
                            <option value="Schools">Schools</option>
                            <option value="Coworking places">
                                Coworking places
                            </option>
                            <option value="Clubs">Clubs</option>
                        </select>
                        <select
                            id="browsers3"
                            aria-label="Default select example"
                            onChange={(e) => setCategoriesO(e.target.value)}
                            value={categoriesO}
                        >
                            <option>Offers By Category</option>
                            <option value="Scholarships">Scholarships</option>
                            <option value="Job offers">Job offers</option>
                            <option value="Competitions">Competitions</option>
                            <option value="Events">Events</option>
                        </select>
                        <select onChange={(e) => setRegion(e.target.value)}
                        value={region}
                        >
                            <option>Region</option>
                            <option value="Tunis">Tunis</option>
                            <option value="Sousse">Sousse</option>
                            <option value="Sfax">Sfax</option>
                            <option value="Monastir">Monastir</option>
                        </select>
                    </div>
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        placeholder="enter description"
                        className="input"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                   
                    <label>Website</label>
                    <input
                        type="text"
                        placeholder="enter Web Site Url"
                        className="input"
                    />
                    <button className="button" onClick={e=>handleSubmit(e, idCard)}>Edit</button>
                </div>
            </div>
        </>
    );
};
