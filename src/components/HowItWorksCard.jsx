import BentoCard from "./BentoCard";

const STEPS = [
    "Upload a clear photo of a bitter gourd leaf",
    "AI model detects N, P, or K deficiency",
    "Get tailored fertilizer recommendations instantly",
];

export default function HowItWorksCard() {
    return (
        <BentoCard className="card-about">
            <p className="card-label">ℹ️ How It Works</p>
            <div className="steps">
                {STEPS.map((s, i) => (
                    <div key={i} className="step">
                        <span className="step-num">{i + 1}</span>
                        <span className="step-text">{s}</span>
                    </div>
                ))}
            </div>

            <style>{`
                .steps { display: flex; gap: 1.5rem; flex-wrap: wrap; }
                .step { display: flex; align-items: center; gap: .7rem; flex: 1; min-width: 180px; }
                .step-num {
                    width: 28px; height: 28px; border-radius: 50%;
                    background: var(--step-bg);
                    border: 1px solid var(--step-border); color: var(--green);
                    font-weight: 800; font-size: .78rem;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0; font-family: var(--mono);
                }
                .step-text { font-size: .8rem; color: var(--muted); line-height: 1.45; }
            `}</style>
        </BentoCard>
    );
}