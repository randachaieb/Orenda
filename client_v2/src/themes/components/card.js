import { Box, useStyleConfig } from "@chakra-ui/react";
import { darken, mode, whiten } from "@chakra-ui/theme-tools";
import { useState } from "react";

export const cardComponent = {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap:4,
    },
    variants: {
        rounded: {
            padding: 6,
            borderRadius: 'xl',
            boxShadow: 'lg',
        },
        smooth: {
            padding: 4,
            borderRadius: 'base',
            boxShadow: 'md',
        },
    },
    defaultProps: {
        variant: 'smooth',
    }
}
export function CardBottom(props){
    const {children,...rest} = props
    return (
        <Box {...rest} display="flex" justifyContent="center"  marginTop="auto" w="100%" >
            {children}
        </Box>
    )
}

export function Card(props){
    const { variant, children, ...rest } = props 
    const styles = useStyleConfig('cardComponent', { variant })

    return <Box __css={styles} {...rest}>
        {children}
        </Box>
}