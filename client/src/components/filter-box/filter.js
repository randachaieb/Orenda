import './filter.css'
import React  , {useEffect, useState} from 'react';
import axios from 'axios'




// popup window
const PopupForm =  ({ handleClose , SubmitPost} )  => {
    //New Empty Object To get Post Value 
            
    const [name, setName] = useState("");
    const [region, setRegion] = useState("");
    const [categoriesO, setCategoriesO] = useState([]);
    const [categoriesP, setCategoriesP] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState();
    const [site, setSite] = useState();
    const [Categories, setCategories] = React.useState([]);
    const [CategoriesFilter, setCategoriesFilter] = React.useState([]);
    const [CategoriesOffer, setCategoriesOffer] = React.useState([]);
    const [OfferFilter, setOfferFilter] = React.useState([]); 
    const handleSubmit = (e) => {
        
        e.preventDefault();
      
        //console.log(name, region, description, categoriesP, categoriesO, picture)
        const params = new FormData();
        if (categoriesP)
        {
           params.append("place", categoriesP); 
        }
        if(categoriesO)
        {
            for(let cat of categoriesO)
            params.append("offer[]", cat);
        }
        params.append("name", name);
        params.append("region", region);
        params.append("description", description);
        params.append("picture", picture);
        params.append("website", site);
        const token = localStorage.getItem('token');
        console.log(token)
        for (var value of params.values()) {
   console.log(value);
}
        

        axios.post('http://localhost:5000/api/v1/card',params, {
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
    const deleteCategory = (e, index) => {
        e.preventDefault()
        setCategories(categoriesO.splice(index,1))
        console.log(categoriesO)
   }
   useEffect(async () => {
    // Met à jour le titre du document via l’API du navigateur
 axios.get('http://localhost:5000/api/v1/categories/PlacesCategories')
 .then(response => {
   console.log(response.data)
    
        setCategories(response.data)
        setCategoriesFilter(response.data)
     
 })
 axios.get('http://localhost:5000/api/v1/categories/offerCategories')
 .then(response => {
     if (response.data.length > 0) {
         setCategoriesOffer( response.data)
         setOfferFilter(response.data)
     }
 })

 }, []); 
            return(
                    <>
                        <div className="form-pop"> 
                            <div   className="content">
                            <button type="button" className="close btn-close" onClick={handleClose}/>
                            <input type="file" placeholder="enter img"  onChange={(e)=>setPicture( e.target.files[0]) } />
                            <label>Title</label>
                            <input type="text" placeholder="enter title" className="input" onChange={(e)=>setName(e.target.value) }/>
                            <div className="select-box"> 
                                <select  onChange={(e)=>setCategoriesP(e.target.value) }>
                                    <option disabled >Places By Category</option>
                                    {CategoriesFilter.map((data) => (
                                    <option  value={data.name}>{data.name}</option>
                                    ))}
                                </select>
                                <select  id="browsers3" aria-label="Default select example"  onChange={(e)=>setCategoriesO([...categoriesO,e.target.value]) }>
                                <option disabled>Offers By Category</option>
                                {OfferFilter.map((data) => (
                                    <option  value={data.name}>{data.name}</option>
                                    ))}
                                </select>
                                
                                <select  onChange={(e)=>setRegion( e.target.value) }>
                                    <option>Region</option>
                                    <option value="Tunis">Tunis</option>
                                    <option value="Sousse">Sousse</option>
                                    <option value="Sfax">Sfax</option>
                                    <option value="Monastir">Monastir</option>
                                    
                                </select>
                            </div>
                             <div className='set-categories'>
                                    {categoriesO ? 
                                        categoriesO.map((cat, index) =>
                                            <span className='catg' >{cat } <i className="bi bi-x ml" onClick={e=>deleteCategory(e, index)}></i></span>
                                            )
                                        : null}
                                     
                                
                                </div>
                            <label>Description</label>
                            <input type="text" placeholder="enter description" className="input"  onChange={(e)=>setDescription( e.target.value) }/>
                          
                            <label>Website</label>
                            <input type="text" placeholder="enter Web Site Url" className="input" onChange={(e)=>setSite( e.target.value) }/>
                            <button className="button"  onClick={(e)=>handleSubmit(e)}>Add</button>
                            </div>
                        </div>
                    </>
                );
}
export default PopupForm;