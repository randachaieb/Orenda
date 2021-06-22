import React from 'react'
import image from './images.jpg'
import './cards.css'
export default function Card (props){
    return (
        <div className="card" style={{width:'18rem;',margin: '25px'}}>
            <img src={image} className="card-img-top" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Description</h6>
                <p className="card-text">{props.description}</p>
            </div>
            <div className='card-footer'>
                <a className='links'>website</a>
                <a className='links'>Show</a>
            </div>
        </div>
    )
}