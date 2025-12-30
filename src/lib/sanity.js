import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { validateEnvVariables } from './constants'

// Validate environment variables on initialization
if (typeof window === 'undefined') {
  validateEnvVariables()
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u61r0dqj',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Optional: for authenticated requests
})

// Helper function for generating image URLs
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Query helper
export async function sanityFetch({ query, params = {} }) {
  return await client.fetch(query, params)
}
