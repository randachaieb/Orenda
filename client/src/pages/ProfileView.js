import React, { useEffect } from "react";
import "./ProfileView.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import Popup from "../components/ProfileCard/Popup";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import CoverPopup from "../components/Slider/uploadCover";
import UpdateProfile from "../components/update-user/updateProfile";
import { useParams } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
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
      .get("/api/v1/post", {
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
    <div className="containerProfile">
      {authContext.user.cover ? (
        <div class="cover" style={{ background: "no-repeat" }}>
          <img src={authContext.user.cover} alt="profile-picture" />
          <button
            class="glyphicon glyphicon-edit edit_cover_btn"
            onClick={handleShowUp}
            title="edit cover photo"
          >
            Edit cover photo
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="column is-12 has-text-centered">
        <img
          className="profile-picture"
          src={authContext.user.picture}
          alt="profile-picture"
        />
        {/* Profile Name */}
        <h1 className="profile-user-name">{authContext.user.name}</h1>
      </div>{" "}
      {/* Bio  */}
      <div class="profile-bio">
        {authContext.user.bio ? (
          <p>{authContext.user.bio}</p>
        ) : (
          <p> you don't have bio </p>
        )}
      </div>
      <div className="profile">
        <div>
          <button className="btn profile-edit-btn" onClick={handleShowProfile}>
            Edit Profile
          </button>
        </div>

        <div className="profile-stats ">
          <ul>
            <li>
              {" "}
              <span className="profile-stat-count">{card.length}</span> posts
            </li>
            <li>
              <span className="profile-stat-count">188</span> followers
            </li>
            <li>
              <span className="profile-stat-count">206</span> following
            </li>
          </ul>
        </div>
      </div>
      <div className="icon ">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <HighlightOffIcon fontSize="large" style={{ color: "#000" }} />
        </IconButton>
      </div>
      <a class=" profile-edit-btn" onClick={handleShow}>
        <AddIcon />
        Add Post
      </a>{" "}
      <br />
      {show ? (
        <Popup handleClose={handleClose} SubmitPost={SubmitPost} />
      ) : null}
      {showUp ? <CoverPopup handleCloseUp={handleCloseUp} /> : null}
      {showPro ? (
        <UpdateProfile
          handleCloseProfile={handleCloseProfile}
          Pname={authContext.user.name}
          Pbio={authContext.user.bio}
        />
      ) : null}
      <ProfileCard card={card} />
    </div>
  );
}

export default ProfileView;
