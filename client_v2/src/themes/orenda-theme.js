import { extendTheme } from "@chakra-ui/react";
import { cardComponent } from "./components/card";
import { buttonComponent as Button } from "./components/button";
import { carouselComponent as Carousel } from "./components/Carousel/carousel";
const orendaTheme = extendTheme({
    fonts: {
        heading: 'Poppins',
        body: 'Poppins'
    },
    components: {
        cardComponent,
        Button,
        Carousel,
    },
    colors: {
        primary : '#0265C2',
    }
})


export default orendaTheme