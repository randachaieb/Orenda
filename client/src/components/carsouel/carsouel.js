import React from 'react'
import './carousel.css'
function Carsouel() {

    const next = (e) => {
        
    }

     const previous = (e) => {
        
    }

    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">

  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
      <img  src="https://picsum.photos/800/300/?random=1" className="d-block w-100" alt="1" />,
    </div>
    <div className="carousel-item ">
       <img  src="https://picsum.photos/800/300/?random=2" className="d-block w-100" alt="2" />,
    </div>
    <div className="carousel-item ">
      <img  src="https://picsum.photos/800/300/?random=3" className="d-block w-100" alt="3" />,
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    
                <div className='iconN'>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </div>
                    <span className="visually-hidden">Previous</span>
                    
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <div className='iconN'>
                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
   </div>

    <span className="visually-hidden" >Next</span>
            </button>
            
            <div className='add'>
                <button type='submit' className='add-btn'><i class="bi bi-plus-circle-fill"></i> Slide</button>  
          </div>
</div>
    )
}
export default Carsouel;