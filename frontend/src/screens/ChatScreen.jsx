import { useSearchParams } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import ChatWindow from '../components/ChatWindow'

function ChatScreen() {
  const [searchParams] = useSearchParams()
  const videoUrl = searchParams.get('url')

  return (
    <div className="flex h-[calc(100vh-64px)]">

      <div className="w-[60%] p-4">
        <VideoPlayer url={videoUrl} />
      </div>

      <div className="w-[40%] border-l border-[#2a2a2a]">
        <ChatWindow />
      </div>
    </div>
  )
}

export default ChatScreen