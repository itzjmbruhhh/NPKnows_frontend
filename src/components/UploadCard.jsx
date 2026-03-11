import { useRef, useState } from "react";
import BentoCard from "./BentoCard";

export default function UploadCard({ file, preview, onFileChange, scanLine }) {
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef();

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const f = e.dataTransfer.files[0];
        if (f && f.type.startsWith("image/")) onFileChange(f);
    };

    return (
        <BentoCard className="card-upload">
            <p className="card-label">📤 Upload Leaf Image</p>
            <div
                className={`drop-zone ${dragOver ? "drag-active" : ""} ${preview ? "has-preview" : ""}`}
                onClick={() => inputRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
            >
                {preview ? (
                    <div className="preview-wrap">
                        <img src={preview} alt="Leaf preview" className="preview-img" />
                        {scanLine && <div className="scan-line" />}
                        <div className="preview-overlay"><span>Click to change</span></div>
                    </div>
                ) : (
                    <div className="drop-placeholder">
                        <span className="drop-icon">🍃</span>
                        <span className="drop-text">Drop image here</span>
                        <span className="drop-hint">or click to browse</span>
                    </div>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden-input"
                    onChange={(e) => onFileChange(e.target.files[0])}
                />
            </div>
            {file && <p className="file-name">📎 {file.name}</p>}

            <style>{`
                .drop-zone {
                    border: 2px dashed rgba(255,255,255,.1);
                    border-radius: 14px;
                    min-height: 220px;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    transition: border-color .25s, background .25s;
                    position: relative; overflow: hidden;
                    background: var(--drop-bg);
                }
                [data-theme="light"] .drop-zone {
                    border-color: rgba(0,0,0,.12);
                }
                .drop-zone:hover, .drop-zone.drag-active {
                    border-color: rgba(74,222,128,.45);
                    background: var(--drop-hover-bg);
                }
                [data-theme="light"] .drop-zone:hover,
                [data-theme="light"] .drop-zone.drag-active {
                    border-color: rgba(22,163,74,.45);
                }
                .drop-placeholder { display: flex; flex-direction: column; align-items: center; gap: .4rem; user-select: none; }
                .drop-icon { font-size: 2.5rem; animation: float 3s ease-in-out infinite; }
                .drop-text { font-size: .95rem; color: var(--text); font-weight: 700; }
                .drop-hint { font-size: .72rem; color: var(--muted); font-family: var(--mono); }
                .preview-wrap { position: relative; width: 100%; height: 100%; min-height: 220px; }
                .preview-img { width: 100%; height: 220px; object-fit: cover; border-radius: 12px; display: block; }
                .preview-overlay {
                    position: absolute; inset: 0; border-radius: 12px;
                    background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center;
                    opacity: 0; transition: opacity .2s; font-size: .85rem; color: #fff; font-weight: 600;
                }
                .drop-zone:hover .preview-overlay { opacity: 1; }
                .scan-line {
                    position: absolute; left: 0; right: 0; height: 3px;
                    background: linear-gradient(90deg, transparent, var(--scan-color), transparent);
                    box-shadow: 0 0 12px var(--scan-color);
                    animation: scan 1.6s ease-in-out infinite; z-index: 10;
                }
                .hidden-input { display: none; }
                .file-name {
                    font-family: var(--mono); font-size: .68rem; color: var(--muted);
                    margin-top: .6rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
                }
            `}</style>
        </BentoCard>
    );
}