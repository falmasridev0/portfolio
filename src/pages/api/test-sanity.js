import { client } from '../../lib/sanity'

export default async function handler(req, res) {
  try {
    // Test 1: Check client config
    const config = {
      projectId: client.config().projectId,
      dataset: client.config().dataset,
      apiVersion: client.config().apiVersion,
    }

    // Test 2: Try a simple direct query
    const skillsQuery = `*[_type == "skill"][0..2]{ _id, name }`
    const skills = await client.fetch(skillsQuery)

    const experienceQuery = `*[_type == "experience"][0..1]{ _id, company }`
    const experiences = await client.fetch(experienceQuery)

    const aboutQuery = `*[_type == "about"][0]{ _id, name }`
    const about = await client.fetch(aboutQuery)

    res.status(200).json({
      success: true,
      clientConfig: config,
      directQueries: {
        skills: skills || [],
        experiences: experiences || [],
        about: about || null,
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
    })
  }
}
