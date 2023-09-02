import Sec from "@/components/Section";
import Head from "next/head";
import { images } from "@/js/images";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";

const cards_variants = {
  initial: { opacity: 0, scale: 0 },
  enter: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2, when: "beforeChildren" } },
  exit: { opacity: 0, scale: 0, transition: { staggerChildren: 0.2, when: "afterChildren" } },
}

const card_variants = {
  initial: { opacity: 0, scale: 0 },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
}

const button_variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: -20, opacity: 1 }
}

const name_variants = {
  hidden: { y: 0, opacity: 1 },
  visible: { y: 20, opacity: 0 }
}

export default function About() {

  return (
    <>
      <Head>
        <title>Rule Zero About Us</title>
        <meta name="description" content="About Us subpage for Rule Zero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sec children={(
        <motion.div variants={cards_variants} className="cards">
          {images.map((img: any, index: number) => {
            const controls = useAnimation();
            return (
              <motion.div onHoverStart={() => controls.start("visible")} onHoverEnd={() => controls.start("hidden")} variants={card_variants} className="card" key={index}>
                <motion.div className="img" style={{ backgroundImage: `url(${img.url})`, clipPath: `${img.clip}` }}></motion.div>
                <motion.div className="name" initial="hidden" animate={controls} variants={name_variants}><h4>{img.creator}</h4></motion.div>
                <motion.div className="name" initial="hidden" animate={controls} variants={button_variants}><Link href={`/about/${img.creator}`}><h5>Read more</h5></Link></motion.div>
              </motion.div>)
          })}
        </motion.div>
      )} />

    </>
  )
}