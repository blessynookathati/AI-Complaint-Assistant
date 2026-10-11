// Simulated AI Triage & NLP Intelligence Classifier
// Designed with modular architecture ready for Python Flask & BERT / LLM endpoint integration

export const AI_SYSTEM_METADATA = {
  modelName: "CivicBERT-Ensemble v2.4",
  architecture: "Fine-Tuned RoBERTa + Multitask Classification Head",
  dataset: "128,000 Verified Municipal Grievance Corpora (GovTech India)",
  accuracy: "94.6%",
  latency: "84ms (Edge-Optimized)",
  lastRetrained: "October 2026",
  isSimulatedDemo: true
};

export const SAMPLE_AI_PROMPTS = [
  "Massive pothole on the flyover descent. Motorcyclist barely avoided a head-on collision. Road asphalt completely crumbled.",
  "Overhead electric wire severed and dangling near bus shelter. Sparking observed during rain. High shock risk for pedestrians.",
  "Black untreated sewage water overflowing out of manhole and gushing into nearby residential building compound. Unbearable stench.",
  "Commercial waste and plastic bags piled up outside primary health clinic. Stray animals tearing garbage sacks onto road.",
  "High pressure water pipe burst near market entrance. Potable clean drinking water being wasted for last 5 hours."
];

/**
 * Intelligent client-side heuristic classifier that emulates BERT multi-label classification.
 * Directly mirrors the future Flask backend output schema.
 */
export function analyzeCivicText(text, existingComplaints = []) {
  if (!text || text.trim().length === 0) {
    return {
      category: "Roads & Potholes",
      confidence: 85.0,
      priority: "Medium",
      department: "Public Works & Road Engineering",
      sentimentScore: -0.5,
      urgencyLevel: "Moderate",
      keywords: [],
      hazards: [],
      isEmergencyRecommendation: false,
      similarComplaints: []
    };
  }

  const lower = text.toLowerCase();
  
  // Keyword mapping dictionaries
  const scores = {
    "Roads & Potholes": 0,
    "Streetlights & Electrical": 0,
    "Drainage & Sewerage": 0,
    "Garbage & Solid Waste": 0,
    "Water Supply & Contamination": 0,
    "Public Health & Sanitation": 0,
    "Horticulture & Encroachments": 0
  };

  const roadKeywords = ["pothole", "potholes", "crater", "road", "asphalt", "tar", "bitumen", "skid", "divider", "pavement", "flyover", "speed breaker"];
  const electricalKeywords = ["wire", "cable", "electric", "spark", "sparking", "shock", "pole", "light", "lights", "darkness", "dangling", "transformer", "bulb", "fuse"];
  const drainageKeywords = ["drain", "drainage", "sewage", "gutter", "manhole", "overflow", "stagnant", "canal", "choked", "clogged", "backflow", "stormwater"];
  const garbageKeywords = ["garbage", "trash", "waste", "dump", "dumping", "plastic", "litter", "smell", "odor", "stench", "bin", "compost", "refuse"];
  const waterKeywords = ["water", "pipe", "pipeline", "burst", "rupture", "drinking water", "supply", "tap", "leak", "gushing", "contamination", "muddy water"];
  const healthKeywords = ["chemical", "fumes", "toxic", "hospital", "clinic", "illness", "dengue", "mosquito", "effluent", "smoke", "plague"];
  const horticultureKeywords = ["tree", "branch", "fallen", "roots", "foliage", "encroachment", "footpath blocked", "park"];

  const emergencyKeywords = ["urgent", "emergency", "deadly", "danger", "hazard", "fatal", "accident", "collided", "sparking", "collapse", "child", "school", "hospital", "flood", "electrocution", "toxic", "casualty"];

  roadKeywords.forEach(k => { if (lower.includes(k)) scores["Roads & Potholes"] += 15; });
  electricalKeywords.forEach(k => { if (lower.includes(k)) scores["Streetlights & Electrical"] += 15; });
  drainageKeywords.forEach(k => { if (lower.includes(k)) scores["Drainage & Sewerage"] += 15; });
  garbageKeywords.forEach(k => { if (lower.includes(k)) scores["Garbage & Solid Waste"] += 15; });
  waterKeywords.forEach(k => { if (lower.includes(k)) scores["Water Supply & Contamination"] += 15; });
  healthKeywords.forEach(k => { if (lower.includes(k)) scores["Public Health & Sanitation"] += 15; });
  horticultureKeywords.forEach(k => { if (lower.includes(k)) scores["Horticulture & Encroachments"] += 15; });

  // Determine top category
  let topCategory = "Roads & Potholes";
  let maxScore = -1;
  for (const [cat, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      topCategory = cat;
    }
  }

  // Emergency & Priority detection
  let emergencyScore = 0;
  const detectedHazards = [];
  emergencyKeywords.forEach(ek => {
    if (lower.includes(ek)) {
      emergencyScore += 20;
      detectedHazards.push(ek.charAt(0).toUpperCase() + ek.slice(1));
    }
  });

  let priority = "Medium";
  let urgencyLevel = "Standard SLA (48-72h)";
  let isEmergencyRecommendation = false;

  if (emergencyScore >= 35 || lower.includes("sparking") || lower.includes("accident") || lower.includes("burst") || lower.includes("electrocution")) {
    priority = "Critical";
    urgencyLevel = "Immediate Hazard (SLA 4-6h)";
    isEmergencyRecommendation = true;
  } else if (emergencyScore >= 15 || lower.includes("urgent") || lower.includes("danger") || lower.includes("overflow")) {
    priority = "High";
    urgencyLevel = "Elevated Priority (SLA 12-24h)";
  } else if (lower.includes("minor") || lower.includes("delay") || lower.includes("request")) {
    priority = "Low";
    urgencyLevel = "Low Urgency (SLA 96h)";
  }

  // Department mapping
  const departmentMap = {
    "Roads & Potholes": "Public Works & Road Engineering",
    "Streetlights & Electrical": "City Power & Electrical Safety",
    "Drainage & Sewerage": "Water Supply & Sewerage Board",
    "Garbage & Solid Waste": "Solid Waste Management Cell",
    "Water Supply & Contamination": "Water Supply & Sewerage Board",
    "Public Health & Sanitation": "Pollution Control & Municipal Health",
    "Horticulture & Encroachments": "Horticulture & Forest Wing"
  };

  const department = departmentMap[topCategory] || "Public Works & Road Engineering";
  const confidence = Math.min(99.2, Math.max(86.5, 85 + (maxScore * 1.2) + Math.random() * 2));
  const sentimentScore = -0.45 - (emergencyScore * 0.015);

  // Find duplicate/similar complaints from existing data
  const similarComplaints = existingComplaints
    .filter(c => c.category === topCategory)
    .slice(0, 2)
    .map(c => ({
      id: c.id,
      title: c.title,
      location: c.location,
      similarityScore: Math.floor(75 + Math.random() * 20)
    }));

  return {
    category: topCategory,
    confidence: Number(confidence.toFixed(1)),
    priority,
    department,
    sentimentScore: Number(sentimentScore.toFixed(2)),
    urgencyLevel,
    hazards: detectedHazards.length > 0 ? detectedHazards.slice(0, 4) : ["Routine civic wear"],
    isEmergencyRecommendation,
    similarComplaints
  };
}
