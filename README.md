<p align="center">
<img src="docs/banner.jpg" width="100%">
</p>

<h1 align="center">
Emergency Smart Flood Alerting System for Safer Driving in Saudi Arabia
</h1>

<p align="center">
Artificial Intelligence System for Flood Scene Analysis Using Computer Vision
</p>

<p align="center">

<img src="https://img.shields.io/badge/Country-Saudi%20Arabia-006C35?style=for-the-badge">
<img src="https://img.shields.io/badge/Domain-Computer%20Vision-0f9d58?style=for-the-badge">
<img src="https://img.shields.io/badge/Framework-PyTorch-047857?style=for-the-badge">
<img src="https://img.shields.io/badge/Web%20Application-Flask-065f46?style=for-the-badge">
<img src="https://img.shields.io/badge/System-AI%20Vision-064e3b?style=for-the-badge">

</p>

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=006C35&height=160&&section=header" width="100%"/>


# 🌊 Project Overview

Flooding represents one of the most dangerous environmental hazards affecting road safety.  
Flooded roads can lead to severe traffic incidents, infrastructure disruption, and driver risk.

This project introduces an **Artificial Intelligence system for flood scene analysis** using **computer vision techniques**.

The system integrates **deep learning models** with a **Flask-based web interface** to analyze flood imagery and visualize results.

The goal of the system is to demonstrate how **AI vision pipelines can interpret flood environments** and present visual insights through an interactive interface.

---

# 🧠 AI Vision Pipeline

```mermaid
flowchart LR

A[Image / Video Input] --> B[Image Preprocessing]

B --> C[EfficientNet<br>Scene Classification]
B --> D[YOLOv5<br>Object Detection]
B --> E[YOLOv8<br>Flood Segmentation]

C --> F[Scene Understanding]
D --> F
E --> F

F --> G[Result Visualization]

style A fill:#006C35,color:white
style B fill:#047857,color:white
style C fill:#059669,color:white
style D fill:#10b981,color:black
style E fill:#34d399,color:black
style F fill:#065f46,color:white
style G fill:#064e3b,color:white
```

The pipeline combines **classification, detection, and segmentation models** to interpret flood scenes at multiple levels.

---

# 🧩 AI System Architecture

```mermaid
graph TD

Input[Visual Data Input]

Preprocessing[Image Processing]

Classifier[EfficientNet Classification]

Detector[YOLOv5 Detection]

Segmenter[YOLOv8 Segmentation]

Fusion[Multi-Model Result Fusion]

Dashboard[Flask Visualization Interface]

Input --> Preprocessing

Preprocessing --> Classifier
Preprocessing --> Detector
Preprocessing --> Segmenter

Classifier --> Fusion
Detector --> Fusion
Segmenter --> Fusion

Fusion --> Dashboard

style Input fill:#006C35,color:white
style Preprocessing fill:#047857,color:white
style Classifier fill:#059669,color:white
style Detector fill:#10b981,color:black
style Segmenter fill:#34d399,color:black
style Fusion fill:#065f46,color:white
style Dashboard fill:#064e3b,color:white
```

This architecture illustrates how **multiple AI models cooperate in a unified visual analysis pipeline**.

---

# 🗺 Flood Scene Interpretation Map

```mermaid
flowchart TD

Scene[Road Environment Scene]

Scene --> Flood[Flood Water Detection]

Scene --> Vehicles[Vehicle Detection]

Scene --> RoadSurface[Road Surface Observation]

Flood --> Risk[Risk Evaluation]

Vehicles --> Risk

RoadSurface --> Risk

Risk --> Visualization[Visual Dashboard]

Visualization --> Awareness[Driver Awareness]

style Scene fill:#006C35,color:white
style Flood fill:#059669,color:white
style Vehicles fill:#10b981,color:black
style RoadSurface fill:#34d399,color:black
style Risk fill:#065f46,color:white
style Visualization fill:#047857,color:white
style Awareness fill:#064e3b,color:white
```

This conceptual map demonstrates how **computer vision techniques analyze road environments during flood events**.

---

# 📊 AI Model Components

| Model | Purpose |
|------|------|
| EfficientNet | Flood scene classification |
| YOLOv5 | Object detection |
| YOLOv8 | Flood segmentation |

The system integrates these models to achieve **multi-level scene interpretation**.

---

# 📊 System Components

| Component | Description |
|------|------|
| Deep Learning Models | AI models used for scene analysis |
| Processing Pipeline | Image preprocessing and inference |
| Web Interface | Flask visualization dashboard |
| Documentation | Project methodology and references |

---

# 🖥 Web Application

The project includes a **Flask-based web interface** designed to visualize AI results.

The interface demonstrates:

• image input analysis  
• AI model inference  
• result visualization  

This interface shows how **AI vision models can be integrated into an interactive application environment**.

---

# 🧠 AI Processing Concept

```mermaid
flowchart LR

Data[Visual Data]

Data --> Vision[Computer Vision Models]

Vision --> Analysis[Scene Analysis]

Analysis --> Visualization[Dashboard Visualization]

Visualization --> Output[AI Interpretation]

style Data fill:#006C35,color:white
style Vision fill:#047857,color:white
style Analysis fill:#059669,color:white
style Visualization fill:#065f46,color:white
style Output fill:#064e3b,color:white
```

This simplified diagram summarizes the **flow of information inside the AI system**.

---

# 🗂 Repository Structure

```
Emergency-Smart-Flood-Alerting-System
│
├── smart-flooding-system
│   ├── app.py
│   ├── requirements.txt
│   ├── templates
│   ├── static
│   └── models
│
├── Program
│   ├── CPCS432_Program.ipynb
│   └── Models
│
├── docs
│   ├── DatasetsLinks.txt
│   ├── Emergency_Smart_Flood_Alerting_System.pdf
│   └── Emergency Smart Flood Alerting System Report
│
└── assets
    └── project demonstration video
```

---

# ⚙ Installation

Clone the repository

```
git clone https://github.com/yourusername/Emergency-Smart-Flood-Alerting-System
cd Emergency-Smart-Flood-Alerting-System
```

Install dependencies

```
pip install -r smart-flooding-system/requirements.txt
```

Run the application

```
python smart-flooding-system/app.py
```

---

# 📦 Model Weights

Model weights are provided through **GitHub Releases** to keep the repository lightweight.

After downloading the weights place them in:

```
smart-flooding-system/models
```

---

# 📚 Documentation

Project documentation is available in the **docs directory**.

```
docs/Emergency_Smart_Flood_Alerting_System.pdf
```

Dataset references are listed in:

```
docs/DatasetsLinks.txt
```

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=006C35&height=140&section=footer" width="100%"/>

