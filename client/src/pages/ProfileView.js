import React, { useEffect } from "react";
import "./ProfileView.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useState } from "react";
import avatar from "../assets/avatar.png";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import Popup from "../components/ProfileCard/Popup";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import CoverPopup from "../components/Slider/uploadCover";
import UpdateProfile from "../components/update-user/updateProfile";
import { useParams } from "react-router-dom";

function ProfileView({ data, newObject }) {
    const authContext = useContext(AuthContext);
    let history = useHistory();
    function logout() {
        authContext.setAuth({});
        localStorage.removeItem("token");

        history.push("/");
    }

    const [show, setShow] = useState(false);
    const [showUp, setShowUp] = useState(false);
    const [showPro, setShowPro] = useState(false);
    const [upcover, setCover] = useState();
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleShowUp = () => setShowUp(true);
    const handleCloseUp = () => setShowUp(false);

    const handleShowProfile = () => setShowPro(true);
    const handleCloseProfile = () => setShowPro(false);

    const [card, setCard] = useState([]);
    const [user, setuser] = useState();
    const { username } = useParams();

    useEffect(async () => {
        axios
            .get("http://localhost:5000/api/v1/post", {
                headers: {
                    "Content-Type": "multipart/form-data;",
                    "x-auth-token": localStorage.getItem("token"),
                },
            })

            .then((res) => {
                console.log(res.data);
                const data = res.data.reverse();
                setCard(data);
            })
            .catch((err) => err.message);
        
     
    }, []);

    const SubmitPost = (newpost) => {
        setShow(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const close = () => {
        setAnchorEl(null);
    };


     


    return (
        <div className="container">
            {/* Photo Couverture */}
            <div className="icon">
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreHorizIcon fontSize="large" style={{ color: "#4287f5" }} />
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
                        <div className="Menu_Item">
                            <MenuItem>
                                <label
                                    style={{
                                        fontSize: "16px",
                                        cursor: "pointer",
                                    }}
                                    onClick={handleShowUp}
                                >
                                   
                                    Upload
                                </label>
                            </MenuItem>

                            <MenuItem>Delete</MenuItem>
                        </div>
                    </MenuItem>
                </Menu>
            </div>
            {authContext.user.cover ?
                <img
                className="photo_couverture"
                src={'http://localhost:5000'+authContext.user.cover}
                alt="couverture_image"
                /> :
                <img
                className="photo_couverture"
                src="https://www.anthedesign.fr/w2015/wp-content/uploads/2016/12/couleur-du-web-2017.jpg"
                alt="couverture_image"
            />
              }
           

            {/* Profile Image */}
            
            <img className="profile_img" src={'http://localhost:5000'+authContext.user.picture} alt="profile_img" />
            {/* Profile Name */}
            <h1 className="profile-user-name">{authContext.user.name}</h1>

            <div className="profile">
                <div className="Profile_desc">
                    <div className="profile-stats">
                        {/* Profile Stat */}
                        <ul>
                            <li>
                                <span className="profile-stat-count">{ card.length}</span>{" "}
                                publications
                            </li>
                            <li>
                                <span className="profile-stat-count">188</span>{" "}
                                abonnés
                            </li>
                            <li>
                                <span className="profile-stat-count">206</span>{" "}
                                abonnements
                            </li>
                        </ul>
                    </div>
                    {/* Bio  */}
                    <div className="profile-bio">
                        {authContext.user.bio ? (
                            <p>{authContext.user.bio}</p>
                        ) : (
                            <p> you don't have bio </p>
                        )}
                        {authContext.user.address ? (
                            <p>Address : {authContext.user.address}</p>
                        ) : null}
                         {authContext.user.region ? (
                            <p>Region : {authContext.user.region}</p>
                        ) :null}
                        
                    </div>
                    <div className='edit-profile'>
                         <button type='submit' onClick={handleShowProfile} className='btn-edit'><i className="bi bi-pencil-square mr-2"></i>Edit Profile</button>
                   </div>
                </div>
            </div>

            <button className="add_btn" onClick={handleShow}>
                {" "}
                Add Post{" "}
            </button>

            {show ? (
                <Popup handleClose={handleClose} SubmitPost={SubmitPost} />
            ) : null}

            {showUp ? (
                <CoverPopup handleCloseUp={handleCloseUp} />
            ) : null}

            {showPro ? (
                <UpdateProfile handleCloseProfile={handleCloseProfile}
                    Pname={authContext.user.name}
                    Pbio={authContext.user.bio}
                    Paddress={authContext.user.address}
                    Pregion={authContext.user.region}
                />
            ) : null}

            <ProfileCard card={card} />
        </div>
    );
}

export default ProfileView;
