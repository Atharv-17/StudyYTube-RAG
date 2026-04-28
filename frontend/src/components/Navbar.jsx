import { useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isProcessed = location.pathname === '/chat'

  return (
    <nav className="bg-[#1a1a2e] px-6 py-4 flex items-center justify-between">
      
      {/* Left — Logo */}
      <span className="text-[#7c7cff] text-xl font-bold">StudyTube</span>

      {/* Right — Links + Button */}
      <div className="flex items-center gap-6">
        <a href="#" className="text-gray-400 hover:text-white text-sm">About</a>
        <a 
          href="https://github.com/Atharv-17/StudyYTube-RAG" 
          target="_blank"
          className="text-gray-400 hover:text-white text-sm"
        >
          How it works
        </a>
        <button
          disabled={!isProcessed}
          onClick={() => navigate('/')}
          className="border border-[#7c7cff] text-[#7c7cff] px-4 py-2 rounded-lg text-sm disabled:opacity-30"
        >
          New Video
        </button>
      </div>

    </nav>
  )
}

export default Navbar