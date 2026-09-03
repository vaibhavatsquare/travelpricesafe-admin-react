import { Suspense } from "react";
import AddVenue from "../../../../src/modules/venue/addVenue";

export default function AddVenuePage() {
  return (
    <Suspense fallback={<div />}>
      <AddVenue />
    </Suspense>
  );
}