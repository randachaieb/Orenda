import { Box, useStyleConfig } from "@chakra-ui/react"
import { CarouselSlider } from "./carouselSlider"

export const carouselComponent = {
  // style object for base or default style
  baseStyle: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {},
  // default values for `size` and `variant`
  defaultProps: {
    size: '',
    variant: '',
  },
}


export function Carousel(props){
    const {variant,children, ...rest} = props 

    const styles = useStyleConfig('carouselComponent', {variant})

    return <Box __css={styles} {...rest}>
        {children}
        <CarouselSlider />
        </Box>
}