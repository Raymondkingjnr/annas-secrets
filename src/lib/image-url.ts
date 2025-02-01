import ImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./sanity";

const builder = ImageUrlBuilder(client);

export function imageUrl(source: SanityImageSource) {
  return builder.image(source);
}
