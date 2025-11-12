"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarNavItem {
  href: string;
  label: string;
  description?: string;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
}

const isActivePath = (pathname: string, href: string) => {
  if (href === "/dashboard") {
    return pathname === href;
  }
  return pathname.startsWith(href);
};

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "flex flex-col rounded-2xl border px-4 py-3 transition",
              active
                ? "border-accent/80 bg-accent/10 text-accent shadow-[0_10px_30px_-20px_rgba(5,150,105,0.4)] [data-theme='dark']:shadow-[0_10px_30px_-20px_rgba(16,185,129,0.8)]"
                : "border-transparent bg-surface text-foreground/80 hover:border-accent/40 hover:bg-surface-hover hover:text-foreground",
            ].join(" ")}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.18em]">
              {item.label}
            </span>
            {item.description ? (
              <span className="mt-1 text-xs text-muted">{item.description}</span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

