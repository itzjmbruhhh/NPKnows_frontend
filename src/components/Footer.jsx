export default function Footer() {
    return (
        <>
            <footer className="footer">
                NPKnows · Bitter Gourd NPK Deficiency Classifier · Powered by Computer Vision
            </footer>
            <style>{`
                .footer {
                    text-align: center; font-family: var(--mono); font-size: .62rem;
                    color: var(--muted); padding: 1.5rem 0 .5rem;
                    border-top: 1px solid var(--border); margin-top: 1.5rem;
                    letter-spacing: .08em;
                }
            `}</style>
        </>
    );
}