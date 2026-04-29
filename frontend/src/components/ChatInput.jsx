import { useState } from 'react'

function ChatInput({ onSendMessage, isLoading }) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (!message.trim()) return        
    onSendMessage(message)            
    setMessage('') 
  }

 return (
    <div className="flex gap-2 p-4 border-t border-[#2a2a2a]">
        <input 
            value={message}
            placeholder='Ask a question about the video...' 
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-[#1a1a2e] border border-[#2a2a4a] text-white rounded-lg px-4 py-2 outline-none text-sm"
        />
        <button 
            disabled={!message || isLoading} 
            onClick={handleSend}
            className="bg-[#7c7cff] text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? "..." : "Send"}
        </button>
    </div>
)
}

export default ChatInput