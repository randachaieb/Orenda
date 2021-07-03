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
             {(card.img ==="") ?
                <div className="cardItems">
                    <div className='only-description' style={{color:'red'}}>{card.description}</div>
                </div>
             :<div className="cardItems">
           
             <img className="img" src={card.img} Alt ="post" />
             <div className='description'>{card.description}</div>
             </div>
             }
        
       
        </div>
    );
}
