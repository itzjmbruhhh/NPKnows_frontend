import BentoCard from "./BentoCard";

const REC_ITEMS = [
    { icon: "🧪", key: "deficiency",            title: "Deficiency" },
    { icon: "🌾", key: "recommended_fertilizer", title: "Fertilizer" },
    { icon: "⚖️",  key: "dosage",                title: "Dosage" },
    { icon: "🛠️", key: "application_method",    title: "Method" },
];

export default function RecommendationCard({ result, meta }) {
    const rec = result.recommendation;

    return (
        <BentoCard
            className="card-rec animate-in"
            style={{ "--c": meta.color, "--g": meta.glow }}
        >
            <p className="card-label">💡 Fertilizer Recommendation</p>
            <div className="rec-grid">
                {REC_ITEMS.map(({ icon, key, title }) => (
                    <div key={key} className="rec-item">
                        <span className="rec-icon">{icon}</span>
                        <div>
                            <div className="rec-title">{title}</div>
                            <div className="rec-value">{rec[key]}</div>
                        </div>
                    </div>
                ))}
            </div>
            {rec.additional_notes && (
                <div className="rec-notes">
                    <span className="notes-icon">📝</span>
                    <span>{rec.additional_notes}</span>
                </div>
            )}

            <style>{`
                .card-rec {
                    border-color: color-mix(in srgb, var(--c) 18%, transparent);
                }
                .rec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .65rem; margin-bottom: .75rem; }
                .rec-item {
                    display: flex; align-items: flex-start; gap: .6rem;
                    background: var(--rec-bg); border: 1px solid var(--border);
                    border-radius: 12px; padding: .65rem .75rem;
                    transition: background .3s, border-color .3s;
                }
                .rec-icon { font-size: 1.05rem; margin-top: .1rem; flex-shrink: 0; }
                .rec-title { font-family: var(--mono); font-size: .6rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; }
                .rec-value { font-size: .83rem; font-weight: 600; color: var(--text); margin-top: .2rem; line-height: 1.4; }
                .rec-notes {
                    display: flex; gap: .6rem;
                    padding: .65rem .85rem;
                    background: var(--notes-bg);
                    border: 1px solid var(--notes-border);
                    border-radius: 12px; font-size: .8rem; color: var(--text); line-height: 1.55;
                }
                .notes-icon { flex-shrink: 0; }
            `}</style>
        </BentoCard>
    );
}