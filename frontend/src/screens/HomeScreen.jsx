import URLInput from '../components/URLInput'
import { useNavigate } from 'react-router-dom'

function HomeScreen() {
  const navigate = useNavigate()

  const handleVideoProcessed = (url) => {
    navigate(`/chat?url=${encodeURIComponent(url)}`)
  }

  return (
    <URLInput onVideoProcessed={handleVideoProcessed} />
  )
}

export default HomeScreen