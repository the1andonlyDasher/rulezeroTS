import '@/styles/style.css'
import type { AppProps } from 'next/app'
import { AnimatePresence, motion } from "framer-motion";


const variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { staggerChildren: 0.5, delayChildren: 2, duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.5,
      staggerDirection: -1,
      duration: 0.5,
      delay: 2,
    },
  },
};

const handExitComplete = () => {
  window.scrollTo(0, 0);
  if (typeof window !== "undefined") {
    // Get the hash from the url
    const hashId = window.location.hash;

    if (hashId) {
      // Use the hash to find the first element with that id
      const element = document.querySelector(`${hashId}`);

      if (element) {
        // Smooth scroll to that elment
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        console.log("scrollToHash");
      }
    }
    // else {
    //   window.scrollTo(0,0)
    //   console.log("scrollTop")
    // }
  }
};

export default function App({ Component, router, pageProps }: AppProps) {
  return(<>
        <AnimatePresence
        mode="wait"
        initial={true}
        onExitComplete={() =>
          setTimeout(() => {
            handExitComplete();
          }, 100)
        }
      >
        <motion.div
          key={router.route}
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="main"
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence></>)
}
