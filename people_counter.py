#!/usr/bin/env python3
"""
People Counter using YOLOv11
Counts the number of people present in a video at all times
"""

import cv2
from ultralytics import YOLO
import argparse
from pathlib import Path


def count_people(video_path, output_path=None, conf_threshold=0.5):
    """
    Count people in a video using YOLOv11

    Args:
        video_path: Path to input video
        output_path: Path to save output video (optional)
        conf_threshold: Confidence threshold for detections
    """
    # Load YOLOv11 model
    model = YOLO('yolo11n.pt')  # Using nano model for speed

    # Open video
    cap = cv2.VideoCapture(str(video_path))

    if not cap.isOpened():
        print(f"Error: Could not open video {video_path}")
        return

    # Get video properties
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    print(f"Video: {width}x{height} @ {fps}fps, {total_frames} frames")

    # Setup video writer if output path is specified
    out = None
    if output_path:
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(str(output_path), fourcc, fps, (width, height))

    frame_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1

        # Run YOLOv11 inference on the frame
        # Class 0 is 'person' in COCO dataset
        results = model(frame, conf=conf_threshold, classes=[0], verbose=False)

        # Get detections
        people_count = 0

        # Process results
        for result in results:
            boxes = result.boxes
            people_count = len(boxes)

            # Draw bounding boxes on frame
            for box in boxes:
                # Get box coordinates
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                conf = float(box.conf[0])

                # Draw rectangle
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

                # Put confidence text
                label = f'Person {conf:.2f}'
                cv2.putText(frame, label, (x1, y1 - 10),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # Display count on frame
        count_text = f'People Count: {people_count}'
        cv2.putText(frame, count_text, (10, 30),
                   cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        # Display frame number
        frame_text = f'Frame: {frame_count}/{total_frames}'
        cv2.putText(frame, frame_text, (10, 70),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

        # Write frame to output video
        if out:
            out.write(frame)

        # Print progress
        if frame_count % 30 == 0:
            print(f"Frame {frame_count}/{total_frames} - People: {people_count}")

    # Release resources
    cap.release()
    if out:
        out.release()

    print(f"\nProcessing complete! Total frames processed: {frame_count}")
    if output_path:
        print(f"Output saved to: {output_path}")


def main():
    parser = argparse.ArgumentParser(description='Count people in video using YOLOv11')
    parser.add_argument('video', type=str, help='Path to input video file')
    parser.add_argument('-o', '--output', type=str, help='Path to output video file')
    parser.add_argument('-c', '--conf', type=float, default=0.5,
                       help='Confidence threshold (default: 0.5)')

    args = parser.parse_args()

    video_path = Path(args.video)
    if not video_path.exists():
        print(f"Error: Video file not found: {video_path}")
        return

    output_path = Path(args.output) if args.output else None

    count_people(video_path, output_path, args.conf)


if __name__ == '__main__':
    main()
