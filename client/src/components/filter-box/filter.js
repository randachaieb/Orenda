import './filter.css'

function FilterBox (){

    return(
        <form className=" category-search">
            <h2 className='title'>Categories</h2>
        <div className='display'>
                    <div className='category'>
    <input className='form-select' list="browsers" name="browser" id="browser" placeholder='Region'></input>   
   <datalist  id="browsers" aria-label="Default select example">
  
  <option value="Tunis">Tunis</option>
  <option value="Sousse">Sousse</option>
  <option value="Monastir">Monastir</option>
  <option value="Sfax">Sfax</option>
</datalist>
   </div>
              <div className='category'>
    <input className='form-select' list="browsers2" name="browser" id="browser" placeholder='Category by places'></input>   
   <datalist  id="browsers2" aria-label="Default select example">
  
  <option value="Training centers">Training centers</option>
  <option value="Schools">Schools</option>
  <option value="Coworking places">Coworking places</option>
  <option value="Clubs">Clubs</option>
</datalist>
   </div>
     <div className='category'>
        
  <input className='form-select' list="browsers3" name="browser" id="browser" placeholder='Category by opportunities'></input>   
   <datalist  id="browsers3" aria-label="Default select example">
  
  <option value="Scholarships">Scholarships</option>
  <option value="Job offers">Job offers</option>
  <option value="Competitions">Competitions</option>
  <option value="Events">Events</option>
</datalist>
   </div>
        </div>

           </form>
    )

}
export default FilterBox;