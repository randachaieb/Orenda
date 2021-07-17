import React, { useEffect, useState } from "react";
import ListItem from '@material-ui/core/ListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {NavLink} from 'react-router-dom'
import "./sidebar.css";
import { Categories } from "./categories-query";


const Sidebar = () => {
    const [active, setActive]=useState('s1')
    const [dropdown, setDropdown] = useState(false)
    const [categories, setCategories]=useState([])


    useEffect (() => {
        setCategories(Categories)
    },[])

       const addActiveClass = (e,index) => {
           const click = e.target.id
           setID(index)
        console.log(click);
        if(!active===click)
        {
            setActive('')
           
        }
        else
        {
            setActive(click)
            
        }
        console.log(active);
    }

    const [open, setOpen] = React.useState(true);
    const [id, setID] = React.useState('');

    const handleClick = (e, index) => {
        setID(index)
        setOpen(!open);
    }
  

 
    return (
        <div className='sidebar'>

            <div className='side-top'>
                <span className='title-category'><i class="bi bi-tags-fill"></i> ALL CATEGORIES</span>
                <span className='length-category'>
                   ({categories.length})
               </span>
          </div>

            <div className='stky'>
              
                <ul>
                    {categories.map((cat, index) =>
                        <li id={index} className={`stky-li ${id===index? 'category-list': ''}`} onClick={e=>addActiveClass(e, index) && cat.sublabel}>

                            <div className='justify'>
                                
                                <span  className='' >  {cat.label}</span>
                              { open && cat.sublabel && id===index ? <span>
                                    <i class="bi bi-chevron-down" onClick={e => handleClick(e, index)}></i>
                                </span> :
                                cat.sublabel? <span>
                                        <i class="bi bi-chevron-right" onClick={e => handleClick(e, index)}></i>
                                </span> :null
                                }
                            </div>

                            {
                                cat.sublabel && open && id===index?
                                    <ul key={index}>
                                        {open && cat.sublabel.map((c, index) =>
                                            <li className='show' key={index}>{c.label }</li>
                                        )}
                                     </ul> :null
                            }
                        </li>
                    
                  )}
                </ul>
                
            </div>
        </div>
    );
}

export default Sidebar;
