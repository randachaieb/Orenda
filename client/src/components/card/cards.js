import React, { useEffect, useState } from 'react' 
import { useHistory } from 'react-router'
import Card from './card'
import './cards.css'
import data from '../../Data/data'
import axios from 'axios'


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
          axios.get('http://localhost:5000/api/v1/card', {
          headers:{
            'Content-Type':'multipart/form-data;',
            'x-auth-token': localStorage.getItem('token')
          }
        })

        .then((res)=> {
            console.log(res.data)
          setCard(res.data)
          


         } ).catch(err => err.message)
     

    },[])

   
    

    const [limit , setLimit]=useState(6);
    const items = card.slice(0,limit ) ;
    

    console.log(search)
    return (
        <div className=''>
        <div className='items'>
       
        <div className='cards-display'>
        {
        
        card.map((c, index) =>(
           
           
                <div onClick={e=>handleChange(e,c.id)}>
                <Card
                region={c.region}
                picture={c.picture}
                name={c.name}
                description={c.description}
                
                /> </div>
      
        ))}
       
          </div>
         
          </div>
          </div>

    )

}