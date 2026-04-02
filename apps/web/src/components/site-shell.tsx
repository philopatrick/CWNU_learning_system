import type { ReactNode } from "react";
import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
};

export function SiteShell({
  navItems,
  children
}: {
  navItems: NavItem[];
  children: ReactNode;
}) {
  return (
    <div className="site-shell">
      <header className="topbar">
        <Link className="brand" href="/">
          <span className="brand-mark">CWNU</span>
          <span className="brand-text">Learning System</span>
        </Link>
        <nav className="topnav" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="main-content">{children}</main>
    </div>
  );
}
