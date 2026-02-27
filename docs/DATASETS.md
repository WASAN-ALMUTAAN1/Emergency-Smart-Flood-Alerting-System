# Datasets

This project uses multiple public datasets for training and evaluating computer vision models related to flood detection, object detection in flood scenarios, and flood water level estimation.

---

# 1. Flood / No-Flood Classification Datasets

These datasets are used to train the **binary classification model** that predicts whether an image contains flooding or not.

| Dataset | Description | Link |
|-------|-------------|------|
| Flood / No-Flood Dataset | Binary classification dataset for detecting flood presence in images. | https://www.kaggle.com/datasets/khuongpd/binary-classification-floodnoflood |
| Flood Dataset (4GB) | Large-scale flood image dataset used for classification and general flood scene understanding. | https://www.kaggle.com/datasets/phamtuananhk16hl/flood-dataset-4gb |

---

# 2. Flood Object Detection Datasets

These datasets are used to train the **object detection model (YOLO)** to detect objects such as:

- Humans
- Vehicles
- Flood-related elements

| Dataset | Description | Link |
|-------|-------------|------|
| Flooded Objects Dataset | Roboflow dataset containing labeled flood-related objects such as people and vehicles. | https://universe.roboflow.com/sahar-turki-dhamad/flooded-objects |
| Flood Area Dataset | Object detection dataset for identifying flooded environments. | https://universe.roboflow.com/long-nguyen-hoang-9ecmq/flood-4oe1x |

---

# 3. Flood Area Segmentation Dataset

This dataset is used for **semantic segmentation** to detect flooded areas and estimate water levels.

| Dataset | Description | Link |
|-------|-------------|------|
| Flood Area Segmentation Dataset | Dataset used for training flood region segmentation models. | https://www.kaggle.com/datasets/faizalkarim/flood-area-segmentation |

---

# 4. Water Level Estimation Dataset

This dataset supports training models that estimate **water levels in flooded scenes**.

| Dataset | Description | Link |
|-------|-------------|------|
| Water Level Dataset | Dataset containing water level annotations used for estimating flood severity levels. | https://universe.roboflow.com/qurban-ali-qvlhx/water-level-sindh |

---

# Notes

- All datasets are **publicly available** and used for research and educational purposes.
- Some datasets were **combined and preprocessed** to train the final models used in this project.
- Additional preprocessing, augmentation, and cleaning were applied before training.

---
