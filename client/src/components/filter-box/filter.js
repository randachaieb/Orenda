import './filter.css'
import React  , {useState} from 'react';



function FilterBox (){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return(
        <div className=" category-search">
            <button className="add_btn" onClick={handleShow} > Add Card </button>
    
            { show ? <PopupForm  handleClose={handleClose} /> : null }

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

// popup window
const PopupForm =  ({ handleClose , SubmitPost} )  => {
    //New Empty Object To get Post Value 
            const [newpost , setNewPost] = useState([{description:"", img :""}])
            // const [show, setShow] = useState(false);
        
            const getValue =(e)=>{
                setNewPost({...newpost,[e.target.name]:e.target.value})
            }
        
            return(
                    <>
                        <div className="form-pop"> 
                            <div   className="content">
                            <button type="button" class="close btn-close" onClick={handleClose}/>
                            <input type="file" placeholder="enter img" />
                            <label>Title</label>
                            <input type="text" placeholder="enter title" className="input"/>
                            <div className="select-box"> 
                                <select>
                                    <option>Places By Category</option>
                                    <option value="Training centers">Training centers</option>
                                    <option value="Schools">Schools</option>
                                    <option value="Coworking places">Coworking places</option>
                                    <option value="Clubs">Clubs</option>
                                </select>
                                <select  id="browsers3" aria-label="Default select example">
                                <option>Offers By Category</option>
                                    <option value="Scholarships">Scholarships</option>
                                    <option value="Job offers">Job offers</option>
                                    <option value="Competitions">Competitions</option>
                                    <option value="Events">Events</option>
                                </select>
                                <select>
                                    <option>Region</option>
                                    <option value="Tunis">Tunis</option>
                                    <option value="Sousse">Sousse</option>
                                    <option value="Monastir">Monastir</option>
                                    <option value="Sfax">Sfax</option>
                                </select>
                            </div>
                            <label>Description</label>
                            <input type="text" placeholder="enter description" className="input"/>
                            <label>Profile</label>
                            <input type="text" placeholder="enter Profile   " className="input"/>
                            <label>Website</label>
                            <input type="text" placeholder="enter Web Site Url" className="input"/>
                            <button className="button"  onClick={()=>SubmitPost(newpost)}>Post</button>
                            </div>
                        </div>
                    </>
                );
}