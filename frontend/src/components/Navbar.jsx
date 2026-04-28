function Navbar({ isProcessed }) {
  return (
    <nav className="bg-[#1a1a2e] px-6 py-4 flex items-center justify-between">
        <span className="text-[#7c7cff] text-xl font-bold">StudyTube</span>

        <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm px-4 py-2">About</a>
            <a href="https://github.com/Atharv-17/StudyYTube-RAG" className="text-gray-400 hover:text-white text-sm px-4 py-2" target="_blank">How it works</a>

             <button 
                disabled={!isProcessed}
                className="border border-[#7c7cff] text-[#7c7cff] px-4 py-2 rounded-lg text-sm disabled:opacity-30"
                >
                New Video
            </button>
        </div>
    </nav>
  )
}

export default Navbar