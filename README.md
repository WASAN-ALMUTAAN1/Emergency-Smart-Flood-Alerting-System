<p align="center">
<img src="docs/banner..jpg" width="100%">
</p>

<h1 align="center">
Emergency Smart Flood Alerting System for Safer Driving in Saudi Arabia
</h1>

<p align="center">
AI-Powered Computer Vision System for Flood Scene Analysis
</p>

<p align="center">

<img src="https://img.shields.io/badge/Country-Saudi%20Arabia-006C35?style=for-the-badge">
<img src="https://img.shields.io/badge/Field-Computer%20Vision-0f9d58?style=for-the-badge">
<img src="https://img.shields.io/badge/Framework-PyTorch-047857?style=for-the-badge">
<img src="https://img.shields.io/badge/Web%20App-Flask-065f46?style=for-the-badge">
<img src="https://img.shields.io/badge/System-AI%20Vision-064e3b?style=for-the-badge">

</p>

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=006C35&height=140&section=header&text=AI%20Flood%20Detection%20System&fontColor=ffffff&fontSize=35"/>

# 🌊 Project Overview

Flooding represents a major environmental hazard that can threaten drivers and transportation systems.  

This project introduces an **Artificial Intelligence system for flood scene analysis** using computer vision techniques.

The system integrates **deep learning models** with a **Flask-based web dashboard** to analyze flood imagery and visualize results.

The objective of this project is to demonstrate how **computer vision pipelines** can be used to analyze flood environments and present results through an interactive interface.

---

# 🧠 AI Vision Pipeline

```mermaid
flowchart LR

A[Visual Input] --> B[Preprocessing]
B --> C[EfficientNet Classification]
B --> D[YOLOv5 Object Detection]
B --> E[YOLOv8 Segmentation]

C --> F[Scene Understanding]
D --> F
E --> F

F --> G[Visualization Dashboard]

style A fill:#006C35,color:white
style B fill:#047857,color:white
style C fill:#059669,color:white
style D fill:#10b981,color:black
style E fill:#34d399,color:black
style F fill:#065f46,color:white
style G fill:#064e3b,color:white
```

The AI pipeline combines **classification, detection, and segmentation models** to analyze flood scenes from multiple perspectives.

---

# 🧩 3D System Architecture

```mermaid
graph TD

Input[Image / Video Input]

Pre[Preprocessing]

C1[EfficientNet<br>Classification]
C2[YOLOv5<br>Detection]
C3[YOLOv8<br>Segmentation]

Fusion[Result Fusion]

UI[Flask Web Dashboard]

Input --> Pre
Pre --> C1
Pre --> C2
Pre --> C3

C1 --> Fusion
C2 --> Fusion
C3 --> Fusion

Fusion --> UI

style Input fill:#006C35,color:white
style Pre fill:#047857,color:white
style C1 fill:#059669,color:white
style C2 fill:#10b981,color:black
style C3 fill:#34d399,color:black
style Fusion fill:#065f46,color:white
style UI fill:#064e3b,color:white
```

The architecture demonstrates how multiple computer vision components collaborate within a unified pipeline.

---

# 📊 AI Model Overview

| Model | Purpose |
|------|------|
| EfficientNet | Flood scene classification |
| YOLOv5 | Object detection |
| YOLOv8 | Image segmentation |

The combination of these models enables **multi-level scene interpretation**.

---

# 📊 System Components

| Component | Description |
|------|------|
| AI Models | Deep learning models for visual analysis |
| Processing Pipeline | Image preprocessing and model inference |
| Web Dashboard | Interactive visualization interface |
| Documentation | Project methodology and datasets |

---

# 🧠 Flood Scene Analysis Concept

```mermaid
flowchart TD

Scene[Road Scene]

Scene --> Water[Flood Water Detection]
Scene --> Vehicles[Vehicle Detection]
Scene --> Objects[Environmental Objects]

Water --> Risk[Hazard Evaluation]
Vehicles --> Risk
Objects --> Risk

Risk --> Alert[Driver Awareness]

style Scene fill:#006C35,color:white
style Water fill:#059669,color:white
style Vehicles fill:#10b981,color:black
style Objects fill:#34d399,color:black
style Risk fill:#065f46,color:white
style Alert fill:#064e3b,color:white
```

This conceptual diagram illustrates how computer vision techniques can interpret flood environments.

---

# 🖥 Web Application

The project includes a **Flask-based web interface** that allows users to interact with the system.

The interface demonstrates:

• visual input analysis  
• AI model inference  
• result visualization  

The application illustrates how **deep learning models can be integrated into interactive systems**.

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

Clone repository:

```
git clone https://github.com/yourusername/Emergency-Smart-Flood-Alerting-System
cd Emergency-Smart-Flood-Alerting-System
```

Install dependencies:

```
pip install -r smart-flooding-system/requirements.txt
```

Run application:

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

Project documentation is located in the **docs** directory.

The documentation describes the project methodology and implementation details.

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=006C35&height=140&section=footer"/>

<p align="center">

Artificial Intelligence for Environmental Scene Analysis

</p>
