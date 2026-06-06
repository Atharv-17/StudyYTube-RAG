from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.embeddings import Embeddings
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from huggingface_hub import InferenceClient
import os

#completely last minute change for including embedding model with API and not downloading it.
class HFAPIEmbeddings(Embeddings):
    def __init__(self, model, token):
        self.client = InferenceClient(model=model, token=token)

    def embed_documents(self, texts):
        return self.client.feature_extraction(
            ["passage: " + t for t in texts]
        )

    def embed_query(self, text):
        return self.client.feature_extraction(
            "query: " + text
        )

def get_embeddings():
    return HFAPIEmbeddings(
        model="BAAI/bge-small-en-v1.5",
        token=os.getenv("HF_TOKEN")
    )

def split_transcript(transcript):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    chunks = text_splitter.split_text(transcript)
    return chunks



def create_vector_store(chunks, embeddings):
    
    vector_store=FAISS.from_texts(chunks,embeddings)
    return vector_store