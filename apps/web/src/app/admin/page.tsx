import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { adminModules, adminMetrics } from "@/data/mock-data";
import { StatGrid } from "@/components/stat-grid";

export default function AdminPage() {
  return (
    <div className="page-stack">
      <SectionHeading eyebrow="Admin dashboard" title="System control and service health" />
      <div className="dashboard-grid">
        <Card>
          <h2>Core metrics</h2>
          <p>Operational view for users, classes, and activity.</p>
          <StatGrid metrics={adminMetrics} />
        </Card>
        <Card>
          <h2>Admin modules</h2>
          <p>Manage policy, permissions, and institutional structure.</p>
          <ul className="module-list">
            {adminModules.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
