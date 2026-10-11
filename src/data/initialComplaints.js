// Realistic Sample Complaints for CivicPulse AI Smart City System

export const INITIAL_COMPLAINTS = [
  {
    id: "CP-2026-1082",
    title: "Deep Pothole & Caved Asphalt near Metro Pillar 142",
    description: "Major crater-like pothole spanning across two lanes on 100ft road. Two two-wheelers skidded during evening rush hour. Sharp asphalt edges pose severe collision risk.",
    category: "Roads & Potholes",
    location: "Indiranagar 100ft Road, Ward 4 (Near Metro Pillar 142)",
    coordinates: "12.97836, 77.64083",
    priority: "Critical",
    department: "Public Works & Road Engineering",
    date: "2026-10-09",
    status: "To Do",
    isEmergency: true,
    emergencyReason: "High accident vulnerability; active traffic artery with multiple vehicle damage incidents",
    citizenName: "Arjun Verma",
    citizenPhone: "+91 98450 21390",
    photoUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80",
    aiPrediction: {
      categoryConfidence: 96.8,
      suggestedPriority: "Critical",
      suggestedDepartment: "Public Works & Road Engineering",
      sentimentScore: -0.88,
      urgencyLevel: "Severe",
      similarComplaintId: "CP-2026-0941",
      extractedHazards: ["Two-wheeler skids", "Deep crater", "Active arterial road"]
    },
    timeline: [
      { step: "Grievance Logged", time: "2026-10-09 18:30", note: "Citizen reported via CivicPulse Mobile GPS" },
      { step: "AI Triage Completed", time: "2026-10-09 18:31", note: "NLP tagged Priority as Critical (96.8% confidence)" },
      { step: "Dispatched to Zone 4 PWD", time: "2026-10-09 18:45", note: "Assigned to Ward Engineer S. Raman" }
    ]
  },
  {
    id: "CP-2026-1079",
    title: "Dangling Live Electric Cable near Kindergarten Gate",
    description: "Storm last night detached an overhead low-tension power cable. It is hanging merely 4 feet above the pedestrian walkway right outside Little Angels Pre-School. Sparking intermittently during drizzle.",
    category: "Streetlights & Electrical",
    location: "Sector 3, HSR Layout, Ward 17",
    coordinates: "12.91162, 77.63886",
    priority: "Critical",
    department: "City Power & Electrical Safety",
    date: "2026-10-10",
    status: "In Progress",
    isEmergency: true,
    emergencyReason: "Live high-voltage electrocution hazard directly adjacent to a school pedestrian zone",
    citizenName: "Meenakshi Sundaram",
    citizenPhone: "+91 97401 55892",
    photoUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80",
    aiPrediction: {
      categoryConfidence: 98.4,
      suggestedPriority: "Critical",
      suggestedDepartment: "City Power & Electrical Safety",
      sentimentScore: -0.95,
      urgencyLevel: "Immediate Hazard",
      similarComplaintId: null,
      extractedHazards: ["Dangling live wire", "School zone", "Electrical sparking"]
    },
    timeline: [
      { step: "Grievance Logged", time: "2026-10-10 07:15", note: "Reported with high emergency flag" },
      { step: "Emergency Protocol Triggered", time: "2026-10-10 07:16", note: "AI Alert pushed to Rapid Response Grid" },
      { step: "Crew On-Site", time: "2026-10-10 07:40", note: "Power isolation initiated at Substation 4B" }
    ]
  },
  {
    id: "CP-2026-1075",
    title: "Overflowing Stormwater Drain Flooding Ground Floor Basements",
    description: "Plastic choking in storm drain canal causing black sewage water backflow onto residential street and basement parking. Foul odor and health hazard for over 40 families.",
    category: "Drainage & Sewerage",
    location: "Malleshwaram 15th Cross, Ward 12",
    coordinates: "13.00314, 77.56847",
    priority: "High",
    department: "Water Supply & Sewerage Board",
    date: "2026-10-08",
    status: "In Progress",
    isEmergency: false,
    emergencyReason: null,
    citizenName: "Karthik Nambiar",
    citizenPhone: "+91 99012 34481",
    photoUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=800&auto=format&fit=crop&q=80",
    aiPrediction: {
      categoryConfidence: 94.1,
      suggestedPriority: "High",
      suggestedDepartment: "Water Supply & Sewerage Board",
      sentimentScore: -0.74,
      urgencyLevel: "High",
      similarComplaintId: "CP-2026-0819",
      extractedHazards: ["Sewage backflow", "Basement flood risk", "Sanitation breach"]
    },
    timeline: [
      { step: "Grievance Logged", time: "2026-10-08 11:20", note: "Logged via Resident Welfare Association portal" },
      { step: "Inspected by Supervisor", time: "2026-10-08 14:10", note: "Super Sucker desilting vehicle requisitioned" }
    ]
  },
  {
    id: "CP-2026-1064",
    title: "Illegal Commercial Garbage Dumping Site at Park Boundary",
    description: "Massive pile of unsorted municipal and commercial food waste dumped outside municipal community park. Stray animal packs assembling, blocking pedestrian walkway.",
    category: "Garbage & Solid Waste",
    location: "Jayanagar 4th T Block, Ward 19",
    coordinates: "12.92341, 77.58529",
    priority: "Medium",
    department: "Solid Waste Management Cell",
    date: "2026-10-07",
    status: "To Do",
    isEmergency: false,
    emergencyReason: null,
    citizenName: "Pooja Hegde",
    citizenPhone: "+91 94488 12093",
    photoUrl: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800&auto=format&fit=crop&q=80",
    aiPrediction: {
      categoryConfidence: 95.2,
      suggestedPriority: "Medium",
      suggestedDepartment: "Solid Waste Management Cell",
      sentimentScore: -0.62,
      urgencyLevel: "Moderate",
      similarComplaintId: "CP-2026-1011",
      extractedHazards: ["Stray pack nuisance", "Blockage of public park pathway"]
    },
    timeline: [
      { step: "Grievance Logged", time: "2026-10-07 09:40", note: "Citizen upload with geotagged photo" },
      { step: "Routing Confirmed", time: "2026-10-07 09:45", note: "Assigned to Ward 19 Sanitation Inspector" }
    ]
  },
  {
    id: "CP-2026-1051",
    title: "Main Water Supply Pipeline Rupture Gushing into Traffic",
    description: "4-inch underground treated water pipe cracked under heavy truck weight. Potable drinking water gushing out at high pressure, flooding 200 meters of road surface.",
    category: "Water Supply & Contamination",
    location: "Outer Ring Road, Bellandur Junction, Ward 8",
    coordinates: "12.92603, 77.67624",
    priority: "Critical",
    department: "Water Supply & Sewerage Board",
    date: "2026-10-06",
    status: "Completed",
    isEmergency: true,
    emergencyReason: "Drinking water resource loss of ~25,000L/hr and rapid sub-base erosion of highway",
    citizenName: "Vivek Deshmukh",
    citizenPhone: "+91 98860 76231",
    photoUrl: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&auto=format&fit=crop&q=80",
    aiPrediction: {
      categoryConfidence: 97.6,
      suggestedPriority: "Critical",
      suggestedDepartment: "Water Supply & Sewerage Board",
      sentimentScore: -0.89,
      urgencyLevel: "Severe",
      similarComplaintId: null,
      extractedHazards: ["Pressurized water leak", "Highway waterlogging", "Sub-base erosion"]
    },
    timeline: [
      { step: "Grievance Logged", time: "2026-10-06 14:02", note: "Emergency complaint submitted" },
      { step: "Valve Shutoff", time: "2026-10-06 14:35", note: "Main feeder line closed by zone engineers" },
      { step: "Clamp Replacement & Patch", time: "2026-10-06 19:50", note: "Pipeline welded and asphalt patch restored" },
      { step: "Grievance Resolved", time: "2026-10-06 20:30", note: "Citizen notified via SMS/portal confirmation" }
    ]
  },
  {
    id: "CP-2026-1044",
    title: "Non-functional Streetlights on Entire 600m Stretch",
    description: "6 consecutive LED poles are completely dark from 7 PM onwards for the past four days. Poses severe safety risk for women and night commuters.",
    category: "Streetlights & Electrical",
    location: "Koramangala 5th Block, 8th Main, Ward 15",
    coordinates: "12.93524, 77.62448",
    priority: "Medium",
    department: "City Power & Electrical Safety",
    date: "2026-10-05",
    status: "Completed",
    isEmergency: false,
    emergencyReason: null,
    citizenName: "Sneha Nair",
    citizenPhone: "+91 97312 90045",
    photoUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
    aiPrediction: {
      categoryConfidence: 93.5,
      suggestedPriority: "Medium",
      suggestedDepartment: "City Power & Electrical Safety",
      sentimentScore: -0.55,
      urgencyLevel: "Moderate",
      similarComplaintId: "CP-2026-0774",
      extractedHazards: ["Poor visibility", "Pedestrian safety concern"]
    },
    timeline: [
      { step: "Grievance Logged", time: "2026-10-05 20:12", note: "Submitted via Resident Portal" },
      { step: "Technician Dispatched", time: "2026-10-06 10:15", note: "Phase neutral timer switch repaired" },
      { step: "Verified & Resolved", time: "2026-10-06 19:00", note: "Night illumination verified" }
    ]
  },
  {
    id: "CP-2026-1033",
    title: "Fallen Banyan Tree Branch Crushing Public Footpath",
    description: "Heavy bough split from aged banyan tree, obstructing pedestrian movement and pulling down internet optical fiber cables across the street.",
    category: "Horticulture & Encroachments",
    location: "Sadashivanagar 11th Cross, Ward 2",
    coordinates: "13.00762, 77.58012",
    priority: "High",
    department: "Horticulture & Forest Wing",
    date: "2026-10-04",
    status: "To Do",
    isEmergency: false,
    emergencyReason: null,
    citizenName: "Rohan Kulkarni",
    citizenPhone: "+91 98451 89760",
    photoUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&auto=format&fit=crop&q=80",
    aiPrediction: {
      categoryConfidence: 91.8,
      suggestedPriority: "High",
      suggestedDepartment: "Horticulture & Forest Wing",
      sentimentScore: -0.68,
      urgencyLevel: "Elevated",
      similarComplaintId: null,
      extractedHazards: ["Optical fiber entanglement", "Blocked sidewalk"]
    },
    timeline: [
      { step: "Grievance Logged", time: "2026-10-04 16:30", note: "Logged with photo attachment" },
      { step: "Chainsaw Squad Scheduled", time: "2026-10-04 17:15", note: "Scheduled for morning clearance shift" }
    ]
  },
  {
    id: "CP-2026-1025",
    title: "Hazardous Chemical Runoff in Neighborhood Drain",
    description: "Small plating workshop releasing pungent reddish chemical effluent into open municipal storm channel. Strong chemical fumes causing throat irritation to nearby residents.",
    category: "Public Health & Sanitation",
    location: "Peenya Industrial Area Stage 2, Ward 1",
    coordinates: "13.02985, 77.52554",
    priority: "Critical",
    department: "Pollution Control & Municipal Health",
    date: "2026-10-03",
    status: "In Progress",
    isEmergency: true,
    emergencyReason: "Toxic chemical vapor exposure near residential settlement, potential ground contamination",
    citizenName: "Deepak Sharma",
    citizenPhone: "+91 99800 45612",
    photoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    aiPrediction: {
      categoryConfidence: 97.1,
      suggestedPriority: "Critical",
      suggestedDepartment: "Pollution Control & Municipal Health",
      sentimentScore: -0.92,
      urgencyLevel: "Hazardous",
      similarComplaintId: null,
      extractedHazards: ["Toxic vapor", "Illegal industrial effluent", "Open municipal drain breach"]
    },
    timeline: [
      { step: "Grievance Logged", time: "2026-10-03 12:45", note: "Reported with urgent chemical toxicity flag" },
      { step: "Pollution Officer Alerted", time: "2026-10-03 13:00", note: "Water sample extraction underway" }
    ]
  }
];

export const CATEGORIES = [
  "Roads & Potholes",
  "Garbage & Solid Waste",
  "Drainage & Sewerage",
  "Water Supply & Contamination",
  "Streetlights & Electrical",
  "Public Health & Sanitation",
  "Horticulture & Encroachments"
];

export const DEPARTMENTS = [
  "Public Works & Road Engineering",
  "Solid Waste Management Cell",
  "Water Supply & Sewerage Board",
  "City Power & Electrical Safety",
  "Pollution Control & Municipal Health",
  "Horticulture & Forest Wing",
  "Traffic Engineering Cell"
];

export const WARDS = [
  { id: "Ward 1", name: "Peenya Industrial Area", zone: "West" },
  { id: "Ward 2", name: "Sadashivanagar", zone: "North" },
  { id: "Ward 4", name: "Indiranagar", zone: "East" },
  { id: "Ward 8", name: "Bellandur & Outer Ring Road", zone: "East" },
  { id: "Ward 12", name: "Malleshwaram", zone: "West" },
  { id: "Ward 15", name: "Koramangala", zone: "South" },
  { id: "Ward 17", name: "HSR Layout", zone: "South" },
  { id: "Ward 19", name: "Jayanagar", zone: "South" },
  { id: "Ward 22", name: "Whitefield Tech Corridor", zone: "East" }
];
