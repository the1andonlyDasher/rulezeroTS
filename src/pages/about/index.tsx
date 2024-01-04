import Sec from "@/components/Section";
import Head from "next/head";
import { images } from "@/js/images";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Papa from "papaparse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const cards_variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { staggerChildren: 0.2, when: "beforeChildren" },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.1, when: "afterChildren" },
  },
};

const card_variants = {
  initial: { opacity: 0, scale: 0 },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

const button_variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: -20, opacity: 1 },
};

const name_variants = {
  hidden: { y: 0, opacity: 1 },
  visible: { y: 20, opacity: 0 },
};
// const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

// export async function getServerSideProps() {
//   const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLCQ8-0muO9aUVrXLHLHp48zbPre2heX9d&key=${process.env.YOUTUBE_API_KEY}`);
//   const data = await res.json();
//   return {
//     props: {
//       data
//     }
//   }
// }


export default function About() {
  const [app, setApp] = useState<any>([]);
  const [item, setItem] = useState<any>(app[app.length - app.length]);
  const [list, setList] = useState<any>([])
  const router = useRouter();
  const [fetching, fetch] = useState(true);



  function youtube_parser(url: any) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  useEffect(() => {
    if (router.pathname.includes("/about")) {
      if (typeof window !== "undefined" && fetching) {

        const rx: RegExp =
          /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

        Papa.parse(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vSloYeSqI6BpICcq9gG5a3KRhXv99DKlrj9XmEAIvmX0BxWw-olhU9J9kDG0LvM976e8jYblR0THwkj/pub?output=csv",
          {
            skipEmptyLines: "greedy",
            preview: 0,
            worker: false,
            download: true,
            header: true,
            complete: (results) => {
              console.log("Parsing complete:", results);

              results.data.reverse().map((data: any, index) => {
                var r: any = youtube_parser(data.Link);

                var l = data.Link;
                var t = data.Title;
                var d = data.Dates;
                var desc = data.Description;
                var img = data.Images;
                if (fetching) {
                  if (!app.find((item: any) => item.name === r)) {
                    app.push({
                      url: `https://yt.artemislena.eu/vi/${r}/mqdefault.jpg`,
                      title: t,
                      link: l,
                      name: r,
                      date: d,
                      img: img,
                      number: results.data.length - index,
                      index: index,
                      description: desc
                    });
                  }
                  setItem(app[app.length - app.length]);
                  console.log(app.map((item: any) => {
                    item
                  }))
                }
              });

              fetch(false);
            },
          }
        );
      }
    }
  }, [router.pathname]);


  const gridVariants = {
    initial: { opacity: 0, x: -10 },
    enter: { opacity: 1, x: 0, transition: { staggerChildren: 0.2 } },
    exit: { opacity: 0, x: 10, transition: { staggerChildren: 0.2, staggerDirection: -1 } },
  }

  const gridItemVariants = {
    initial: { rotateY: "180deg" },
    enter: { rotateY: "0deg", transition: { type: "spring", mass: 5, damping: 50, stiffness: 100, duration: 0.25 } },
    exit: { rotateY: "-180deg" },
  }

  const gridControls = useAnimation();

  useEffect(() => {
    gridControls.start(item && app !== null ? "enter" : "initial")
  }, [app, item])

  return (
    <>
      <Head>
        <title>Rule Zero About Us</title>
        <meta name="description" content="About Us subpage for Rule Zero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <Sec>
        <motion.div initial="initial" animate={gridControls} variants={gridVariants} className="hero__grid">
          <motion.div >
            <h2>Check out the latest show...</h2>
            <h3 className="">...or read more about the panel members.</h3>
          </motion.div>
          <motion.div variants={gridItemVariants}>
            {item && (
              <Link href={item.link}>
                <button type="button" className="btn__primary">
                  Watch here!
                </button>
              </Link>
            )}
          </motion.div>
          <motion.div variants={gridItemVariants}>
            {item && (
              <div
                className="grid__video-parent"
                style={{ backgroundImage: `url("${item.url}")` }}
              >
                <h3
                  style={{ transform: "rotateY(15deg)" }}
                  className="grid__h3"
                >
                  {item.title}
                </h3>
                {/* <div className="live-badge">live</div> */}
                <div
                  style={{ transform: "rotateY(15deg)" }}
                  className="grid__date"
                >
                  {new Date(item.date).toDateString()}
                </div>
              </div>
            )}
          </motion.div>
          <motion.div variants={gridItemVariants}>
            <div>
              <h4>On this show:</h4>
              {item &&
                <p>
                  {`${item.description}`}
                </p>}
            </div>
          </motion.div>
          <motion.div variants={gridItemVariants}>
            <h5>Explore all episodes:</h5>
            <Link href={""}>
              <button type="button" className="btn__primary">
                Archive
              </button>
            </Link>
          </motion.div>
          {app && (
            <motion.div variants={gridItemVariants}>
              <div className="stat-card">
                <p>{app.length}</p>
                <span>videos</span>
              </div>
              <div className="stat-card">
                <p>{images.length}</p>
                <span>creators</span>
              </div>
              <a className="stat-card" href="#panelMembers">
                More <FontAwesomeIcon className="h-2 w-2" icon={faArrowDown} />
              </a>
            </motion.div>
          )}
        </motion.div>
      </Sec>
      <Sec id="panelMembers">
        <motion.div variants={cards_variants} className="cards">
          {images.map((img: any, index: number) => (
            <motion.div variants={card_variants} className="card" key={index}>
              <motion.div
                className="img"
                style={{
                  backgroundImage: `url(${img.url})`,
                  clipPath: `${img.clip}`,
                }}
              ></motion.div>
              <motion.div className="name">
                <h4>{img.creator}</h4>
              </motion.div>
              <motion.div className="button">
                <Link href={`/about/${img.id}`}>
                  <h5>Read more</h5>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Sec>
      <Footer />
    </>
  );
}
