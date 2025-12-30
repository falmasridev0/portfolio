import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SANITY_CONFIG, validateEnvVariables } from './constants'

// Validate environment variables on initialization
if (typeof window === 'undefined') {
  validateEnvVariables()
}

export const client = createClient({
  projectId: SANITY_CONFIG.projectId,
  dataset: SANITY_CONFIG.dataset,
  useCdn: SANITY_CONFIG.useCdn,
  apiVersion: SANITY_CONFIG.apiVersion,
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
