import React from 'react'
import './Slider.css'

function SliderPopup({handleClose}) {

        return(
                <>
                {/* S ==== Slide */}
                    <div className="form-S-popup"  > 
                        <div className="form-S-container">
                        <button type="button" className="close btn-close" onClick={handleClose}/>
                            <div className="S-field">
                                <input type="file" placeholder="image" name="img" accept="image/png, image/jpeg " />
                            </div>
                        <button className="S-button">Add Slide</button>
                        </div>
                    </div>
                </>
            );
    
         }


export default SliderPopup
