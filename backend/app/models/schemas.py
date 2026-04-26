from pydantic import BaseModel


class VideoRequest(BaseModel):
    url: str

class QuestionRequest(BaseModel):
    question: str