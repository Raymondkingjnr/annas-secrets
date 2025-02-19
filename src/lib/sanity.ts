import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_STUDIO_TOKEN,
  apiVersion: "2021-10-21",
  stega: {
    studioUrl: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/studio`
      : `${process.env.NEXT_PUBLIC_BASE_UR}/studio`,
  },
});

// export default sanityClient;
