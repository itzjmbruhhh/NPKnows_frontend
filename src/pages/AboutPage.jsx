import { useState, useEffect } from "react";
import teamData from "../data/team.json";
import BentoCard from "../components/BentoCard";

// ── Social icon SVGs ───────────────────────────────────────────────────────
const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
);

const PortfolioIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
);

const CVIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
    </svg>
);

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
);

// ── Member Modal ───────────────────────────────────────────────────────────
function MemberModal({ member, onClose }) {
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    const links = [
        { label: "LinkedIn",    href: member.linkedin,  icon: <LinkedInIcon /> },
        { label: "GitHub",      href: member.github,    icon: <GitHubIcon /> },
        { label: "Portfolio",   href: member.portfolio, icon: <PortfolioIcon /> },
        { label: "View CV", href: member.cv,        icon: <CVIcon />, target: "_blank", highlight: true },
    ].filter(l => !!l.href);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-panel" onClick={e => e.stopPropagation()}>

                <button className="modal-close" onClick={onClose} aria-label="Close">
                    <CloseIcon />
                </button>

                {/* Left — avatar + links */}
                <div className="modal-left">
                    <div className="modal-avatar-wrap">
                        {member.picture
                            ? <img src={member.picture} alt={member.name} className="modal-avatar" />
                            : <div className="modal-avatar-fallback">{member.name.charAt(0)}</div>
                        }
                        <div className="modal-avatar-ring" />
                        <div className="modal-avatar-glow" />
                    </div>
                    <div className="modal-links-col">
                        {links.map(({ label, href, icon, download, highlight }) => (
                            <a key={label} href={href}
                               target={download ? "_self" : "_blank"}
                               rel="noopener noreferrer"
                               download={download || undefined}
                               className={`modal-link ${highlight ? "modal-link-cv" : ""}`}
                            >
                                {icon}<span>{label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right — info */}
                <div className="modal-right">
                    <div className="modal-role-tag">{member.groupRole}</div>
                    <h2 className="modal-name">{member.name}</h2>
                    <div className="modal-divider" />
                    <p className="modal-bio">{member.bio}</p>
                    {/* Mobile links */}
                    <div className="modal-links-row">
                        {links.map(({ label, href, icon, download, highlight }) => (
                            <a key={label} href={href}
                               target={download ? "_self" : "_blank"}
                               rel="noopener noreferrer"
                               download={download || undefined}
                               className={`modal-link ${highlight ? "modal-link-cv" : ""}`}
                            >
                                {icon}<span>{label}</span>
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

// ── Member Card tile ───────────────────────────────────────────────────────
function MemberCard({ member, index, onClick }) {
    return (
        <button
            className="member-card"
            style={{ animationDelay: `${index * 80}ms` }}
            onClick={onClick}
        >
            <div className="mc-avatar-wrap">
                {member.picture
                    ? <img src={member.picture} alt={member.name} className="mc-avatar" />
                    : <div className="mc-avatar-fallback">{member.name.charAt(0)}</div>
                }
                <div className="mc-avatar-ring" />
            </div>
            <div className="mc-hover-shine" />
            <div className="mc-info">
                <span className="mc-name">{member.name}</span>
                <span className="mc-role">{member.groupRole}</span>
            </div>
            <div className="mc-cta">View Profile →</div>
        </button>
    );
}

// ── About Us Page ──────────────────────────────────────────────────────────
export default function AboutPage() {
    const [selected, setSelected] = useState(null);

    return (
        <>
            <main className="about-root animate-in">

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
                                <span className="stat-label">Powered By</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-glow" />
                </BentoCard>

                <div className="members-section">
                    <p className="card-label">👥 Meet the Team — click a card to learn more</p>
                    <div className="members-grid">
                        {teamData.map((member, i) => (
                            <MemberCard key={member.id} member={member} index={i} onClick={() => setSelected(member)} />
                        ))}
                    </div>
                </div>

            </main>

            {selected && <MemberModal member={selected} onClose={() => setSelected(null)} />}

            <style>{`
                .about-root { display: flex; flex-direction: column; gap: 1rem; flex: 1; }

                /* Hero */
                .about-hero { position: relative; overflow: hidden; padding: 2rem 2rem 1.75rem; }
                .hero-inner { position: relative; z-index: 1; }
                .hero-glow {
                    position: absolute; top: -60px; right: -60px; width: 320px; height: 320px;
                    background: radial-gradient(circle, rgba(74,222,128,.12) 0%, transparent 70%);
                    pointer-events: none;
                }
                [data-theme="light"] .hero-glow { background: radial-gradient(circle, rgba(22,163,74,.1) 0%, transparent 70%); }
                .hero-tag {
                    display: inline-flex; align-items: center; gap: .45rem;
                    font-family: var(--mono); font-size: .62rem; color: var(--green);
                    text-transform: uppercase; letter-spacing: .14em;
                    background: var(--accent-bg); border: 1px solid rgba(74,222,128,.25);
                    border-radius: 99px; padding: .2rem .75rem; margin-bottom: 1rem;
                }
                [data-theme="light"] .hero-tag { border-color: rgba(22,163,74,.3); }
                .hero-dot {
                    width: 6px; height: 6px; border-radius: 50%;
                    background: var(--green); box-shadow: 0 0 6px var(--green);
                    animation: pulse 2s ease-in-out infinite;
                }
                @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
                .hero-title { font-size: clamp(1.4rem,3vw,2rem); font-weight: 800; letter-spacing: -.03em; color: var(--text); line-height: 1.2; margin-bottom: .85rem; max-width: 640px; }
                .hero-title em { font-style: normal; color: var(--green); }
                .hero-desc { font-size: .88rem; color: var(--muted); line-height: 1.65; max-width: 580px; margin-bottom: 1.5rem; }
                .hero-stats { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
                .hero-stat { display: flex; flex-direction: column; gap: .15rem; }
                .stat-num { font-family: var(--mono); font-size: 1.3rem; font-weight: 700; color: var(--green); line-height: 1; }
                .stat-label { font-size: .68rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; font-family: var(--mono); }
                .stat-divider { width: 1px; height: 32px; background: var(--border); }

                /* Members section */
                .members-section { display: flex; flex-direction: column; gap: .75rem; }
                .members-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: .75rem;
                }
                @media (max-width: 860px) { .members-grid { grid-template-columns: repeat(2,1fr); } }
                @media (max-width: 520px)  { .members-grid { grid-template-columns: 1fr; } }

                /* Member card tile */
                .member-card {
                    position: relative; overflow: hidden;
                    display: flex; flex-direction: column; align-items: center;
                    gap: .85rem; padding: 1.75rem 1.25rem 1.25rem;
                    background: var(--surface); border: 1px solid var(--border);
                    border-radius: 20px; cursor: pointer; text-align: center;
                    transition: border-color .3s, box-shadow .3s, transform .25s;
                    animation: fadeSlideIn .4s ease both;
                }
                .member-card:hover {
                    border-color: rgba(74,222,128,.3);
                    box-shadow: 0 0 0 1px rgba(74,222,128,.08), 0 12px 40px rgba(0,0,0,.3);
                    transform: translateY(-3px);
                }
                [data-theme="light"] .member-card:hover {
                    border-color: rgba(22,163,74,.3);
                    box-shadow: 0 12px 40px rgba(0,0,0,.09);
                }
                .mc-hover-shine {
                    position: absolute; inset: 0;
                    background: linear-gradient(135deg, transparent 40%, rgba(74,222,128,.05) 50%, transparent 60%);
                    transform: translateX(-100%); transition: transform .55s ease; pointer-events: none;
                }
                .member-card:hover .mc-hover-shine { transform: translateX(100%); }

                .mc-avatar-wrap { position: relative; flex-shrink: 0; width: 88px; height: 88px; }
                .mc-avatar { width: 88px; height: 88px; border-radius: 50%; object-fit: cover; display: block; border: 2px solid var(--border); transition: border-color .3s; }
                .member-card:hover .mc-avatar { border-color: rgba(74,222,128,.4); }
                .mc-avatar-fallback {
                    width: 88px; height: 88px; border-radius: 50%;
                    background: linear-gradient(135deg, rgba(74,222,128,.2), rgba(74,222,128,.05));
                    border: 2px solid rgba(74,222,128,.3);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 2rem; font-weight: 800; color: var(--green); font-family: var(--font);
                }
                .mc-avatar-ring {
                    position: absolute; inset: -4px; border-radius: 50%;
                    border: 2px solid transparent; transition: border-color .3s, box-shadow .3s;
                }
                .member-card:hover .mc-avatar-ring { border-color: rgba(74,222,128,.35); box-shadow: 0 0 16px rgba(74,222,128,.2); }

                .mc-info { display: flex; flex-direction: column; gap: .2rem; flex: 1; }
                .mc-name { font-size: .98rem; font-weight: 700; color: var(--text); line-height: 1.2; }
                .mc-role { font-size: .68rem; color: var(--muted); font-family: var(--mono); line-height: 1.4; }
                .mc-cta {
                    font-family: var(--mono); font-size: .65rem; color: var(--green);
                    opacity: 0; transform: translateY(4px);
                    transition: opacity .25s, transform .25s; letter-spacing: .06em;
                }
                .member-card:hover .mc-cta { opacity: 1; transform: translateY(0); }

                /* Backdrop */
                .modal-backdrop {
                    position: fixed; inset: 0; z-index: 1000;
                    background: rgba(0,0,0,.78);
                    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
                    display: flex; align-items: center; justify-content: center;
                    padding: 1.5rem;
                    animation: backdropIn .2s ease;
                }
                [data-theme="light"] .modal-backdrop { background: rgba(0,0,0,.5); }
                @keyframes backdropIn { from{opacity:0} to{opacity:1} }

                /* Modal panel */
                .modal-panel {
                    position: relative; display: flex; gap: 0;
                    background: var(--surface);
                    border: 1px solid rgba(74,222,128,.22);
                    border-radius: 24px;
                    box-shadow: 0 0 0 1px rgba(74,222,128,.08), 0 40px 90px rgba(0,0,0,.65);
                    max-width: 700px; width: 100%; max-height: 88vh; overflow: hidden;
                    animation: modalIn .32s cubic-bezier(.34,1.56,.64,1);
                }
                [data-theme="light"] .modal-panel {
                    border-color: rgba(22,163,74,.2);
                    box-shadow: 0 40px 90px rgba(0,0,0,.18);
                }
                @keyframes modalIn {
                    from { opacity:0; transform: scale(.9) translateY(20px); }
                    to   { opacity:1; transform: scale(1) translateY(0); }
                }

                /* Close btn */
                .modal-close {
                    position: absolute; top: 1rem; right: 1rem; z-index: 10;
                    width: 36px; height: 36px; border-radius: 50%;
                    border: 1px solid var(--border); background: var(--surface-2);
                    color: var(--muted); cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    transition: all .2s;
                }
                .modal-close:hover { border-color: rgba(74,222,128,.3); color: var(--text); }

                /* Left panel */
                .modal-left {
                    width: 200px; flex-shrink: 0;
                    background: var(--surface-2); border-right: 1px solid var(--border);
                    display: flex; flex-direction: column; align-items: center;
                    gap: 1.5rem; padding: 2.5rem 1.25rem 2rem;
                }
                .modal-avatar-wrap { position: relative; width: 110px; height: 110px; }
                .modal-avatar { width: 110px; height: 110px; border-radius: 50%; object-fit: cover; display: block; border: 2px solid rgba(74,222,128,.25); }
                .modal-avatar-fallback {
                    width: 110px; height: 110px; border-radius: 50%;
                    background: linear-gradient(135deg, rgba(74,222,128,.2), rgba(74,222,128,.05));
                    border: 2px solid rgba(74,222,128,.3);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 2.6rem; font-weight: 800; color: var(--green); font-family: var(--font);
                }
                .modal-avatar-ring { position: absolute; inset: -5px; border-radius: 50%; border: 2px solid rgba(74,222,128,.3); }
                .modal-avatar-glow {
                    position: absolute; inset: -24px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(74,222,128,.14) 0%, transparent 70%);
                    pointer-events: none;
                }
                .modal-links-col { display: flex; flex-direction: column; gap: .4rem; width: 100%; }

                /* Right panel */
                .modal-right {
                    flex: 1; padding: 2.5rem 2rem 2rem;
                    display: flex; flex-direction: column; overflow-y: auto; min-width: 0;
                }
                .modal-role-tag {
                    font-family: var(--mono); font-size: .6rem; color: var(--green);
                    text-transform: uppercase; letter-spacing: .13em;
                    background: var(--accent-bg); border: 1px solid rgba(74,222,128,.22);
                    border-radius: 99px; padding: .2rem .75rem;
                    display: inline-block; margin-bottom: .75rem; align-self: flex-start;
                }
                [data-theme="light"] .modal-role-tag { border-color: rgba(22,163,74,.25); }
                .modal-name {
                    font-size: clamp(1.35rem,4vw,1.85rem); font-weight: 800;
                    letter-spacing: -.03em; color: var(--text); line-height: 1.15; margin-bottom: 1rem;
                }
                .modal-divider { width: 40px; height: 2px; background: var(--green); border-radius: 2px; margin-bottom: 1rem; opacity: .5; }
                .modal-bio { font-size: .87rem; color: var(--muted); line-height: 1.75; flex: 1; margin-bottom: 1.5rem; }

                /* Links */
                .modal-links-row { display: none; flex-wrap: wrap; gap: .4rem; }
                .modal-link {
                    display: flex; align-items: center; gap: .5rem;
                    font-family: var(--mono); font-size: .66rem;
                    padding: .45rem .85rem; border-radius: 10px;
                    border: 1px solid var(--border); color: var(--muted);
                    background: var(--chip-bg); text-decoration: none; width: 100%;
                    transition: all .2s;
                }
                .modal-link:hover { border-color: rgba(74,222,128,.35); color: var(--green); background: var(--accent-bg); }
                [data-theme="light"] .modal-link:hover { border-color: rgba(22,163,74,.35); }
                .modal-link-cv { border-color: rgba(74,222,128,.25); color: var(--green); background: var(--accent-bg); }
                [data-theme="light"] .modal-link-cv { border-color: rgba(22,163,74,.3); }
                .modal-link-cv:hover { background: rgba(74,222,128,.15) !important; }

                /* Responsive */
                @media (max-width: 560px) {
                    .modal-panel { flex-direction: column; max-height: 90vh; }
                    .modal-left {
                        width: 100%; border-right: none; border-bottom: 1px solid var(--border);
                        flex-direction: row; gap: 1rem; padding: 1.25rem; align-items: center;
                    }
                    .modal-avatar-wrap { width: 64px; height: 64px; flex-shrink: 0; }
                    .modal-avatar, .modal-avatar-fallback { width: 64px; height: 64px; }
                    .modal-avatar-fallback { font-size: 1.5rem; }
                    .modal-avatar-ring { inset: -3px; }
                    .modal-links-col { display: none; }
                    .modal-links-row { display: flex; }
                    .modal-right { padding: 1.25rem; }
                    .modal-link { width: auto; }
                }
            `}</style>
        </>
    );
}