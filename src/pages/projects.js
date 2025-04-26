import AnimatedText from "@/components/AnimatedText";
import { GithubIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import proj2 from "../../public/images/projects/noon_product_analyzer.png";
import proj3 from "../../public/images/projects/face2.png";
import proj4 from "../../public/images/projects/data_montage.jpg";
import proj5 from "../../public/images/projects/agency-website-cover-image.jpg";
import proj6 from "../../public/images/projects/devdreaming.jpg";
import TransitionEffect from "@/components/TransitionEffect";
import { isValidElement } from "react";

const FramerImage = motion(Image);

const FeaturedProject = ({ type, title, summary, img, link, github }) => {
  // Check if img is a React element (JSX) or an image source
  const isJSXElement = isValidElement(img);

  return (
    <article
      className="relative flex w-full items-center justify-between rounded-3xl rounded-br-2xl border
      border-solid border-dark bg-light p-12 shadow-2xl dark:border-light dark:bg-dark lg:flex-col 
      lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
    >
      <div
        className="absolute top-0 -right-3 -z-10 h-[103%] w-[101%] rounded-[2.5rem] rounded-br-3xl bg-dark
         dark:bg-light xs:-right-2 xs:h-[102%] xs:w-[100%] xs:rounded-[1.5rem]"
      />

      {link ? (
        <Link
          href={link}
          target={"_blank"}
          className="w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full"
        >
          {renderMedia(isJSXElement, img, title)}
        </Link>
      ) : (
        <div className="w-1/2 overflow-hidden rounded-lg lg:w-full">
          {renderMedia(isJSXElement, img, title)}
        </div>
      )}
      
      <div className="flex w-1/2 flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <span className="text-xl font-medium text-primary dark:text-primaryDark xs:text-base">
          {type}
        </span>
        {link ? (
          <Link
            href={link}
            target={"_blank"}
            className="underline-offset-2 hover:underline"
          >
            <h2 className="my-2 w-full text-left text-4xl font-bold lg:text-3xl xs:text-2xl">
              {title}
            </h2>
          </Link>
        ) : (
          <h2 className="my-2 w-full text-left text-4xl font-bold lg:text-3xl xs:text-2xl">
            {title}
          </h2>
        )}
        <p className="my-2 rounded-md font-medium text-dark dark:text-light sm:text-sm">
          {summary}
        </p>
        <div className="mt-2 flex items-center">
          {github && (
            <Link
              href={github}
              target={"_blank"}
              className="w-10"
              aria-label={`${title} github link`}
            >
              <GithubIcon />
            </Link>
          )}
          {link && (
            <Link
              href={link}
              target={"_blank"}
              className={`${github ? "ml-4" : ""} rounded-lg bg-dark p-2 px-6 text-lg font-semibold text-light dark:bg-light dark:text-dark sm:px-4 sm:text-base`}
              aria-label={title}
            >
              Visit Project
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

const Project = ({ title, type, img, link, github }) => {
  // Check if img is a React element (JSX) or an image source
  const isJSXElement = isValidElement(img);

  return (
    <article
      className="relative flex w-full flex-col items-center justify-center rounded-2xl rounded-br-2xl 
      border border-solid border-dark bg-light p-6 shadow-2xl dark:border-light dark:bg-dark xs:p-4"
    >
      <div
        className="absolute top-0 -right-3 -z-10 h-[103%] w-[102%] rounded-[2rem] rounded-br-3xl bg-dark
         dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]"
      />

      {link ? (
        <Link
          href={link}
          target={"_blank"}
          className="w-full cursor-pointer overflow-hidden rounded-lg"
        >
          {renderMedia(isJSXElement, img, title)}
        </Link>
      ) : (
        <div className="w-full overflow-hidden rounded-lg">
          {renderMedia(isJSXElement, img, title)}
        </div>
      )}
      
      <div className="mt-4 flex w-full flex-col items-start justify-between">
        <span className="text-xl font-medium text-primary dark:text-primaryDark lg:text-lg md:text-base">
          {type}
        </span>

        {link ? (
          <Link
            href={link}
            target={"_blank"}
            className="underline-offset-2 hover:underline"
          >
            <h2 className="my-2 w-full text-left text-3xl font-bold lg:text-2xl">
              {title}
            </h2>
          </Link>
        ) : (
          <h2 className="my-2 w-full text-left text-3xl font-bold lg:text-2xl">
            {title}
          </h2>
        )}
        
        <div className="flex w-full items-center justify-between">
          {link && (
            <Link
              href={link}
              target={"_blank"}
              className="rounded text-lg font-medium underline md:text-base"
              aria-label={title}
            >
              Visit
            </Link>
          )}
          {github && (
            <Link
              href={github}
              target={"_blank"}
              className={`w-8 md:w-6 ${!link ? "ml-auto" : ""}`}
              aria-label={title}
            >
              <GithubIcon />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

// Helper function to render media (image or JSX element)
const renderMedia = (isJSXElement, media, altText) => {
  if (isJSXElement) {
    return (
      <motion.div
        className="h-auto w-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {media}
      </motion.div>
    );
  } else {
    return (
      <FramerImage
        src={media}
        className="h-auto w-full"
        alt={altText}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
    );
  }
};

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects Page</title>
        <meta
          name="description"
          content="Faisal Almasri | Crafting intelligent systems with computer vision, deep learning, and real-time AI. Pioneering projects that push the boundaries of machine perception and shape the future"
        />
      </Head>

      <TransitionEffect />
      <main
        className={`mb-16 flex w-full flex-col items-center justify-center dark:text-light`}
      >
        <Layout className="pt-16">
          <AnimatedText
            text="Imagination Trumps Knowledge!"
            className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <FeaturedProject
                type="Top Project"
                title="Eagle-Eye: AI Driven System For Detecting Drones In Real-Time"
                summary="A cutting-edge AI system utilizing computer vision and deep learning for real-time drone detection and tracking. Eagle-Eye provides enhanced security and surveillance capabilities for critical infrastructure protection."
                img={<video src="/eagle_eye.mp4" controls className="h-auto w-full"></video>}

              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                type="Sentiment Analysis"
                title="Analyzing clients reviews with bert"
                img={proj2}
                github="https://github.com/falmasridev0/noon-product-analyzer/tree/main"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                type="Face Detection"
                title="Real-Time Face Blurring With Virtual Camera"
                img={proj3}
                github="https://github.com/falmasridev0/face_blurring/blob/main/main.py"
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                type="Object Segmentation"
                title="Semantic Segmentation using deepLabV3+ with dice loss function"
                summary="DeepLabV3+ is used for semantic segmentation to accurately separate objects in images. Dice Loss is applied to improve performance, especially when classes are imbalanced."
                img={proj4}
                github="https://github.com/falmasridev0/semantic_segmentation/tree/master"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">

            </div>
            <div className="col-span-6 sm:col-span-12">

            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}