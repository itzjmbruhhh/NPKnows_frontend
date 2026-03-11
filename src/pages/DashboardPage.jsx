import { useState } from "react";
import { predictLeaf } from "../api/api";
import { getNutrientKey, NUTRIENT_META } from "../constants/nutrients";

import UploadCard from "../components/UploadCard";
import ActionCard from "../components/ActionCard";
import NutrientLegend from "../components/NutrientLegend";
import PredictionCard from "../components/PredictionCard";
import RecommendationCard from "../components/RecommendationCard";
import HowItWorksCard from "../components/HowItWorksCard";

export default function DashboardPage() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [scanLine, setScanLine] = useState(false);

    const handleFileChange = (f) => {
        if (!f) return;
        setFile(f);
        setPreview(URL.createObjectURL(f));
        setResult(null);
        setErrorMsg(null);
    };

    const handleAnalyze = async (e) => {
        e?.preventDefault();
        setErrorMsg(null);
        setResult(null);
        if (!file) return setErrorMsg("Please select an image to upload.");
        setLoading(true);
        setScanLine(true);
        const data = await predictLeaf(file);
        setScanLine(false);
        if (data.error) setErrorMsg(data.error);
        else setResult(data);
        setLoading(false);
    };

    const nutrientKey = result ? getNutrientKey(result.prediction?.label) : null;
    const meta = nutrientKey ? NUTRIENT_META[nutrientKey] : null;

    return (
        <main className="grid">
            <UploadCard
                file={file}
                preview={preview}
                onFileChange={handleFileChange}
                scanLine={scanLine}
            />

            <ActionCard
                loading={loading}
                errorMsg={errorMsg}
                onAnalyze={handleAnalyze}
            />

            <NutrientLegend activeKey={nutrientKey} />

            {result && meta && (
                <PredictionCard result={result} meta={meta} />
            )}

            {result && meta && (
                <RecommendationCard result={result} meta={meta} />
            )}

            <HowItWorksCard />

            <style>{`
                .grid {
                    display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    gap: 1rem;
                    flex: 1;
                }
                .card-upload  { grid-column: span 5; }
                .card-action  { grid-column: span 4; }
                .card-legend  { grid-column: span 3; }
                .card-result  { grid-column: span 4; }
                .card-rec     { grid-column: span 8; }
                .card-about   { grid-column: span 12; }

                @media (max-width: 960px) {
                    .card-upload { grid-column: span 12; }
                    .card-action { grid-column: span 6; }
                    .card-legend { grid-column: span 6; }
                    .card-result { grid-column: span 12; }
                    .card-rec    { grid-column: span 12; }
                    .card-about  { grid-column: span 12; }
                    .legend-grid { display: grid; grid-template-columns: 1fr 1fr; }
                }
                @media (max-width: 640px) {
                    .card-action { grid-column: span 12; }
                    .card-legend { grid-column: span 12; }
                    .legend-grid { grid-template-columns: 1fr; }
                    .rec-grid    { grid-template-columns: 1fr; }
                    .steps       { flex-direction: column; gap: .7rem; }
                }
            `}</style>
        </main>
    );
}