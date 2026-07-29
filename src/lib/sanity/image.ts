import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient, sanityDataset, sanityProjectId } from "./client";

const builder = createImageUrlBuilder({
  projectId: sanityProjectId || "placeholder",
  dataset: sanityDataset,
});

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format").quality(85);
}

export function imageUrl(source: SanityImageSource | undefined | null) {
  if (!source) return null;
  return urlForImage(source).width(1600).url();
}
