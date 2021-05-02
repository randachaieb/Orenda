import React, { Fragment } from "react";
import "./BodyOrenda.css";
import IT from "../Constants/lrIT.png";

function BodyOrenda() {
  return (
    <Fragment>
      <div className='titleBody'>
        <div className='headingMain'>
          <h1>
            Time to start your<span className='educational'> Exploring </span>
            journey!
          </h1>
          <div className='textAndImage'>
            <h3>Here, you'll find all what you need</h3>
            <div className='inpt'>
              <div className='group'>
                <input type='text' required />
                <span className='highlight'></span>
                <span className='bar'></span>
                <label>Search</label>
              </div>
            </div>
          </div>
        </div>
        <img src={IT} alt='img IT' className='itImg' />
      </div>
    </Fragment>
  );
}

export default BodyOrenda;
