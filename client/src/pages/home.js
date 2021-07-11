import banner from "../assets/banner.png";
import SearchBox from "../components/search-box/search-box";
import Cards from "../components/card/cards";
import "./home.css";
import FilterBox from "../components/filter-box/filter";
import SliderShow from "../components/Slider/Slider";
import { useEffect } from "react";

function Home() {
    return (
        <div>
            <div className="SliderShow">
                <SliderShow />
            </div>
            <div className="container box">
                <FilterBox />
            </div>
            <Cards />
        </div>
    );
}
export default Home;
