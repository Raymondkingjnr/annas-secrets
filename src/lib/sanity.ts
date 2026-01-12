import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_STUDIO_TOKEN,
  apiVersion: "2021-10-21",
  stega: {
    studioUrl:
      process.env.VERCEL_URL ?
        `https://${process.env.VERCEL_URL}/studio`
      : `${process.env.NEXT_PUBLIC_BASE_UR}/studio`,
  },
});

// const boostersId = "0cd5a9d3-34c9-4476-b7fa-5f010019276a";

// async function deleteAllReferences() {
//   try {
//     const referencingDocs = await client.fetch(
//       `*[references("${boostersId}")]._id`
//     );

//     console.log(
//       `Found ${referencingDocs.length} documents referencing boosters:`
//     );
//     console.log(referencingDocs);

//     for (const docId of referencingDocs) {
//       await client.delete(docId);
//       console.log(`Deleted: ${docId}`);
//     }

//     console.log("\nAll referencing documents deleted");

//     await client.delete(boostersId);
//     console.log("Boosters category deleted successfully!");
//   } catch (err) {
//     console.error("Error:", err.message || "");
//   }
// }

// deleteAllReferences();
