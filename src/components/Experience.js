import React, { useRef } from "react";
import {
  motion,
  useScroll,
} from "framer-motion";
import LiIcon from "./LiIcon";


const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}{" "}
          <a
            className="capitalize text-primary dark:text-primaryDark"
            href={companyLink}
            target={"_blank"}
          >
            @{company}
          </a>
        </h3>
        <span className="capitalize text-dark/75 font-medium dark:text-light/50 xs:text-sm">
          {time} | {address}
        </span>
        <p className="font-medium w-full md:text-sm"> {work}</p>
      </motion.div>
    </li>
  );
};

const Experience = () => {

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (

      <div className="my-64">
        <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
          Experience
        </h2>

        <div ref={ref} className="relative w-[75%] mx-auto lg:w-[90%] md:w-full">
          <motion.div
            className="absolute left-9 top-0 w-[4px] md:w-[2px] md:left-[30px] xs:left-[20px] h-full bg-dark 
            origin-top  dark:bg-primaryDark dark:shadow-3xl"
            style={{ scaleY: scrollYProgress }}
          />
          <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
            <Details
              position="Data Scientist"
              company="Wakeb_data"
              companyLink="https://wakeb.tech/"
              time="Mar 2025 - Present"
              address="Saudi Arabia, Riyadh"
              work="Coop training."
            />

            <Details
              position="Sales Representative"
              company="Jarir Bookstore"
              companyLink="https://www.jarir.com"
              time="May 2023 - Jan 2025"
              address="Saudi Arabia, Riyadh"
              work="(While I was a student) I
              Utilized analytical skills to help customers find the best products, while training and supporting new team members. Applied management updates and promotions accurately, ensuring all processes ran smoothly. Maintained a well-organized and efficient sales area, optimizing the customer experience."
            />

            <Details
              position="Instructor"
              company="Baims"
              companyLink="https://app.baims.com/"
              time="Jun 2022- Feb 2023"
              address="Saudi Arabia, Riyadh"
              work="Created content to explain the CS150 subject, covering programming fundamentals and Java syntax. Actively answered students' questions and conducted live sessions to review key concepts before exams, ensuring thorough understanding."
            />
          </ul>
        </div>
        </div>
    );
};

export default Experience;
