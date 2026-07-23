import { Terminal } from "./components/Terminal";
import {
  achievements,
  certifications,
  education,
  experiences,
  impactMetrics,
  profile,
  projects,
  skillGroups,
} from "./portfolio-data";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <div className="ambient-grid" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />

      <div className="site-shell">
        <aside className="identity-rail" aria-label="Portfolio navigation">
          <a className="brand" href="#top" aria-label="Pratik Raut, home">
            <span className="brand-mark">PR</span>
            <span>
              <strong>PRATIK_RAUT</strong>
              <small>backend.engineer</small>
            </span>
          </a>

          <nav className="rail-nav" aria-label="Main navigation">
            <a href="#impact"><span>01</span> Impact</a>
            <a href="#experience"><span>02</span> Experience</a>
            <a href="#projects"><span>03</span> Projects</a>
            <a href="#stack"><span>04</span> Stack</a>
            <a href="#contact"><span>05</span> Contact</a>
          </nav>

          <div className="rail-status" aria-label="Current status">
            <div className="status-line">
              <span className="status-dot" aria-hidden="true" />
              Available to connect
            </div>
            <dl>
              <div><dt>location</dt><dd>Pune, India</dd></div>
              <div><dt>focus</dt><dd>Backend / Fintech</dd></div>
              <div><dt>system</dt><dd>Operational</dd></div>
            </dl>
          </div>
        </aside>

        <main id="main-content">
          <section className="hero section" id="top" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="command-label"><span>$</span> whoami</p>
              <p className="hero-name">PRATIK RAUT</p>
              <h1 id="hero-title">
                Backend systems for the <em>real world.</em>
              </h1>
              <p className="hero-summary">
                I build production-grade banking APIs, automate slow engineering
                workflows, and turn difficult failures into measurable improvements.
              </p>
              <div className="hero-meta" aria-label="Professional summary">
                <span>Associate Software Engineer</span>
                <span>Java + Spring Boot</span>
                <span>Oracle FLEXCUBE</span>
              </div>
              <div className="hero-actions">
                <a className="button button-primary" href="#experience">
                  View experience <span aria-hidden="true">-&gt;</span>
                </a>
                <a className="button button-secondary" href={profile.resume} download>
                  Download resume
                </a>
              </div>
            </div>

            <div className="hero-console">
              <figure className="identity-scan">
                <div className="identity-image">
                  {/* Pre-optimized local variants avoid a runtime image service dependency. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/pratik-hacker-portrait.webp"
                    srcSet="/pratik-hacker-portrait-480.webp 480w, /pratik-hacker-portrait.webp 900w"
                    sizes="(max-width: 500px) 92vw, (max-width: 960px) 88vw, 42vw"
                    alt="Hacker-style portrait of Pratik Raut"
                    width="900"
                    height="1050"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <span className="identity-grid" aria-hidden="true" />
                  <span className="identity-sweep" aria-hidden="true" />
                  <div className="identity-overlay" aria-hidden="true">
                    <span>SUBJECT_001</span>
                    <span>CONFIDENCE 99.8%</span>
                  </div>
                </div>
                <figcaption>
                  <div className="identity-heading">
                    <span><i aria-hidden="true" /> Identity verified</span>
                    <strong>PRATIK RAUT</strong>
                  </div>
                  <dl>
                    <div><dt>role</dt><dd>BACKEND_ENGINEER</dd></div>
                    <div><dt>status</dt><dd>ONLINE</dd></div>
                  </dl>
                </figcaption>
              </figure>

              <Terminal />
            </div>
          </section>

          <section className="section impact-section" id="impact" aria-labelledby="impact-title">
            <div className="section-heading">
              <div>
                <p className="command-label"><span>$</span> cat /proc/impact</p>
                <h2 id="impact-title">Measured outcomes</h2>
              </div>
              <p>Numbers that show what changed after the code shipped.</p>
            </div>

            <div className="impact-grid">
              {impactMetrics.map((metric, index) => (
                <article className="metric-card" key={metric.label}>
                  <span className="metric-index">0{index + 1}</span>
                  <strong>{metric.value}</strong>
                  <h3>{metric.label}</h3>
                  <p>{metric.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="experience" aria-labelledby="experience-title">
            <div className="section-heading">
              <div>
                <p className="command-label"><span>$</span> git log --experience</p>
                <h2 id="experience-title">Production history</h2>
              </div>
              <p>Engineering experience across banking platforms and full-stack systems.</p>
            </div>

            <div className="timeline">
              {experiences.map((experience) => (
                <article className="timeline-item" key={experience.company}>
                  <div className="timeline-marker" aria-hidden="true" />
                  <div className="timeline-meta">
                    <span>{experience.period}</span>
                    <span>{experience.location}</span>
                  </div>
                  <div className="timeline-content">
                    <p className="company">{experience.company}</p>
                    <h3>{experience.role}</h3>
                    <div className="tag-list" aria-label={`${experience.role} technologies`}>
                      {experience.stack.map((item) => <span key={item}>{item}</span>)}
                    </div>
                    <ul>
                      {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="projects" aria-labelledby="projects-title">
            <div className="section-heading">
              <div>
                <p className="command-label"><span>$</span> ls -la ./projects</p>
                <h2 id="projects-title">Selected builds</h2>
              </div>
              <p>Useful systems built around automation, computer vision, and developer speed.</p>
            </div>

            <div className="project-grid">
              {projects.map((project, index) => (
                <article className="project-card" key={project.name}>
                  <div className="project-topline">
                    <span>repo_{String(index + 1).padStart(2, "0")}</span>
                    <span className="project-status">PUBLIC</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-impact">
                    <strong>{project.impact}</strong>
                    <span>{project.impactLabel}</span>
                  </div>
                  <div className="tag-list" aria-label={`${project.name} technologies`}>
                    {project.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                  <a href={project.url} target="_blank" rel="noreferrer">
                    View repository <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="stack" aria-labelledby="stack-title">
            <div className="section-heading">
              <div>
                <p className="command-label"><span>$</span> cat stack.yml</p>
                <h2 id="stack-title">Technical manifest</h2>
              </div>
              <p>A backend-first toolkit for secure, observable, data-heavy systems.</p>
            </div>

            <div className="stack-grid">
              {skillGroups.map((group) => (
                <article className="stack-card" key={group.name}>
                  <div className="stack-card-heading">
                    <span>{group.code}</span>
                    <h3>{group.name}</h3>
                  </div>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="section credentials" id="credentials" aria-labelledby="credentials-title">
            <div className="section-heading">
              <div>
                <p className="command-label"><span>$</span> tail achievements.log</p>
                <h2 id="credentials-title">Credentials & recognition</h2>
              </div>
            </div>

            <div className="credentials-grid">
              <div className="achievement-list">
                {achievements.map((achievement, index) => (
                  <article key={achievement.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{achievement.title}</h3>
                      <p>{achievement.detail}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="credential-panel">
                <p className="panel-label">certifications.json</p>
                <ul className="cert-list">
                  {certifications.map((certification) => (
                    <li key={certification.name}>
                      <a href={certification.url} target="_blank" rel="noreferrer">
                        <span aria-hidden="true">✓</span>
                        {certification.name}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="education-block">
                  <p className="panel-label">education.txt</p>
                  <h3>{education.degree}</h3>
                  <p>{education.institution}</p>
                  <div><span>{education.period}</span><strong>CGPA {education.cgpa}</strong></div>
                </div>
              </div>
            </div>
          </section>

          <section className="section contact-section" id="contact" aria-labelledby="contact-title">
            <div className="contact-copy">
              <p className="command-label"><span>$</span> ./contact.sh</p>
              <h2 id="contact-title">Let&apos;s build something useful.</h2>
              <p>
                Have a backend, fintech, developer-tooling, or full-stack problem
                to discuss? My inbox is open.
              </p>
            </div>

            <div className="contact-links">
              <a className="contact-primary" href={`mailto:${profile.email}`}>
                <span>EMAIL</span>
                {profile.email}
                <strong aria-hidden="true">-&gt;</strong>
              </a>
              {profile.links.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                  <span>{link.label}</span>
                  <strong aria-hidden="true">↗</strong>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </section>

          <footer>
            <p><span aria-hidden="true">●</span> process exited successfully (0)</p>
            <p>Designed & built by Pratik Raut · 2026</p>
          </footer>
        </main>
      </div>
    </>
  );
}
