from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.video import router

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins for now
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get('/')
async def checking():
    return {'message': "All good, app is running"}

