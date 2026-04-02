export type TimelineItem = {
  label: string;
  detail: string;
};

export function TimelineList({ items }: { items: TimelineItem[] }) {
  return (
    <ul className="timeline-list">
      {items.map((item) => (
        <li key={item.label}>
          <strong>{item.label}</strong>
          <span>{item.detail}</span>
        </li>
      ))}
    </ul>
  );
}
