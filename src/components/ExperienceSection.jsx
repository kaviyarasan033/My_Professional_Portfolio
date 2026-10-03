"use client";

import { useState, useEffect } from "react";

const experiences = [
  {
    id: "pumo",
    company: "Pumo Technovation",
    role: "MERN Developer Trainee",
    period: "Sep 2024 – Apr 2025",
    type: "Internship • Full Stack Specialization",
    badge: null,
    logo: "/images/company/Pumotechnovation Tech Campus Logo.png",
    icon: "fa-brands fa-react",
    shortDesc: "Full-Stack MERN Architecture, JWT Security & State Management.",
    tagline: "Full-Stack MERN Architecture, JWT Security & State Management",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux Toolkit", "JWT Auth", "REST APIs"],
    highlights: [
      "Built full-stack production web applications featuring JWT authentication, role authorization middleware, and RESTful API endpoints.",
      "Architected modular component hierarchies in React with Redux Toolkit for complex multi-page state management.",
      "Graduated with top honors and earned professional certification in advanced MERN stack engineering (April 2025).",
      "Authored and published the open-source developer tool 'npx create-mern-pro' to npm, used by developers to kickstart MERN projects."
    ],
    impact: "Solid foundation in clean code architecture, Git branching workflows, and scalable API design."
  },
  {
    id: "srihema",
    company: "Sri Hema InfoTech",
    role: "Junior Web Developer",
    period: "Dec 2024 – Apr 2026",
    type: "Full-Time • Product Engineering",
    badge: null,
    logo: "/images/company/SriHema Infotech Geometric Logo.png",
    icon: "fa-brands fa-laravel",
    shortDesc: "8+ Production Laravel web applications, payment gateways & GoRide dispatch CRM.",
    tagline: "Deploying 8+ Production Laravel Applications & Payment Gateways",
    techStack: ["Laravel", "PHP 8", "MySQL", "Eloquent ORM", "PayPal", "Razorpay", "CCAvenue", "REST APIs"],
    highlights: [
      "Successfully delivered and deployed 8+ production web applications across taxi dispatch, healthcare, and matrimonial platforms.",
      "Integrated multi-currency payment gateways including PayPal, Razorpay, and CCAvenue with robust webhook event verification.",
      "Developed the backend logic for 'GoRide' UK taxi dispatch system, implementing real-time fare computation and driver allocation.",
      "Structured normalized MySQL database schemas with Eloquent ORM migrations and optimized query execution times."
    ],
    impact: "Processed thousands of customer transactions securely with zero payment reconciliation failures."
  },
  {
    id: "craftsmen",
    company: "Craftsmen Digital Solutions",
    role: "Software Developer (Freelance)",
    period: "Nov 2025 – Present",
    type: "Contract / Freelance • Australian Client",
    badge: null,
    logo: "/images/company/Craftsmen Digital Solutions Logo.png",
    icon: "fa-solid fa-code",
    shortDesc: "WinDriving Australia learner platform, Coolify VPS automation & PostgreSQL schemas.",
    tagline: "Building High-Velocity Cloud Platforms for Australian Driving Schools",
    techStack: ["Next.js 14", "Node.js", "Prisma ORM", "PostgreSQL", "Coolify", "Ubuntu VPS", "Tailwind CSS"],
    highlights: [
      "Architected the learner driver training and instructor booking platform 'WinDriving Australia' using Next.js App Router and Node.js.",
      "Designed PostgreSQL relational schemas with Prisma ORM, handling dynamic calendar availability, zone-based pricing, and booking validations.",
      "Configured self-hosted cloud environments using Coolify panel on Ubuntu VPS (SSH) with automated Git webhooks and SSL provisioning.",
      "Leveraged AI engineering tools (Claude, GitHub Copilot) to accelerate sprint velocity and maintain rapid release cadences."
    ],
    impact: "Empowering instructors and students across Australia with instant online booking and automated lesson workflows."
  },
  {
    id: "abn",
    company: "ABN Consultancy Service",
    role: "Full Stack Developer",
    period: "May 2026 – Present",
    type: "Full-Time • Enterprise Architecture",
    logo: "/images/company/ABN-consultancy-high-quality.png",
    icon: "fa-solid fa-briefcase",
    shortDesc: "ClassWall HRMS platform, Flutter mobile app, automated CI/CD & database optimizations.",
    tagline: "Architecting Enterprise HRMS & Cross-Platform Mobile Applications",
    techStack: ["Node.js", "Express", "Next.js", "Flutter", "MySQL", "Docker", "Jenkins CI/CD", "Prisma ORM"],
    highlights: [
      "Engineered core backend microservices and modern frontend architecture for 'ClassWall', an enterprise HRMS platform managing employee lifecycles, attendance, and role-based permissions.",
      "Architected and deployed a production cross-platform mobile application using Flutter featuring biometric security, push notifications, and offline data synchronization.",
      "Implemented automated Jenkins CI/CD pipelines and Docker containerized workflows on Ubuntu VPS (SSH) for zero-downtime releases.",
      "Optimized complex database schemas and migration pipelines across MySQL and Prisma ORM, cutting average API latency by 40%."
    ],
    impact: "Powering real-time enterprise workforce management with automated payroll processing and 99.9% uptime."
  },
  {
    id: "zazu",
    company: "Zazu Technologies",
    role: "Full Stack Engineer",
    period: "2025 – Present",
    type: "Product Engineering • Client Delivery",
    logo: "/images/company/zazu-technologies-high-quality-transparent.png",
    icon: "fa-solid fa-layer-group",
    shortDesc: "Cross-platform mobile UI, Next.js modernization & PostgreSQL tuning.",
    tagline: "Cross-Platform Engineering, Modern Delivery & Cloud Solutions",
    techStack: ["Flutter", "Next.js", "Node.js", "PostgreSQL", "REST APIs", "Cloud Services", "Docker"],
    highlights: [
      "Developed responsive mobile and web user interfaces using Flutter and Next.js, translating design mockups into pixel-perfect code.",
      "Refactored backend RESTful microservice endpoints to enhance payload throughput, input validation, and security sanitization.",
      "Participated in PostgreSQL database schema architecture, migration planning, and indexed query optimizations.",
      "Contributed to Agile sprint planning, CI/CD automated deployment cycles, and end-to-end integration testing."
    ],
    impact: "Delivered modular, reusable components and resilient API endpoints on high-velocity production sprints."
  }
];

export default function ExperienceSection() {
  const [activeExp, setActiveExp] = useState(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveExp(null);
      }
    };
    if (activeExp) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeExp]);

  return (
    <>
      <div
        className="elementor-element elementor-element-47e1a66 elementor-widget elementor-widget-team_section_01"
        data-id="47e1a66"
        data-element_type="widget"
        data-e-type="widget"
        data-widget_type="team_section_01.default"
      >
        <div className="elementor-widget-container">
          {/* Career Experience Section Start */}
          <section
            id="experience"
            className="team-section as-team-1-area pt-30 tx-section section-padding section-bg"
          >
            <div className="container">
              <div className="section-title text-center">
                <span className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">
                  (Career Timeline)
                </span>

                <h2 className="text_invert-2">
                  Professional Experience &amp;
                  <br />
                  Production Roles
                </h2>
              </div>

              {/* 5-Card Experience Grid with Real Company Branding */}
              <div className="as-team-1-wrap experience-5-grid">
                {experiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className="as-team-1-member-ani wow fadeInUp"
                    data-wow-delay={`${0.2 + index * 0.1}s`}
                    onClick={() => setActiveExp(exp)}
                  >
                    <div className="experience-card-item">
                      {/* Neon Running Border & Glow (Only border circles surroundings on hover) */}
                      <div className="neon-running-glow" aria-hidden="true"></div>
                      <div className="neon-running-border" aria-hidden="true"></div>

                      <div className="experience-card-inner">
                        {/* Company Logo Display Container */}
                        <div className="exp-card-logo-box">
                          <img
                            decoding="async"
                            src={exp.logo}
                            alt={exp.company}
                            className="exp-company-logo"
                          />
                        </div>

                        {/* Card Content Footer */}
                        <div className="exp-card-content">
                          <div className="exp-info">
                            <h3 className="exp-role-title">{exp.role}</h3>
                            <p className="exp-company-name">{exp.company}</p>
                            <span className="exp-period-pill">{exp.period}</span>
                          </div>

                          <div className="exp-card-btn-row">
                            <button
                              type="button"
                              className="exp-details-btn"
                              aria-label={`View details for ${exp.company}`}
                            >
                              <span>Details</span>
                              <i className="fa-solid fa-arrow-right"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="team-line mt-5"></div>
            </div>
          </section>
        </div>
      </div>

      {/* ======================================================== */}
      {/* Right-to-Left Slide-in White & Maroon Detailed Drawer    */}
      {/* ======================================================== */}
      {activeExp && (
        <div className="experience-drawer-container">
          {/* Blurred Backdrop */}
          <div
            className="experience-drawer-backdrop"
            onClick={() => setActiveExp(null)}
          ></div>

          {/* Right-to-Left Sliding White & Maroon Drawer */}
          <div
            className="experience-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeExp.company} Details`}
          >
            {/* Header: Company Logo & Close */}
            <div className="drawer-header drawer-anim-1">
              <div className="drawer-brand-box">
                <div className="drawer-logo-wrapper">
                  <img
                    src={activeExp.logo}
                    alt={activeExp.company}
                    className="drawer-company-logo"
                  />
                </div>
                <div>
                  <h3 className="drawer-company-name">{activeExp.company}</h3>
                  <span className="drawer-company-type">{activeExp.type}</span>
                </div>
              </div>

              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setActiveExp(null)}
                aria-label="Close details"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Role & Timeline Badge */}
            <div className="drawer-role-banner drawer-anim-2">
              <div className="drawer-role-badge">
                <i className={activeExp.icon}></i>
                <span>{activeExp.role}</span>
              </div>
              <span className="drawer-period-tag">
                <i className="fa-regular fa-calendar-days me-1"></i>
                {activeExp.period}
              </span>
            </div>

            {/* Tagline Summary */}
            <p className="drawer-tagline drawer-anim-2">{activeExp.tagline}</p>

            {/* Key Works & Contributions (Animated Text) */}
            <div className="drawer-section drawer-anim-3">
              <h4 className="drawer-section-title">
                <i className="fa-solid fa-layer-group text-danger me-2"></i>
                Key Production Works &amp; Responsibilities
              </h4>
              <ul className="drawer-highlights-list">
                {activeExp.highlights.map((item, idx) => (
                  <li key={idx} className="drawer-highlight-item">
                    <span className="bullet-icon">
                      <i className="fa-solid fa-check"></i>
                    </span>
                    <span className="bullet-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Tech Stack */}
            <div className="drawer-section drawer-anim-4">
              <h4 className="drawer-section-title">
                <i className="fa-solid fa-screwdriver-wrench text-danger me-2"></i>
                Technologies &amp; Architecture
              </h4>
              <div className="drawer-tech-pills">
                {activeExp.techStack.map((tech, idx) => (
                  <span key={idx} className="drawer-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Measurable Impact */}
            <div className="drawer-impact-box drawer-anim-5">
              <div className="impact-icon">
                <i className="fa-solid fa-trophy"></i>
              </div>
              <div className="impact-text">
                <h5>Production Impact &amp; Delivery</h5>
                <p>{activeExp.impact}</p>
              </div>
            </div>

            {/* Footer Action */}
            <div className="drawer-footer drawer-anim-5">
              <a
                href="#projects"
                onClick={() => setActiveExp(null)}
                className="drawer-cta-btn"
              >
                <span>Explore Featured Projects</span>
                <i className="fa-solid fa-arrow-right"></i>
              </a>

              <button
                type="button"
                onClick={() => setActiveExp(null)}
                className="drawer-dismiss-btn"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
