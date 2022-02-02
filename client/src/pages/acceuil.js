import React, { useEffect, useState } from "react";
import "./ProfileView.css";
import InfiniteScroll from 'react-infinite-scroll-component';

import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
export default function Acceuil() {
    const authContext = useContext(AuthContext);
    const [total, setTotal] = useState(null)
    const limit = 3;
    const [page, setPage] = useState(0)

    const [data, setData] = useState([])
    const fetchPosts = async () => {
        axios
            .get(`http://localhost:5000/api/v1/post?limit=${limit}&page=${page}`, {
                headers: {

                    "x-auth-token": localStorage.getItem("token")
                }
            })

            .then((res) => {
                if (page == 0) {
                  // console.log("tok", res.data)
                    setTotal(res.data.length)
                    // we reverse the data so the most recent post shows at top
                    setData(res.data.reverse())
                }
                else {
                    // let previousData = card
                    setData([...data, ...res.data.posts])
                }
                setPage(page + 1)


            })
            .catch((err) => err.message)


    }
    useEffect(async () => {
        fetchPosts()

    }, []);

    //New Empty Object To get Post Value
    const [text, setText] = useState("");
    const [link, setLink] = useState();

    const handleSubmit = (e) => {

        e.preventDefault();
        //console.log(name, region, description, categoriesP, categoriesO, picture)
        const params = new FormData();

        params.append("text", text);
        if (link)
        {
            params.append("link", link );
        }


        const token = localStorage.getItem('token');
        console.log(token)
        for (var value of params.values()) {
            console.log(value);
        }


        axios.post('http://localhost:5000/api/v1/post',params, {
            headers:{
                'Content-Type': 'multipart/form-data',

                'x-auth-token': localStorage.getItem('token')
            }
        })

            .then((res)=> {
                console.log('response posting article',res.data)
                window.location.reload(false);
            } ).catch(err => err.message);

    }

    const formatDate = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let today = new Date(date);
        return `${today.getDate()} ${monthNames[today.getMonth()]} , ${today.getHours()} : ${today.getMinutes()}`;
    }



    return (
        <div className="theme-layout">



            <section>

                <div className="gap gray-bg">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row" id="page-contents">
                                    <div className="col-lg-2">
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="central-meta">
                                            <div className="new-postbox">
                                                <figure>
                                                    {/* Profile Image */}
                                                    <img className='avatar' src={'http://localhost:5000' + authContext.user.picture} alt="profile_img" />
                                                </figure>
                                                <div className="newpst-input">
                                                    <form method="post">
                                                        <textarea rows="2" placeholder="write something" onChange={(e)=>setText( e.target.value) }></textarea>
                                                        <div className="attachments">
                                                            <ul>
                                                                <li>
                                                                    <i className="fa fa-image"></i>
                                                                    <label className="fileContainer">
                                                                        <input type="file" onChange={(e)=> {setLink( e.target.files[0]); console.log('ing', e.target.files[0].name)}}/>
                                                                  
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <button type="submit" onClick={(e)=>handleSubmit(e)}>Post</button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="loadMore">
                                            <InfiniteScroll
                                                dataLength={total}
                                                next={fetchPosts}
                                                hasMore={!(page == Math.ceil(total / limit))}
                                          
                                            >
                                              {console.log(!(page == Math.ceil(total / limit)))}
                                                { data.map((d) => (
                                                    <div key={d._id} className="central-meta item">
                                                        <div className="user-post">
                                                            <div className="friend-info">
                                                                <figure>
                                                                    {/* <img className='avatar' src={'http://localhost:5000' + d.user_id.picture} alt="avatar" /> */}
                                                                    <img className='avatar' src={'http://localhost:5000' + authContext.user.picture} alt="avatar" />
                                                                </figure>
                                                                <div className="friend-name">
                                                                    <ins><Link to={`/user/${authContext.user._id}`} title="">{authContext.user.name}</Link></ins>
                                                                    <span>{ formatDate(d.Date_creation)}</span>
                                                                </div>
                                                                <div className="post-meta">
                                                                    <div >

                                                                        <p>
                                                                            {d.text}

                                                                        </p>
                                                                        {/* <iframe src={"http://localhost:5000" + d.link} height="500" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto'}} webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> */}
                                                                        <img src={"http://localhost:5000" + d.link} height="500" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto'}} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </InfiniteScroll>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}