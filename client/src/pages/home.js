import banner from '../assets/banner.png'
import SearchBox from '../components/search-box/search-box'
import Cards from '../components/card/cards'
import './home.css'
import FilterBox from '../components/filter-box/filter'
import SliderShow from '../components/Slider/Slider'


function Home(){
   return(
    <div>
    <SliderShow />
    <div className='container box'>
    <FilterBox/>
    </div>
    <Cards/>
    </div>
   ) 
}
export default Home;