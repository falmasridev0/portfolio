export default function handler(req, res) {
  res.status(200).json({
    hasProjectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    hasDataset: !!process.env.NEXT_PUBLIC_SANITY_DATASET,
    hasApiVersion: !!process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? 'SET' : 'MISSING',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ? 'SET' : 'MISSING',
  })
}
