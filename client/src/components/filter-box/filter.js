import './filter.css'
import Popup from '../ProfileCard/Popup';
import React  , {useState} from 'react';



function FilterBox (){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return(
        <div className=" category-search">
            <button className="add_btn" onClick={handleShow} > Add Card </button>
    
            { show ? <Popup   handleClose={handleClose} /> : null }

        <div className='display'>

        <div className='category'>
    <input className='form-select' list="browsers2" name="browser" id="browser" placeholder='Places By Category'></input>   
   <datalist  id="browsers2" aria-label="Default select example">
  
  <option value="Training centers">Training centers</option>
  <option value="Schools">Schools</option>
  <option value="Coworking places">Coworking places</option>
  <option value="Clubs">Clubs</option>
</datalist>
   </div>
   <div className='category'>
        
        <input className='form-select' list="browsers3" name="browser" id="browser" placeholder='Offers By Category'></input>   
         <datalist  id="browsers3" aria-label="Default select example">
        
        <option value="Scholarships">Scholarships</option>
        <option value="Job offers">Job offers</option>
        <option value="Competitions">Competitions</option>
        <option value="Events">Events</option>
      </datalist>
         </div>
    <div className='category'>
        <input className='form-select' list="browsers" name="browser" id="browser" placeholder='Region'></input>   
      <datalist  id="browsers" aria-label="Default select example">
      
      <option value="Tunis">Tunis</option>
      <option value="Sousse">Sousse</option>
      <option value="Monastir">Monastir</option>
      <option value="Sfax">Sfax</option>
      </datalist>
   </div>
        </div>

           </div>

    )

}
export default FilterBox;