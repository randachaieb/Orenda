import './filter.css'
import React  , {useEffect, useState} from 'react';
import axios from 'axios'




// popup window
const PopupForm =  ({ handleClose , SubmitPost} )  => {
    //New Empty Object To get Post Value 
            
    const [name, setName] = useState("");
    const [region, setRegion] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoriesO, setCategoriesO] = useState("");
    const [categoriesP, setCategoriesP] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState();
    
    const handleSubmit = (e) => {
        
        e.preventDefault();
         const cat = [categoriesO, categoriesP];
            console.log(cat)
        //console.log(name, region, description, categoriesP, categoriesO, picture)
        const params = new FormData();
        params.append("categories[]", cat[0]);
        params.append("categories[]", cat[1]);
        params.append("name", name);
        params.append("region", region);
        params.append("description", description);
        params.append("picture", picture);
        const token = localStorage.getItem('token');
        console.log(token)
        for (var value of params.values()) {
   console.log(value);
}
        

        axios.post('/api/v1/card',params, {
          headers:{
                'Content-Type': 'multipart/form-data;',
                
                'x-auth-token': localStorage.getItem('token')
          }
        })

        .then((res)=> {
            console.log(res.data)
            window.location.reload(false);


         } ).catch(err => err.message);
     
    }
   
        
            return(
                    <>
                        <div className="form-pop"> 
                            <div   className="content">
                            <button type="button" class="close btn-close" onClick={handleClose}/>
                            <input type="file" placeholder="enter img"  onChange={(e)=>setPicture( e.target.files[0]) } />
                            <label>Title</label>
                            <input type="text" placeholder="enter title" className="input" onChange={(e)=>setName(e.target.value) }/>
                            <div className="select-box"> 
                                <select  onChange={(e)=>setCategoriesP(e.target.value) }>
                                    <option>Places By Category</option>
                                    <option value="Training centers" >Training centers</option>
                                    <option value="Schools">Schools</option>
                                    <option value="Coworking places">Coworking places</option>
                                    <option value="Clubs">Clubs</option>
                                </select>
                                <select  id="browsers3" aria-label="Default select example"  onChange={(e)=>setCategoriesO(e.target.value) }>
                                <option>Offers By Category</option>
                                    <option value="Scholarships">Scholarships</option>
                                    <option value="Job offers">Job offers</option>
                                    <option value="Competitions">Competitions</option>
                                    <option value="Events">Events</option>
                                </select>
                                <select  onChange={(e)=>setRegion( e.target.value) }>
                                    <option>Region</option>
                                    <option value="Tunis">Tunis</option>
                                    <option value="Sousse">Sousse</option>
                                    <option value="Sfax">Sfax</option>
                                    <option value="Monastir">Monastir</option>
                                    
                                </select>
                            </div>
                            <label>Description</label>
                            <input type="text" placeholder="enter description" className="input"  onChange={(e)=>setDescription( e.target.value) }/>
                           
                            <label>Website</label>
                            <input type="text" placeholder="enter Web Site Url" className="input"/>
                            <button className="button"  onClick={(e)=>handleSubmit(e)}>Add</button>
                            </div>
                        </div>
                    </>
                );
}
export default PopupForm;