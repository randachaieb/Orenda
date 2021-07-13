import React, { useEffect, useState } from 'react' 
import { useHistory } from 'react-router'
import Card from './card'
import './cards.css'

import axios from 'axios'
import Loader from '../loader/loader'


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
          axios.get('http://localhost:5000/api/v1/card/all', {
          headers:{
            'Content-Type':'multipart/form-data;',
            'x-auth-token': localStorage.getItem('token')
          }
        })

            .then((res) => {
          setLoading(true)
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
            
        { loading?
        card.length>0?
        card.map((c, index) =>(
           !c.place   ?( c.place=''  ): null,
            !c.offer.includes("")  ?( c.offer.push("") ): null,
            c.region.includes(props.sregion) && c.place.includes(props.sPlace) && c.offer.includes(props.sOffer) ?
            <div >
              {console.log('offer ',c.offer)}
            <Card
                id={c._id}
                place={c.place}
                offer={c.offer}
                website={c.website}
                region={c.region}
                picture={c.picture}
                name={c.name}
                description={c.description}
                user={c.user}
                
              /> </div> : null
           
        )) : <h1>Cards not found</h1> :
              <div className='cards-display'>
                <Loader/>
                    </div>
        }
       
          </div>
          
         
        </div>
         
         
          </div>

    )

}