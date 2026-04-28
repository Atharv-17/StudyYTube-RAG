import { useSearchParams } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'

function ChatScreen() {
  const [searchParams] = useSearchParams()
  const videoUrl = searchParams.get('url')

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Left — Video */}
      <div className="w-[60%] p-4">
        <VideoPlayer url={videoUrl} />
      </div>
      {/* Right — Chat */}
      <div className="w-[40%] border-l border-[#2a2a2a]">
        <p className="text-white p-4">Chat coming soon!</p>
      </div>
    </div>
  )
}

export default ChatScreen