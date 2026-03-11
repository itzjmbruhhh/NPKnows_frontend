import { useState, useEffect } from "react";

export default function ConfBar({ value, color, glow }) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const t = setTimeout(() => setWidth(value * 100), 120);
        return () => clearTimeout(t);
    }, [value]);

    return (
        <>
            <div className="conf-track">
                <div
                    className="conf-fill"
                    style={{
                        width: `${width}%`,
                        background: color,
                        boxShadow: `0 0 12px ${glow}`,
                        transition: "width 0.9s cubic-bezier(.22,1,.36,1)",
                    }}
                />
            </div>
            <style>{`
                .conf-track { width: 100%; height: 8px; background: var(--conf-track); border-radius: 99px; overflow: hidden; }
                .conf-fill { height: 100%; border-radius: 99px; }
            `}</style>
        </>
    );
}