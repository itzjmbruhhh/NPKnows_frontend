export async function predictLeaf(imageFile) {
    const url = import.meta.env.VITE_API_URL;

    if (!imageFile) {
        return { error: "No file selected. Please choose an image." };
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const res = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
            // Map backend status codes to user-friendly messages
            switch (res.status) {
                case 400:
                    return { error: data.error || "Bad request: no image uploaded or file empty." };
                case 422:
                    return { error: data.error || "Prediction failed: check the image format or type." };
                case 429:
                    return { error: "Rate limit exceeded. Please wait before trying again." };
                default:
                    return { error: data.error || "Server error occurred. Please try again later." };
            }
        }

        return data;

    } catch (err) {
        console.error("Fetch error:", err);
        return { error: "Network error: unable to reach API." };
    }
}