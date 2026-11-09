/** Section title: small label, headline, and an optional right-aligned note. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  aside,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  aside?: string;
}) {
  return (
    <div className="container-bleed flex items-end justify-between gap-6 pb-8 md:pb-10">
      <div className="flex flex-col gap-2">
        <p className="eyebrow text-muted-foreground">{eyebrow}</p>
        <h2 id={id} className="text-headline">
          {title}
        </h2>
      </div>
      {aside && <p className="shrink-0 pb-1 text-muted-foreground">{aside}</p>}
    </div>
  );
}
