import { sanityFetch } from './sanity'

// Fetch all projects
export async function getAllProjects() {
  const query = `*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    type,
    category,
    status,
    summary,
    image,
    videoUrl,
    autoplayVideo,
    displaySize,
    technologies,
    link,
    github,
    featured,
    priority,
    publishedAt
  }`
  
  try {
    const result = await sanityFetch({ query })
    return result || []
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching projects:', error)
    }
    return []
  }
}

// Fetch featured projects
export async function getFeaturedProjects() {
  const query = `*[_type == "project" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    type,
    category,
    status,
    summary,
    image,
    videoUrl,
    autoplayVideo,
    displaySize,
    technologies,
    link,
    github,
    priority,
    publishedAt
  }`
  
  return await sanityFetch({ query })
}

// Fetch single project by slug
export async function getProjectBySlug(slug) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    type,
    summary,
    description,
    image,
    technologies,
    link,
    github,
    publishedAt
  }`
  
  return await sanityFetch({ query, params: { slug } })
}

// Fetch all articles
export async function getAllArticles() {
  const query = `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    tags,
    readTime,
    publishedAt,
    "author": author->{
      name,
      image,
      slug
    }
  }`
  
  try {
    const result = await sanityFetch({ query })
    return result || []
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching articles:', error)
    }
    return []
  }
}

// Fetch single article by slug
export async function getArticleBySlug(slug) {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    coverImage,
    tags,
    readTime,
    publishedAt,
    "author": author->{
      name,
      image,
      slug,
      bio
    }
  }`
  
  return await sanityFetch({ query, params: { slug } })
}

// Fetch all authors
export async function getAllAuthors() {
  const query = `*[_type == "author"] {
    _id,
    name,
    slug,
    image,
    bio,
    social
  }`
  
  return await sanityFetch({ query })
}

// Fetch all experience entries
export async function getAllExperience() {
  const query = `*[_type == "experience"] | order(order asc) {
    _id,
    position,
    company,
    companyLink,
    startDate,
    endDate,
    location,
    description,
    order
  }`
  
  try {
    const result = await sanityFetch({ query })
    return result || []
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching experience:', error)
    }
    return []
  }
}

// Fetch all education entries
export async function getAllEducation() {
  const query = `*[_type == "education"] | order(order asc) {
    _id,
    degree,
    institution,
    startYear,
    endYear,
    description,
    order
  }`
  
  try {
    const result = await sanityFetch({ query })
    return result || []
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching education:', error)
    }
    return []
  }
}

// Fetch all skills
export async function getAllSkills() {
  const query = `*[_type == "skill"] | order(order asc) {
    _id,
    name,
    x,
    y,
    isCenter,
    order
  }`
  
  try {
    const result = await sanityFetch({ query })
    return result || []
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching skills:', error)
    }
    return []
  }
}

// Fetch about page data
export async function getAboutData() {
  const query = `*[_type == "about"][0] {
    _id,
    name,
    title,
    heroTitle,
    heroDescription,
    email,
    aboutSectionTitle,
    biographyParagraph1,
    biographyQuote,
    biographyParagraph2,
    resumeUrl
  }`
  
  try {
    const result = await sanityFetch({ query })
    return result || null
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching about data:', error)
    }
    return null
  }
}
