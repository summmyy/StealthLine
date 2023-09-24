import { useState } from 'react';
import { Avatar, ChatContainer, Conversation, ConversationHeader, ConversationList, EllipsisButton, MainContainer, Message, MessageInput, MessageList, MessageModel, MessageSeparator, Search, Sidebar, UserStatus, VideoCallButton, VoiceCallButton } from "@chatscope/chat-ui-kit-react";
import CryptoJS from "crypto-js";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import '../css/chat.css';
import defaultAvatar1 from '../assets/default-avatar-1.png';
import defaultAvatar2 from '../assets/default-avatar-2.png';
import defaultAvatar3 from '../assets/default-avatar-3.png';
import defaultAvatar4 from '../assets/default-avatar-4.png';
import defaultAvatar5 from '../assets/default-avatar-5.png';
import defaultAvatar6 from '../assets/default-avatar-6.png';
import defaultAvatar7 from '../assets/default-avatar-7.png';
import defaultAvatar8 from '../assets/default-avatar-8.png';
import defaultAvatar9 from '../assets/default-avatar-9.png';
import defaultAvatarGroup from '../assets/default-avatar-group.png';

type ConversationType = {
  id: number;
  name: string;
  lastSenderName: string;
  info: string;
  src: string;
  status: UserStatus; // Ensure status matches the UserStatus type
  unreadCnt: number;
  unreadDot: boolean;
};

const ChatMain = () => {

  // Set initial message input value to empty string                                                                     
  const [messageInputValue, setMessageInputValue] = useState("");

  // State to manage the active conversation
  const [activeConversation, setActiveConversation] = useState<number | null>(null);

  // Mock data for conversations and avatars
  const conversations: ConversationType[] = [
    { id: 1, name: 'Stealth Line', lastSenderName: 'Stealth Line', info: 'Cool, let\'s start!', src: defaultAvatarGroup, status: 'available', unreadCnt: 0, unreadDot: false },
    { id: 2, name: 'Tuyi Chen', lastSenderName: 'Tuyi Chen', info: 'Hi, I\'m Tuyi Chen', src: defaultAvatar1, status: 'available', unreadCnt: 0, unreadDot: false },
    { id: 3, name: 'Sunmi Oye', lastSenderName: 'Sunmi Oye', info: 'Hi, I\'m Sunmi Oye', src: defaultAvatar2, status: 'available', unreadCnt: 0, unreadDot: false },
    { id: 4, name: 'Sawan Kumar', lastSenderName: 'Sawan Kumar', info: 'Hi, I\'m Sawan Kumar', src: defaultAvatar3, status: 'available', unreadCnt: 0, unreadDot: false },
    { id: 5, name: 'Hung Nguyen', lastSenderName: 'Hung Nguyen', info: 'Hi, I\'m Hung Nguyen', src: defaultAvatar4, status: 'available', unreadCnt: 0, unreadDot: false },
    { id: 6, name: 'AI Bot', lastSenderName: 'AI', info: 'Hi, I\'m AI Bot', src: defaultAvatarGroup, status: 'available', unreadCnt: 0, unreadDot: false },
    { id: 7, name: 'Kai', lastSenderName: 'Kai', info: 'Yes, I can do it for you', src: defaultAvatar5, status: 'unavailable', unreadCnt: 0, unreadDot: true },
    { id: 8, name: 'Akane', lastSenderName: 'Akane', info: 'Yes, I can do it for you', src: defaultAvatar6, status: 'eager', unreadCnt: 3, unreadDot: false },
    { id: 9, name: 'Eliot', lastSenderName: 'Eliot', info: 'Yes, I can do it for you', src: defaultAvatar7, status: 'away', unreadCnt: 0, unreadDot: false },
    { id: 10, name: 'Patrik', lastSenderName: 'Patrik', info: 'Yes, I can do it for you', src: defaultAvatar8, status: 'dnd', unreadCnt: 0, unreadDot: false },
    { id: 11, name: 'Dylan', lastSenderName: 'Dylan', info: 'Yes, I can do it for you', src: defaultAvatar9, status: 'invisible', unreadCnt: 0, unreadDot: false }
  ];

  // Mock data for messages, note that record number matches conversation id
  const messages: Record<number, MessageModel[]>  = {
    1: [
      {
        message: "Hi guys, how's everyone going?",
        sentTime: "15 mins ago",
        sender: "Sunmi Oye",
        direction: "incoming",
        position: "single"
      },
      {
        message: "Great",
        sentTime: "15 mins ago",
        sender: "Tuyi Chen",
        direction: "outgoing",
        position: "single"
      },
      {
        message: "For the Bell Geekfest, any idea?",
        sentTime: "15 mins ago",
        sender: "Sunmi Oye",
        direction: "incoming",
        position: "first"
      },
      {
        message: "Maybe we should do something to solve cyber attacks.",
        sentTime: "15 mins ago",
        sender: "Hung Nguyen",
        direction: "incoming",
        position: "normal"
      },
      {
        message: "How about we do messaging with encryption?",
        sentTime: "15 mins ago",
        sender: "Sunmi Oye",
        direction: "incoming",
        position: "first"
      },
      {
        message: "Good idea. Do you want to use Python to develop backend?",
        sentTime: "15 mins ago",
        sender: "Sawan Kumar",
        direction: "incoming",
        position: "normal"
      },
      {
        message: "Cool",
        sentTime: "15 mins ago",
        sender: "Hung Nguyen",
        direction: "incoming",
        position: "last"
      },
      {
        message: "How about using React and typescript to build front-end",
        sentTime: "15 mins ago",
        sender: "Tuyi Chen",
        direction: "outgoing",
        position: "normal"
      },
      {
        message: "and open source UI toolkit, like chat-ui-kit-react",
        sentTime: "15 mins ago",
        sender: "Tuyi Chen",
        direction: "outgoing",
        position: "normal"
      },
      {
        message: "I want to work on frontend",
        sentTime: "15 mins ago",
        sender: "Sunmi Oye",
        direction: "incoming",
        position: "last"
      },
      {
        message: "I will work on backend",
        sentTime: "15 mins ago",
        sender: "Sawan Kumar",
        direction: "incoming",
        position: "first"
      },
      {
        message: "Me for backend as well",
        sentTime: "15 mins ago",
        sender: "Hung Nguyen",
        direction: "incoming",
        position: "last"
      },
      {
        message: "Cool, let's start!",
        sentTime: "15 mins ago",
        sender: "Tuyi Chen",
        direction: "outgoing",
        position: "normal"
      }
    ],
    2: [
      { message: 'Hi, I\'m Tuyi Chen', sentTime: '15 mins ago', sender: 'Stealth Line', direction: "incoming", position: "single"},
    ],
    3: [
      { message: 'Hi, I\'m Sunmi Oye', sentTime: '15 mins ago', sender: 'Sunmi Oye', direction: "incoming", position: "single"},
    ],
    4: [
      { message: 'Hi, I\'m Sawan Kumar', sentTime: '15 mins ago', sender: 'Sawan Kumar', direction: "incoming", position: "single"},
    ],
    5: [
      { message: 'Hi, I\'m Hung Nguyen', sentTime: '15 mins ago', sender: 'Hung Nguyen', direction: "incoming", position: "single"},
    ],
    6: [
      { message: 'Hi, I\'m AI Bot', sentTime: '15 mins ago', sender: 'AI', direction: "incoming", position: "single"},
    ],
    7: [
      { message: 'Yes, I can do it for you', sentTime: '15 mins ago', sender: 'Akane', direction: "incoming", position: "single"},
    ],
    8: [
      { message: 'Yes, I can do it for you', sentTime: '15 mins ago', sender: 'Eliot', direction: "incoming", position: "single"},
    ],
    9: [
      { message: 'Yes, I can do it for you', sentTime: '15 mins ago', sender: 'Patrik', direction: "incoming", position: "single"},
    ],
    10: [
      { message: 'Yes, I can do it for you', sentTime: '15 mins ago', sender: 'Dylan', direction: "incoming", position: "single"},
    ],
    11: [
      { message: 'Yes, I can do it for you', sentTime: '15 mins ago', sender: 'Dylan', direction: "incoming", position: "single"},
    ],
  };



  // --------------- ENCRYPTION AND DECRPTION START ---------------

  // Get secret key from Login to encrypt and decrypt messages
  const userKey = localStorage.getItem("userKey");
  // console.log(userKey);

  // Function to encrypt a string using key 'bell'
  const encryptString = (str: string): string => {
    return CryptoJS.AES.encrypt(str, 'bell').toString();
  };

  // Function to decrypt a string using secret key from Login page
  const decryptString = (str: string): string => {
    return CryptoJS.AES.decrypt(str, userKey).toString(CryptoJS.enc.Utf8);
  };

  // Function to encrypt all messages in a MessageModel array
  const encryptMessageArray = (messageArray: MessageModel[]) => {
    return messageArray.map((message) => {
      // encryptedMessage should not be empty
      const encryptedMessage = (message.message !== undefined) ? encryptString(message.message) : '';
      return { ...message, message: encryptedMessage };
    });
  };

  // Iterate over the messages object and encrypt each MessageModel array
  for (const conversationId in messages) {
    if (Object.hasOwnProperty.call(messages, conversationId)) {
      const messageArray = messages[conversationId];
      messages[conversationId] = encryptMessageArray(messageArray);
    }
  }

  // console.log('Encrypted Messages:', messages);

  // Function to decrypt all messages in a MessageModel array if the key is 'bell'
  if (userKey == 'bell') {
    const decryptMessageArray = (messageArray: MessageModel[]) => {
      return messageArray.map((message) => {
        const decryptedMessage = (message.message !== undefined) ? decryptString(message.message) : '';
        return { ...message, message: decryptedMessage };
      });
    };

    // Iterate over the messages object and encrypt each MessageModel array
    for (const conversationId in messages) {
      if (Object.hasOwnProperty.call(messages, conversationId)) {
        const messageArray = messages[conversationId];
        messages[conversationId] = decryptMessageArray(messageArray);
      }
    }
  }
  
  // console.log('Decrypted Messages:', messages);

  // --------------- ENCRYPTION AND DECRPTION END ---------------
  


  // Function to handle conversation click: set active conversation id
  const handleConversationClick = (conversationId: number) => {
    setActiveConversation(conversationId);
    console.log(messages[conversationId]);
  };

  // Function to handle sending a message
  const sendMessage = async (conversationId: number, msg: string) => {
    // Check if conversationId has message records
    if (messages[conversationId]) {
      // Add message to conversation id
      messages[conversationId].push({
        message: msg,
        sentTime: "Now",
        sender: "Tuyi Chen",
        direction: "outgoing",
        position: "single"
      });

      // Note that Conversation id 6 is AI Bot using OpenAI, need to add the AI answer to messages as well
      if (conversationId == 6) {
        try {
          const response = await fetch('http://localhost:5000/general_chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: msg }),
          });
    
          const data = await response.json();
          const result = JSON.stringify(data, null, 2);
          // get data from response and encrypt it
          // const result = encryptString(JSON.stringify(data, null, 2));

          messages[conversationId].push({
            message: result,
            // message: (decryptString(result) == '') ? result : decryptString(result), // decrypt string
            sentTime: "Now",
            sender: "AI Bot",
            direction: "incoming",
            position: "single"
          });
        } catch (error) {
          console.error('Error:', error);
        }
      }

      // Your logic to send the message goes here
      console.log("Message sent:", messageInputValue);
      console.log(messages[conversationId]);

    } else {
      console.log("Conversation does not exist. Cannot send msg.");
    }

    // Clear the message input after sending
    setMessageInputValue("");
  };
  
  return (
    <div className="chatMain-div">
      <MainContainer responsive>

        {/* ------ Make scrollable sidebar ------ */}
        <Sidebar position="left" scrollable={true}>
          <Search placeholder="Search..." />

          {/* ------ Map conversations into ConversationList ------ */}
          <ConversationList>
            {conversations.map((conversation) => (
              <Conversation
                key={conversation.id}
                name={conversation.name}
                lastSenderName={conversation.lastSenderName}
                info={conversation.info}
                unreadCnt={conversation.unreadCnt}
                unreadDot={conversation.unreadDot}
                onClick={() => handleConversationClick(conversation.id)}
              >
                <Avatar src={conversation.src} name={conversation.name} status={conversation.status} />
              </Conversation>
            ))}
          </ConversationList>
        </Sidebar>
        
        {/* ------ Display ChatContainer for active conversation or empty ChatContainer ------ */}
        {activeConversation !== null ? (
          <ChatContainer>
            
            {/* ------ Display ConversationHeader ------ */}
            <ConversationHeader>
              <ConversationHeader.Back />
                <Avatar src={conversations[activeConversation - 1].src} name={conversations[activeConversation - 1].name} />
              <ConversationHeader.Content userName={conversations[activeConversation - 1].name} info="Active now" />
              <ConversationHeader.Actions>
                <VoiceCallButton />
                <VideoCallButton />
                <EllipsisButton orientation="vertical" />
              </ConversationHeader.Actions>          
            </ConversationHeader>

            {/* ------ Map messages into MessageList ------ */}
            <MessageList>
              <MessageSeparator content="Sunday, Sep 24" />
              {messages[activeConversation].map((msg, index) => (
                <Message key={index}
                  // model={{
                  //   message: msg.message,
                  //   sentTime: msg.sentTime,
                  //   sender: msg.sender,
                  //   direction: msg.direction,
                  //   position: msg.position
                  // }}
                  model={msg}
                ></Message>
              ))}
            </MessageList>

            {/* ------ Placeholder for MessageInput ------ */}
            <MessageInput
              placeholder="Type message here"
              value={messageInputValue}
              onChange={val => setMessageInputValue(val)}
              onSend={() => {
                sendMessage(activeConversation, messageInputValue);
              }}
            />

          </ChatContainer>
        ) : (<ChatContainer></ChatContainer>)}                       
      </MainContainer>
    </div>
  );
};

export default ChatMain;
