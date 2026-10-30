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

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  highlight: string;
}

export interface MetricItem {
  value?: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  impact: string;
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
  phone: "+91 63031 61254",
  rawPhone: "916303161254",
  whatsappMessage: "Hi Vivek, I came across your portfolio and would like to discuss an outsourcing requirement.",
  officeAddress: "JQ Chambers, Dr No. 3-50/5, Plot No. 5, Serilingampalle (M), Gachibowli, Hyderabad, Telangana 500032",
  personalLinkedin: "https://www.linkedin.com/in/vivek-bandari-33b060258/",
  companyWebsite: "https://alboriss.com/",
  companyLinkedin: "https://www.linkedin.com/company/alboriss/posts/?feedView=all",
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
    keywords: ["KYC Operations", "Mortgage", "Compliance"],
    capabilities: ["KYC Verification", "Mortgage Processing", "Compliance Support"],
    badge: "Operations",
    description: "End-to-end KYC validation, mortgage lifecycle processing, and regulatory compliance workflows.",
  },
  {
    id: "healthcare",
    number: "02",
    name: "Healthcare",
    shortName: "Healthcare",
    keywords: ["RCM", "Billing", "AR Support"],
    capabilities: ["Medical Coding", "Medical Billing", "AR Follow-up", "RCM Workflows"],
    badge: "RCM & Ops",
    description: "Revenue cycle management, clinical documentation coding, and claims adjudication support.",
  },
  {
    id: "it",
    number: "03",
    name: "Information Technology",
    shortName: "IT",
    keywords: ["Web", "App", "ERP"],
    capabilities: ["Web Development", "App Development", "ERP Systems", "IT Services"],
    badge: "Technology",
    description: "Full-stack web applications, mobile platforms, enterprise ERP implementations, and cloud services.",
  },
  {
    id: "digital",
    number: "04",
    name: "Digital",
    shortName: "Digital",
    keywords: ["Branding", "Marketing", "E-Publishing"],
    capabilities: ["Branding", "Digital Marketing", "E-Publishing", "Content Production"],
    badge: "Creative",
    description: "Corporate brand identity, multichannel marketing campaigns, and digital e-publishing solutions.",
  },
  {
    id: "ai",
    number: "05",
    name: "Artificial Intelligence",
    shortName: "AI",
    keywords: ["Data Collection", "Annotation", "LLM Datasets"],
    capabilities: ["Data Collection", "Data Annotation", "Training Sets", "AI Services"],
    badge: "Data & ML",
    description: "High-accuracy data collection pipelines, multi-modal annotation, and LLM fine-tuning datasets.",
  },
  {
    id: "consulting",
    number: "06",
    name: "Consulting",
    shortName: "Consulting",
    keywords: ["Manpower", "Staffing", "Advisory"],
    capabilities: ["Manpower Staffing", "Operational Consulting", "Strategic Advisory"],
    badge: "Advisory",
    description: "Specialized executive manpower staffing, organizational scaling, and strategic operational consulting.",
  },
  {
    id: "infrastructure",
    number: "07",
    name: "Infrastructure",
    shortName: "Infra",
    keywords: ["Networking", "Cloud", "Systems"],
    capabilities: ["Enterprise Networking", "Systems Architecture", "Infrastructure Setup"],
    badge: "Systems",
    description: "Enterprise network architecture, structured cabling, server infrastructure, and secure cloud setups.",
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

export const METRICS: MetricItem[] = [
  {
    numericValue: 15,
    suffix: "+",
    value: "15+",
    label: "B2B Engagements",
    detail: "Cross-industry outsourcing pipelines facilitated",
  },
  {
    numericValue: 7,
    value: "7",
    label: "Core Domains",
    detail: "From Healthcare RCM & Banking to IT & AI Data",
  },
  {
    numericValue: 50,
    suffix: "+",
    value: "50+",
    label: "Delivery Squads",
    detail: "Specialized partner squads through Alboriss network",
  },
  {
    numericValue: 24,
    prefix: "< ",
    suffix: "h",
    value: "< 24h",
    label: "Turnaround SLA",
    detail: "Rapid requirement assessment and kickoff alignment",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "healthsync",
    quote:
      "Vivek quickly diagnosed our RCM workflow bottlenecks and connected our clinic network with a specialized medical billing and coding squad within days. The transition was seamless.",
    author: "Dr. Rajesh Varma",
    role: "Director of Clinical Operations",
    company: "HealthSync Networks",
    industry: "Healthcare",
    highlight: "40% reduction in billing backlog",
  },
  {
    id: "fintechedge",
    quote:
      "Scaling KYC compliance on short notice seemed daunting until we engaged Vivek. His requirement-first clarity and direct connection to dedicated verification analysts saved us months of trial and error.",
    author: "Amit Desai",
    role: "VP of Engineering & Compliance",
    company: "FinEdge Technologies",
    industry: "FinTech & Banking",
    highlight: "10,000+ monthly KYC checks onboarded",
  },
  {
    id: "scaleup",
    quote:
      "Vivek doesn't push generic packages—he listened closely to our enterprise ERP migration requirements and introduced the exact full-stack specialists we needed to hit our launch deadline.",
    author: "Priya Nair",
    role: "Head of Digital Transformation",
    company: "ScaleUp Logistics Group",
    industry: "Enterprise IT",
    highlight: "3 months saved on ERP rollout",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "rcm-scale",
    title: "US Healthcare RCM & AR Turnaround",
    industry: "Healthcare / RCM",
    challenge: "Hospital network facing a 60-day backlog in denial management and claims adjudication.",
    solution: "Structured a dedicated 20-member certified coding and AR follow-up squad via Alboriss.",
    impact: "Turnaround dropped to 48 hours; denial recovery rate increased by 32%.",
  },
  {
    id: "kyc-compliance",
    title: "High-Volume KYC & Mortgage Operations",
    industry: "Banking Operations",
    challenge: "Digital lending platform needed SLA-guaranteed document validation and identity checks.",
    solution: "Mobilized a compliance-trained operations desk operating on rigorous accuracy checklists.",
    impact: "Reduced user verification time from 24 hours to 4 hours with 99.4% accuracy.",
  },
  {
    id: "ai-data",
    title: "Multi-Modal AI Training Dataset Delivery",
    industry: "Artificial Intelligence",
    challenge: "Autonomous system startup requiring 500,000+ high-precision labeled image frames.",
    solution: "Deployed a 2-tier QA annotation pipeline with domain-specific bounding box precision.",
    impact: "Delivered 2 weeks ahead of schedule with zero defect recalls.",
  },
];
