import BentoCard from "./BentoCard";
import Spinner from "./Spinner";
import styles from "./ActionCard.module.css";

export default function ActionCard({ loading, errorMsg, onAnalyze }) {
    return (
        <BentoCard className="card-action">
            <p className="card-label">🔬 Analysis</p>
            <button
                className={`${styles.analyzeBtn} ${loading ? styles.loading : ""}`}
                onClick={onAnalyze}
                disabled={loading}
            >
                {loading
                    ? <><Spinner /><span>Analyzing…</span></>
                    : <><span className={styles.btnIcon}>⚡</span><span>Analyze Leaf</span></>
                }
            </button>
            {errorMsg && (
                <div className={styles.errorBox}>
                    <span>⚠️</span> {errorMsg}
                </div>
            )}
            <div className={styles.infoChips}>
                <div className={styles.chip}>🧪 NPK Detection</div>
                <div className={styles.chip}>📊 Confidence Score</div>
                <div className={styles.chip}>💊 Fertilizer Tips</div>
            </div>
        </BentoCard>
    );
}