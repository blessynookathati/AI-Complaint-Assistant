// Mock Civic Hotspots and Recurring Cluster Analytics
// Clearly identified as demonstration smart-city analytical models

export const MOCK_HOTSPOTS = [
  {
    id: "HSP-01",
    location: "Outer Ring Road - Bellandur Junction",
    ward: "Ward 8",
    zone: "East Zone",
    primaryIssue: "Water Logging & Potholes",
    totalComplaints: 42,
    recurringCount: 19,
    riskLevel: "Critical",
    riskScore: 92,
    avgResolutionHours: 38,
    statusTrend: "+18% vs last month",
    recommendation: "Deploy heavy-duty submersible de-watering pumps and complete bitumen recarpeting before monsoon onset.",
    categoryDistribution: {
      "Roads & Potholes": 24,
      "Drainage & Sewerage": 12,
      "Streetlights & Electrical": 6
    }
  },
  {
    id: "HSP-02",
    location: "Indiranagar 100ft Road Corridor",
    ward: "Ward 4",
    zone: "East Zone",
    primaryIssue: "Asphalt Degradation & Traffic Hazards",
    totalComplaints: 34,
    recurringCount: 14,
    riskLevel: "High",
    riskScore: 78,
    avgResolutionHours: 26,
    statusTrend: "+5% vs last month",
    recommendation: "Joint inspection with Metro Rail authority to inspect foundation vibration damage.",
    categoryDistribution: {
      "Roads & Potholes": 22,
      "Streetlights & Electrical": 8,
      "Garbage & Solid Waste": 4
    }
  },
  {
    id: "HSP-03",
    location: "Malleshwaram Market & 15th Cross",
    ward: "Ward 12",
    zone: "West Zone",
    primaryIssue: "Drainage Backflow & Solid Waste Accumulation",
    totalComplaints: 29,
    recurringCount: 11,
    riskLevel: "High",
    riskScore: 74,
    avgResolutionHours: 21,
    statusTrend: "-8% vs last month (improving)",
    recommendation: "Install secondary silt traps on storm canal inlet 4 and increase night garbage truck rounds.",
    categoryDistribution: {
      "Drainage & Sewerage": 16,
      "Garbage & Solid Waste": 10,
      "Public Health & Sanitation": 3
    }
  },
  {
    id: "HSP-04",
    location: "HSR Layout Sector 3 & 4 Grid",
    ward: "Ward 17",
    zone: "South Zone",
    primaryIssue: "Overhead Electrical Cable Sagging",
    totalComplaints: 21,
    recurringCount: 7,
    riskLevel: "Medium",
    riskScore: 58,
    avgResolutionHours: 14,
    statusTrend: "-15% vs last month",
    recommendation: "Replace bare overhead wires with aerial bunched cables (ABC) across school corridors.",
    categoryDistribution: {
      "Streetlights & Electrical": 15,
      "Roads & Potholes": 4,
      "Horticulture & Encroachments": 2
    }
  },
  {
    id: "HSP-05",
    location: "Peenya Industrial Area Phase 2",
    ward: "Ward 1",
    zone: "West Zone",
    primaryIssue: "Industrial Waste Runoff & Sanitation",
    totalComplaints: 18,
    recurringCount: 8,
    riskLevel: "Critical",
    riskScore: 89,
    avgResolutionHours: 42,
    statusTrend: "+24% vs last month",
    recommendation: "Issue pollution compliance notices and sample storm drain discharge points.",
    categoryDistribution: {
      "Public Health & Sanitation": 11,
      "Drainage & Sewerage": 5,
      "Roads & Potholes": 2
    }
  }
];

export const MONTHLY_TREND_DATA = [
  { month: "May", resolved: 140, reported: 165 },
  { month: "Jun", resolved: 185, reported: 210 },
  { month: "Jul", resolved: 230, reported: 285 },
  { month: "Aug", resolved: 290, reported: 320 },
  { month: "Sep", resolved: 310, reported: 340 },
  { month: "Oct (MTD)", resolved: 352, reported: 378 }
];
