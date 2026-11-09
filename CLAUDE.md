# CLAUDE.md

@AGENTS.md

## Checking work

- `npx tsc --noEmit` type-checks without a full build; `npm run lint` runs ESLint.
- There is no test runner yet.

## Next.js 16.4 / React 19.3

These are newer than most training data. Bundled docs live in `node_modules/next/dist/docs/01-app/` (`02-guides/`, `03-api-reference/`).

`next.config.ts` enables two flags that change how pages must be written:

- **`cacheComponents: true`**: data fetching is dynamic by default. Opt into caching with the `use cache` directive plus `cacheLife` / `cacheTag`. With Partial Prerendering, uncached or runtime data (including awaiting `params`) must be either cached or rendered inside `<Suspense>`. Synchronous IO such as `Date.now()`, `Math.random()`, or `crypto.randomUUID()` in the prerendered shell fails the build; move it behind `<Suspense>` + `connection()` or into a Client Component. Legacy route segment configs (`dynamic`, `revalidate`, `fetchCache`, `dynamicParams`, `runtime`) are replaced; see `02-guides/migrating-to-cache-components.md`. Navigations hide previous routes with `<Activity>` instead of unmounting them, so component state persists and effects re-run on show/hide.
- **`partialPrefetching: true`**: `<Link>` prefetches one shared shell per route. URL-specific content (`params`, `searchParams`) resolves after navigation unless the link sets `prefetch={true}`.

Type route props with the generated global helpers (`PageProps<"/route">`, `LayoutProps<"/">`), not hand-written types.

## Database (PostgreSQL + Drizzle)

- Only `src/lib/products.ts` queries the database; pages and components call its helpers, never `db` directly. Every read uses `"use cache"` with `cacheTag("catalog")`, so pages stay in the prerendered shell. Any future write must call `revalidateTag("catalog")`.
- Schema changes: edit `src/db/schema.ts`, run `npm run db:generate`, commit the SQL in `drizzle/`, then `npm run db:migrate`. Never use `drizzle-kit push`; the database is hosted and shared.
- `npm run db:seed` truncates the catalog tables before inserting. Don't run it against a database with real data.
- `next build` queries the database (`generateStaticParams`), so it needs `DATABASE_URL` set and the database migrated and seeded.
- Sold-out and low-stock rules live in `src/lib/stock.ts`, not in the database.
- Scope is products, categories and stock only. Ask before adding carts, orders, variants or similar tables.

## Conventions

- **Prices are integers in cents.** Render them with `formatPrice()` from `src/lib/utils.ts`.
- Store name, description, and nav links come from `siteConfig` in `src/lib/site.ts`. Don't hard-code them.
- Compose class names with `cn()` from `src/lib/utils.ts`.
- Tailwind v4 is loaded through a Turbopack loader rule in `next.config.ts`. There is no PostCSS config or `tailwind.config` file, and none should be added.
- Use the theme tokens (`bg-background`, `text-foreground`, `bg-surface`, `text-muted-foreground`, opacity modifiers like `text-foreground/70`) instead of hard-coded colors, so dark mode keeps working. Prefer the design-system utilities in `src/app/globals.css` (`container-page`, `product-grid`, `media-frame`, `eyebrow`, `btn btn-primary`, `link`, …) over re-composing them inline.
- Any new `@theme` token (text size, color, spacing, container) must also be added to the `extendTailwindMerge` config in `src/lib/utils.ts`. Otherwise `cn()` can drop it: for example, `text-label` gets read as a color and removed by `text-muted-foreground`.
