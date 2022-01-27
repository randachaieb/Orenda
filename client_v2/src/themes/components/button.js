import { darken, mode, whiten } from "@chakra-ui/theme-tools";

export const buttonComponent = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
      primary : (props) =>({
          bg: "primary",
          color: "white",
          borderRadius: '25px',
          _hover:{
              bg: mode(darken('primary',20), whiten('primary',20))(props),
          },
      }),
  },
  // default values for `size` and `variant`
  defaultProps: {},
}