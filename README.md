<p align="center">
  <img src="docs/banner.jpg" width="100%" alt="Emergency Smart Flood Alerting System">
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:006C35,100:10B981&height=180&section=header&text=Emergency%20Smart%20Flood%20Alerting%20System&fontSize=34&fontColor=ffffff&animation=fadeIn&fontAlignY=38" width="100%" />
</p>

<h1 align="center">
🇸🇦 Emergency Smart Flood Alerting System
</h1>

<p align="center">
AI-Powered Computer Vision Framework for Flood Scene Analysis and Safer Driving in Saudi Arabia
</p>

<hr/>

<p align="center">
  <img src="https://img.shields.io/badge/AI-Deep%20Learning-059669?style=for-the-badge">
  <img src="https://img.shields.io/badge/Domain-Computer%20Vision-047857?style=for-the-badge">
  <img src="https://img.shields.io/badge/Framework-PyTorch-065f46?style=for-the-badge">
  <img src="https://img.shields.io/badge/Web%20Application-Flask-10B981?style=for-the-badge">
  <img src="https://img.shields.io/badge/Country-Saudi%20Arabia-006C35?style=for-the-badge&logo=saudiarabia">
</p>

<p align="center">
  <a href="https://github.com/WASAN-ALMUTAAN1/Emergency-Smart-Flood-Alerting-System/releases">
    <img src="https://img.shields.io/badge/▶%20Demo%20%26%20Models-Releases-006C35?style=for-the-badge&logo=github&logoColor=white" alt="Demo & Models">
  </a>
  <a href="DATASETS.md">
    <img src="https://img.shields.io/badge/Datasets-DATASETS.md-10B981?style=for-the-badge&logo=files&logoColor=white" alt="Datasets">
  </a>
</p>

<p align="center">
  <b>Artificial Intelligence System for Flood Scene Analysis Using Computer Vision</b>
</p>

<p align="center">
  <sub>A computer vision framework for analyzing road flood environments using deep learning models and an interactive visualization interface.</sub><br/>
  <sub>Model weights and the system demonstration video are provided through GitHub Releases.</sub>
</p>

<hr/>

<!-- Navigation Buttons (In-Page) -->
<p align="center">
  <a href="#overview"><img src="https://img.shields.io/badge/Overview-006C35?style=for-the-badge&logo=readme&logoColor=white" alt="Overview"/></a>
  <a href="#problem-statement"><img src="https://img.shields.io/badge/Problem-047857?style=for-the-badge&logo=pinboard&logoColor=white" alt="Problem"/></a>
  <a href="#key-features"><img src="https://img.shields.io/badge/Features-059669?style=for-the-badge&logo=checkmarx&logoColor=white" alt="Features"/></a>
  <a href="#ai-system-architecture"><img src="https://img.shields.io/badge/Architecture-065f46?style=for-the-badge&logo=diagram&logoColor=white" alt="Architecture"/></a>
  <a href="#ai-models"><img src="https://img.shields.io/badge/Models-10B981?style=for-the-badge&logo=pytorch&logoColor=white" alt="Models"/></a>
</p>

<p align="center">
  <a href="#datasets"><img src="https://img.shields.io/badge/Datasets-006C35?style=for-the-badge&logo=kaggle&logoColor=white" alt="Datasets"/></a>
  <a href="#experimental-setup"><img src="https://img.shields.io/badge/Experiment-047857?style=for-the-badge&logo=probot&logoColor=white" alt="Experiment"/></a>
  <a href="#results"><img src="https://img.shields.io/badge/Results-059669?style=for-the-badge&logo=googleanalytics&logoColor=white" alt="Results"/></a>
  <a href="#system-interface"><img src="https://img.shields.io/badge/Dashboard-065f46?style=for-the-badge&logo=flask&logoColor=white" alt="Dashboard"/></a>
  <a href="#installation"><img src="https://img.shields.io/badge/Install-10B981?style=for-the-badge&logo=terminal&logoColor=white" alt="Install"/></a>
</p>

<hr/>

# 🔎 Table of Contents
- [🌊 Overview](#overview)
- [🎯 Problem Statement](#problem-statement)
- [🚀 Key Features](#key-features)
- [🧠 AI System Architecture](#ai-system-architecture)
- [🤖 AI Models](#ai-models)
- [📦 Model Weights](#model-weights)
- [📊 Datasets](#datasets)
- [🔬 Experimental Setup](#experimental-setup)
- [📈 Results](#results)
- [🖥 System Interface](#system-interface)
- [🖼 System Screenshots](#system-screenshots)
- [🎥 System Demonstration](#system-demonstration)
- [📂 Repository Structure](#repository-structure)
- [⚙ Installation](#installation)
- [🔭 Future Work](#future-work)

<hr/>

# 🌊 Overview
Flooded roads represent one of the most dangerous environmental hazards affecting transportation systems and urban mobility. Drivers often underestimate flood severity, which can lead to vehicle damage, accidents, and life-threatening situations.

This project introduces an **AI-powered flood scene analysis system** that leverages modern **computer vision and deep learning techniques** to automatically interpret flood environments from images.

The system combines multiple AI models to provide **comprehensive environmental analysis**, including:
- Flood presence detection
- Object detection in flooded environments
- Flooded region segmentation
- Water-level severity estimation

The system presents results through an **interactive web dashboard**, enabling intuitive interpretation of flood risk conditions.

This project demonstrates how **artificial intelligence can support environmental awareness and road safety in Saudi Arabia.**

<hr/>

# 🎯 Problem Statement
Flood monitoring systems traditionally rely on physical sensors, weather reports, or manual observation. However, these approaches often lack **real-time visual understanding of road conditions**.

Drivers may encounter flooded roads without reliable information about:
- Flood depth
- Affected vehicles
- Severity of water accumulation

This project proposes a **computer vision based flood interpretation system** capable of analyzing road scenes and providing **visual risk assessment** from images.

<hr/>

# 🚀 Key Features
✔ Multi-Model Computer Vision Pipeline  
✔ Flood Classification using Deep Learning  
✔ Object Detection for Vehicles and Humans  
✔ Flood Area Segmentation  
✔ Water Level Severity Estimation  
✔ Interactive AI Dashboard  
✔ Real-Time Image Analysis  
✔ Research-Level Experimental Evaluation  

<hr/>

# 🧠 AI System Architecture
The system follows a **multi-stage AI pipeline** designed to interpret flood environments using complementary computer vision models.

~~~mermaid
flowchart LR
A[Input Image] --> B[Image Preprocessing]
B --> C[EfficientNet Classification]
B --> D[YOLOv5 Object Detection]
B --> E[YOLOv8 Flood Segmentation]
C --> F[AI Interpretation Layer]
D --> F
E --> F
F --> G[Interactive AI Dashboard]
~~~

Each model contributes a different layer of environmental understanding.

| AI Module | Function |
|------|------|
| Classification | Determine flood presence |
| Object Detection | Detect vehicles and humans |
| Segmentation | Identify flooded areas |
| Interpretation Layer | Estimate flood severity |

Together they provide a **holistic AI interpretation of flood scenes**.

<hr/>

# 🤖 AI Models
The system integrates multiple deep learning architectures.

| Task | Model | Purpose |
|------|------|------|
| Flood Classification | EfficientNet | Detect flooded environments |
| Object Detection | YOLOv5 | Identify vehicles and humans |
| Flood Segmentation | YOLOv8 | Detect flooded regions |

<hr/>

# 📦 Model Weights
Large model files are distributed via **GitHub Releases** to keep the repository lightweight.

Available models:

| Model | Task |
|------|------|
| EfficientNet | Flood Scene Classification |
| YOLOv5 | Object Detection |
| YOLOv8 | Flood Segmentation |

Download models (and demo video) from Releases:  
➡ https://github.com/WASAN-ALMUTAAN1/Emergency-Smart-Flood-Alerting-System/releases

<hr/>

# 📊 Datasets
The system was trained using several publicly available datasets that support different computer vision tasks, including classification, detection, segmentation, and water level estimation.

Full dataset documentation is available in:  
➡ **[DATASETS.md](DATASETS.md)**

<hr/>

# 🔬 Experimental Setup
Training environment:
- Python 3.9
- PyTorch
- Google Colab GPU (NVIDIA T4)

Evaluation metrics:
- Accuracy
- Precision
- Recall
- F1 Score
- mAP@0.5
- IoU

<hr/>

# 📈 Results
The proposed system achieved strong performance across multiple computer vision tasks.

## Flood Classification
EfficientNet achieved approximately:
- Accuracy ≈ 98%

## Object Detection Performance

| Model | Precision | Recall | mAP |
|------|------|------|------|
| YOLOv5 | 0.73 | 0.77 | 0.76 |
| YOLOv8 | **0.88** | **0.84** | **0.92** |

## Flood Segmentation
YOLOv8 segmentation models successfully detected flood regions with high pixel-level accuracy. The segmentation outputs enable visual estimation of **flood severity and water coverage**.

<hr/>

# 🖥 System Interface
The project includes an **interactive AI dashboard** built using Flask.

Users can:
- Upload flood scene images
- Select AI analysis models
- Visualize detection results
- Inspect segmentation overlays
- View estimated flood severity levels

The interface provides **clear visualization of AI predictions and environmental insights**.

<hr/>

# 🖼 System Screenshots
Below are real screenshots from the dashboard, showcasing the full AI workflow across the three core tasks.

<p align="center">
  <img src="assets/Input.png" width="100%" alt="Input - Image Upload">
</p>

<p align="center">
  <img src="assets/Classification.png" width="100%" alt="Classification Result">
</p>

<p align="center">
  <img src="assets/ObjectDetection.png" width="100%" alt="Object Detection Result">
</p>

<p align="center">
  <img src="assets/FloodSegmentation.png" width="100%" alt="Flood Segmentation Result">
</p>

<hr/>

# 🎥 System Demonstration
A full demonstration of the system is available through **GitHub Releases**.

▶ Watch the demo:  
https://github.com/WASAN-ALMUTAAN1/Emergency-Smart-Flood-Alerting-System/releases

<hr/>

# 📂 Repository Structure
~~~text
Emergency-Smart-Flood-Alerting-System
├── README.md
├── DATASETS.md
├── smart-flooding-system
│   ├── app.py
│   ├── requirements.txt
│   ├── templates
│   └── static
├── Program
│   └── CPCS432_Program.ipynb
├── docs
│   ├── Emergency_Smart_Flood_Alerting_System.pdf
│   └── Emergency_Smart_Flood_Alerting_System_Report.pdf
└── assets
~~~

<hr/>

# ⚙ Installation
Clone the repository:
~~~bash
git clone https://github.com/WASAN-ALMUTAAN1/Emergency-Smart-Flood-Alerting-System
cd Emergency-Smart-Flood-Alerting-System
~~~

Install dependencies:
~~~bash
pip install -r smart-flooding-system/requirements.txt
~~~

Download trained models from **GitHub Releases** and place them in the paths expected by `app.py`.

Run the application:
~~~bash
python smart-flooding-system/app.py
~~~

<hr/>

# 🔭 Future Work
Future improvements may include:
- Integration with real-time traffic cameras
- Temporal flood analysis using video streams
- Integration with IoT flood sensors
- Smart city monitoring integration
- Deployment for autonomous hazard detection systems

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:006C35,100:10B981&height=140&section=footer" width="100%" />
</p>
