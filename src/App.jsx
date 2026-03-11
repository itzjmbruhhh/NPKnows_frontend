import { useState } from "react";
import { predictLeaf } from "./api/api";

function App() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        setResult(null);

        if (!file) return setErrorMsg("Please select an image to upload.");

        setLoading(true);

        const data = await predictLeaf(file);

        if (data.error) {
            setErrorMsg(data.error);
        } else {
            setResult(data);
        }

        setLoading(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">NPKnows - Bitter Gourd Leaf Analyzer</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit" className="ml-2 p-2 bg-blue-500 text-white">Analyze</button>
            </form>

            {loading && <p>Analyzing...</p>}

            {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}

            {result && !result.error && (
                <div className="mt-4">
                    <h2 className="font-semibold">Prediction</h2>
                    <p>Class: {result.prediction.label}</p>
                    <p>Confidence: {(result.prediction.confidence * 100).toFixed(2)}%</p>

                    <h2 className="font-semibold mt-2">Fertilizer Recommendation</h2>
                    <p>Deficiency: {result.recommendation.deficiency}</p>
                    <p>Fertilizer: {result.recommendation.recommended_fertilizer}</p>
                    <p>Dosage: {result.recommendation.dosage}</p>
                    <p>Method: {result.recommendation.application_method}</p>
                    <p>Notes: {result.recommendation.additional_notes}</p>
                </div>
            )}
        </div>
    );
}

export default App;