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

function Profile({ data, newObject }) {
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
  const [user, setUser] = useState();
  const { username } = useParams();
  console.log(username);
  useEffect(async () => {
    axios
      .get(`/api/v1/user/profile/${username}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })

      .then((res) => {
        console.log(res.data);

        setUser(res.data);
        setCard(res.data.posts);
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

      {user ? (
        <>
          {user.profile.cover ? (
            <img
              className="photo_couverture"
              src={`${user.profile.cover}`}
              alt="couverture_image"
            />
          ) : (
            <img
              className="photo_couverture"
              src="https://www.anthedesign.fr/w2015/wp-content/uploads/2016/12/couleur-du-web-2017.jpg"
              alt="couverture_image"
            />
          )}

          {/* Profile Image */}

          <img
            className="profile_img"
            src={`${user.profile.picture}`}
            alt="profile_img"
          />
          {/* Profile Name */}
          <h1 className="profile-user-name">{user.profile.name}</h1>

          <div className="profile">
            <div className="Profile_desc">
              <div className="profile-stats">
                {/* Profile Stat */}
                <ul>
                  <li>
                    <span className="profile-stat-count">{card.length}</span>{" "}
                    publications
                  </li>
                  <li>
                    <span className="profile-stat-count">188</span> abonnés
                  </li>
                  <li>
                    <span className="profile-stat-count">206</span> abonnements
                  </li>
                </ul>
              </div>
              {/* Bio  */}
              <div className="profile-bio">
                {user.profile.bio ? <p>{user.bio}</p> : null}
              </div>
            </div>
          </div>

          <ProfileCard card={card} />
        </>
      ) : null}
    </div>
  );
}

export default Profile;
