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

<p align="center">

<img src="https://img.shields.io/badge/Country-Saudi%20Arabia-006C35?style=for-the-badge&logo=saudiarabia">
<img src="https://img.shields.io/badge/Domain-Computer%20Vision-047857?style=for-the-badge">
<img src="https://img.shields.io/badge/AI-Deep%20Learning-059669?style=for-the-badge">
<img src="https://img.shields.io/badge/Framework-PyTorch-065f46?style=for-the-badge">
<img src="https://img.shields.io/badge/Web%20App-Flask-10B981?style=for-the-badge">

</p>

<p align="center">

<a href="https://github.com/WASAN-ALMUTAAN1/Emergency-Smart-Flood-Alerting-System/releases">
<img src="https://img.shields.io/badge/▶%20Demo%20%26%20Models-Releases-006C35?style=for-the-badge&logo=github">
</a>

<a href="DATASETS.md">
<img src="https://img.shields.io/badge/Datasets-Documentation-10B981?style=for-the-badge">
</a>

</p>

---

# 🔎 Table of Contents

- Overview
- Research Highlights
- Key Features
- AI System Architecture
- AI Models
- Datasets
- Experimental Setup
- Results
- Example Predictions
- System Interface
- System Demonstration
- Repository Structure
- Installation
- Citation
- License

---

# 🌊 Overview

Flooding represents one of the most significant environmental hazards affecting transportation systems and road safety worldwide.

This project introduces an **AI-powered flood analysis system** that leverages advanced **computer vision models** to interpret flood scenes in road environments.

The system integrates multiple deep learning models capable of:

• Detecting flood conditions in road scenes  
• Identifying vehicles and humans affected by flooding  
• Segmenting flooded regions within the environment  
• Estimating environmental flood severity  

Results are presented through an **interactive AI dashboard**, allowing intuitive interpretation of environmental conditions.

This work demonstrates how **artificial intelligence can enhance disaster awareness and improve road safety in Saudi Arabia.**

---

# 📌 Research Highlights

• Multi-model **computer vision pipeline** for flood scene interpretation  

• EfficientNet classification model achieving **~98% accuracy**

• Integration of **object detection and segmentation models**

• Interactive **Flask-based AI dashboard**

• AI application for **transportation safety and environmental monitoring**

---

# 🚀 Key Features

✔ Multi-Model AI Pipeline  

✔ Integration of **Classification + Detection + Segmentation**

✔ State-of-the-Art Deep Learning Models  

✔ Interactive **Flask Web Application**

✔ Multiple Public Datasets for Robust Training  

✔ Research-Level Experimental Evaluation  

✔ Deployment-Ready AI System  

---

# 🧠 AI System Architecture

The framework follows a **multi-stage computer vision pipeline** designed for comprehensive flood scene interpretation.

```mermaid
flowchart LR
A[Input Image] --> B[Image Preprocessing]
B --> C[EfficientNet Classification]
B --> D[YOLOv5 Object Detection]
B --> E[YOLOv8 Flood Segmentation]
C --> F[AI Interpretation Layer]
D --> F
E --> F
F --> G[Flask Dashboard Interface]
```

Each AI module contributes complementary environmental information.

| Module | Function |
|------|------|
Classification | Detect flood presence |
Object Detection | Identify vehicles and humans |
Segmentation | Detect flooded regions |

Together these models create a **holistic environmental analysis system**.

---

# 🤖 AI Models

The system integrates multiple deep learning architectures.

| Task | Model | Role |
|------|------|------|
Flood Classification | EfficientNet | Detect flood scenes |
Object Detection | YOLOv5 | Detect vehicles and humans |
Flood Segmentation | YOLOv8 | Identify flooded regions |

Trained model weights are provided through **GitHub Releases** to maintain a lightweight repository.

➡  
https://github.com/WASAN-ALMUTAAN1/Emergency-Smart-Flood-Alerting-System/releases

---

# 📊 Datasets

Multiple publicly available datasets were used for training and evaluation.

These datasets support:

• Flood Scene Classification  
• Object Detection in Flood Environments  
• Flood Area Segmentation  
• Water Level Estimation  

Full dataset documentation:

➡ **[DATASETS.md](DATASETS.md)**

---

# 🔬 Experimental Setup

Training environment

```
Python 3.9
PyTorch
Google Colab GPU (NVIDIA T4)
```

Training configuration

```
Optimizer: Adam
Learning Rate: 0.001
```

Batch sizes

```
Classification : 32
Detection      : 16
Segmentation   : 4
```

Evaluation metrics

```
Accuracy
Precision
Recall
F1 Score
mAP@0.5
IoU
```

---

# 📈 Results

The proposed system demonstrates strong performance across multiple computer vision tasks.

### Flood Scene Classification

EfficientNet achieved approximately

```
~98% accuracy
```

### Object Detection

| Model | Precision | Recall | mAP |
|------|------|------|------|
YOLOv5 | 0.73 | 0.77 | 0.76 |
YOLOv8 | **0.88** | **0.84** | **0.92** |

### Flood Segmentation

YOLOv8 segmentation models demonstrated strong performance in identifying flooded regions with high pixel-level accuracy.

These results highlight the effectiveness of **deep learning for environmental monitoring applications**.

---

# 🖼 Example Predictions

Examples of AI-based flood scene analysis.

| Input Image | Detection | Segmentation |
|-------------|-----------|--------------|
| ![](assets/example_input.jpg) | ![](assets/example_detection.jpg) | ![](assets/example_segmentation.jpg) |

These visualizations demonstrate how the system interprets flood environments.

---

# 🖥 System Interface

The project includes a **Flask-based AI dashboard**.

Users can:

• Upload flood scene images  

• Run AI inference  

• Visualize detection and segmentation outputs  

• Interpret flood conditions in real time

---

# 🎥 System Demonstration

A full system demonstration is available through **GitHub Releases**.

▶ Watch the demo

https://github.com/WASAN-ALMUTAAN1/Emergency-Smart-Flood-Alerting-System/releases

The video demonstrates the full workflow of the AI system.

---

# 📂 Repository Structure

```
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
```

---

# ⚙ Installation

Clone repository

```
git clone https://github.com/WASAN-ALMUTAAN1/Emergency-Smart-Flood-Alerting-System
cd Emergency-Smart-Flood-Alerting-System
```

Install dependencies

```
pip install -r smart-flooding-system/requirements.txt
```

Download trained models from **GitHub Releases**.

Run the application

```
python smart-flooding-system/app.py
```

---

# 📑 Citation

If you use this project for research purposes please cite:

```bibtex
@article{flood_ai_2025,
title={Emergency Smart Flood Alerting System for Safer Driving in Saudi Arabia},
author={Almutaani, Wasan},
year={2025},
institution={King Abdulaziz University}
}
```

---

# 📜 License

This project is released under the **MIT License**.

---

<p align="center">
🇸🇦 Artificial Intelligence for Safer Roads in Saudi Arabia
</p>

<p align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:006C35,100:10B981&height=140&section=footer" width="100%">
</p>
