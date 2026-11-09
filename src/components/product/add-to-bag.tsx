"use client";

import { useState } from "react";

/**
 * Primary purchase action. There is no cart yet, so this only confirms
 * the click; wire it to the cart once one exists.
 */
export function AddToBag({ soldOut }: { soldOut: boolean }) {
  const [added, setAdded] = useState(false);

  if (soldOut) {
    return (
      <button type="button" className="btn btn-secondary btn-block" aria-disabled="true">
        Sold out
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setAdded(true)}
        className="btn btn-primary btn-block"
      >
        {added ? "Added to bag" : "Add to bag"}
      </button>
      <p aria-live="polite" className="text-caption text-muted-foreground">
        {added ? "The bag and checkout aren't available yet." : null}
      </p>
    </div>
  );
}
