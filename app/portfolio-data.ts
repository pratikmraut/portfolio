const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const profile = {
  name: "Pratik Raut",
  email: "pratikmraut.8@gmail.com",
  resume: `${basePath}/Pratik_Raut_Java_Backend_Engineer.pdf?v=76ac04667ac1`,
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/pratik-raut/" },
    { label: "GitHub", url: "https://github.com/pratikmraut" },
    { label: "LeetCode", url: "https://leetcode.com/u/voyagertour/" },
    { label: "CodeChef", url: "https://www.codechef.com/users/voyagertour" },
  ],
} as const;

export const impactMetrics = [
  {
    value: "150+",
    label: "FLEXCUBE APIs",
    detail: "Supported by an internal validation and developer productivity tool.",
  },
  {
    value: "4h → 4m",
    label: "Validation cycle",
    detail: "Reduced a multi-hour API validation workflow to minutes.",
  },
  {
    value: "30%",
    label: "Faster debugging",
    detail: "Delivered through an AI-assisted Java and database log workflow.",
  },
  {
    value: "3 rails",
    label: "NEFT / RTGS / IMPS",
    detail: "Integrated FLEXCUBE with OBPM across validation, initiation, inquiry, tracking, and duplicate prevention.",
  },
] as const;

export const experiences = [
  {
    company: "Oracle",
    role: "Software Engineer",
    period: "Jun 2023 — Present",
    location: "Pune, India",
    stack: ["Java", "Spring Boot", "REST APIs", "Oracle FLEXCUBE", "OBPM", "Oracle DB", "PL/SQL"],
    highlights: [
      "Build Java / Spring Boot REST APIs for Oracle FLEXCUBE Core Banking across Loans, CASA, Term Deposits, Locker, NBFC, and transaction workflows.",
      "Translate banking requirements into service-layer and Oracle DB/PL/SQL procedures for FLEXCUBE implementation and enhancements, including end-to-end loan disbursement and repayment with validations, limits, transaction processing, and status handling.",
      "Integrate Oracle FLEXCUBE with Oracle Banking Payments (OBPM) for NEFT, RTGS, and IMPS flows, covering validation, initiation, status inquiry, error handling, reference tracking, and duplicate prevention.",
      "Deliver controlled force-debit transfers, multi-debit / multi-credit transactions, and cheque-clearing pass / reject workflows with branch-aware routing, unique-reference generation, payment/currency mapping, audit controls, and duplicate-instruction prevention.",
      "Resolve third-party integration and production issues through root-cause analysis of Java logs, API payloads, Oracle DB errors, and PL/SQL; an AI-assisted log-analysis workflow reduced debugging time by 30%.",
      "Built an internal API validation and developer-productivity tool supporting 150+ FLEXCUBE APIs, reducing validation cycles from four hours to four minutes — 60x faster.",
    ],
  },
  {
    company: "Walchand College of Engineering",
    role: "Backend Developer Intern",
    period: "Dec 2021 — Feb 2022",
    location: "Sangli, India",
    stack: ["JavaScript", "React", "Node.js", "MongoDB"],
    highlights: [
      "Built a web-based maintenance management system that digitized paper complaint workflows for users and administrators.",
      "Streamlined request submission, status tracking, and maintenance operations to reduce complaint turnaround from four days to one day.",
    ],
  },
] as const;

export const projects = [
  {
    name: "Payment Operations Investigator",
    description: "A payment-investigation workbench combining read-only FLEXCUBE inquiry APIs with Excel and JSON imports to consolidate transaction records and preserve versioned evidence.",
    highlights: [
      "Local Ollama models, semantic embeddings, and Retrieval-Augmented Generation (RAG) produce cited answers linked to selected payment evidence.",
      "Tenant-scoped role-based access, idempotent workflows, and audit trails protect investigation and case-lifecycle controls.",
      "Independent reviewer conclusions and downloadable PDF reports keep evidence and review decisions traceable.",
    ],
    impact: "90",
    impactLabel: "versioned knowledge documents",
    stack: ["Java", "Spring Boot", "React", "Python", "Ollama", "RAG"],
    url: "https://github.com/pratikmraut/payment-operations-investigator",
  },
  {
    name: "AutoPay Guard",
    description: "A fake-data-only recurring-payment tracking prototype with deterministic scheduling, spend projections, optimistic locking, and idempotent APIs; no bank connectivity or payment execution.",
    highlights: [
      "OAuth2/OIDC, JWT validation, role-based access, and workspace isolation, with authentication tokens kept server-side by a Next.js backend-for-frontend.",
      "Transactional outbox notification processing with worker leases, bounded retries, and failure recovery.",
      "Automated backend checks integrated with GitHub Actions CI, CodeQL, and dependency scanning.",
    ],
    impact: "347",
    impactLabel: "passing automated tests · résumé snapshot",
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "Next.js", "Keycloak", "OpenAPI"],
    url: "https://github.com/pratikmraut/autopay-guard",
  },
  {
    name: "HireME",
    description: "An ML-powered recruitment platform that automates resume validation and candidate shortlisting.",
    impact: "70%",
    impactLabel: "less manual screening",
    stack: ["Python", "Flask", "Machine Learning"],
    url: "https://github.com/pratikmraut/inside-eye",
  },
  {
    name: "Visitor Authorization System",
    description: "A computer-vision workflow for automated face verification and secure visitor record management.",
    impact: "60%",
    impactLabel: "faster check-in · 1,000 users",
    stack: ["Python", "Flask", "OpenCV"],
    url: "https://github.com/pratikmraut/authorised-visitor-validation",
  },
] as const;

export const skillGroups = [
  {
    code: "language.set",
    name: "Languages",
    items: ["Java", "JavaScript", "Python"],
  },
  {
    code: "core.backend",
    name: "Backend",
    items: ["Java", "Spring Boot", "Spring MVC", "Spring Data JPA", "REST APIs", "Microservices", "Hibernate/JPA"],
  },
  {
    code: "data.layer",
    name: "Data",
    items: ["Oracle DB", "SQL", "PL/SQL", "PostgreSQL", "MySQL", "MongoDB", "Query Optimization", "Indexing"],
  },
  {
    code: "domain.bank",
    name: "Core Banking",
    items: ["Oracle FLEXCUBE", "Loans / CASA", "Term Deposits", "Locker", "NBFC Workflows", "Transaction Workflows", "Disbursement & Repayment"],
  },
  {
    code: "payments.obpm",
    name: "Payments / OBPM",
    items: ["Oracle Banking Payments", "NEFT", "RTGS", "IMPS", "Transaction Validation", "Reference Tracking", "Duplicate Prevention"],
  },
  {
    code: "client.layer",
    name: "Frontend",
    items: ["React", "Oracle JET", "HTML", "CSS", "Next.js"],
  },
  {
    code: "ship.repeat",
    name: "Platform",
    items: ["Git", "Maven", "Jenkins", "Docker", "OpenShift", "OCI", "Swagger/OpenAPI", "Linux"],
  },
  {
    code: "verify.all",
    name: "Testing",
    items: ["JUnit", "Mockito", "Spring Boot Test", "MockMvc", "Selenium", "Postman"],
  },
  {
    code: "ai.knowledge",
    name: "AI & ML",
    items: ["Generative AI", "LLM Integration", "Retrieval-Augmented Generation (RAG)", "Semantic Embeddings", "Ollama", "Machine Learning Fundamentals"],
  },
] as const;

export const achievements = [
  {
    title: "Oracle FSGIU Pacesetter — Spark Award",
    detail: "Recognized for customer outcomes, delivery excellence, innovation, and team success.",
  },
  {
    title: "National-level RSC recognition",
    detail: "Recognized at the Sixth Research Symposium on Computing for an Art Gallery Management System.",
  },
  {
    title: "Competitive programming",
    detail: "Solved 1,000+ problems and reached CodeChef 3-star with a maximum rating of 1671.",
  },
  {
    title: "Moodle LMS 4.1+",
    detail: "Developed a Moodle learning-management system for Walchand College of Engineering during an internship.",
  },
] as const;

export const certifications = [
  {
    name: "Oracle Cloud Infrastructure 2024 Certified Architect Associate",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=C4A9B49781AE0BFECC46DED75BDB0F4DD3390C54941C29C3C1C3B1AA1EFBC3B7",
  },
  {
    name: "Oracle Cloud Infrastructure 2023 Certified Foundations Associate",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=BB774710FEDC9B69EFB16248F8F3F8905EF7FDB9421FC9F94B4AD6C107DFABBA",
  },
  {
    name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=16F81FE6A07831D0305876E3BCA89E1CE96EAED05959C56DBC0726B01C21D7FA",
  },
  {
    name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=43FFD9E59E4A03C20D810FE9E8777C8D473ACB761D985A0AAA0C659AF1E13577",
  },
  {
    name: "Oracle Data Platform 2025 Certified Foundations Associate",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=680CB91A1F3328D10B5C7ECDB158B66F7AD178F9A4EC8201572312ED6C912562",
  },
] as const;

export const education = {
  degree: "B.Tech in Computer Science & Engineering",
  institution: "Walchand College of Engineering, Sangli",
  period: "2019 — 2023",
  cgpa: "8.20",
} as const;
