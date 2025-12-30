// Site Configuration
export const SITE_CONFIG = {
  name: 'Faisal Almasri',
  title: 'Computer Vision Engineer',
  url: 'https://www.faisense.com',
  email: 'falmasri.ai@gmail.com',
  description: 'Crafting intelligent systems with computer vision, deep learning, and real-time AI.',
  whatsappLink: 'https://wa.me/qr/FSS3SLWXZBEYH1',
  social: {
    github: 'https://github.com/falmasridev0',
    linkedin: 'https://www.linkedin.com/in/faisalalmasricv/',
  },
}

// Sanity Configuration
export const SANITY_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
}

// Validate required environment variables
export function validateEnvVariables() {
  const required = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
  ]

  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    )
  }
}

// Revalidation time for ISR (in seconds)
export const REVALIDATE_TIME = 60

// Animation durations
export const ANIMATION = {
  pageTransition: 0.5,
  hoverScale: 1.05,
  springDuration: 1.5,
}
