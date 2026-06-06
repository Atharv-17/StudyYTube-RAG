import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { useState } from 'react'

function ChatWindow(){

    const [messages, setMessages] = useState([])  
    const [isLoading, setIsLoading] = useState(false)  

    const handleSendMessage = async (question) => {
    // 1. add user message to messages
    setMessages(prev => [...prev, {text: question, isUser: true}])    // 2. set loading true
    setIsLoading(true)
    // 3. call backend /ask API
    try{
        const response=await fetch('http://localhost:8000/ask',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })

     }) 
     
    const data = await response.json()

    // 4. add AI response to messages
    setMessages(prev => [...prev, { text: data.answer, isUser: false }])
    }
    catch (err){
        setMessages(prev => [...prev, { text: "Something went wrong!", isUser: false }])
    }
    finally{
        // 5. set loading false
        setIsLoading(false)
    }
    
}

 return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} text={msg.text} isUser={msg.isUser} />
                ))}
            </div>
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
    )  


}

export default ChatWindow