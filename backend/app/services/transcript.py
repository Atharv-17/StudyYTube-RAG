from urllib.parse import urlparse, parse_qs
from youtube_transcript_api import YouTubeTranscriptApi
from app.utils.helpers import format_timestamp

def get_video_id(url):
    parsed = urlparse(url)
    video_id = parse_qs(parsed.query)["v"][0]
    return video_id

#automatically appends , no need to loop it , we have optimized using AI,
# optimized using list comprehension - faster and more Pythonic 
def get_transcript(video_id):

    try:
        transcripts=YouTubeTranscriptApi.get_transcript(video_id)
        formatted_lines = [
        f"[{format_timestamp(item['start'])}] {item['text']}"
            for item in transcripts
        ]
        return "\n".join(formatted_lines)
        
    except Exception as e:
        raise Exception(f"Could not fetch the transcript of the given url: {str(e)}")

    

    
