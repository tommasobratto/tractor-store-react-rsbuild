import * as React from "react";
import { src, srcset } from "../utils/utils";

export default function StoreDisplay({ store }: { store: { id: string; name: string; street: string; city: string; image: string; } | undefined }) {
  if (!store) return <></>

  return (
    <div className="e_StorePicker_content">
      <img
        className="e_StorePicker_image"
        src={src(store.image, 200)}
        srcSet={srcset(store.image, [200, 400])}
        width="200"
        height="200"
      />
      <p className="e_StorePicker_address">
        {store.name}
        <br />
        {store.street}
        <br />
        {store.city}
      </p>
    </div>
  );
}