export default function Spinner() {
    return (
        <>
            <div className="spinner-wrap">
                <svg className="spinner-svg" viewBox="0 0 80 80">
                    <circle className="spinner-track" cx="40" cy="40" r="32" />
                    <circle className="spinner-arc" cx="40" cy="40" r="32" />
                </svg>
                <span className="spinner-leaf">🍃</span>
            </div>
            <style>{`
                .spinner-wrap { position: relative; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; }
                .spinner-svg { width: 22px; height: 22px; position: absolute; animation: spin 1.2s linear infinite; }
                .spinner-track { fill: none; stroke: rgba(74,222,128,.15); stroke-width: 5; }
                .spinner-arc { fill: none; stroke: var(--green); stroke-width: 5; stroke-linecap: round; stroke-dasharray: 60 140; }
                .spinner-leaf { font-size: .75rem; position: relative; z-index: 1; }
            `}</style>
        </>
    );
}