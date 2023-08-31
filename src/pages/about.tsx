import Sec from "@/components/Section";
import Head from "next/head";
import { images } from "@/js/images";
import { motion, useAnimation } from "framer-motion";

const card_variants = {
  initial: { opacity: 0, scale: 0 },
  enter: { opacity: 1, scale: 1 },
  hover: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 }
}



export default function Archive() {

  return (
    <>
      <Head>
        <title>Rule Zero About Us</title>
        <meta name="description" content="About Us subpage for Rule Zero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sec children={(
        <div className="cards">
          {images.map((img: any, index: number) => {
              const controls = useAnimation();
              return(
            <motion.div onHoverStart={(e) => controls.start("hover")} onHoverEnd={(e) => controls.start("enter")} variants={card_variants} animate={controls} className="card" key={index}>
              <motion.div className="img" style={{ backgroundImage: `url(${img.url})`, clipPath: `${img.clip}`}}></motion.div>
            </motion.div>)
      })}

        </div>
      )} />

    </>
  )
}