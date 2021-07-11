import React, { useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import image from "./images.jpg";
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
    return (
        <div className="card" style={{ width: "18rem;", margin: "25px" }}>
            <div className="cards-dots">
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreHorizIcon fontSize="large" style={{ color: "red" }} />
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
                            <MenuItem>Delete</MenuItem>
                        </div>
                    </MenuItem>
                </Menu>
            </div>
            {show ? <PopupForm handleClose={handleClose} /> : null}
            <img
                src={"http://localhost:5000" + props.picture}
                className="card-img-top"
                alt="..."
            ></img>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <div className="title-region">
                    {/* <h5>{props.category}</h5> */}
                    <h5>category</h5>
                    <p className="text-muted">
                        <i class="mr bi-geo-alt-fill"></i>
                        {props.region}
                    </p>
                </div>
                <p className="card-text">{props.description}</p>
            </div>
            <div className="card-footer">
                <a className="links">website</a>
            </div>
        </div>
    );
}

// popup window
const PopupForm = ({ handleClose, SubmitPost }) => {
    //New Empty Object To get Post Value

    const [name, setName] = useState("");
    const [region, setRegion] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoriesO, setCategoriesO] = useState("");
    const [categoriesP, setCategoriesP] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState();

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
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="select-box">
                        <select
                            onChange={(e) => setCategoriesP(e.target.value)}
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
                        >
                            <option>Offers By Category</option>
                            <option value="Scholarships">Scholarships</option>
                            <option value="Job offers">Job offers</option>
                            <option value="Competitions">Competitions</option>
                            <option value="Events">Events</option>
                        </select>
                        <select onChange={(e) => setRegion(e.target.value)}>
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
                        placeholder="enter description"
                        className="input"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>Profile</label>
                    <input
                        type="text"
                        placeholder="enter Profile   "
                        className="input"
                    />
                    <label>Website</label>
                    <input
                        type="text"
                        placeholder="enter Web Site Url"
                        className="input"
                    />
                    <button className="button">Edit</button>
                </div>
            </div>
        </>
    );
};
