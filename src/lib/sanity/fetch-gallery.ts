import { EXPERIENCE_IMAGES } from "@/lib/tours";
import { isSanityConfigured, sanityClient } from "@/lib/sanity/client";
import { imageUrl } from "@/lib/sanity/image";
import type { SanityImageSource } from "@sanity/image-url";

export type GalleryImage = {
  src: string;
  alt: string;
};

type SanityGalleryDoc = {
  images?: (SanityImageSource & { alt?: string })[];
};

export async function getHomeGalleryImages(): Promise<GalleryImage[]> {
  if (!isSanityConfigured) {
    return EXPERIENCE_IMAGES.map((src) => ({
      src,
      alt: "Travel experience in Peru",
    }));
  }

  try {
    const doc = await sanityClient.fetch<SanityGalleryDoc | null>(
      `*[_id == "homeGallery"][0]{ images }`,
    );

    const fromSanity =
      doc?.images
        ?.map((image) => {
          const src = imageUrl(image);
          if (!src) return null;
          return {
            src,
            alt: image.alt?.trim() || "Travel experience in Peru",
          };
        })
        .filter((image): image is GalleryImage => Boolean(image)) ?? [];

    if (fromSanity.length > 0) return fromSanity;
  } catch (error) {
    console.error("[home-gallery]", error);
  }

  return EXPERIENCE_IMAGES.map((src) => ({
    src,
    alt: "Travel experience in Peru",
  }));
}
