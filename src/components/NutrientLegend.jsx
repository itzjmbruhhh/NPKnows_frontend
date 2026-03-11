import BentoCard from "./BentoCard";
import { NUTRIENT_META } from "../constants/nutrients";

export default function NutrientLegend({ activeKey }) {
    return (
        <BentoCard className="card-legend">
            <p className="card-label">🧬 Nutrient Guide</p>
            <div className="legend-grid">
                {Object.entries(NUTRIENT_META).map(([k, m]) => (
                    <div
                        key={k}
                        className={`legend-item ${activeKey === k ? "legend-active" : ""}`}
                        style={{ "--c": m.color, "--g": m.glow }}
                    >
                        <span className="legend-sym" style={{ color: m.color }}>{m.symbol}</span>
                        <div>
                            <div className="legend-name">{m.label}</div>
                            <div className="legend-desc">{m.desc}</div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .legend-grid { display: flex; flex-direction: column; gap: .5rem; }
                .legend-item {
                    display: flex; align-items: flex-start; gap: .55rem;
                    padding: .45rem .55rem; border-radius: 10px;
                    border: 1px solid transparent; transition: all .25s; cursor: default;
                }
                .legend-item.legend-active {
                    background: rgba(0,0,0,.3);
                    border-color: var(--c);
                    box-shadow: 0 0 14px var(--g);
                }
                [data-theme="light"] .legend-item.legend-active {
                    background: rgba(0,0,0,.05);
                }
                .legend-sym { font-size: .95rem; font-weight: 800; font-family: var(--mono); min-width: 18px; }
                .legend-name { font-size: .76rem; font-weight: 700; color: var(--text); }
                .legend-desc { font-size: .62rem; color: var(--muted); margin-top: .05rem; line-height: 1.4; }
            `}</style>
        </BentoCard>
    );
}