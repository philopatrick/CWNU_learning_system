import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { playgroundCatalog } from "@/data/mock-data";

export default function PlaygroundsPage() {
  return (
    <div className="page-stack">
      <SectionHeading eyebrow="Playgrounds" title="Browser-based practice, hints, and compiler guidance" />
      <div className="dashboard-grid playground-grid">
        {playgroundCatalog.map((item) => (
          <Card key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.detail}</p>
            <ul className="chip-list">
              {item.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
