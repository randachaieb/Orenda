import './search.css'

function SearchBox (){

    return(
    <form className=" banner-search">
    <input type="search"  placeholder="Search Here ..." className="search-input"/>
        <button className="btn-search">
           <i className="bi bi-search "></i>
        </button>
           </form>
    )

}

export default SearchBox 