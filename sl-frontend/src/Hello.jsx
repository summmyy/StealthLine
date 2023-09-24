import React from "react";
import { Button, Center, Heading, Box, VStack, HStack } from "@chakra-ui/react"
import {Link} from '@chakra-ui/react'


export default function Hello() {


    return (
        <Box 
        bgColor={"#349EF3"}
        width="100vw"
        height="100vh"
        >
            <Center
            paddingTop={"40vh"}
            >
                <VStack>
                    <Heading> Welcome To Stealth-Line 🤫</Heading>
                    <HStack>
                        <Button
                        color={"#E0E0E0"}
                        bgColor={"#424242"}
                        padding={6}
                        _hover={{ bg: "#1A237E" }}
                        ><Link 
                        href="/chatroom"
                        _hover={{ textDecoration: "none" }}
                        >Go to Chatroom</Link></Button>
                        <Button
                        color={"#E0E0E0"}
                        bgColor={"#424242"}
                        padding={6}
                        _hover={{ bg: "#1A237E" }}
                        ><Link 
                        href="/demo-chatroom"
                        _hover={{ textDecoration: "none" }}
                        >Demo</Link></Button>
                    </HStack>
                </VStack>
            </Center>
        </Box>
    )
}