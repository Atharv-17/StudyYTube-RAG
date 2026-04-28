import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0f0f0f]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/chat" element={<ChatScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App