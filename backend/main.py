from fastapi import FastAPI
from app.routes.video import router

app=FastAPI()

app.include_router(router)

@app.get('/')
async def checking():
    return {'message': "All good, app is running"}

