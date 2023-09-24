import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import ChatMain from './pages/ChatMain';

function App() {

  return (
    // Set Routes for different pages
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<ChatMain />} />
    </Routes>
  )
}

export default App;
