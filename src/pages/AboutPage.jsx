import { useState, useEffect } from "react";
import teamData from "../data/team.json";
import BentoCard from "../components/BentoCard";
import s from "./AboutPage.module.css";

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

// ── Shared link builder ────────────────────────────────────────────────────
function buildLinks(member) {
    return [
        { label: "LinkedIn",  href: member.linkedin,  icon: <LinkedInIcon /> },
        { label: "GitHub",    href: member.github,    icon: <GitHubIcon /> },
        { label: "Portfolio", href: member.portfolio, icon: <PortfolioIcon /> },
        { label: "View CV",   href: member.cv,        icon: <CVIcon />, highlight: true },
    ].filter(l => !!l.href);
}

// ── Member Modal ───────────────────────────────────────────────────────────
function MemberModal({ member, onClose }) {
    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    const links = buildLinks(member);

    const renderLinks = (extraClass = "") =>
        links.map(({ label, href, icon, highlight }) => (
            <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.modalLink} ${highlight ? s.modalLinkCv : ""} ${extraClass}`}
            >
                {icon}
                <span>{label}</span>
            </a>
        ));

    return (
        <div className={s.modalBackdrop} onClick={onClose}>
            <div className={s.modalPanel} onClick={e => e.stopPropagation()}>

                <button className={s.modalClose} onClick={onClose} aria-label="Close">
                    <CloseIcon />
                </button>

                {/* Left — avatar + links (desktop) */}
                <div className={s.modalLeft}>
                    <div className={s.modalAvatarWrap}>
                        {member.picture
                            ? <img src={member.picture} alt={member.name} className={s.modalAvatar} />
                            : <div className={s.modalAvatarFallback}>{member.name.charAt(0)}</div>
                        }
                        <div className={s.modalAvatarRing} />
                        <div className={s.modalAvatarGlow} />
                    </div>
                    <div className={s.modalLinksCol}>
                        {renderLinks()}
                    </div>
                </div>

                {/* Right — info */}
                <div className={s.modalRight}>
                    <div className={s.modalRoleTag}>{member.groupRole}</div>
                    <h2 className={s.modalName}>{member.name}</h2>
                    <div className={s.modalDivider} />
                    <p className={s.modalBio}>{member.bio}</p>
                    {/* Links row — mobile only */}
                    <div className={s.modalLinksRow}>
                        {renderLinks()}
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
            className={s.memberCard}
            style={{ animationDelay: `${index * 80}ms` }}
            onClick={onClick}
        >
            <div className={s.mcAvatarWrap}>
                {member.picture
                    ? <img src={member.picture} alt={member.name} className={s.mcAvatar} />
                    : <div className={s.mcAvatarFallback}>{member.name.charAt(0)}</div>
                }
                <div className={s.mcAvatarRing} />
            </div>
            <div className={s.mcHoverShine} />
            <div className={s.mcInfo}>
                <span className={s.mcName}>{member.name}</span>
                <span className={s.mcRole}>{member.groupRole}</span>
            </div>
            <div className={s.mcCta}>View Profile →</div>
        </button>
    );
}

// ── About Us Page ──────────────────────────────────────────────────────────
export default function AboutPage() {
    const [selected, setSelected] = useState(null);

    return (
        <>
            <main className={`${s.aboutRoot} animate-in`}>

                <BentoCard className={s.aboutHero}>
                    <div className={s.heroInner}>
                        <div className={s.heroTag}>
                            <span className={s.heroDot} />
                            <span>The Team</span>
                        </div>
                        <h1 className={s.heroTitle}>
                            Built by people who care about <em>agriculture</em>
                        </h1>
                        <p className={s.heroDesc}>
                            NPKnows was created as a capstone research project to help Filipino farmers
                            identify nutrient deficiencies in bitter gourd leaves using computer vision —
                            making expert-level diagnosis accessible to everyone.
                        </p>
                        <div className={s.heroStats}>
                            <div className={s.heroStat}>
                                <span className={s.statNum}>{teamData.length}</span>
                                <span className={s.statLabel}>Team Members</span>
                            </div>
                            <div className={s.statDivider} />
                            <div className={s.heroStat}>
                                <span className={s.statNum}>React & Flask</span>
                                <span className={s.statLabel}>Made With</span>
                            </div>
                            <div className={s.statDivider} />
                            <div className={s.heroStat}>
                                <span className={s.statNum}>ResNet50</span>
                                <span className={s.statLabel}>Powered By</span>
                            </div>
                        </div>
                    </div>
                    <div className={s.heroGlow} />
                </BentoCard>

                <div className={s.membersSection}>
                    <p className="card-label">👥 Meet the Team — click a card to learn more</p>
                    <div className={s.membersGrid}>
                        {teamData.map((member, i) => (
                            <MemberCard
                                key={member.id}
                                member={member}
                                index={i}
                                onClick={() => setSelected(member)}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Publication & Dataset ── */}
                <BentoCard className={s.pubCard}>
                    <div className={s.pubConference}>
                        <div className={s.pubConfBadge}>
                            <span className={s.pubConfDot} />
                            <span>Featured</span>
                        </div>
                        <div className={s.pubConfInfo}>
                            <span className={s.pubConfName}>ICMCR 2026</span>
                            <span className={s.pubConfDetail}>
                                International Conference on Machine Learning &amp; Computer Research
                                &nbsp;·&nbsp; March 20–22, 2026 &nbsp;·&nbsp; Tokyo, Japan 🇯🇵
                            </span>
                        </div>
                    </div>

                    <div className={s.pubDivider} />

                    <div>
                        <p className="card-label" style={{ marginBottom: ".65rem" }}>📎 Research Assets</p>
                        <div className={s.pubLinkGrid}>
                            {/*<a href="#" target="_blank" rel="noopener noreferrer" className={s.pubLinkCard}>*/}
                            {/*    <div className={s.pubLinkIcon}>📄</div>*/}
                            {/*    <div className={s.pubLinkBody}>*/}
                            {/*        <span className={s.pubLinkTitle}>Paper Publication</span>*/}
                            {/*        <span className={s.pubLinkDesc}>NPK Deficiency Detection in Bitter Gourd Using ResNet50</span>*/}
                            {/*    </div>*/}
                            {/*    <span className={s.pubLinkArrow}>↗</span>*/}
                            {/*</a>*/}
                            <a href="https://figshare.com/articles/dataset/AMPALAYA_LEAVES_LOCAL_AND_WEB/28612700" target="_blank" rel="noopener noreferrer" className={s.pubLinkCard}>
                                <div className={s.pubLinkIcon}>🗄️</div>
                                <div className={s.pubLinkBody}>
                                    <span className={s.pubLinkTitle}>Dataset</span>
                                    <span className={s.pubLinkDesc}>Annotated bitter gourd leaf images for NPK classification</span>
                                </div>
                                <span className={s.pubLinkArrow}>↗</span>
                            </a>
                        </div>
                    </div>
                </BentoCard>

            </main>

            {selected && (
                <MemberModal member={selected} onClose={() => setSelected(null)} />
            )}
        </>
    );
}