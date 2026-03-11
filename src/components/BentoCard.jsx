export default function BentoCard({ className = "", style = {}, children }) {
    return (
        <div className={`bento-card ${className}`} style={style}>
            {children}
        </div>
    );
}