import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container-bleed grid h-header grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="wordmark md:col-start-2">
          {siteConfig.name}
        </Link>
        <nav className="flex justify-end gap-6 md:col-start-3">
          {siteConfig.nav.map((item) => (
            <Link key={item.label} href={item.href} className="eyebrow">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
