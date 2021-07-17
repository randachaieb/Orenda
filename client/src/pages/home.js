import banner from "../assets/banner.png";
import SearchBox from "../components/search-box/search-box";
import Cards from "../components/card/cards";
import "./home.css";
import FilterBox from "../components/filter-box/filter";
import SliderShow from "../components/Slider/Slider";
import { useEffect, useState } from "react";
import PopupForm from "../components/filter-box/filter";
import Sidebar from "../components/sidebar/sidebar";
import { useHistory } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';

function Home() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const history = useHistory()
      const [byRegion, setRegion] = useState("");
    const [byPlaces, setPlaces] = useState("");
    const [byOffer, setOffer] = useState("");
  const handleShow = () => setShow(true);
  const [images, setImages] = useState();
  

    useEffect(() => {
    setImages(
      Array.from(Array(10).keys()).map((id) => ({
        id,
        url: `https://picsum.photos/1000?random=${id}`
      }))
    );
    }, []);
  
  let slides = [
    <img  src="https://picsum.photos/800/300/?random=1" alt="1" />,
    <img  src="https://picsum.photos/800/301/?random=2" alt="2" />  ,
    <img  src="https://picsum.photos/800/302/?random=3" alt="3" />  ,
    <img  src="https://picsum.photos/800/303/?random=4" alt="4" />  ,
    <img src="https://picsum.photos/800/304/?random=5" alt="5" />   ];

  
 
  
    return (
        <div>
            <div className="SliderShow">
          <div className='sld'>
              <SliderShow/>
         </div>

        
                
        </div>
        <div className='content-home'>
                       <Sidebar/>
            <div className='container-card'>
                            <div className="container box">
                <div className=" category-search">
            
            

        <div className='display'>

        <div className='category'>
    <input className='form-select' list="browsers2" name="byPlaces" id="browser" placeholder='Places By Category' onChange={e=> setPlaces(e.target.value)}></input>   
   <datalist  id="browsers2" aria-label="Default select example">
  
  <option value="Training centers">Training centers</option>
  <option value="Schools">Schools</option>
  <option value="Coworking places">Coworking places</option>
  <option value="Clubs">Clubs</option>
</datalist>
   </div>
   <div className='category'>
        
        <input className='form-select' list="browsers3" name="byOffer" id="browser" placeholder='Offers By Category'  onChange={e=> setOffer(e.target.value)}></input>   
         <datalist  id="browsers3" aria-label="Default select example">
        
        <option value="Scholarships">Scholarships</option>
        <option value="Job offers">Job offers</option>
        <option value="Competitions">Competitions</option>
        <option value="Events">Events</option>
      </datalist>
         </div>
    <div className='category'>
        <input className='form-select' list="browsers" name="byRegion" id="browser" placeholder='Region'  onChange={e=> setRegion(e.target.value)}></input>   
      <datalist  id="browsers" aria-label="Default select example">
      
      <option value="Tunis">Tunis</option>
      <option value="Sousse">Sousse</option>
      <option value="Monastir">Monastir</option>
      <option value="Sfax">Sfax</option>
      </datalist>
   </div>
                    </div>
                    <button className=" btn-pry" onClick={handleShow} > Add Card </button>
    
            { show ? <PopupForm  handleClose={handleClose} /> : null }

           </div>
            </div>
            <Cards sregion={byRegion} sPlace={byPlaces} sOffer={byOffer} />
             
            </div>
     
         </div>

            
        </div>
    );
}
export default Home;
