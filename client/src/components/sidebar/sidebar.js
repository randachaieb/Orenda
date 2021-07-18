import React, { useEffect, useState } from "react";
import ListItem from '@material-ui/core/ListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {NavLink} from 'react-router-dom'
import "./sidebar.css";
import { CategoriesOffer, CategoriesPlaces } from "./categories-query";


const Sidebar = () => {
    const [active, setActive]=useState('s1')
    const [dropdown, setDropdown] = useState(false)
    const [categories, setCategories] = useState([])
    const [categoriesO, setCategoriesO]=useState([])


    useEffect (() => {
        setCategories(CategoriesPlaces)
        setCategoriesO(CategoriesOffer)
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
                
               </span>
          </div>

            <div className='stky'>
                <span  className='title-c'>Places by category</span>
                <ul className='first'>
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
                
                            
          
               <span className='title-c'>Offers by category</span>
                <ul className='second'>
                    {categoriesO.map((cat, i) =>
                        <li id={cat.id} className={`stky-li ${id===cat.id? 'category-list': ''}`} onClick={e=>addActiveClass(e, cat.id) && cat.sublabel}>

                            <div className='justify'>
                                
                                <span  className='' >  {cat.label}</span>
                              { open && cat.sublabel && id===cat.id ? <span>
                                    <i class="bi bi-chevron-down" onClick={e => handleClick(e, cat.id)}></i>
                                </span> :
                                cat.sublabel? <span>
                                        <i class="bi bi-chevron-right" onClick={e => handleClick(e, cat.id)}></i>
                                </span> :null
                                }
                            </div>

                            {
                                cat.sublabel && open && id===cat.id?
                                    <ul key={cat.id}>
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
