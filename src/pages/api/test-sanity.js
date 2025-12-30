import { getAllExperience, getAllEducation, getAllSkills, getAboutData } from '../../lib/queries'

export default async function handler(req, res) {
  try {
    const [experiences, education, skills, about] = await Promise.all([
      getAllExperience(),
      getAllEducation(),
      getAllSkills(),
      getAboutData(),
    ])

    res.status(200).json({
      success: true,
      data: {
        experiencesCount: experiences?.length || 0,
        educationCount: education?.length || 0,
        skillsCount: skills?.length || 0,
        hasAbout: !!about,
        experiences: experiences?.slice(0, 1) || [],
        skills: skills?.slice(0, 2) || [],
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
