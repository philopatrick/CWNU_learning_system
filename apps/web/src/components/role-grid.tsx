import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

export type RoleCard = {
  title: string;
  description: string;
  href: string;
  accent: string;
  footer: ReactNode;
};

export function RoleGrid({ cards }: { cards: RoleCard[] }) {
  return (
    <div className="role-grid">
      {cards.map((card) => (
        <Link
          key={card.title}
          className="role-card"
          href={card.href}
          style={{ "--accent": card.accent } as CSSProperties & { "--accent": string }}
        >
          <div className="role-card-top">
            <span>{card.title}</span>
            <span aria-hidden="true">→</span>
          </div>
          <p>{card.description}</p>
          <div className="role-card-footer">{card.footer}</div>
        </Link>
      ))}
    </div>
  );
}
