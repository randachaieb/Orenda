import React , {useState} from 'react'
import './Popup.css'

    const Popup =  ({ handleClose , SubmitPost} )  => {
    
        //New Empty Object To get Post Value 
        const [newpost , setNewPost] = useState([{description:"", img :""}])
        const [show, setShow] = useState(false);
    
        const getValue =(e)=>{
            setNewPost({...newpost,[e.target.name]:e.target.value})
        }
    
        return(
                <>
                    <div className="form-popup"  > 
                        <div   className="form-container">
                        <button type="button" class="close btn-close" onClick={handleClose}/>
                            <label className="title-label"><b> Create a Post</b></label>
                                <div className="desc-field">
                                    <textarea className="field-description" name="description" placeholder=" Write Here .. " onChange={getValue} />
                                </div>
                            <div className="field">
                                <input type="file" placeholder="image" name="img" accept="image/png, image/jpeg " onChange={getValue} />
                            </div>
                            <button className="button"  onClick={()=>SubmitPost(newpost)}>Post</button>
                        </div>
                    </div>
                </>
            );
    
         }

export default Popup
