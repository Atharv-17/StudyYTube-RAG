

function VideoPlayer({ url }){
    const getVideoId= (url) => {
        const parsed= new URL(url)
        return parsed.searchParams.get('v')
    }

    const videoId=getVideoId(url)
    const embedUrl= `https://www.youtube.com/embed/${videoId}`

    return(
        <iframe src={embedUrl} width="100%" height="100%" allowFullScreen></iframe>
    )
}
 
export default VideoPlayer