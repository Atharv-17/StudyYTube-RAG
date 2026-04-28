from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.video import router

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # our frontend URL
    allow_methods=["*"],   # allow all HTTP methods
    allow_headers=["*"],   # allow all headers
)

app.include_router(router)

@app.get('/')
async def checking():
    return {'message': "All good, app is running"}

