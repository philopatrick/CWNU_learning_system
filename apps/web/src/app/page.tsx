import { dashboardHighlights, roleCards, systemMetrics } from "@/data/mock-data";
import { Card } from "@/components/card";
import { Pill } from "@/components/pill";
import { SectionHeading } from "@/components/section-heading";
import { StatGrid } from "@/components/stat-grid";
import { RoleGrid } from "@/components/role-grid";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <Pill>Cross-role learning operations</Pill>
          <h1>CWNU learning system built for attendance, homework, and code practice.</h1>
          <p>
            A focused web foundation for international students, teachers, and administrators, with a clear path to playgrounds and AI-assisted learning.
          </p>
          <div className="hero-actions">
            <Link className="primary-action" href="/student">Open student dashboard</Link>
            <Link className="secondary-action" href="/playgrounds">Explore playgrounds</Link>
          </div>
        </div>
        <Card className="hero-panel">
          <SectionHeading eyebrow="Today" title="Operational snapshot" />
          <StatGrid metrics={systemMetrics} />
          <ul className="highlight-list">
            {dashboardHighlights.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="section-block">
        <SectionHeading eyebrow="Entry points" title="Role-based dashboards" />
        <RoleGrid cards={roleCards} />
      </section>
    </>
  );
}
