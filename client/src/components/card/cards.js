import React, { useEffect, useState } from 'react' 
import { useHistory } from 'react-router'
import Card from './card'
import './cards.css'
import data from '../../Data/data'
import axios from 'axios'


export default function Cards(props){

    const [card, setCard]= useState([
        
    ])

  const [loading, setLoading] = useState(false)
 

    

   
    const [search, setSearch]= useState("")

    let history= useHistory();
    function handleChange (e,id) {
       
        history.push(`/details/${id}`)

    }


    useEffect( async ()=>{
          axios.get('/api/v1/card', {
          headers:{
            'Content-Type':'multipart/form-data;',
            'x-auth-token': localStorage.getItem('token')
          }
        })

        .then((res)=> {
            console.log(res.data)
          const data=(res.data).reverse()
            setCard(data)
          


         } ).catch(err => err.message)
      setSearch(localStorage.getItem('searchRegion'))
          let byPlaces=localStorage.getItem('searchPlaces')
        
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
           
          c.region.includes(props.sregion)  && c.categories[0].includes(props.sOffer)  && c.categories[1].includes(props.sPlace) ?
                <div >
            <Card
                id={c._id}
                category={c.categories}
                region={c.region}
                picture={c.picture}
                name={c.name}
                description={c.description}
                
              /> </div> : null
           
        ))}
       
          </div>
         
        </div>
         
          </div>

    )

}