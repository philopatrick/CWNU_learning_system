export type Metric = {
  label: string;
  value: string;
  detail: string;
};

export function StatGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="stat-grid">
      {metrics.map((metric) => (
        <article key={metric.label} className="stat-card">
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
          <small>{metric.detail}</small>
        </article>
      ))}
    </div>
  );
}
