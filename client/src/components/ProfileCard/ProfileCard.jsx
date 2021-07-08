import React from 'react'
import './ProfileCard.css'


function ProfileCard({card}) {

   
    return (
        <div className='gallerie'>
        {card.map((card, index) => { return <Card key={index} card={card} /> })}
        </div>
    )
}

export default ProfileCard

const Card=({card})=>{

    return (
        <div  >
             {(card.link ==="") ?
                <div className="cardItems">
                    <div className='only-description' style={{ color: 'red' }}>{card.text}</div>
                </div>
             :<div className="cardItems">
           
             <img className="img" src={'http://localhost:5000'+card.link} Alt ="post" />
             <div className='description'>{card.text}</div>
             </div>
             }
        
       
        </div>
    );
}
