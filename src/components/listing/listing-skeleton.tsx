/** Placeholder shown while search-param-dependent results stream in. */
export function ListingSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="container-bleed flex justify-between py-4">
        <div className="h-5 w-40 bg-surface" />
        <div className="h-5 w-28 bg-surface" />
      </div>
      <div className="product-grid">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i}>
            <div className="media-frame" />
            <div className="card-body pb-8">
              <div className="h-4" />
              <div className="h-4 w-3/4 bg-surface" />
              <div className="h-4 w-1/4 bg-surface" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
