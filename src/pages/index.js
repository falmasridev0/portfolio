import AnimatedText from "@/components/AnimatedText";
import { HireMe } from "@/components/HireMe";
import { LinkArrow, GithubIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import lightBulb from "../../public/images/svgs/miscellaneous_icons_1.svg";
import profilePic from "../../public/images/profile/developer-pic-1.png";
import profile from "../../public/images/profile/developer-pic-2.jpeg";
import TransitionEffect from "@/components/TransitionEffect";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import { getAllProjects, getAllArticles, getAllExperience, getAllEducation, getAllSkills, getAboutData } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import { motion } from "framer-motion";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, isValidElement } from "react";
import { REVALIDATE_TIME } from "@/lib/constants";

const FramerImage = motion(Image);

// Animated Number Component
function AnimatedNumberFramerMotion({ value }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current && latest.toFixed(0) <= value) {
          ref.current.textContent = latest.toFixed(0);
        }
      }),
    [springValue, value]
  );

  return <span ref={ref} />;
}

// YouTube helper
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${shortsMatch[1]}`;
  }
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  const videoId = watchMatch?.[1] || shortMatch?.[1];
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
  }
  return null;
};

// Render media
const renderMedia = (media, altText, isVideo, autoplay = false) => {
  if (!media) return <div className="flex h-auto w-full items-center justify-center bg-gray-200 dark:bg-gray-700" style={{minHeight: '300px'}}><span className="text-gray-400">No image available</span></div>;
  
  const youtubeEmbedUrl = typeof media === 'string' ? getYouTubeEmbedUrl(media) : null;
  if (youtubeEmbedUrl) {
    return (
      <div className="relative h-auto w-full" style={{paddingBottom: '56.25%'}}>
        <iframe src={youtubeEmbedUrl} className="absolute top-0 left-0 h-full w-full rounded-lg" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={altText || 'YouTube video'} />
      </div>
    );
  }
  
  if (isVideo || (typeof media === 'string' && (media.endsWith('.mp4') || media.endsWith('.webm')))) {
    return <video src={media} controls autoPlay={autoplay} muted={autoplay} loop={autoplay} playsInline className="h-auto w-full rounded-lg">Your browser does not support the video tag.</video>;
  }
  
  return <Image src={media} className="h-auto w-full rounded-lg" alt={altText || 'Project image'} width={800} height={500} />;
};

// Project Component
const ProjectCard = ({ project }) => {
  const mediaUrl = project.videoUrl || (project.image ? urlFor(project.image).width(1200).height(700).url() : null);
  const isVideo = !!project.videoUrl;
  const isFullWidth = project.displaySize === 'full';
  
  return (
    <div className={isFullWidth ? "col-span-12" : "col-span-6 sm:col-span-12"}>
      <article className="card-hover glow-hover relative flex w-full flex-col items-center justify-center rounded-2xl border border-solid border-dark bg-light p-6 shadow-xl dark:border-light dark:bg-dark group">
        <div className="absolute top-0 -right-3 -z-10 h-[103%] w-[102%] rounded-[2rem] bg-gradient-to-br from-primary/20 to-primaryDark/20 dark:from-primaryDark/20 dark:to-primary/20 group-hover:from-primary/30 group-hover:to-primaryDark/30 transition-all duration-300" />
        <div className="w-full overflow-hidden rounded-lg relative">
          {project.category && (
            <div className="absolute top-4 left-4 z-10">
              <span className="category-badge">{project.category}</span>
            </div>
          )}
          <div className="transform transition-transform duration-300 group-hover:scale-105">
            {renderMedia(mediaUrl, project.title, isVideo, project.autoplayVideo)}
          </div>
        </div>
        <div className="mt-4 flex w-full flex-col items-start justify-between">
          <span className="text-lg font-semibold gradient-text">{project.type || 'Project'}</span>
          <h2 className="my-2 w-full text-left text-3xl font-bold group-hover:text-primary dark:group-hover:text-primaryDark transition-colors duration-300">{project.title}</h2>
          {isFullWidth && project.summary && <p className="my-2 text-dark/80 dark:text-light/80 leading-relaxed">{project.summary}</p>}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 my-3">
              {project.technologies.slice(0, 5).map((tech, idx) => (
                <span key={idx} className="tech-badge">{tech}</span>
              ))}
            </div>
          )}
          <div className="flex w-full items-center justify-between mt-2">
            {project.link && (
              <Link href={project.link} target="_blank" className="rounded-lg bg-primary hover:bg-primaryDark dark:bg-primaryDark dark:hover:bg-primary text-white px-4 py-2 text-sm font-semibold transition-all duration-300 hover:shadow-lg">
                Visit Project
              </Link>
            )}
            {project.github && (
              <Link href={project.github} target="_blank" className="w-8 hover:text-primary dark:hover:text-primaryDark transition-colors duration-300">
                <GithubIcon />
              </Link>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

// Article Card
const ArticleCard = ({ article }) => {
  return (
    <div className="col-span-6 sm:col-span-12">
      <article className="card-hover glow-hover relative flex w-full flex-col items-center justify-center rounded-2xl border border-solid border-dark bg-light p-6 shadow-xl dark:border-light dark:bg-dark group">
        <div className="absolute top-0 -right-3 -z-10 h-[103%] w-[102%] rounded-[2rem] bg-gradient-to-br from-primary/20 to-primaryDark/20 dark:from-primaryDark/20 dark:to-primary/20 group-hover:from-primary/30 group-hover:to-primaryDark/30 transition-all duration-300" />
        {article.coverImage && (
          <div className="w-full overflow-hidden rounded-lg mb-4 relative">
            {article.category && (
              <div className="absolute top-4 left-4 z-10">
                <span className="category-badge">{article.category}</span>
              </div>
            )}
            <div className="transform transition-transform duration-300 group-hover:scale-105">
              <Image src={urlFor(article.coverImage).width(800).height(500).url()} className="h-auto w-full" alt={article.title} width={800} height={500} />
            </div>
          </div>
        )}
        <div className="flex w-full flex-col items-start">
          <h2 className="my-2 text-2xl font-bold group-hover:text-primary dark:group-hover:text-primaryDark transition-colors duration-300">{article.title}</h2>
          {article.excerpt && <p className="text-sm text-dark/75 dark:text-light/75 leading-relaxed">{article.excerpt}</p>}
          {article.externalLink && (
            <Link 
              href={article.externalLink} 
              target="_blank" 
              className="inline-flex items-center gap-2 mt-4 rounded-lg bg-primary hover:bg-primaryDark dark:bg-primaryDark dark:hover:bg-primary text-white px-4 py-2 text-sm font-semibold transition-all duration-300 hover:shadow-lg group/link"
            >
              Read Article
              <span className="transform transition-transform duration-300 group-hover/link:translate-x-1">→</span>
            </Link>
          )}
        </div>
      </article>
    </div>
  );
};

export default function Home({ projects, articles, experiences, education, skills, yearsOfExperience, about }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{about?.name || 'Faisal Almasri'} | {about?.title || 'Computer Vision Engineer'}</title>
        <meta name="description" content={about?.heroDescription || 'Crafting intelligent systems with computer vision, deep learning, and real-time AI.'} />
        <meta property="og:title" content={`${about?.name || 'Faisal Almasri'} | ${about?.title || 'Computer Vision Engineer'}`} />
        <meta property="og:description" content={about?.heroDescription || 'Crafting intelligent systems with computer vision, deep learning, and real-time AI.'} />
        <meta property="og:image" content="https://www.faisense.com/images/profile/developer-pic-1.png" />
        <meta property="og:url" content="https://www.faisense.com" />
        <meta property="og:type" content="website" />
      </Head>

      <TransitionEffect />
      
      {/* Hero Section */}
      <section id="home" className="relative flex min-h-screen items-center text-dark dark:text-light">
        <Layout className="!pt-0 md:!pt-16 sm:!pt-16">
          <div className="flex w-full items-start justify-between md:flex-col">
            <div className="w-1/2 md:w-full">
              <Image src={profilePic} alt="Faisal Almasri" className="h-auto w-full" sizes="100vw" priority />
            </div>
            <div className="flex w-1/2 flex-col items-center self-center lg:w-full lg:text-center">
              <AnimatedText text={about?.heroTitle || "Innovating with Computer Vision, Empowering the Future"} className="!text-left !text-6xl xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl" />
              <p className="my-4 text-base font-medium md:text-sm sm:!text-xs">
                <span className="gradient-text font-bold">{about?.name || 'Faisal Almasri'}</span> | {about?.heroDescription || 'Computer Vision Engineer specializing in deep learning and real-time AI deployment. Advancing machine perception through innovation and precision.'}
              </p>
              <div className="mt-2 flex items-center self-start lg:self-center">
                <Link href={about?.resumeUrl || "/resume.pdf"} target="_blank" className="glow flex items-center rounded-lg border-2 border-solid bg-dark p-2.5 px-6 text-lg font-semibold capitalize text-light hover:border-dark hover:bg-transparent hover:text-dark dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light md:p-2 md:px-4 md:text-base transition-all duration-300" download>
                  Resume <LinkArrow className="ml-1 !w-6 md:!w-4" />
                </Link>
                <Link href={`mailto:${about?.email || 'falmasri.ai@gmail.com'}`} className="ml-4 text-lg font-medium capitalize text-dark underline dark:text-light md:text-base hover:text-primary dark:hover:text-primaryDark transition-colors duration-300">Email</Link>
              </div>
            </div>
          </div>
        </Layout>
        <HireMe />
        <div className="absolute right-8 bottom-8 inline-block w-24 md:hidden">
          <Image className="relative h-auto w-full" src={lightBulb} alt="Faisal Almasri" />
        </div>
        {/* Scroll Indicator */}
        <a href="#about" className="scroll-indicator absolute left-1/2 bottom-8 -translate-x-1/2 md:hidden">
          <div className="w-6 h-10 border-2 border-dark dark:border-light rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-dark dark:bg-light rounded-full animate-bounce"></div>
          </div>
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="section-alt flex w-full flex-col items-center justify-center py-32 dark:text-light">
        <Layout className="pt-16">
          <AnimatedText text={about?.aboutSectionTitle || "Passion Fuels Purpose!"} className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8" />
          <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
            <div className="col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">BIOGRAPHY</h2>
              {about?.biographyParagraph1 && (
                <p className="font-medium">{about.biographyParagraph1}</p>
              )}
              {about?.biographyQuote && (
                <p className="my-4 font-medium"><em>{about.biographyQuote}</em></p>
              )}
              {about?.biographyParagraph2 && (
                <p className="font-medium">{about.biographyParagraph2}</p>
              )}
            </div>
            <div className="relative col-span-3 h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:border-light dark:bg-dark xl:col-span-4 md:col-span-8 md:order-1">
              <div className="absolute top-0 -right-3 -z-10 h-[103%] w-[102%] rounded-[2rem] bg-dark dark:bg-light" />
              <Image className="h-auto w-full rounded-2xl" src={profile} alt="Faisal Almasri" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority />
            </div>
            <div className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3">
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumberFramerMotion value={projects.length} />+
                </span>
                <h2 className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  Projects Completed
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumberFramerMotion value={yearsOfExperience} />+
                </span>
                <h2 className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  Years of Experience
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumberFramerMotion value={articles.length} />+
                </span>
                <h2 className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  Articles Written
                </h2>
              </div>
            </div>
          </div>
          <Skills skills={skills} />
          <Experience experiences={experiences} />
          <Education education={education} />
        </Layout>
      </section>

      {/* Projects Section */}
      <section id="projects" className="flex w-full flex-col items-center justify-center py-32 dark:text-light">
        <Layout className="pt-16">
          <AnimatedText text="Imagination Trumps Knowledge!" className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl" />
          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            {projects.map((project) => <ProjectCard key={project._id} project={project} />)}
          </div>
        </Layout>
      </section>

      {/* Articles Section */}
      {articles && articles.length > 0 && (
        <section id="articles" className="section-alt flex w-full flex-col items-center justify-center py-32 dark:text-light">
          <Layout className="pt-16">
            <AnimatedText text="Words Can Change the World!" className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl" />
            <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
              {articles.map((article) => <ArticleCard key={article._id} article={article} />)}
            </div>
          </Layout>
        </section>
      )}
    </>
  );
}

export async function getStaticProps() {
  const projects = await getAllProjects();
  const articles = await getAllArticles();
  const experiences = await getAllExperience();
  const education = await getAllEducation();
  const skills = await getAllSkills();
  const about = await getAboutData();
  
  // Calculate years of experience from the earliest start date
  let yearsOfExperience = 1; // Default fallback
  if (experiences && experiences.length > 0) {
    const startDates = experiences
      .map(exp => new Date(exp.startDate))
      .filter(date => !isNaN(date.getTime()));
    
    if (startDates.length > 0) {
      const earliestDate = new Date(Math.min(...startDates));
      const now = new Date();
      const diffInYears = (now - earliestDate) / (1000 * 60 * 60 * 24 * 365.25);
      yearsOfExperience = Math.floor(diffInYears);
    }
  }
  
  return {
    props: {
      projects: projects || [],
      articles: articles || [],
      experiences: experiences || [],
      education: education || [],
      skills: skills || [],
      about: about || null,
      yearsOfExperience,
    },
    revalidate: REVALIDATE_TIME,
  };
}
