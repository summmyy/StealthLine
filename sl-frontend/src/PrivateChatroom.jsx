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
        Modal, 
        ModalOverlay, 
        ModalContent, 
        ModalHeader, 
        ModalFooter, 
        ModalBody, 
        ModalCloseButton,
    } from "@chakra-ui/react"
import Nav from "./Nav";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useState} from "react";
import { useEffect } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { AES, enc } from "crypto-js";


export default function PrivateChatroom() {

  const serverUrl = 'http://localhost:3002'; // Replace with your server URL
//   const serverUrl = 'https://sl-privatechat.up.railway.app/'; // This for the production server

  const [socket, setSocket] = useState(null);
  const [outgoingMessage, setOutgoingMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [alias, setAlias] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hasAlias, setHasAlias] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Create the WebSocket connection when the component mounts
    const newSocket = io(serverUrl);
    setSocket(newSocket);

    // Listen for incoming messages from the server
    newSocket.on('message', (message) => {
      message.type = 'incoming';
      console.log('Received a message:', message);
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

   // Create a component for incoming messages
    const IncomingMessage = ({ message }) => (
        <Box
        key={message.id}
        display="flex"
        justifyContent="flex-start" // Align incoming messages to the left
        >
        <HStack>
            <Avatar
            name={alias}
            />
            <Card
            width="20vw"
            ml={2} // Adjust the left margin for incoming messages
            textAlign="left" // Align text to the left for incoming messages
            >
            <CardBody>
                <Text size="md">{message.text}</Text>
            </CardBody>
            </Card>
        </HStack>
        </Box>
    );
    
    // Create a component for outgoing messages
    const OutgoingMessage = ({ message }) => (
        <Box
        key={message.id}
        display="flex"
        justifyContent="flex-end" // Align outgoing messages to the right
        >
        <HStack>
            <Card
            width="20vw"
            mr={2} // Adjust the right margin for outgoing messages
            textAlign="right" // Align text to the right for outgoing messages
            >
            <CardBody>
                <Text size="md">{message.text}</Text>
            </CardBody>
            </Card>
            <Avatar 
            name={alias}
            />
        </HStack>
        </Box>
    );
    
    useEffect(() => {
        // Check if the user has set an alias in local storage
        const storedAlias = localStorage.getItem("alias");
        if (storedAlias) {
          setAlias(storedAlias);
          setHasAlias(true);
        } else {
          setShowModal(true); // Show the modal if no alias is set
        }
      }, []);
    
      const handleCloseModal = () => {
        setShowModal(false);
      };
    
      const handleSaveAlias = () => {
        // Save the alias to local storage
        localStorage.setItem("alias", alias);
        setHasAlias(true);
        setShowModal(false);
      };
    
      useEffect(() => {
        // Show the modal each time the page is reloaded
        if (!hasAlias) {
          setShowModal(true);
        }
      }, [hasAlias]);
    

        return (
            <Flex>
                <Nav />
                <Box>
                    {/* Modal for entering alias */}
                    <Modal isOpen={showModal} onClose={handleCloseModal}>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader>Enter Your Alias</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                            placeholder="Enter your alias"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            />
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleSaveAlias}>
                            Save
                            </Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
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
                      paddingBottom={"2vh"}
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
                                    {messages.map((message) =>
                                        message.type === "incoming" ? (
                                        <IncomingMessage message={message} />
                                        ) : (
                                        <OutgoingMessage message={message} />
                                        )
                                    )}
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