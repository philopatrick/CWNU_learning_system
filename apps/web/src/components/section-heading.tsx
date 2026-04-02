export function SectionHeading({
  eyebrow,
  title
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <header className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
    </header>
  );
}
