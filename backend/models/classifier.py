
from pathlib import Path
from typing import Any, Dict

import joblib


class BaselineClassifier:
    CATEGORIES = [
        "Roads & Potholes",
        "Streetlights & Electrical",
        "Drainage & Sewerage",
        "Garbage & Solid Waste",
        "Water Supply & Contamination",
        "Public Health & Sanitation",
        "Horticulture & Encroachments",
    ]

    DEPARTMENT_MAP = {
        "Roads & Potholes": "Public Works & Road Engineering",
        "Streetlights & Electrical": "City Power & Electrical Safety",
        "Drainage & Sewerage": "Water Supply & Sewerage Board",
        "Garbage & Solid Waste": "Solid Waste Management Cell",
        "Water Supply & Contamination": "Water Supply & Sewerage Board",
        "Public Health & Sanitation": "Pollution Control & Municipal Health",
        "Horticulture & Encroachments": "Horticulture & Forest Wing",
    }

    LABEL_MAP = {
        "Road Damage": "Roads & Potholes",
        "Streetlight Fault": "Streetlights & Electrical",
        "Drainage Blockage": "Drainage & Sewerage",
        "Garbage": "Garbage & Solid Waste",
        "Water Leakage": "Water Supply & Contamination",
    }

    def __init__(self):
        model_path = (
            Path(__file__).resolve().parent
            / "civicpulse_text_model.joblib"
        )
        self.model = joblib.load(model_path)
        self.model_type = "tfidf_logistic_regression"
        self.version = "1.0.0"

    def classify(self, text: str) -> Dict[str, Any]:
        probabilities = self.model.predict_proba([text])[0]
        best_index = probabilities.argmax()
        original_label = self.model.classes_[best_index]
        confidence = float(probabilities[best_index]) * 100

        category = self.LABEL_MAP.get(
            original_label, "Roads & Potholes"
        )

        cleaned = text.lower()
        hazards = [
            word for word in [
                "urgent", "emergency", "danger", "accident",
                "sparking", "flood", "electrocution", "collapse"
            ]
            if word in cleaned
        ]

        if any(w in cleaned for w in [
            "electrocution", "sparking", "accident",
            "collapse", "burst"
        ]):
            priority = "Critical"
            urgency = "Immediate Hazard (SLA 4-6h)"
            emergency = True
            sentiment = -0.85
        elif any(w in cleaned for w in [
            "urgent", "emergency", "danger", "flood"
        ]):
            priority = "High"
            urgency = "Elevated Priority (SLA 12-24h)"
            emergency = False
            sentiment = -0.65
        else:
            priority = "Medium"
            urgency = "Standard SLA (48-72h)"
            emergency = False
            sentiment = -0.45

        return {
            "category": category,
            "confidence": round(confidence, 2),
            "priority": priority,
            "department": self.DEPARTMENT_MAP[category],
            "sentimentScore": sentiment,
            "urgencyLevel": urgency,
            "hazards": hazards or ["Routine civic wear"],
            "isEmergencyRecommendation": emergency,
            "similarComplaints": [],
            "_metadata": {
                "model_type": self.model_type,
                "version": self.version,
                "is_demo_placeholder": False,
                "note": "TF-IDF and Logistic Regression text classifier; priority is rule-based."
            }
        }
