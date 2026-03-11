import { useTheme } from "../context/ThemeContext";
import { useRouter, PAGES } from "../context/RouterContext";
import styles from "./Header.module.css";

export default function Header() {
    const { theme, toggle } = useTheme();
    const { page, navigate } = useRouter();

    return (
        <header className={styles.header}>
            <button className={`${styles.logoWrap} ${styles.logoBtn}`} onClick={() => navigate(PAGES.DASHBOARD)}>
                <span className={styles.logoIcon}>🥒</span>
                <div>
                    <span className={styles.logoText}>NPK<em>nows</em></span>
                    <span className={styles.logoSub}>Bitter Gourd Intelligence</span>
                </div>
            </button>

            <div className={styles.headerRight}>
                <nav className={styles.headerNav}>
                    <button
                        className={`${styles.navLink} ${page === PAGES.DASHBOARD ? styles.navActive : ""}`}
                        onClick={() => navigate(PAGES.DASHBOARD)}
                    >
                        <span className={styles.navIcon}>🔬</span>
                        Analyze
                    </button>
                    <button
                        className={`${styles.navLink} ${page === PAGES.ABOUT ? styles.navActive : ""}`}
                        onClick={() => navigate(PAGES.ABOUT)}
                    >
                        <span className={styles.navIcon}>👥</span>
                        About Us
                    </button>
                </nav>

                <div className={styles.headerBadges}>
                    <span className={styles.badge}>Computer Vision</span>
                    <span className={`${styles.badge} ${styles.badgeAccent}`}>AI-Powered</span>
                </div>

                <button
                    className={styles.themeToggle}
                    onClick={toggle}
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                    <span className={styles.toggleTrack}>
                        <span className={styles.toggleThumb} />
                    </span>
                    <span className={styles.toggleIcons}>
                        <span className={`${styles.toggleIcon} ${theme === "light" ? styles.toggleIconActive : ""}`}>☀️</span>
                        <span className={`${styles.toggleIcon} ${theme === "dark" ? styles.toggleIconActive : ""}`}>🌙</span>
                    </span>
                </button>
            </div>
        </header>
    );
}