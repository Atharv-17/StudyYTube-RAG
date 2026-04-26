from fastapi import APIRouter,HTTPException
from app.services.transcript import get_video_id, get_transcript
from app.services.embeddings import split_transcript, get_embeddings, create_vector_store
from app.services.retriever import get_retriever
from app.services.generator import get_answer
from app.models.schemas import VideoRequest, QuestionRequest

router = APIRouter()

retriever=None

@router.post("/process-video")
async def process_video(request: VideoRequest):
    try:
        global retriever
        
        video_id = get_video_id(request.url)
        transcript = get_transcript(video_id)
        chunks = split_transcript(transcript)
        embedding_model = get_embeddings()
        vector_db = create_vector_store(chunks, embedding_model)
        retriever = get_retriever(vector_db)
        
        return {"message": "Video processed successfully!"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.post("/ask")
async def process_question(question: QuestionRequest):
    try:
        question=question.question
        if retriever is None:
            raise HTTPException(status_code=400, detail="Please  upload the link and try again")    

        
        result=get_answer(question,retriever)
        return {"answer": result}
    
    except HTTPException:
        raise 

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error {e}")