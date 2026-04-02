import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { TimelineList } from "@/components/timeline-list";
import { studentAgenda, studentCourses, studentHomework } from "@/data/mock-data";

export default function StudentPage() {
  return (
    <div className="page-stack">
      <SectionHeading eyebrow="Student dashboard" title="Your classes, attendance, and homework" />
      <div className="dashboard-grid">
        <Card>
          <h2>Attendance</h2>
          <p>Morning check-in status and class presence summary.</p>
          <TimelineList items={studentAgenda} />
        </Card>
        <Card>
          <h2>Homework</h2>
          <p>Active submissions and due dates for the current week.</p>
          <TimelineList items={studentHomework} />
        </Card>
        <Card>
          <h2>Courses</h2>
          <p>Enrolled sessions and learning focus.</p>
          <ul className="course-list">
            {studentCourses.map((course) => (
              <li key={course.code}>
                <strong>{course.code}</strong>
                <span>{course.name}</span>
                <small>{course.note}</small>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
