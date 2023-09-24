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
import {AES,enc}  from "crypto-js";


export default function Chatroom() {

    const serverUrl = 'http://localhost:3001'; // Replace with your server URL
//   const serverUrl = 'https://sl-chat.up.railway.app/'; // This for the production server

  const [socket, setSocket] = useState(null);
  const [outgoingMessage, setOutgoingMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [password, setPassword] = useState("");

  useEffect(() => {
    // Create the WebSocket connection when the component mounts
    const newSocket = io(serverUrl);
    setSocket(newSocket);

    // Listen for incoming messages from the server
      newSocket.on('message', (message) => {
        message.type = 'incoming';
        console.log('Received a message:', message);
        // let newM = AES.encrypt(message.text, password).toString()
        // console.log(newM)
        let decrypt = AES.decrypt(message.text, password).toString(enc.Utf8)
      if (decrypt != "" ){
        message.text = decrypt
      }
        
      setMessages([...messages, message]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      console.log('Disconnecting socket...');
      newSocket.disconnect();
    };
  }, [messages,password]);

  const handleSendButtonClick = () => {
    if (outgoingMessage.trim() !== "") {
      // Send the message using the existing socket
      socket.emit('message', {
        type: 'outgoing',
        text: AES.encrypt(outgoingMessage, password).toString(),
        id: uuidv4(),
      });

      console.log('Sent a message:', outgoingMessage);

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
                            placeholder="Enter Magic Word"
                            width="20vw"
                            borderWidth={0}
                            fontSize={"2xl"}
                            fontWeight={"bold"}
                            color={"#E0E0E0"}
                                    paddingTop={"2vh"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }
                                    }
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
                            overflowY="auto" // Enable vertical scrolling if content overflows
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
                                                {message.type === "incoming" && (
                                                <>
                                                    <Avatar />
                                                    <Card
                                                    width="20vw"
                                                    // Add styling to place incoming messages on the left
                                                    ml={message.type === "incoming" ? 2 : 0} // Adjust the left margin
                                                    textAlign={message.type === "incoming" ? "left" : "right"} // Align text based on message type
                                                    >
                                                    <CardBody>
                                                        <Text size="md">{message.text}</Text>
                                                    </CardBody>
                                                    </Card>
                                                </>
                                                )}
                                                {message.type === "outgoing" && (
                                                <>
                                                    <Card
                                                    width="20vw"
                                                    // Add styling to place outgoing messages on the right
                                                    mr={message.type === "outgoing" ? 2 : 0} // Adjust the right margin
                                                    textAlign={message.type === "outgoing" ? "right" : "left"} // Align text based on message type
                                                    >
                                                    <CardBody>
                                                        <Text size="md">{message.text}</Text>
                                                    </CardBody>
                                                    </Card>
                                                    <Avatar />
                                                </>
                                                )}
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