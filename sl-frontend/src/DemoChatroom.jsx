import React from "react";
import { Button, 
        Heading,
        Flex,
        Box,
        Center,
        Input,
        IconButton,
        Card, 
        CardBody,
        Text,
        SimpleGrid,
        Avatar,
        HStack,
    } from "@chakra-ui/react"
import Nav from "./Nav";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useState} from "react";
import { useEffect } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';


export default function DemoChatroom() {

    const [outgoingMessage, setOutgoingMessage] = useState("");
    const [messages, setMessages] = useState([]);

    function getRandomCountry() {
        const countries = [
            "Canada",
            "USA",
            "UK",
            "Australia",
            "Germany",
            "France",
            "Japan",
            "China",
            "India",
            "China",
            "India",
            "United States",
            "Indonesia",
            "Pakistan",
            "Brazil",
            "Nigeria",
            "Bangladesh",
            "Russia",
            "Mexico",
            "Japan",
            "Ethiopia",
            "Philippines",
            "Egypt",
            "Vietnam",
            "DR Congo",
            "Turkey",
            "Iran",
            "Thailand"
          ];        const randomIndex = Math.floor(Math.random() * countries.length);
        return countries[randomIndex];
      }
  
    useEffect(() => {
      // Simulated incoming message (you'll replace this with WebSocket logic)
      const simulatedIncomingMessage = {
        type: "incoming",
        text: `Hello from ${getRandomCountry()}!`,
        id: uuidv4(),
      };
  
      // Simulate receiving an incoming message after 2 seconds
      const timeoutId = setTimeout(() => {
        setMessages([...messages, simulatedIncomingMessage]);
      }, 2000);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [messages]);
  
    const handleSendButtonClick = () => {
      if (outgoingMessage.trim() !== "") {
        // Add the new outgoing message to the message history with a unique key
        const newOutgoingMessage = {
          type: "outgoing",
          text: outgoingMessage,
          id: uuidv4(),
        };
  
        setMessages([...messages, newOutgoingMessage]);
        // Clear the input field
        setOutgoingMessage("");
      }
    };
  
    
        return (
            <Flex>
                <Nav />
                <Box>
                <Box 
                width={"80vw"}
                // paddingTop={"2vh"}
                bgColor={"#1A237E"}
                >
                    <Box 
                    bgColor={"#64B5F6"}
                    height={"7vh"}
                    >
                        <Center>
                            <Input
                            placeholder="Enter Chatroom Name"
                            width="20vw"
                            borderWidth={0}
                            fontSize={"2xl"}
                            fontWeight={"bold"}
                            color={"#E0E0E0"}
                            paddingTop={"2vh"}
                            /> 
                        </Center>
                    </Box>
                    {/* <Box>

                    </Box> */}
                    <Box
                    display="flex"
                    flexDirection="column"
                    height="85.15vh" // Set the container height to fill the entire viewport
                    padding="20px" // Add some padding for spacing
                    >
                        <Box
                            flex="1" // This makes the message area expand to fill available space
                            border="1px solid #ccc" // Optional border for the message area
                            borderRadius="4px" // Optional border radius
                            padding="10px" // Optional padding for the message area
                            marginBottom="10px" // Optional margin for spacing
                            overflowY="auto" // Enable vertical scrolling if content overflows
                        >
                            {/* Chat messages go here */}
                            <SimpleGrid columns={1} spacing={4}>
                            {messages.map((message) => (
                                    <Box
                                        key={message.id}
                                        display="flex"
                                        justifyContent={
                                        message.type === "outgoing" ? "flex-end" : "flex-start"
                                        }
                                    >
                                        <HStack>
                                        {message.type === "incoming" && <Avatar />}
                                        <Card width="20vw">
                                            <CardBody>
                                            <Text size="md">{message.text}</Text>
                                            </CardBody>
                                        </Card>
                                        {message.type === "outgoing" && <Avatar />}
                                        </HStack>
                                    </Box>
                                    ))}
                                    </SimpleGrid>
                                </Box>
                            {/* </SimpleGrid> */}
                            {/* Add more messages here */}
                        </Box>
                    <Center
                    paddingBottom={6}
                    >
                            <Input
                            placeholder="Send a Message"
                            width="50vw"
                            borderWidth={0}
                            fontSize={"md"}
                            fontWeight={"light"}
                            color={"#E0E0E0"}
                            bgColor={"#64B5F6"}
                            value={outgoingMessage}
                            onChange={(e) => {
                                setOutgoingMessage(e.target.value);
                            }}
                            />
                            <IconButton
                                aria-label="Send Message"
                                icon={<FontAwesomeIcon icon={faPaperPlane} />} // Use FontAwesomeIcon to render Font Awesome icon
                                colorScheme="blue"
                                ml={2} // Add some margin to separate the input and button
                                onClick={handleSendButtonClick}
                            />
                        </Center>
                    </Box>
                </Box>
            </Flex>
        )
}