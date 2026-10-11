"""Unit and API Integration Tests for CivicPulse AI Backend."""

import os
import sys
import unittest

# Ensure backend root is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import app


class TestCivicPulseAPI(unittest.TestCase):
    """Test suite verifying backend endpoints and baseline model contracts."""

    def setUp(self):
        """Configure test client."""
        app.config["TESTING"] = True
        self.client = app.test_client()

    def test_root_endpoint(self):
        """Test GET / returns 200 and frontend URL guidance."""
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data.get("status"), "online")
        self.assertIn("frontend_url", data)

    def test_health_check(self):
        """Test GET /api/health endpoint returns 200 and healthy status."""
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsNotNone(data)
        self.assertEqual(data.get("status"), "healthy")
        self.assertEqual(data.get("model_mode"), "baseline_placeholder")

    def test_classify_valid_pothole(self):
        """Test POST /api/v1/triage/classify with a road pothole grievance."""
        payload = {"text": "Deep pothole on 100ft road near Metro Pillar 142 causing vehicle damage"}
        response = self.client.post("/api/v1/triage/classify", json=payload)
        self.assertEqual(response.status_code, 200)

        data = response.get_json()
        self.assertIsNotNone(data)

        # Verify all frontend contract fields are present
        required_fields = [
            "category",
            "confidence",
            "priority",
            "department",
            "sentimentScore",
            "urgencyLevel",
            "hazards",
            "isEmergencyRecommendation",
            "similarComplaints",
            "_metadata",
        ]
        for field in required_fields:
            self.assertIn(field, data, f"Missing required field: {field}")

        self.assertEqual(data["category"], "Roads & Potholes")
        self.assertEqual(data["department"], "Public Works & Road Engineering")
        self.assertIsInstance(data["confidence"], (int, float))
        self.assertTrue(50.0 <= data["confidence"] <= 85.0)  # Honest baseline confidence

    def test_classify_missing_text_field(self):
        """Test POST /api/v1/triage/classify returns 400 when 'text' field is absent."""
        response = self.client.post("/api/v1/triage/classify", json={"description": "Missing text key"})
        self.assertEqual(response.status_code, 400)
        data = response.get_json()
        self.assertEqual(data.get("error"), "Bad Request")

    def test_classify_empty_text_string(self):
        """Test POST /api/v1/triage/classify returns 400 when 'text' is empty or whitespace."""
        response = self.client.post("/api/v1/triage/classify", json={"text": "   "})
        self.assertEqual(response.status_code, 400)
        data = response.get_json()
        self.assertEqual(data.get("error"), "Bad Request")

    def test_classify_emergency_trigger(self):
        """Test that life-safety hazard tokens trigger Critical priority and emergency flag."""
        payload = {"text": "Dangling high voltage electric wire sparking near school gate with electrocution danger"}
        response = self.client.post("/api/v1/triage/classify", json=payload)
        self.assertEqual(response.status_code, 200)

        data = response.get_json()
        self.assertEqual(data["priority"], "Critical")
        self.assertTrue(data["isEmergencyRecommendation"])
        self.assertEqual(data["category"], "Streetlights & Electrical")


if __name__ == "__main__":
    unittest.main()
