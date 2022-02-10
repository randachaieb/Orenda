import React, { useEffect } from "react";
import "./ProfileView.css";
import InfiniteScroll from 'react-infinite-scroll-component';
import Button from '@material-ui/core/Button';
import HeartIcon from '@material-ui/icons/Favorite';
import UnfollowIcon from '@material-ui/icons/FavoriteBorder';
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
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

    const [disableFollowButton, setDisableFollowButton] = useState(false)
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
    const [error, setError] = useState(null)
    const [card, setCard] = useState([]);
    const [total, setTotal] = useState(null)
    const [profile, setProfile] = useState(null);
    //how many posts to fetch at a time
    const limit = 3;
    const [page, setPage] = useState(0)
    const { id } = useParams();
    const fetchPosts = async () => {
        axios
            .get(`http://localhost:5000/api/v1/user/posts/${id}?limit=${limit}&page=${page}`, {
                headers: {

                    "x-auth-token": localStorage.getItem("token")
                }
            })

            .then((res) => {
                if (page == 0) {
                    setTotal(res.data.total)
                    setCard(res.data.posts)
                }
                else {
                    // let previousData = card
                    setCard([...card, ...res.data.posts])
                }
                setPage(page + 1)


            })
            .catch((err) => err.message)


    }
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
                // setError(err.response.data.message)
            })
        fetchPosts()


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
                null, {
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

            {profile ?

                <>
                    {
                        profile.cover ?
                            <img
                                className="photo_couverture"
                                src={"http://localhost:5000" + profile.cover}
                                alt="couverture_image"
                            /> :
                            <img
                                className="photo_couverture"
                                src="https://www.anthedesign.fr/w2015/wp-content/uploads/2016/12/couleur-du-web-2017.jpg"
                                alt="couverture_image"
                            />
                    }




                    {/* Profile Image */}
                    <img className="profile_img" src={'http://localhost:5000' + profile.picture} alt="profile_img" />
                    {/* Profile Name */}
                    <h1 className="profile-user-name">{profile.name}</h1>
                    {/* && (authContext.user.following.includes(profile._id) */}
                    {(profile?._id !== authContext.user._id)  ?
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
                    </Button>
                    
                    }

                    <div className="profile">
                        <div className="Profile_desc">
                            <div className="profile-stats">
                                {/* Profile Stat */}
                                <ul>
                                    <li>
                                        <span className="profile-stat-count">{total}</span>{" "}
                                Posts
                            </li>
                                    <li>
                                        <span className="profile-stat-count">{profile.followers} </span>{" "}
                                Followers
                            </li>
                                    <li>
                                        <span className="profile-stat-count"> {profile.following}  </span>{" "}
                                Following
                            </li>
                                </ul>
                            </div>
                            {/* Bio  */}
                            <div className="profile-bio">
                                {profile.bio ? (
                                    <p>{profile.bio}</p>
                                ) : (
                                    null
                                )}
                                {profile.address ? (
                                    <p>Address : {profile.address}</p>
                                ) : null}
                                {profile.region ? (
                                    <p>Region : {profile.region}</p>
                                ) : null}

                            </div>

                        </div>
                    </div>


                    {/* <ProfileCard card={card} /> */}

                </> : null}
            {error && <p>{error}</p>}
            {card ?
                <InfiniteScroll
                    dataLength={total}
                    next={fetchPosts}
                    hasMore={!(page == Math.ceil(total / limit))}

                >
                    {<ProfileCard card={card} />}
                </InfiniteScroll>



                : null}


        </div>
    );
}

export default Profile;