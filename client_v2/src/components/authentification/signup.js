import React, { useState } from 'react'
import { Box, Heading, Button,InputGroup,InputRightElement,Image,ScaleFade, Text, FormControl,FormLabel,FormErrorMessage, FormHelperText, Input, Flex, Checkbox, Link } from "@chakra-ui/react";
import { Card, CardBottom } from "../../themes/components/card";
import { Carousel } from "../../themes/components/Carousel/carousel"
import deals from "../../assets/deals.jpg"
function Signup() {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    return ( 
        <Box display="flex" w="100%" flexDirection="row" alignItems="center">
            <Box mx="50px" flexBasis="55%" my="2%"> 
            <Carousel>
                <Card variant="rounded">
                    <Image borderRadius="full" w="fit-content" h="300px" src={deals}/>
                    <Heading size="lg">Announcement & Deals</Heading>
                    <Text my="2%">Find or post places and offers</Text>
                </Card>
            </Carousel>
            </Box>
            <ScaleFade initialScale={0.4} in>
                <Card variant="rounded" my="5%">
                     <Heading size="md">Create an account</Heading>
                        <FormControl>
                            <FormLabel htmlFor='fullName'>Full Name</FormLabel>
                            <Input id='fullName' type='text'  placeholder='Enter Full Name'/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input id='email' type='email'  placeholder='Enter Email'/>
                        </FormControl> 
                        <FormControl>   
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <InputGroup size='md'>
                                <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Enter password' />
                                <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>{show ? 'Hide' : 'Show'}</Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl>   
                            <FormLabel htmlFor='passwordConfirm'>Password Confirmation</FormLabel>
                            <InputGroup size='md'>
                                <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Enter password' />
                                <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>{show ? 'Hide' : 'Show'}</Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormHelperText>We'll never share your credentiels.</FormHelperText>
                        </FormControl>
                    <Button variant="primary" w="100%">Login</Button>
                    <CardBottom >
                        <Link color="primary">I already have an account</Link>
                    </CardBottom>
                </Card>
            </ScaleFade>
        </Box>
     );
}

export default Signup;