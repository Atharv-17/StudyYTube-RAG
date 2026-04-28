import { useState } from "react";

function URLInput({onVideoProcessed}){
    const [url, setUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

     // function that runs when user clicks Process Video
    const handleSubmit = async()=>{

        setError(null)
        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:8000/process-video',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            })

            const data= await response.json()

            if (!response.ok) {
            throw new Error(data.detail)
            }

            onVideoProcessed(url)   
        } 
        catch (err) {
            setError(err.message)
        } 
        finally {
            setIsLoading(false)
        }
        
    }

return (
  <div className="relative flex flex-col items-center justify-center min-h-[90vh] gap-6 px-4">
    
    {/* Main content — blurs when loading */}
    <div className={`flex flex-col items-center gap-6 w-full ${isLoading ? 'blur-sm' : ''}`}>
      
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-white text-4xl font-bold mb-2">Learn smarter from any YouTube video</h1>
        <p className="text-gray-400 text-lg">Paste a video link and ask anything about it</p>
      </div>

      {/* Input + Button */}
      <div className="flex gap-3 w-full max-w-2xl">
        <input 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL here..."
          className="bg-[#1a1a2e] border border-[#2a2a4a] text-white rounded-lg px-4 py-3 flex-1 outline-none"
        />
        <button disabled={!url || isLoading} onClick={handleSubmit} className="bg-[#7c7cff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6a6aee] disabled:opacity-50 disabled:cursor-not-allowed">
          Start Studying
        </button>
      </div>
    </div>

    {/* Loader overlay — on top, no blur */}
    {isLoading && (
      <div className="absolute flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-[#7c7cff] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm">Processing your video...</p>
      </div>
    )}

    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

  </div>
)

    
}

export default URLInput