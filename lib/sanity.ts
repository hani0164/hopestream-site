import { createClient } from '@sanity/client';

/**
 * Initialise a Sanity client. This client is configured with your project
 * ID and dataset and can be used in both client and server code. When
 * `useCdn` is true the client will fetch from Sanity’s CDN for faster
 * performance but may return cached data; set it to `false` for
 * up‑to‑date previews.
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-04',
  useCdn: false,
});

/**
 * Fetch the latest published episodes from Sanity. You can customise this
 * GROQ query to match your schema. The returned objects include the
 * episode title, description, video URL and published date.
 */
export async function getEpisodes() {
  try {
    const query = `*[_type == "episode"]|order(publishedAt desc){
      _id,
      title,
      description,
      videoUrl,
      publishedAt
    }`;
    const episodes = await sanityClient.fetch(query);
    return episodes;
  } catch (err) {
    console.error('Error fetching episodes from Sanity:', err);
    return [];
  }
}
