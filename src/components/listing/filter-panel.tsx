"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, type FormEvent } from "react";
import {
  COLOR_OPTIONS,
  PRICE_RANGES,
  SORT_OPTIONS,
  type ListingQuery,
} from "@/lib/listing";

export const FILTER_PANEL_ID = "listing-filters";

/**
 * Side sheet with sort and filter controls. It's a native popover: any
 * button with `popoverTarget={FILTER_PANEL_ID}` opens it, and Escape or a
 * click outside closes it. Submitting writes the choices to the URL.
 */
export function FilterPanel({
  basePath,
  query,
}: {
  basePath: string;
  query: ListingQuery;
}) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);

  function close() {
    panelRef.current?.hidePopover();
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    // Omit defaults so URLs stay clean.
    const sort = data.get("sort");
    if (sort && sort !== "recommended") params.set("sort", String(sort));
    for (const color of data.getAll("color")) params.append("color", String(color));
    const price = data.get("price");
    if (price) params.set("price", String(price));

    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
    close();
  }

  return (
    <div
      ref={panelRef}
      id={FILTER_PANEL_ID}
      popover="auto"
      aria-label="Filter and sort"
      className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-md border-l bg-background p-0 text-foreground backdrop:bg-black/30"
    >
      {/* Re-mount the form when the URL changes so defaults match it. */}
      <form
        key={JSON.stringify(query)}
        action={basePath}
        method="get"
        onSubmit={onSubmit}
        className="flex h-full flex-col"
      >
        <div className="flex h-header shrink-0 items-center justify-between border-b px-6">
          <h2 className="eyebrow">Filter and sort</h2>
          <button
            type="button"
            popoverTarget={FILTER_PANEL_ID}
            popoverTargetAction="hide"
            className="link"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          <Fieldset legend="Sort by">
            {SORT_OPTIONS.map((option) => (
              <Choice
                key={option.value}
                type="radio"
                name="sort"
                value={option.value}
                defaultChecked={query.sort === option.value}
                label={option.label}
              />
            ))}
          </Fieldset>

          <Fieldset legend="Color">
            <div className="grid grid-cols-2 gap-x-6">
              {COLOR_OPTIONS.map((color) => (
                <Choice
                  key={color.value}
                  type="checkbox"
                  name="color"
                  value={color.value}
                  defaultChecked={query.colors.includes(color.value)}
                  label={color.label}
                  swatch={color.swatch}
                />
              ))}
            </div>
          </Fieldset>

          <Fieldset legend="Price">
            <Choice
              type="radio"
              name="price"
              value=""
              defaultChecked={query.price === null}
              label="Any price"
            />
            {PRICE_RANGES.map((range) => (
              <Choice
                key={range.value}
                type="radio"
                name="price"
                value={range.value}
                defaultChecked={query.price === range.value}
                label={range.label}
              />
            ))}
          </Fieldset>
        </div>

        <div className="flex shrink-0 items-center gap-6 border-t px-6 py-4">
          <Link href={basePath} scroll={false} onClick={close} className="link shrink-0">
            Clear all
          </Link>
          <button type="submit" className="btn btn-primary btn-block">
            Show results
          </button>
        </div>
      </form>
    </div>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-b py-6 last:border-b-0">
      <legend className="eyebrow float-left mb-3 w-full">{legend}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

function Choice({
  type,
  name,
  value,
  label,
  defaultChecked,
  swatch,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  label: string;
  defaultChecked: boolean;
  swatch?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-2">
      <input
        type={type}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className={
          "peer size-4 shrink-0 cursor-pointer appearance-none border border-foreground/40 transition-colors checked:border-foreground checked:bg-foreground " +
          (type === "radio"
            ? "rounded-full checked:shadow-[inset_0_0_0_3px_var(--color-background)]"
            : "")
        }
      />
      {swatch && (
        <span
          aria-hidden
          className="size-3 shrink-0 rounded-full border border-foreground/15"
          style={{ background: swatch }}
        />
      )}
      <span className="text-muted-foreground transition-colors peer-checked:text-foreground">
        {label}
      </span>
    </label>
  );
}
