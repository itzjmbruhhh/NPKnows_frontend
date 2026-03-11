import BentoCard from "./BentoCard";
import Spinner from "./Spinner";

export default function ActionCard({ loading, errorMsg, onAnalyze }) {
    return (
        <BentoCard className="card-action">
            <p className="card-label">🔬 Analysis</p>
            <button
                className={`analyze-btn ${loading ? "loading" : ""}`}
                onClick={onAnalyze}
                disabled={loading}
            >
                {loading
                    ? <><Spinner /><span>Analyzing…</span></>
                    : <><span className="btn-icon">⚡</span><span>Analyze Leaf</span></>
                }
            </button>
            {errorMsg && (
                <div className="error-box">
                    <span>⚠️</span> {errorMsg}
                </div>
            )}
            <div className="info-chips">
                <div className="chip">🧪 NPK Detection</div>
                <div className="chip">📊 Confidence Score</div>
                <div className="chip">💊 Fertilizer Tips</div>
            </div>

            <style>{`
                .analyze-btn {
                    width: 100%; padding: .9rem 1.5rem;
                    border: 1px solid rgba(74,222,128,.28);
                    border-radius: 12px;
                    background: var(--btn-bg);
                    color: var(--green);
                    font-family: var(--font); font-size: 1rem; font-weight: 700;
                    cursor: pointer; display: flex; align-items: center; justify-content: center;
                    gap: .5rem; letter-spacing: .04em;
                    transition: all .25s;
                    box-shadow: 0 0 20px rgba(74,222,128,.07);
                    margin-bottom: 1rem;
                }
                [data-theme="light"] .analyze-btn {
                    border-color: rgba(22,163,74,.35);
                    color: #15803d;
                }
                .analyze-btn:hover:not(:disabled) {
                    background: var(--btn-hover);
                    box-shadow: 0 0 30px rgba(74,222,128,.22);
                    transform: translateY(-1px);
                }
                .analyze-btn:active:not(:disabled) { transform: translateY(0); }
                .analyze-btn:disabled { opacity: .65; cursor: default; }
                .btn-icon { font-size: 1.1rem; }
                .error-box {
                    background: var(--error-bg); border: 1px solid var(--error-border);
                    border-radius: 10px; padding: .65rem .9rem;
                    font-size: .8rem; color: var(--error-text);
                    display: flex; gap: .5rem; align-items: flex-start; margin-bottom: .8rem;
                    line-height: 1.5;
                }
                .info-chips { display: flex; flex-direction: column; gap: .4rem; }
                .chip {
                    font-family: var(--mono); font-size: .67rem;
                    padding: .28rem .7rem; border-radius: 8px;
                    background: var(--chip-bg); border: 1px solid var(--border); color: var(--muted);
                }
            `}</style>
        </BentoCard>
    );
}