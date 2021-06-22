import banner from '../assets/banner.png'
import SearchBox from '../components/search-box/search-box'
import Cards from '../components/card/cards'
import './home.css'
import FilterBox from '../components/filter-box/filter'
function Home(){
   return(
    <div>  
    <div  style={{ 
      backgroundImage: `url(${banner})`,
      height:'800px',
      backgroundSize: 'cover',
      objectFit: 'cover',
     
      
    }}>
  <div className="contenu">
      <div className='align-items'>
    <h2 className="heading">Opportunities for students</h2>
    <p className="paragh">Time to start your exploring 
            journey!</p>
   <div className='search-b'>
    <SearchBox/>
    </div>
     </div>
  </div>
</div>
<div className='container box'>
<FilterBox/>
</div>

<Cards/>
</div>
   ) 
}
export default Home;