import React, { useState } from "react";

import "./sidebar.css";


const Sidebar = () => {
    const [active, setActive]=useState('s1')

       const addActiveClass = (e) => {
        const click = e.target.id
        console.log(click);
        if(!active===click)
        { setActive('') }
        else
        {
            setActive(click)
        }
        console.log(active);
    }

 
    return (
        <div className='sidebar'>
            <div className='stky'>
                <ul><li>Places by category</li>
                    <li className={`stky-li ${active === "s1"? 'clickd': ''}`}  to="/" id='s1' onClick={e=>addActiveClass(e)}><i class="bi bi-play-fill"></i>
Training centers</li>
                    <li className={`stky-li ${active === "s2"? 'clickd': ''}`}  to="/" id='s2' onClick={e=>addActiveClass(e)}><i class="bi bi-play-fill"></i>
Schools</li>
                    <li className={`stky-li ${active === "s3"? 'clickd': ''}`}  to="/" id='s3'onClick={e=>addActiveClass(e)}><i class="bi bi-play-fill"></i>
Coworking places</li>
                    <li className={`stky-li ${active === "s4"? 'clickd': ''}`}  to="/" id='s4'onClick={e=>addActiveClass(e)}><i class="bi bi-play-fill"></i>
Clubs</li>
                </ul>
                <ul><li>Offers by category</li>
                    <li className={`stky-li ${active === "s5"? 'clickd': ''}`}  to="/" id='s5' onClick={e=>addActiveClass(e)}><i class="bi bi-play-fill"></i>
Schoolarships</li>
                    <li className={`stky-li ${active === "s6"? 'clickd': ''}`}  to="/" id='s6' onClick={e=>addActiveClass(e)}><i class="bi bi-play-fill"></i>
Job offers</li>
                    <li className={`stky-li ${active === "s7"? 'clickd': ''}`}  to="/" id='s7' onClick={e=>addActiveClass(e)}><i class="bi bi-play-fill"></i>
Competitions</li>
                    <li className={`stky-li ${active === "s8"? 'clickd': ''}`}  to="/" id='s8'onClick={e=>addActiveClass(e)}><i class="bi bi-play-fill"></i>
Events</li>
                </ul>
                
            </div>
        </div>
    );
}

export default Sidebar;
