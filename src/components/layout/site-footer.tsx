import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-page flex flex-col gap-10 py-16 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4">
          <span className="wordmark">{siteConfig.name}</span>
          <p className="max-w-prose opacity-70">{siteConfig.description}</p>
        </div>
        <nav className="flex gap-6">
          {siteConfig.nav.map((item) => (
            <Link key={item.label} href={item.href} className="link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="container-page border-t border-background/15 py-6 text-caption opacity-60">
        © {siteConfig.name}
      </div>
    </footer>
  );
}
