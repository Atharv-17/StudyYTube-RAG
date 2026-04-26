from urllib.parse import urlparse, parse_qs
from youtube_transcript_api import YouTubeTranscriptApi
from app.utils.helpers import format_timestamp

def get_video_id(url):
    parsed = urlparse(url)
    video_id = parse_qs(parsed.query)["v"][0]
    return video_id