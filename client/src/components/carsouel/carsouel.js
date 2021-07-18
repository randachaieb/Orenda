import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './carousel.css'
function Carsouel() {

  const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

    const next = (e) => {
        
    }

     const previous = (e) => {
        
    }

    return (<div className='slide'>
      <Carousel
       swipeable={false}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
 

  containerClass="carousel-container"

      >
        <div className='car'>
            <img src="https://picsum.photos/800/300/?random=1" className="cimg d-block w-100" alt="1" />
            <div className='slide-body'>
              <span>Posted by </span>
              <span>FULL NAME</span>
      
          </div>
        </div>
        <div className='car'>
            <img src="https://picsum.photos/800/300/?random=2" className="cimg d-block w-100" alt="1" />
            <div className='slide-body'>
              <span>Posted by </span>
              <span>FULL NAME</span>
      
          </div>
        </div>
        <div className='car'>
            <img src="https://picsum.photos/800/300/?random=3" className="cimg d-block w-100" alt="1" />
            <div className='slide-body'>
              <span>Posted by </span>
              <span>FULL NAME</span>
      
          </div>
        </div>
        <div className='car'>
            <img src="https://picsum.photos/800/300/?random=4" className="cimg d-block w-100" alt="1" />
            <div className='slide-body'>
              <span>Posted by </span>
              <span>FULL NAME</span>
      
          </div>
        </div>
        <div className='car'>
            <img src="https://picsum.photos/800/300/?random=5" className="cimg d-block w-100" alt="1" />
            <div className='slide-body'>
              <span>Posted by </span>
              <span>FULL NAME</span>
      
          </div>
        </div>
      
       
      </Carousel>
        <div className='add'>
                <button type='submit' className='add-btn'><i class="bi bi-plus-circle-fill"></i> Slide</button>  
          </div>
    </div>
    )
}
export default Carsouel;