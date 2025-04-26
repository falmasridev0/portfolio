import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'


let MotionLink = motion(Link);

const Logo = () => {

  return (
    <div
     className='flex flex-col items-center justify-center mt-2'>
        <MotionLink href="/" 
    className='flex items-center justify-center rounded-full w-48 h-24  bg-dark text-white dark:border-2 dark:border-solid dark:border-light
    text-2xl font-bold'
    whileHover={{
      backgroundColor:["#d00000","#4ad66d","#4cc9f0"],
      transition:{duration:3, repeat: Infinity }
    }}
    >Faisense AI</MotionLink>
    </div>
  )
}

export default Logo