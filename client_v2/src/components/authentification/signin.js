import React, { useState } from 'react'
import { Box, Heading, Button,InputGroup,InputRightElement,ScaleFade, Text, FormControl,FormLabel,FormErrorMessage, FormHelperText, Input, Flex, Checkbox, Link } from "@chakra-ui/react";
import { Card } from "../../themes/components/card";
import { Carousel } from "../../themes/components/Carousel/carousel"
function Signin() {
    const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
    return ( 
        <Box display="flex" h="80%" flexDirection="row" alignItems="center">
            <Box mx="50px"> 
            <Heading size="lg">Invisible Power Makes Visible Changes</Heading>
            <Text my="5%">Orenda is a network that brings together places and offers you would never want to miss</Text>
            <Carousel></Carousel>
            </Box>
            <ScaleFade initialScale={0.4} in>
                <Card variant="rounded">
                     <Heading size="md">Login to your account</Heading>
                        <FormControl>
                            <FormLabel htmlFor='email'>Email address</FormLabel>
                            <Input id='email' type='email'  placeholder='Enter email'/>
                        </FormControl>
                        <FormControl>
                            <InputGroup size='md'>
                                <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Enter password' />
                                <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>{show ? 'Hide' : 'Show'}</Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormHelperText>We'll never share your credentiels.</FormHelperText>
                        </FormControl>
                        <Flex justifyContent="space-between" w="100%">
                            <Checkbox>Remember Me</Checkbox>
                            <Link color="#0265C2">Forgot Password?</Link>
                        </Flex>
                    <Button variant="primary" w="100%">Login</Button>
                </Card>
            </ScaleFade>
        </Box>
     );
}

export default Signin;