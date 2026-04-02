import type { Metadata } from "next";
import type { ReactNode } from "react";
import { shellNav } from "@/data/navigation";
import { SiteShell } from "@/components/site-shell";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "CWNU Learning System",
  description: "Attendance, homework, courses, and playgrounds for CWNU international students and teachers."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteShell navItems={shellNav}>{children}</SiteShell>
      </body>
    </html>
  );
}
