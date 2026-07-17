export function PlayfulLoader({ label = "PlayDate lädt" }: { label?: string }) {
  return (
    <div className="playful-loader" role="status" aria-live="polite">
      <span className="loader-orbit" aria-hidden="true">
        <span>★</span><span>●</span><span>♥</span>
      </span>
      <strong>{label}</strong>
    </div>
  );
}
