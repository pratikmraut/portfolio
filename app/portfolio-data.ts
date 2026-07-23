export const profile = {
  name: "Pratik Raut",
  email: "pratikmraut.8@gmail.com",
  resume: "/Pratik_Raut_Resume.pdf",
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/pratik-raut/" },
    { label: "GitHub", url: "https://github.com/pratikmraut" },
    { label: "LeetCode", url: "https://leetcode.com/voyagertour/" },
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
    value: "1,000+",
    label: "Problems solved",
    detail: "Across LeetCode, CodeChef, and competitive programming platforms.",
  },
] as const;

export const experiences = [
  {
    company: "Oracle",
    role: "Associate Software Engineer",
    period: "Jun 2023 — Present",
    location: "Pune, India",
    stack: ["Java", "Spring Boot", "REST APIs", "Oracle DB", "PL/SQL", "OJET"],
    highlights: [
      "Design and deliver Spring Boot REST APIs for Oracle FLEXCUBE modules across loans, CASA, term deposits, lockers, and banking workflows.",
      "Build end-to-end loan disbursement and repayment flows backed by scalable service logic and Oracle DB / PL/SQL procedures.",
      "Extend API contracts, resolve critical third-party integrations, and automate limits, status handling, and operational workflows.",
      "Created tools that cut API validation from four hours to four minutes and reduced debugging time by 30%.",
    ],
  },
  {
    company: "Walchand COE",
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
    code: "core.backend",
    name: "Backend",
    items: ["Java", "Spring Boot", "Spring MVC", "Spring Data JPA", "REST APIs", "Microservices", "Hibernate"],
  },
  {
    code: "data.layer",
    name: "Data",
    items: ["Oracle DB", "SQL", "PL/SQL", "MySQL", "MongoDB", "Query Optimization", "Indexing"],
  },
  {
    code: "secure.flow",
    name: "Security & Events",
    items: ["Spring Security", "OAuth2", "JWT", "Kafka", "Redis", "Event-Driven Architecture", "Caching"],
  },
  {
    code: "ship.repeat",
    name: "Platform",
    items: ["Git", "Maven", "Jenkins", "Docker", "OpenShift", "OCI", "Postman", "OpenAPI", "Linux"],
  },
  {
    code: "verify.all",
    name: "Testing",
    items: ["JUnit", "Mockito", "Spring Boot Test", "MockMvc"],
  },
  {
    code: "domain.bank",
    name: "Banking",
    items: ["Oracle FLEXCUBE", "Loans / CASA", "Deposits", "Locker", "General Ledger", "Banking / Fintech"],
  },
] as const;

export const achievements = [
  {
    title: "Oracle FSGIU Pacesetter — Spark Award",
    detail: "Recognized for team success, customer delivery, and organizational impact.",
  },
  {
    title: "National-level RSC recognition",
    detail: "Recognized at the Sixth Research Symposium on Computing for an Art Gallery Management System.",
  },
  {
    title: "Competitive programming",
    detail: "Solved 1,000+ problems and reached CodeChef 3-star with a maximum rating of 1671.",
  },
] as const;

export const certifications = [
  {
    name: "OCI Architect Associate",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=C4A9B49781AE0BFECC46DED75BDB0F4DD3390C54941C29C3C1C3B1AA1EFBC3B7",
  },
  {
    name: "OCI Foundations Associate",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=BB774710FEDC9B69EFB16248F8F3F8905EF7FDB9421FC9F94B4AD6C107DFABBA",
  },
  {
    name: "OCI Generative AI Professional",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=43FFD9E59E4A03C20D810FE9E8777C8D473ACB761D985A0AAA0C659AF1E13577",
  },
] as const;

export const education = {
  degree: "B.Tech in Computer Science & Engineering",
  institution: "Walchand College of Engineering, Sangli",
  period: "2019 — 2023",
  cgpa: "8.20",
} as const;
