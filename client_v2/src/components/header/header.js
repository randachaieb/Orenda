import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton, useColorMode } from "@chakra-ui/react";

function Header() {
    const {colorMode, toggleColorMode} = useColorMode()
    return (   
        <Box as="nav" h="15%" w="100%" p="2rem" boxShadow="lg" display="flex" justifyContent="space-between">
            <Heading size="lg">ORENDA</Heading>
            <IconButton aria-label="Color Mode" icon={colorMode ==="light" ? <SunIcon /> : <MoonIcon />} onClick={toggleColorMode} />
        </Box>
     );
}

export default Header;