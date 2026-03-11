import BentoCard from "./BentoCard";
import ConfBar from "./ConfBar";

export default function PredictionCard({ result, meta }) {
    const confidence = result?.prediction?.confidence ?? 0;

    return (
        <BentoCard
            className="card-result animate-in"
            style={{ "--c": meta.color, "--g": meta.glow }}
        >
            <p className="card-label">🎯 Prediction</p>
            <div className="result-hero">
                <span className="result-icon">{meta.icon}</span>
                <div>
                    <div className="result-label" style={{ color: meta.color }}>
                        {result.prediction.label}
                    </div>
                    <div className="result-nutrient">{meta.label} Deficiency</div>
                </div>
            </div>
            <div className="conf-row">
                <span className="conf-label">Confidence</span>
                <span className="conf-value" style={{ color: meta.color }}>
                    {(confidence * 100).toFixed(1)}%
                </span>
            </div>
            <ConfBar value={confidence} color={meta.color} glow={meta.glow} />

            <style>{`
                .card-result {
                    border-color: color-mix(in srgb, var(--c) 25%, transparent);
                    box-shadow: 0 0 28px color-mix(in srgb, var(--g) 30%, transparent);
                }
                .result-hero { display: flex; align-items: center; gap: .9rem; margin-bottom: 1rem; }
                .result-icon { font-size: 2.4rem; filter: drop-shadow(0 0 10px var(--g)); }
                .result-label { font-size: 1.2rem; font-weight: 800; letter-spacing: -.02em; }
                .result-nutrient { font-size: .75rem; color: var(--muted); margin-top: .1rem; }
                .conf-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: .4rem; }
                .conf-label { font-family: var(--mono); font-size: .67rem; color: var(--muted); }
                .conf-value { font-family: var(--mono); font-size: .95rem; font-weight: 700; }
            `}</style>
        </BentoCard>
    );
}