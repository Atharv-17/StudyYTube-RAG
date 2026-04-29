import { memo } from 'react'

const ChatMessage = memo(function ChatMessage({ text, isUser }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
        <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
        isUser 
          ? 'bg-[#7c7cff] text-white rounded-br-none' 
          : 'bg-[#1a1a2e] text-gray-300 rounded-bl-none'
      }`}>
        {text}
        </div>
    </div>
  )
})

export default ChatMessage