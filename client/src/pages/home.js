import banner from "../assets/banner.png";
import SearchBox from "../components/search-box/search-box";
import Cards from "../components/card/cards";
import "./home.css";
import FilterBox from "../components/filter-box/filter";
import SliderShow from "../components/Slider/Slider";
import { useEffect, useState } from "react";
import PopupForm from "../components/filter-box/filter";

function Home() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    
      const [byRegion, setRegion] = useState("");
    const [byPlaces, setPlaces] = useState("");
    const [byOffer, setOffer] = useState("");
    const handleShow = () => setShow(true);

    return (
        <div>
            <div className="SliderShow">
                <SliderShow />
            </div>
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
                    <button className="add_btn" onClick={handleShow} > Add Card </button>
    
            { show ? <PopupForm  handleClose={handleClose} /> : null }

           </div>
            </div>
<Cards sregion={byRegion} sPlace={byPlaces}  sOffer={byOffer}  />
            </div>


            
        </div>
    );
}
export default Home;
