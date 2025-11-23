"""
FastAPI Backend for YOLOv11 Video Counter
Provides REST API and WebSocket for video processing
"""

from fastapi import FastAPI, File, UploadFile, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
import os
from pathlib import Path
from typing import Dict
import asyncio

from routers import people, vehicles

app = FastAPI(
    title="YOLOv11 Video Counter API",
    description="API for counting people and vehicles in videos using YOLOv11",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create necessary directories
UPLOAD_DIR = Path("uploads")
OUTPUT_DIR = Path("outputs")
UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)

# Mount static files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")

# Include routers
app.include_router(people.router, prefix="/api/people", tags=["people"])
app.include_router(vehicles.router, prefix="/api/vehicles", tags=["vehicles"])

# WebSocket connections manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, job_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[job_id] = websocket

    def disconnect(self, job_id: str):
        if job_id in self.active_connections:
            del self.active_connections[job_id]

    async def send_message(self, job_id: str, message: dict):
        if job_id in self.active_connections:
            await self.active_connections[job_id].send_json(message)

manager = ConnectionManager()

@app.get("/")
async def root():
    return {
        "message": "YOLOv11 Video Counter API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.websocket("/ws/{job_id}")
async def websocket_endpoint(websocket: WebSocket, job_id: str):
    await manager.connect(job_id, websocket)
    try:
        while True:
            # Keep connection alive
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(job_id)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
