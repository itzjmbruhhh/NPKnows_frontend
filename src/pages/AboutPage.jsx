import { useState } from "react";
import teamData from "../data/team.json";
import BentoCard from "../components/BentoCard";

// ── Social icon SVGs ───────────────────────────────────────────────────────
const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
);

const PortfolioIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
);

const CVIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
    </svg>
);

const ChevronIcon = ({ open }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
         width="16" height="16"
         style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .3s cubic-bezier(.34,1.56,.64,1)" }}>
        <polyline points="6 9 12 15 18 9"/>
    </svg>
);

// ── Individual member card ─────────────────────────────────────────────────
function MemberCard({ member, index }) {
    const [open, setOpen] = useState(false);

    const links = [
        { label: "LinkedIn",  href: member.linkedin,  icon: <LinkedInIcon />,  always: true },
        { label: "GitHub",    href: member.github,    icon: <GitHubIcon />,    always: true },
        { label: "Portfolio", href: member.portfolio, icon: <PortfolioIcon />, always: false },
        { label: "CV",        href: member.cv,        icon: <CVIcon />,        always: true, download: true },
    ].filter(l => l.always ? !!l.href : !!l.href);

    return (
        <div
            className={`member-card ${open ? "member-open" : ""}`}
            style={{ animationDelay: `${index * 80}ms` }}
        >
            {/* ── Collapsed header ── */}
            <button className="member-header" onClick={() => setOpen(o => !o)}>
                <div className="member-avatar-wrap">
                    {member.picture
                        ? <img src={member.picture} alt={member.name} className="member-avatar" />
                        : <div className="member-avatar-fallback">{member.name.charAt(0)}</div>
                    }
                    <div className="member-avatar-ring" />
                </div>
                <div className="member-summary">
                    <span className="member-name">{member.name}</span>
                    <span className="member-role">{member.groupRole}</span>
                </div>
                <span className="member-chevron">
                    <ChevronIcon open={open} />
                </span>
            </button>

            {/* ── Expanded detail ── */}
            <div className={`member-detail ${open ? "detail-open" : ""}`}>
                <div className="detail-inner">
                    <p className="member-bio">{member.bio}</p>
                    <div className="member-links">
                        {links.map(({ label, href, icon, download }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`member-link ${label === "CV" ? "link-cv" : ""}`}
                            >
                                {icon}
                                <span>{label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── About Us Page ──────────────────────────────────────────────────────────
export default function AboutPage() {
    return (
        <>
            <main className="about-root animate-in">

                {/* Hero section */}
                <BentoCard className="about-hero">
                    <div className="hero-inner">
                        <div className="hero-tag">
                            <span className="hero-dot" />
                            <span>The Team</span>
                        </div>
                        <h1 className="hero-title">
                            Built by people who care about <em>agriculture</em>
                        </h1>
                        <p className="hero-desc">
                            NPKnows was created as a capstone research project to help Filipino farmers
                            identify nutrient deficiencies in bitter gourd leaves using computer vision —
                            making expert-level diagnosis accessible to everyone.
                        </p>
                        <div className="hero-stats">
                            <div className="hero-stat">
                                <span className="stat-num">{teamData.length}</span>
                                <span className="stat-label">Team Members</span>
                            </div>
                            <div className="stat-divider" />
                            <div className="hero-stat">
                                <span className="stat-num">React & Flask</span>
                                <span className="stat-label">Made With</span>
                            </div>
                            <div className="stat-divider" />
                            <div className="hero-stat">
                                <span className="stat-num">ResNet50</span>
                                <span className="stat-label">Powered By This Model</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-glow" />
                </BentoCard>

                {/* Members grid */}
                <div className="members-grid">
                    <p className="card-label" style={{ gridColumn: "1/-1", marginBottom: ".25rem" }}>
                        👥 Meet the Team
                    </p>
                    {teamData.map((member, i) => (
                        <MemberCard key={member.id} member={member} index={i} />
                    ))}
                </div>

            </main>

            <style>{`
                .about-root {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    flex: 1;
                }

                /* ── Hero ── */
                .about-hero {
                    position: relative;
                    overflow: hidden;
                    padding: 2rem 2rem 1.75rem;
                }
                .hero-inner { position: relative; z-index: 1; }
                .hero-glow {
                    position: absolute;
                    top: -60px; right: -60px;
                    width: 320px; height: 320px;
                    background: radial-gradient(circle, rgba(74,222,128,.12) 0%, transparent 70%);
                    pointer-events: none;
                }
                [data-theme="light"] .hero-glow {
                    background: radial-gradient(circle, rgba(22,163,74,.1) 0%, transparent 70%);
                }
                .hero-tag {
                    display: inline-flex; align-items: center; gap: .45rem;
                    font-family: var(--mono); font-size: .62rem;
                    color: var(--green); text-transform: uppercase; letter-spacing: .14em;
                    background: var(--accent-bg);
                    border: 1px solid rgba(74,222,128,.25);
                    border-radius: 99px; padding: .2rem .75rem;
                    margin-bottom: 1rem;
                }
                [data-theme="light"] .hero-tag { border-color: rgba(22,163,74,.3); }
                .hero-dot {
                    width: 6px; height: 6px; border-radius: 50%;
                    background: var(--green);
                    box-shadow: 0 0 6px var(--green);
                    animation: pulse 2s ease-in-out infinite;
                }
                @keyframes pulse {
                    0%,100% { opacity: 1; } 50% { opacity: .4; }
                }
                .hero-title {
                    font-size: clamp(1.4rem, 3vw, 2rem);
                    font-weight: 800; letter-spacing: -.03em;
                    color: var(--text); line-height: 1.2;
                    margin-bottom: .85rem; max-width: 640px;
                }
                .hero-title em { font-style: normal; color: var(--green); }
                .hero-desc {
                    font-size: .88rem; color: var(--muted);
                    line-height: 1.65; max-width: 580px;
                    margin-bottom: 1.5rem;
                }
                .hero-stats {
                    display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;
                }
                .hero-stat { display: flex; flex-direction: column; gap: .15rem; }
                .stat-num {
                    font-family: var(--mono); font-size: 1.3rem; font-weight: 700;
                    color: var(--green); line-height: 1;
                }
                .stat-label { font-size: .68rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; font-family: var(--mono); }
                .stat-divider { width: 1px; height: 32px; background: var(--border); }

                /* ── Members grid ── */
                .members-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: .75rem;
                }
                @media (max-width: 640px) { .members-grid { grid-template-columns: 1fr; } }

                /* ── Member card ── */
                .member-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: 18px;
                    overflow: hidden;
                    transition: border-color .3s, box-shadow .3s;
                    animation: fadeSlideIn .4s ease both;
                }
                .member-card:hover, .member-open {
                    border-color: rgba(74,222,128,.22);
                    box-shadow: 0 0 0 1px rgba(74,222,128,.06), 0 8px 30px rgba(0,0,0,.25);
                }
                [data-theme="light"] .member-card:hover,
                [data-theme="light"] .member-open {
                    border-color: rgba(22,163,74,.28);
                    box-shadow: 0 8px 30px rgba(0,0,0,.08);
                }

                .member-header {
                    width: 100%;
                    display: flex; align-items: center; gap: .85rem;
                    padding: 1rem 1.1rem;
                    background: none; border: none; cursor: pointer;
                    text-align: left; color: var(--text);
                    transition: background .2s;
                }
                .member-header:hover { background: rgba(74,222,128,.04); }
                [data-theme="light"] .member-header:hover { background: rgba(22,163,74,.04); }

                .member-avatar-wrap {
                    position: relative; flex-shrink: 0;
                    width: 52px; height: 52px;
                }
                .member-avatar {
                    width: 52px; height: 52px; border-radius: 50%;
                    object-fit: cover; display: block;
                    border: 2px solid var(--border);
                }
                .member-avatar-fallback {
                    width: 52px; height: 52px; border-radius: 50%;
                    background: linear-gradient(135deg, rgba(74,222,128,.2), rgba(74,222,128,.05));
                    border: 2px solid rgba(74,222,128,.3);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.3rem; font-weight: 800; color: var(--green);
                    font-family: var(--font);
                }
                .member-avatar-ring {
                    position: absolute; inset: -3px;
                    border-radius: 50%;
                    border: 2px solid transparent;
                    transition: border-color .3s;
                }
                .member-open .member-avatar-ring,
                .member-header:hover .member-avatar-ring {
                    border-color: rgba(74,222,128,.4);
                }
                [data-theme="light"] .member-open .member-avatar-ring,
                [data-theme="light"] .member-header:hover .member-avatar-ring {
                    border-color: rgba(22,163,74,.4);
                }

                .member-summary { flex: 1; min-width: 0; }
                .member-name { display: block; font-size: .95rem; font-weight: 700; color: var(--text); }
                .member-role { display: block; font-size: .7rem; color: var(--muted); font-family: var(--mono); margin-top: .15rem; }
                .member-chevron { color: var(--muted); flex-shrink: 0; transition: color .25s; }
                .member-header:hover .member-chevron,
                .member-open .member-chevron { color: var(--green); }

                /* ── Expandable detail ── */
                .member-detail {
                    display: grid; grid-template-rows: 0fr;
                    transition: grid-template-rows .35s cubic-bezier(.4,0,.2,1);
                }
                .member-detail.detail-open { grid-template-rows: 1fr; }
                .detail-inner {
                    overflow: hidden;
                    padding: 0 1.1rem;
                    transition: padding .35s;
                }
                .member-detail.detail-open .detail-inner {
                    padding: 0 1.1rem 1.1rem;
                    border-top: 1px solid var(--border);
                    padding-top: .9rem;
                }

                .member-bio {
                    font-size: .82rem; color: var(--muted);
                    line-height: 1.65; margin-bottom: .9rem;
                }

                .member-links { display: flex; flex-wrap: wrap; gap: .45rem; }
                .member-link {
                    display: inline-flex; align-items: center; gap: .4rem;
                    font-family: var(--mono); font-size: .67rem;
                    padding: .3rem .75rem; border-radius: 8px;
                    border: 1px solid var(--border);
                    color: var(--muted);
                    background: var(--chip-bg);
                    text-decoration: none;
                    transition: all .2s;
                }
                .member-link:hover {
                    border-color: rgba(74,222,128,.35);
                    color: var(--green);
                    background: var(--accent-bg);
                    transform: translateY(-1px);
                }
                [data-theme="light"] .member-link:hover {
                    border-color: rgba(22,163,74,.35);
                }
                .member-link.link-cv {
                    border-color: rgba(74,222,128,.2);
                    color: var(--green);
                    background: var(--accent-bg);
                }
                [data-theme="light"] .member-link.link-cv {
                    border-color: rgba(22,163,74,.25);
                }
                .member-link.link-cv:hover {
                    background: rgba(74,222,128,.15);
                }

                /* ── Project ── */
                .about-project { padding: 1.25rem; }
                .project-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: .65rem;
                }
                @media (max-width: 500px) { .project-grid { grid-template-columns: 1fr; } }
                .project-item {
                    display: flex; align-items: center; gap: .7rem;
                    padding: .7rem .85rem;
                    background: var(--rec-bg);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    transition: border-color .25s;
                }
                .project-item:hover { border-color: rgba(74,222,128,.2); }
                [data-theme="light"] .project-item:hover { border-color: rgba(22,163,74,.25); }
                .project-icon { font-size: 1.2rem; flex-shrink: 0; }
                .project-title { font-family: var(--mono); font-size: .6rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; }
                .project-value { font-size: .82rem; font-weight: 600; color: var(--text); margin-top: .2rem; }
            `}</style>
        </>
    );
}