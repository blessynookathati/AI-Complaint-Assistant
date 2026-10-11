"""CivicPulse AI - Flask Backend Service Scaffold.

Provides REST API endpoints for civic grievance triage and health monitoring.
"""

from flask import Flask, jsonify, request
from flask_cors import CORS

from models.classifier import BaselineClassifier

app = Flask(__name__)

# Configure CORS for local Vite development origins
CORS(
    app,
    resources={
        r"/api/*": {
            "origins": [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:3000",
                "http://127.0.0.1:3000",
            ]
        }
    },
)

# Initialize baseline placeholder classifier
classifier = BaselineClassifier()


@app.route("/", methods=["GET"])
def root():
    """Root endpoint welcoming visitors and directing to the React UI."""
    return jsonify(
        {
            "service": "CivicPulse AI - Backend API Service",
            "status": "online",
            "frontend_url": "http://127.0.0.1:5173/",
            "endpoints": {
                "health": "/api/health",
                "classify": "/api/v1/triage/classify [POST]",
            },
            "note": "Visit http://127.0.0.1:5173/ to view the CivicPulse AI web application frontend.",
        }
    ), 200


@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint to verify backend status.

    Returns:
        JSON confirming API readiness and baseline model mode.
    """
    return jsonify(
        {
            "status": "healthy",
            "service": "CivicPulse AI Backend API",
            "version": "0.1.0",
            "model_mode": "baseline_placeholder",
            "cors_enabled": True,
        }
    ), 200


@app.route("/api/v1/triage/classify", methods=["POST"])
def triage_classify():
    """Triage and classify citizen grievance description.

    Expected JSON body:
        { "text": "Deep pothole on 100ft road causing bike skids" }

    Returns:
        JSON conforming to the CivicPulse AI grievance intelligence schema.
    """
    if not request.is_json:
        return jsonify(
            {
                "error": "Bad Request",
                "message": "Content-Type must be application/json.",
            }
        ), 400

    data = request.get_json(silent=True)
    if not data or not isinstance(data, dict):
        return jsonify(
            {
                "error": "Bad Request",
                "message": "Invalid JSON body provided.",
            }
        ), 400

    text = data.get("text")

    # Validate missing or empty text
    if text is None or not isinstance(text, str) or not text.strip():
        return jsonify(
            {
                "error": "Bad Request",
                "message": "Field 'text' is required and cannot be empty.",
            }
        ), 400

    # Run baseline classification
    prediction = classifier.classify(text)

    return jsonify(prediction), 200


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
