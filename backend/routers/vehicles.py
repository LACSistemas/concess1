"""
Vehicle Counter Router
Handles endpoints for counting vehicles in videos
"""

from fastapi import APIRouter, File, UploadFile, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pathlib import Path
import uuid
import subprocess
import json
from typing import Optional

router = APIRouter()

# Job storage (in production, use a database)
jobs = {}

class ProcessRequest(BaseModel):
    confidence: float = 0.5
    save_output: bool = True

class JobStatus(BaseModel):
    job_id: str
    status: str
    progress: Optional[float] = None
    current_frame: Optional[int] = None
    total_frames: Optional[int] = None
    detected_count: Optional[int] = None

@router.post("/upload")
async def upload_video(file: UploadFile = File(...)):
    """Upload a video file for processing"""
    if not file.content_type.startswith('video/'):
        raise HTTPException(status_code=400, detail="File must be a video")

    # Generate unique job ID
    job_id = str(uuid.uuid4())

    # Save uploaded file
    upload_path = Path(f"uploads/{job_id}_{file.filename}")
    with open(upload_path, "wb") as f:
        content = await file.read()
        f.write(content)

    # Create job entry
    jobs[job_id] = {
        "status": "uploaded",
        "filename": file.filename,
        "upload_path": str(upload_path),
        "progress": 0
    }

    return {"job_id": job_id, "filename": file.filename}

@router.post("/process/{job_id}")
async def process_video(
    job_id: str,
    request: ProcessRequest,
    background_tasks: BackgroundTasks
):
    """Start processing a video to count vehicles"""
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")

    job = jobs[job_id]
    if job["status"] == "processing":
        raise HTTPException(status_code=400, detail="Job already processing")

    # Update job status
    jobs[job_id]["status"] = "processing"
    jobs[job_id]["confidence"] = request.confidence

    # In a real implementation, you would run the vehicle_counter.py script here
    # For now, we'll simulate processing
    background_tasks.add_task(simulate_processing, job_id, request)

    return {"job_id": job_id, "status": "processing"}

async def simulate_processing(job_id: str, request: ProcessRequest):
    """Simulate video processing (replace with actual processing)"""
    import asyncio
    import random

    total_frames = 900
    for frame in range(0, total_frames + 1, 30):
        jobs[job_id]["current_frame"] = frame
        jobs[job_id]["total_frames"] = total_frames
        jobs[job_id]["progress"] = (frame / total_frames) * 100
        jobs[job_id]["detected_count"] = random.randint(3, 15)
        await asyncio.sleep(0.1)

    jobs[job_id]["status"] = "completed"
    jobs[job_id]["results"] = {
        "total_detected": 89,
        "max_detected": 18,
        "avg_detected": 9.8,
        "vehicle_breakdown": {
            "cars": 45,
            "motorcycles": 23,
            "buses": 8,
            "trucks": 13
        },
        "output_video": f"outputs/{job_id}_output.mp4"
    }

@router.get("/status/{job_id}")
async def get_status(job_id: str):
    """Get processing status of a job"""
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")

    return jobs[job_id]

@router.get("/results/{job_id}")
async def get_results(job_id: str):
    """Get results of a completed job"""
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")

    job = jobs[job_id]
    if job["status"] != "completed":
        raise HTTPException(status_code=400, detail="Job not completed yet")

    return job["results"]

@router.get("/download/video/{job_id}")
async def download_video(job_id: str):
    """Download processed video"""
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")

    job = jobs[job_id]
    if job["status"] != "completed":
        raise HTTPException(status_code=400, detail="Job not completed yet")

    video_path = Path(job["results"]["output_video"])
    if not video_path.exists():
        raise HTTPException(status_code=404, detail="Output video not found")

    return FileResponse(video_path, media_type="video/mp4", filename=f"vehicles_counted_{job_id}.mp4")

@router.get("/download/csv/{job_id}")
async def download_csv(job_id: str):
    """Download statistics as CSV"""
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")

    # TODO: Generate CSV from results
    raise HTTPException(status_code=501, detail="CSV export not implemented yet")
