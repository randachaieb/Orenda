import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/authContext'
import './search.css'
import { useHistory, } from "react-router-dom";
function SearchBox(props) {
    const authContext = useContext(AuthContext);
    // const img = "http://localhost:5000" + authContext.user.picture;
    let history = useHistory();

    return (
        <form className=" banner-search">

            <i className="mrgn bi-search "></i>

            <input type="search" list='name-profile' onChange={event => { authContext.setSearch(event.target.value); history.push(`/Search`) }} placeholder="Search from here" className="search-input" />

        </form>
    )

}

export default SearchBox