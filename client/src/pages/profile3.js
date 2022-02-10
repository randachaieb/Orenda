import React, { useEffect } from "react";
import "./ProfileView.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import HeartIcon from '@material-ui/icons/Favorite';
import UnfollowIcon from '@material-ui/icons/FavoriteBorder';
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

function Profile3({ data, newObject }) {
  const authContext = useContext(AuthContext);
  let history = useHistory();
  function logout() {
    authContext.setAuth({});
    localStorage.removeItem("token");

    history.push("/");
  }

  const [disableFollowButton, setDisableFollowButton] = useState(false)
  const [show, setShow] = useState(false);
  const [showUp, setShowUp] = useState(false);
  const [showPro, setShowPro] = useState(false);
  const [upcover, setCover] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleShowUp = () => setShowUp(true);
  const handleCloseUp = () => setShowUp(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null)

  const handleShowProfile = () => setShowPro(true);
  const handleCloseProfile = () => setShowPro(false);

  // const [card, setCard] = useState([]);
  const [user, setUser] = useState();
  const { id } = useParams();
  
  useEffect(async () => {
    axios
      .get(`/api/v1/user/profile/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })

      .then((res) => {
        console.log(res.data);

        setUser(res.data);
        console.log('swsws', res.data)
        // setCard(res.data.posts);
      })
      .catch((err) => err.message);
  }, []);

  useEffect(async () => {

    axios
        .get(`/api/v1/user/profile/${id}`, {
            headers: {

                "x-auth-token": localStorage.getItem("token")
            }
        })

        .then((res) => {
            console.log("user", authContext.user, res.data);
            setProfile(res.data)
        })
        .catch((err) => {
            setError(err.response.data.message)
        })
    // fetchPosts()

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




  const handleFollow = async () => {
    setDisableFollowButton(true)
    try {
        const res = await axios.post(`http://localhost:5000/api/v1/user/follow/${profile._id}`,
            {
              "_id": `${profile._id}`
            }, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
        if (res.status === 200) {
            authContext.setUser({
                ...authContext.user,
                following: [...authContext.user.following, profile._id]
            })
            setProfile({ ...profile, followers: profile.followers + 1 })
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        setDisableFollowButton(false)
    }

}
const handleUnfollow = async () => {
    setDisableFollowButton(true)
    try {
        const res = await axios.post(`http://localhost:5000/api/v1/user/unfollow/${profile._id}`,
            null, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
        if (res.status === 200) {
            console.log("success");
            const updatedFollowing = authContext.user.following
                .filter(userId => userId !== profile._id)
            authContext.setUser({
                ...authContext.user,
                following: updatedFollowing
            })
            setProfile({ ...profile, followers: profile.followers - 1 })

        }
    } catch (error) {
        console.log(error);
    }
    finally {
        setDisableFollowButton(false)
    }
}

  return (
    <div className="container">
      {/* Photo Couverture */}

      {console.log('user :',user)}

      {user ? (
        <>
          {user.picture ? (
            <img
              className="photo_couverture"
              src={`${user.picture}`}
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
            src={`${user.picture}`}
            alt="profile_img"
          />
          {/* Profile Name */}
          <h1 className="profile-user-name">{user.name}</h1>
          {(profile._id !== authContext.user._id) && (authContext.user.following.includes(profile._id) ?
                        <Button variant="outlined" color="secondary"
                            startIcon={<UnfollowIcon />}
                            onClick={handleUnfollow}
                        >
                            Unfollow
                    </Button> :
                        <Button variant="outlined" color="secondary"
                            startIcon={<HeartIcon />}
                            disabled={disableFollowButton}
                            onClick={handleFollow}

                        >
                            Follow
                    </Button>)}

          <div className="profile">
            <div className="Profile_desc">
              <div className="profile-stats">
                {/* Profile Stat */}
                <ul>
                  <li>
                    {/* <span className="profile-stat-count">{card.length}</span>{" "} */}
                   16 posts
                  </li>
                  <li>
                    <span className="profile-stat-count">188</span> followers
                  </li>
                  <li>
                    <span className="profile-stat-count">206</span> following
                  </li>
                </ul>
              </div>
              {/* Bio  */}
              <div className="profile-bio">
                {user.bio ? <p>{user.bio}</p> : null}
              </div>
            </div>
          </div>

          {/* <ProfileCard card={card} /> */}
        </>
      ) : null}
    </div>
  );
}

export default Profile3;
