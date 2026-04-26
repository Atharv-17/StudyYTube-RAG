from fastapi import APIRouter
from app.services.transcript import get_video_id, get_transcript
from app.services.embeddings import split_transcript, get_embeddings, create_vector_store
from app.services.retriever import get_retriever
from app.services.generator import get_answer

router = APIRouter()