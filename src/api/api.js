export async function predictLeaf(imageFile) {
    const url = import.meta.env.VITE_API_URL;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const res = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }

        return await res.json();
    } catch (err) {
        console.error(err);
        return { error: err.message };
    }
}