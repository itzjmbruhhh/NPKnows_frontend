export const NUTRIENT_META = {
    N: {
        label: "Nitrogen",
        symbol: "N",
        color: "#4ade80",
        colorLight: "#16a34a",
        glow: "rgba(74,222,128,0.35)",
        desc: "Drives leafy growth & chlorophyll",
        icon: "🌿",
    },
    P: {
        label: "Phosphorus",
        symbol: "P",
        color: "#f97316",
        colorLight: "#ea580c",
        glow: "rgba(249,115,22,0.35)",
        desc: "Powers root development & energy",
        icon: "🌱",
    },
    K: {
        label: "Potassium",
        symbol: "K",
        color: "#a78bfa",
        colorLight: "#7c3aed",
        glow: "rgba(167,139,250,0.35)",
        desc: "Regulates water & disease resistance",
        icon: "💧",
    },
    Healthy: {
        label: "Healthy",
        symbol: "✓",
        color: "#22d3ee",
        colorLight: "#0891b2",
        glow: "rgba(34,211,238,0.35)",
        desc: "No deficiency detected",
        icon: "✅",
    },
};

export function getNutrientKey(label = "") {
    if (!label) return null;
    const up = label.toUpperCase();
    if (up.includes("NITROGEN") || up.startsWith("N_") || up === "N") return "N";
    if (up.includes("PHOSPHORUS") || up.startsWith("P_") || up === "P") return "P";
    if (up.includes("POTASSIUM") || up.startsWith("K_") || up === "K") return "K";
    if (up.includes("HEALTHY") || up.includes("NORMAL")) return "Healthy";
    const first = label.trim()[0]?.toUpperCase();
    return NUTRIENT_META[first] ? first : "Healthy";
}