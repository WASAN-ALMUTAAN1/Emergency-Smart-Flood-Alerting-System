"""
Smart Flooding Detection Dashboard (Flask Backend)

This file provides:
- Web UI route ("/") that serves index.html
- Inference API route ("/upload") supporting:
  1) Classification (EfficientNet)
  2) Object Detection (YOLOv5 via torch.hub)
  3) Segmentation (YOLOv8 via ultralytics)
- Rendered image route ("/rendered-image") to fetch last annotated image


"""

from flask import Flask, request, jsonify, send_file, render_template
from io import BytesIO
from PIL import Image
import time
from datetime import datetime
from pathlib import Path

import torch
import torchvision.transforms as transforms
import numpy as np
import cv2
from ultralytics import YOLO


# =============================================================================
# Flask App Initialization
# =============================================================================
app = Flask(__name__)


# =============================================================================
# Runtime Device (CPU/GPU)
# =============================================================================
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")


# =============================================================================
# Model Loading
# =============================================================================
# 1) Classification Model (PyTorch)
classification_model = torch.load(
    "models/EfficientNet_Without_Dropout.pth",
    map_location=DEVICE
)
classification_model.eval()

# 2) Object Detection Model (YOLOv5 via torch.hub)
path_trained_model = Path("models/YoloV5_best.pt")
yolo_detection_model = torch.hub.load(
    "ultralytics/yolov5",
    "custom",
    path=str(path_trained_model),
    force_reload=False
)

# 3) Segmentation Model (YOLOv8 via ultralytics)
yolo_segmentation_model = YOLO("models/YoloV8_best.pt")


# =============================================================================
# Preprocessing / Postprocessing Config
# =============================================================================
# Classification preprocessing pipeline (matches ImageNet normalization)
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])

# Binary label mapping for classification output
flood_mapping = {1: "Flood", 0: "No Flood"}

# Segmentation color palette (OpenCV uses BGR format)
color_mapping = {
    0: ('red', (0, 0, 255)),
    1: ('blue', (255, 0, 0)),
    2: ('green', (0, 255, 0)),
    3: ('yellow', (0, 255, 255)),
    4: ('purple', (128, 0, 128)),
    5: ('cyan', (255, 255, 0)),
    6: ('magenta', (255, 0, 255)),
    7: ('orange', (0, 165, 255)),
    8: ('pink', (203, 192, 255)),
    9: ('brown', (42, 42, 165)),
    10: ('lime', (0, 255, 0)),
    11: ('teal', (128, 128, 0)),
    12: ('navy', (128, 0, 0)),
}

# NOTE:
# This global buffer stores the most recently rendered PNG for:
# - detection annotated output
# - segmentation blended output
# Works best for single-user usage; multi-user would need per-session storage.
img_byte_arr = None


# =============================================================================
# Routes: UI
# =============================================================================
@app.route("/")
def home():
    """Serve the main UI page."""
    return render_template("index.html")


# =============================================================================
# Routes: Inference API
# =============================================================================
@app.route("/upload", methods=["POST"])
def upload_file():
    """
    Accepts:
      - file: image file
      - model: one of {"classification", "detection", "segmentation"}

    Returns:
      JSON describing inference results.
      For detection/segmentation, also stores a rendered image in memory
      retrievable via /rendered-image
    """
    global img_byte_arr

    # --- Basic request validation ---
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    model_type = request.form.get("model")

    # --- Timing & timestamp metadata ---
    started = time.perf_counter()
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # =====================================================================
    # 1) Classification
    # =====================================================================
    if model_type == "classification":
        # Load image
        img = Image.open(file).convert("RGB")
        img_tensor = transform(img).unsqueeze(0).to(DEVICE)

        # Forward pass
        with torch.no_grad():
            outputs = classification_model(img_tensor)

            # Binary sigmoid probability for class 1
            p1 = torch.sigmoid(outputs).item()
            p0 = 1 - p1

            # Decision threshold at 0.5
            label = 1 if p1 > 0.5 else 0
            confidence = p1 if label == 1 else p0

        inference_ms = int((time.perf_counter() - started) * 1000)

        return jsonify({
            "type": "classification",
            "timestamp": ts,
            "inference_ms": inference_ms,
            "result": {"label": flood_mapping[label], "confidence": confidence * 100}
        })

    # =====================================================================
    # 2) Detection (YOLOv5)
    # =====================================================================
    if model_type == "detection":
        img = Image.open(file).convert("RGB")

        # Run detection
        results = yolo_detection_model(img)
        detection_data = results.xyxy[0].cpu().numpy()

        # Render annotated image (YOLOv5 built-in)
        results.render()
        rendered = Image.fromarray(results.ims[0])

        # Store rendered image in global buffer for /rendered-image
        img_byte_arr = BytesIO()
        rendered.save(img_byte_arr, format="PNG")
        img_byte_arr.seek(0)

        # Build structured detection list
        det_list = []
        for *box, conf, class_id in detection_data:
            x1, y1, x2, y2 = box
            det_list.append({
                "x": int(x1), "y": int(y1),
                "width": int(x2 - x1), "height": int(y2 - y1),
                "confidence": float(conf),
                "label": yolo_detection_model.names[int(class_id)]
            })

        inference_ms = int((time.perf_counter() - started) * 1000)
        top = max(det_list, key=lambda d: d["confidence"]) if det_list else None

        return jsonify({
            "type": "detection",
            "timestamp": ts,
            "inference_ms": inference_ms,
            "results": det_list,
            "count": len(det_list),
            "top_label": (top["label"] if top else None),
            "top_confidence": (top["confidence"] * 100 if top else None),
            "image_url": request.host_url + "rendered-image"
        })

    # =====================================================================
    # 3) Segmentation (YOLOv8)
    # =====================================================================
    if model_type == "segmentation":
        img = Image.open(file).convert("RGB")
        results = yolo_segmentation_model(img)

        # Convert original image to BGR for OpenCV overlay blending
        orig_rgb = np.array(img)
        overlay_bgr = cv2.cvtColor(orig_rgb, cv2.COLOR_RGB2BGR)

        # Extract masks and class IDs (if present)
        masks = results[0].masks.data.cpu().numpy() if results[0].masks else None
        cls_ids = results[0].boxes.cls.cpu().numpy().astype(int) if results[0].boxes else None
        names = results[0].names

        # No segmentation result case
        if masks is None or cls_ids is None or len(masks) == 0:
            inference_ms = int((time.perf_counter() - started) * 1000)
            return jsonify({
                "type": "segmentation",
                "timestamp": ts,
                "inference_ms": inference_ms,
                "error": "No masks found in segmentation result."
            })

        predicted_classes = []
        legend = []

        # Alpha blending factor
        alpha = 0.4

        # For each mask: resize -> binarize -> color overlay -> store metadata
        for i, mask in enumerate(masks):
            # Resize mask to match image
            mask = cv2.resize(mask, (overlay_bgr.shape[1], overlay_bgr.shape[0]))
            mask = (mask > 0.5).astype("uint8")  # convert to 0/1

            class_id = int(cls_ids[i])
            color_name, color_bgr = color_mapping.get(class_id, ("unknown", (0, 0, 0)))

            colored = np.zeros_like(overlay_bgr, dtype=np.uint8)
            colored[mask == 1] = color_bgr

            # Blend the colored mask onto the overlay image
            overlay_bgr = cv2.addWeighted(overlay_bgr, 1.0, colored, alpha, 0)

            # Resolve class name
            class_name = names[class_id] if isinstance(names, dict) and class_id in names else str(class_id)

            # Append predicted classes list
            predicted_classes.append({
                "color_name": color_name,
                "class_name": class_name,
                "class_id": class_id
            })

            # Append legend items
            legend.append({
                "class_id": class_id,
                "class_name": class_name,
                "color_name": color_name,
                "bgr": list(color_bgr)
            })

        # Convert blended result back to RGB -> PIL
        blended_rgb = cv2.cvtColor(overlay_bgr, cv2.COLOR_BGR2RGB)
        blended_img = Image.fromarray(blended_rgb)

        # Store rendered segmentation image for /rendered-image
        img_byte_arr = BytesIO()
        blended_img.save(img_byte_arr, format="PNG")
        img_byte_arr.seek(0)

        inference_ms = int((time.perf_counter() - started) * 1000)

        return jsonify({
            "type": "segmentation",
            "timestamp": ts,
            "inference_ms": inference_ms,
            "segmentation_url": request.host_url + "rendered-image",
            "classes": predicted_classes,
            "legend": legend
        })

    # --- Unknown model type ---
    return jsonify({"error": "Invalid model type."}), 400


# =============================================================================
# Routes: Rendered Output Image
# =============================================================================
@app.route("/rendered-image", methods=["GET"])
def rendered_image():
    """
    Returns the last rendered PNG (from detection or segmentation).
    Uses the global in-memory buffer `img_byte_arr`.
    """
    global img_byte_arr

    if img_byte_arr is None:
        return jsonify({"error": "No rendered image available."}), 404

    return send_file(img_byte_arr, mimetype="image/png")


# =============================================================================
# Entry Point
# =============================================================================
if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)