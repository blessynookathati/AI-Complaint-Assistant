# CivicPulse AI &mdash; Python Flask Backend Scaffold

This folder contains the isolated backend service for **CivicPulse AI** (*An AI-Powered Citizen Grievance Intelligence and Predictive Civic Issue Management System*).

---

## 📌 Status & Design Principles

* **Review Phase (October 12):** This backend provides a clean REST API scaffold and test suite.
* **Baseline Classifier:** `models/classifier.py` implements a schema-compliant baseline keyword heuristic. It is **explicitly labelled as a baseline placeholder** and does not claim trained deep-learning validation.
* **Non-Breaking Contract:** The JSON response schema directly mirrors the frontend fields used in `ComplaintContext.jsx`, `aiModelInfo.js`, and `SubmitComplaint.jsx`.
* **Zero Disruption:** The existing React + Vite frontend remains decoupled and fully functional.

---

## 🚀 Windows Setup & Running Instructions

### 1. Prerequisites
Ensure Python 3.10 or higher is installed on your Windows machine:
```powershell
python --version
```
*(If Python is not installed, install Python 3.11 or 3.12 from [python.org](https://www.python.org/downloads/) or via `winget install Python.Python.3.12`)*

---

### 2. Navigate to the Backend Directory
From the project root:
```powershell
cd backend
```

---

### 3. Create and Activate a Virtual Environment

**In Windows PowerShell:**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```
*(If PowerShell blocks script execution, run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned`)*

**In Windows Command Prompt (CMD):**
```cmd
python -m venv venv
venv\Scripts\activate.bat
```

---

### 4. Install Dependencies
```powershell
pip install -r requirements.txt
```

---

### 5. Run the Test Suite
Verify that all endpoints, schema contracts, and 400 validations pass:
```powershell
python -m unittest tests/test_api.py
```
*Or using pytest:*
```powershell
pytest
```

---

### 6. Start the Flask Server
```powershell
python app.py
```
The server will start on: **`http://127.0.0.1:5000`** with CORS enabled for Vite (`http://localhost:5173` and `http://127.0.0.1:5173`).

---

## 📡 API Endpoints

### 1. Health Check
* **Endpoint:** `GET /api/health`
* **Response (HTTP 200):**
```json
{
  "cors_enabled": true,
  "model_mode": "baseline_placeholder",
  "service": "CivicPulse AI Backend API",
  "status": "healthy",
  "version": "0.1.0"
}
```

---

### 2. Grievance NLP Triage
* **Endpoint:** `POST /api/v1/triage/classify`
* **Headers:** `Content-Type: application/json`
* **Request Body:**
```json
{
  "text": "Deep crater on 100ft road near Metro Pillar 142 causing vehicle damage"
}
```

* **Success Response (HTTP 200):**
```json
{
  "_metadata": {
    "is_demo_placeholder": true,
    "model_type": "baseline_heuristic_stub",
    "note": "Baseline keyword heuristic. Replace with trained PyTorch/HuggingFace model for production.",
    "version": "0.1.0-scaffold"
  },
  "category": "Roads & Potholes",
  "confidence": 67.0,
  "department": "Public Works & Road Engineering",
  "hazards": [
    "Routine civic wear"
  ],
  "isEmergencyRecommendation": false,
  "priority": "Medium",
  "sentimentScore": -0.45,
  "similarComplaints": [],
  "urgencyLevel": "Standard SLA (48-72h)"
}
```

* **Error Response (HTTP 400 - Missing or Empty Text):**
```json
{
  "error": "Bad Request",
  "message": "Field 'text' is required and cannot be empty."
}
```

---

## 🔮 Future ML Integration Guide

When ready to connect trained weights (e.g., HuggingFace transformer / PyTorch model):
1. Place serialized weights in `backend/models/weights/`.
2. Update `models/classifier.py` to load the tokenizer and model checkpoint.
3. Replace the heuristic `classify()` method with the model forward pass.
4. Update `_metadata.is_demo_placeholder` to `false` and set `_metadata.model_type` to your trained architecture (e.g. `CivicBERT-v1`).
