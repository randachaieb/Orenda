import React, { useState } from "react";
import { appLinks } from "../Constants/navData";
import menuBar from "../Constants/menu.svg";
import orendaLogo from "../Constants/Orenda.png";
import oLogo from "../Constants/orendaLOGO.png";
import { FiSearch } from "react-icons/fi";
import { GrNotification } from "react-icons/gr";

import "./NavBar.css";
function NavBar() {
  const [isLogin, setIsLogin] = useState(false);
  const [showNav, setShowNav] = useState(false);
  return (
    <nav className='navigation'>
      <div className='navList'>
        <div>
          <a href='/' className='logoContainer'>
            <img src={orendaLogo} alt='LOGO' className='logoClassBig' />
            <img src={oLogo} alt='LOGO' className='logoClassSmall' />
          </a>
        </div>
        <div className='innerLinks'>
          <ul className='listInnerLinks'>
            {appLinks.map((e) => (
              <li className='innerLink' key={e.id}>
                <a href={e.url}>{e.text}</a>
              </li>
            ))}
          </ul>
        </div>
        {isLogin ? (
          <>
            <div className='listInnerLinks-isLogin'>
              <FiSearch size={35} style={{ margin: "0 50px" }} />
              <GrNotification size={25} style={{ margin: "0 25px" }} />

              <button
                className='loginBtn-sec'
                onClick={() => setIsLogin(!isLogin)}
              >
                Log out
              </button>
            </div>
          </>
        ) : (
          <div className='rightLinks-max'>
            <button className='loginBtn-sec'>Sign up</button>
            <button className='loginBtn' onClick={() => setIsLogin(!isLogin)}>
              Log in
            </button>
          </div>
        )}
        {/*  Nav On 1024px is shown  */}
        <div className='SearchIcon'>
          <FiSearch size={35} style={{ margin: "0 50px" }} />
          <button className='show'>
            <img
              src={menuBar}
              alt='menuBar'
              onClick={() => {
                setShowNav(!showNav);
              }}
            />
          </button>
        </div>
      </div>
      <div className={showNav ? "showMenu" : "hideMenu"}>
        {/* conditional rendering*/}
        <ul className='showNavigation'>
          {appLinks.map((e) => (
            <li className='innerLink-SS withSVG' key={e.id}>
              {e.icon}
              <a href={e.url}>{e.text}</a>
            </li>
          ))}
        </ul>
        {isLogin ? (
          <>
            <div className='logoutBtn-res'>
              <button
                className='loginBtn-sec'
                onClick={() => setIsLogin(!isLogin)}
              >
                Log out
              </button>
              <GrNotification size={25} style={{ margin: "0 25px" }} />
            </div>
          </>
        ) : (
          <div className='rightLinks'>
            <div className='bttns'>
              <button className='loginBtn-sec'>Sign up</button>
              <button className='loginBtn' onClick={() => setIsLogin(!isLogin)}>
                Log in
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
