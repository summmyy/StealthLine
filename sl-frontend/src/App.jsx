// import './App.css'
import Chatroom from './Chatroom'
import {Routes, Route} from 'react-router-dom'
import Hello from './Hello'
import { ChakraProvider } from "@chakra-ui/react"
import DemoChatroom from './DemoChatroom'
import PrivateChatroom from './PrivateChatroom'

function App() {


  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/chatroom" element={<Chatroom />} />
        <Route path="/demo-chatroom" element={<DemoChatroom />} />
        <Route path="/private-chatroom" element={<PrivateChatroom />} />
      </Routes>
    </ChakraProvider>
  )
}

export default App
