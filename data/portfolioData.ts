export interface Industry {
  id: string;
  number: string;
  name: string;
  shortName: string;
  keywords: string[];
  capabilities: string[];
  badge: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  line: string;
}

export interface PrincipleItem {
  id: string;
  title: string;
  statement: string;
}

export const PERSONAL_INFO = {
  name: "Vivek Bandari",
  title: "Business Development Manager | Outsourcing & Strategic Partnerships",
  roleTitle: "Business Development Manager",
  specialization: "Outsourcing & Strategic Partnerships",
  company: "Alboriss Pvt. Ltd.",
  experience: "1 Year",
  location: "Hyderabad, Telangana, India",
  email: "vivek.bandari@alboriss.com",
  phone: "+91 63061 61254",
  rawPhone: "916306161254",
  whatsappMessage: "Hi Vivek, I came across your portfolio and would like to discuss an outsourcing requirement.",
  officeAddress: "JQ Chambers, Dr No. 3-50/5, Plot No. 5, Serilingampalle (M), Gachibowli, Hyderabad, Telangana 500032",
  personalLinkedin: "https://www.linkedin.com/in/vivek-bandari-33b060258/",
  companyWebsite: "https://alboriss.com/",
  companyLinkedin: "https://www.linkedin.com/company/alboriss/posts/?feedView=all",
  bookingUrlEnv: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact",
};

export const getWhatsappUrl = (customMessage?: string) => {
  const msg = customMessage || PERSONAL_INFO.whatsappMessage;
  return `https://wa.me/${PERSONAL_INFO.rawPhone}?text=${encodeURIComponent(msg)}`;
};

export const INDUSTRIES: Industry[] = [
  {
    id: "banking",
    number: "01",
    name: "Banking",
    shortName: "Banking",
    keywords: ["KYC", "Mortgage"],
    capabilities: ["KYC Verification", "Mortgage Processing", "Compliance Support"],
    badge: "Operations",
    description: "KYC operations and mortgage processing.",
  },
  {
    id: "healthcare",
    number: "02",
    name: "Healthcare",
    shortName: "Healthcare",
    keywords: ["Medical Coding", "Billing", "AR"],
    capabilities: ["Medical Coding", "Medical Billing", "AR Calling", "RCM Workflows"],
    badge: "RCM & Ops",
    description: "Medical coding, billing and AR revenue cycle support.",
  },
  {
    id: "it",
    number: "03",
    name: "Information Technology",
    shortName: "IT",
    keywords: ["Web", "App", "ERP"],
    capabilities: ["Web Development", "App Development", "ERP Systems", "IT Services"],
    badge: "Technology",
    description: "Web development, apps and ERP implementations.",
  },
  {
    id: "digital",
    number: "04",
    name: "Digital",
    shortName: "Digital",
    keywords: ["Branding", "Marketing", "E-Publishing"],
    capabilities: ["Branding", "Digital Marketing", "E-Publishing", "Content Production"],
    badge: "Creative",
    description: "Brand identity, campaigns and digital publishing.",
  },
  {
    id: "ai",
    number: "05",
    name: "Artificial Intelligence",
    shortName: "AI",
    keywords: ["Data Collection", "Annotation"],
    capabilities: ["Data Collection", "Data Annotation", "Training Sets", "AI Services"],
    badge: "Data & ML",
    description: "Data collection pipelines and annotation services.",
  },
  {
    id: "consulting",
    number: "06",
    name: "Consulting",
    shortName: "Consulting",
    keywords: ["Manpower", "Consulting"],
    capabilities: ["Manpower Staffing", "Operational Consulting", "Strategic Advisory"],
    badge: "Advisory",
    description: "Manpower staffing and business advisory.",
  },
  {
    id: "infrastructure",
    number: "07",
    name: "Infrastructure",
    shortName: "Infra",
    keywords: ["Networking"],
    capabilities: ["Enterprise Networking", "Systems Architecture", "Infrastructure Setup"],
    badge: "Systems",
    description: "Enterprise networking and IT infrastructure.",
  },
  {
    id: "robotics",
    number: "08",
    name: "Robotics",
    shortName: "Robotics",
    keywords: ["Training Data", "Robotics"],
    capabilities: ["Training Data Pipelines", "Robotic Process Automation", "Hardware Interfacing"],
    badge: "Automation",
    description: "Robotics datasets and process automation.",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    line: "Understand your requirement.",
  },
  {
    number: "02",
    title: "MATCH",
    line: "Identify the right capability.",
  },
  {
    number: "03",
    title: "CONNECT",
    line: "Bring the right people together.",
  },
  {
    number: "04",
    title: "ALIGN",
    line: "Clarify scope and expectations.",
  },
  {
    number: "05",
    title: "MOVE FORWARD",
    line: "Take the conversation toward execution.",
  },
];

export const PRINCIPLES: PrincipleItem[] = [
  {
    id: "req-first",
    title: "REQUIREMENT-FIRST",
    statement: "Start with the business problem.",
  },
  {
    id: "multi-industry",
    title: "MULTI-INDUSTRY",
    statement: "Multiple outsourcing pathways.",
  },
  {
    id: "b2b-focused",
    title: "B2B FOCUSED",
    statement: "Built for business conversations.",
  },
  {
    id: "partnership",
    title: "PARTNERSHIP MINDSET",
    statement: "Focused on long-term opportunities.",
  },
];
