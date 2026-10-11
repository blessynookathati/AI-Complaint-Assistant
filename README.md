# CivicPulse AI 🏛️⚡

> **An AI-Powered Citizen Grievance Intelligence and Predictive Civic Issue Management System**  
> *Final-Year Major Project &bull; Smart City Municipal Administration & Operations Console*

---

## 📌 Overview

**CivicPulse AI** is a modern, responsive Smart City GovTech web application designed for municipal corporations and civic authorities (such as BBMP, Municipal Councils, and Public Works Departments). It streamlines citizen grievance reporting, applies simulated multi-label NLP triage, monitors hazardous emergency SLA breaches, and identifies spatial recurring issue hotspots (e.g., potholes, garbage accumulation, sewage overflows, broken streetlights, and contaminated water pipelines).

---

## 🚀 Key Modules & Features

### 1. 📊 Executive Civic Command Dashboard
- **Key Performance Indicators (KPIs):** Real-time tracking of Total Complaints, To Do, In Progress, Completed, and Critical/Emergency issues.
- **Category Distribution Chart:** Interactive proportional breakdown across municipal issue categories.
- **Predictive Hotspots Panel:** Quick overview of high-recurrence civic corridors (Indiranagar, Bellandur, Malleshwaram, etc.).
- **Live Hazard Banner:** Real-time visual alerts for unresolved life-safety and infrastructure hazards.
- **Recent Grievances Table:** Fast-audit view with immediate inspection modals.

### 2. 📝 Citizen Grievance Intake Portal
- **Category Selection:** Municipal departments (Roads, Waste, Electrical, Drainage, Health, Horticulture).
- **GPS Location Capture:** Simulates high-precision GPS geofencing with latitude/longitude coordinates and municipal ward mapping.
- **Evidence Dropzone:** Image upload with instant client-side thumbnail preview and sample test photos.
- **Real-Time AI NLP Triage Preview:** Dynamically analyzes grievance text as the citizen types to suggest category, priority, and target SLA.
- **Automated Complaint ID Generation:** Generates unique tracking identifiers (e.g., `CP-2026-1082`) upon submission.

### 3. 📋 Grievance Operations & Workflow Management
- **Dual View Support:**
  - **Kanban Board:** Three-column agile board (*To Do*, *In Progress*, *Completed*) with move actions and priority indicators.
  - **Data Table:** Dense audit table with sorting, search, and instant in-row status selectors.
- **Multi-Dimensional Filters:** Instant filtering by search query, status, category, priority, and assigned department.
- **State Persistence:** All status updates, new complaints, and workflow changes persist seamlessly in browser `localStorage`.
- **Deep-Dive Inspection Modal:** Full grievance dossier including citizen contacts, timeline history, GPS coordinates, and photo evidence.

### 4. 🧠 AI Predictive Intelligence & NLP Triage
- **Interactive Classifier Sandbox:** Test custom or pre-canned civic prompts to inspect multi-task classifications.
- **Confidence Scoring:** Simulated fine-tuned transformer classification confidence (e.g., 96.8%).
- **Semantic Entity Extraction:** Detects hazard tokens (e.g., *“live wire”*, *“two-wheeler skid”*, *“school zone”*).
- **Duplicate Grievance Detection:** Compares incoming grievances against existing records to flag duplicates.
- **Model Architecture Spec:** Documented blueprint for `CivicBERT-Ensemble v2.4`.

### 5. 🚨 Emergency Hazard & Rapid Response Deck
- **Life-Safety Prioritization:** Segregates critical infrastructure failures (high-voltage cable exposure, chemical runoff, water main ruptures).
- **Reason for Alert:** Clear explanation of potential risk and vulnerability.
- **Standard Operating Protocols (SOPs):** Recommends tailored municipal response protocols and targeted SLA windows (2–6 hours).
- **Simulated Escalation:** In-dashboard workflow to mobilize crews and log resolutions.

### 6. 🔥 Municipal Hotspot & Spatial Risk Analytics
- **DBSCAN Clustering Model:** Visualizes recurring grievance clusters across municipal wards.
- **Monthly Velocity Trend:** 6-month comparison of reported intake vs resolved closures.
- **Zone Vulnerability Matrix:** Ward-level risk scores (East, West, South divisions).
- **Preventative Engineering Directives:** Actionable suggestions (e.g., pre-monsoon dewatering pumps, asphalt recarpeting).

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite, JavaScript (ES2023)
- **Icons & Visuals:** [Lucide React](https://lucide.dev/)
- **Styling:** Vanilla Component-Based CSS (GovTech Smart-City Design System with Navy `#0f172a` & Teal `#0d9488` accents)
- **State Management:** React Context API + LocalStorage Persistence
- **Future Backend Readiness:** Ready for integration with Python Flask / FastAPI and HuggingFace / PyTorch models.

---

## 💻 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended; developed on Node 24)
- npm or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/blessynookathati/AI-Complaint-Assistant.git
   cd AI-Complaint-Assistant
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:5173/](http://localhost:5173/) to access the application.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🔮 Future Architecture & Backend Roadmap

The frontend has been built with clean API separation to connect to a Python Flask / FastAPI backend:

```
                      ┌─────────────────────────┐
                      │    React 19 Frontend    │
                      │     (CivicPulse AI)     │
                      └────────────┬────────────┘
                                   │  HTTP / REST
                                   ▼
                      ┌─────────────────────────┐
                      │      Python Flask       │
                      │       REST API          │
                      └────────────┬────────────┘
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   PostgreSQL     │      │    CivicBERT     │      │  Spatial DBSCAN  │
│   (GeoJSON/PostGIS) │   │ (PyTorch/Transformers)│ │  (GeoPandas/Scikit)│
└──────────────────┘      └──────────────────┘      └──────────────────┘
```

### Planned REST Endpoints:
- `POST /api/v1/triage/classify` &mdash; Multi-label grievance classification & priority prediction.
- `POST /api/v1/grievance/duplicate-check` &mdash; Cosine similarity matching via SentenceTransformers.
- `GET /api/v1/hotspots/clusters` &mdash; Spatial cluster coordinates and risk score calculation.
- `POST /api/v1/grievances` &mdash; Database persistence and municipal ticket routing.

---

## 👥 Contributors & Academic Credits

- **Project:** Final Year Major Project &bull; B14 Batch
- **Repository:** [AI-Complaint-Assistant](https://github.com/blessynookathati/AI-Complaint-Assistant.git)
- **Institution:** Municipal Technology & Computer Science Engineering
