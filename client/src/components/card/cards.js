import React, { useEffect, useState } from 'react' 
import { useHistory } from 'react-router'
import Card from './card'
import './cards.css'
import data from '../../Data/data'


export default function Cards(){

    const [card, setCard]= useState([
        
    ])

    const [loading, setLoading]= useState(false)

    

   
    const [search, setSearch]= useState("")

    let history= useHistory();
    function handleChange (e,id) {
       
        history.push(`/details/${id}`)

    }


    useEffect( async ()=>{
          setCard(data);

    },[])

   
    

    const [limit , setLimit]=useState(6);
    const items = card.slice(0,limit ) ;
    

    console.log(search)
    return (
        <div className=''>
        <div className='items'>
       
        <div className='cards-display'>
        {}
        {
        !loading? 
        
        card.map((c, index) =>(
           
            c.title.includes(search)?
                <div onClick={e=>handleChange(e,c.id)}>
                <Card
                
                title={c.title}
                description={c.description}
                
                /> </div>: null
        )): <h1>Loading ...</h1>
    }
     
          </div>
         
          </div>
          </div>

    )

}