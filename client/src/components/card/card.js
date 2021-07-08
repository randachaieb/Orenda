import React from 'react'
import image from './images.jpg'
import './cards.css'
export default function Card (props){
    return (
        <div className="card" style={{width:'18rem;',margin: '25px'}}>
            <img src={'http://localhost:5000'+props.picture} className="card-img-top" alt="..."></img>
            <div className="card-body">
                <div className='title-region'>
                     <h5 className="card-title">{props.name}</h5>
                     <p className="text-muted"><i class="mr bi-geo-alt-fill"></i>{props.region}</p>
               </div>
                <p className="card-text">{props.description}</p>
            </div>
            <div className='card-footer'>
                <a className='links'>Profile</a>
                <a className='links'>website</a>
            </div>
        </div>
    )
}