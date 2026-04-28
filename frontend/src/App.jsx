import { useState } from 'react'
import Navbar from './components/Navbar'
import URLInput from './components/URLInput'

function App() {
  const [isProcessed, setIsProcessed] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')

  const handleVideoProcessed = (url) => {
    // save the url
    setVideoUrl(url)
    // switch to screen 2
    setIsProcessed(true)
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar isProcessed={isProcessed} />
      {isProcessed ? <p className="text-white">Screen 2 coming soon!</p> 
                   : <URLInput onVideoProcessed={handleVideoProcessed} />}
    </div>
  )
}

export default App