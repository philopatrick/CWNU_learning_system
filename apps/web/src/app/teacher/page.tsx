import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { teacherClasses, teacherHomeworkQueue, teacherAttendanceQueue } from "@/data/mock-data";

export default function TeacherPage() {
  return (
    <div className="page-stack">
      <SectionHeading eyebrow="Teacher dashboard" title="Class oversight and coursework control" />
      <div className="dashboard-grid">
        <Card>
          <h2>Attendance review</h2>
          <p>Live class roster with quick exceptions and notes.</p>
          <ul className="queue-list">
            {teacherAttendanceQueue.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.status}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2>Homework queue</h2>
          <p>Submissions ready for checking and feedback.</p>
          <ul className="queue-list">
            {teacherHomeworkQueue.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2>Teaching groups</h2>
          <p>Courses and lab sessions currently assigned.</p>
          <ul className="course-list">
            {teacherClasses.map((course) => (
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
