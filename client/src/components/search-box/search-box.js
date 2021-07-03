import './search.css'

function SearchBox (){

    return(
        <form className=" banner-search">
    <input type="search"  placeholder="Search an opportunity from here" className="search-input"/>
        <button className="btn-search">
           <i className="bi bi-search "></i>
        </button>
           </form>
    )

}
export default SearchBox;