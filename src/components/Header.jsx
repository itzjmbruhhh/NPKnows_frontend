import { useTheme } from "../context/ThemeContext";

export default function Header() {
    const { theme, toggle } = useTheme();

    return (
        <header className="header">
            <div className="logo-wrap">
                <span className="logo-icon">🥒</span>
                <div>
                    <span className="logo-text">NPK<em>nows</em></span>
                    <span className="logo-sub">Bitter Gourd Intelligence</span>
                </div>
            </div>

            <div className="header-right">
                <div className="header-badges">
                    <span className="badge">Computer Vision</span>
                    <span className="badge accent">AI-Powered</span>
                </div>

                <button
                    className="theme-toggle"
                    onClick={toggle}
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                    <span className="toggle-track">
                        <span className="toggle-thumb" />
                    </span>
                    <span className="toggle-icons">
                        <span className={`toggle-icon ${theme === "light" ? "active" : ""}`}>☀️</span>
                        <span className={`toggle-icon ${theme === "dark" ? "active" : ""}`}>🌙</span>
                    </span>
                </button>
            </div>

            <style>{`
                .header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.5rem 0 1rem;
                    border-bottom: 1px solid var(--border);
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                    gap: .75rem;
                }
                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
                .logo-wrap { display: flex; align-items: center; gap: .75rem; }
                .logo-icon { font-size: 2rem; filter: drop-shadow(0 0 10px rgba(74,222,128,.55)); }
                [data-theme="light"] .logo-icon { filter: drop-shadow(0 0 10px rgba(22,163,74,.45)); }
                .logo-text { font-size: 1.6rem; font-weight: 800; letter-spacing: -.03em; color: var(--text); line-height: 1; }
                .logo-text em { font-style: normal; color: var(--green); }
                .logo-sub { display: block; font-size: .65rem; color: var(--muted); letter-spacing: .14em; text-transform: uppercase; font-family: var(--mono); margin-top: .15rem; }
                .header-badges { display: flex; gap: .5rem; }
                .badge {
                    font-family: var(--mono); font-size: .62rem;
                    padding: .25rem .7rem; border-radius: 99px;
                    border: 1px solid var(--border); color: var(--muted);
                    background: var(--badge-bg);
                    text-transform: uppercase; letter-spacing: .08em;
                }
                .badge.accent {
                    border-color: rgba(74,222,128,.3); color: var(--green);
                    background: var(--accent-bg);
                }
                [data-theme="light"] .badge.accent {
                    border-color: rgba(22,163,74,.3);
                }

                /* Toggle */
                .theme-toggle {
                    display: flex; align-items: center; gap: .5rem;
                    background: var(--toggle-bg);
                    border: 1px solid var(--toggle-border);
                    border-radius: 99px;
                    padding: .3rem .6rem .3rem .4rem;
                    cursor: pointer;
                    transition: all .25s;
                }
                .theme-toggle:hover { border-color: var(--border-hover); }
                .toggle-track {
                    width: 32px; height: 18px;
                    background: var(--green);
                    border-radius: 99px;
                    position: relative;
                    opacity: .5;
                    transition: opacity .25s;
                    flex-shrink: 0;
                }
                .theme-toggle:hover .toggle-track { opacity: .75; }
                .toggle-thumb {
                    position: absolute;
                    top: 2px; left: 2px;
                    width: 14px; height: 14px;
                    background: #fff;
                    border-radius: 50%;
                    transition: transform .3s cubic-bezier(.34,1.56,.64,1);
                }
                [data-theme="light"] .toggle-thumb { transform: translateX(14px); }
                .toggle-icons { display: flex; gap: .3rem; font-size: .8rem; }
                .toggle-icon { opacity: .35; transition: opacity .25s; }
                .toggle-icon.active { opacity: 1; }
            `}</style>
        </header>
    );
}