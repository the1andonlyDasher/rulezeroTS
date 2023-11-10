import Sec from "@/components/Section";
import Head from "next/head";
import { images } from "@/js/images";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useAtom } from "jotai";
import { imgs } from "@/js/atoms";
import { useRouter } from "next/router";
import Papa from "papaparse";

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

export default function About() {
  const [app, setApp] = useState<any>([]);
  const [item, setItem] = useState<any>(app[app.length - app.length]);
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
        console.log(
          youtube_parser("/.*(?:youtu.be/|v/|u/w/|embed/|watch?v=)([^#&?]*).*/")
        );

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
                      url: `https://pipedproxy.kavin.rocks/vi/${r}/mqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhZx_n9AywKMVzcoL_2bYQpUlalw&host=i.ytimg.com`,
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
                }
              });
              fetch(false);
            },
          }
        );
      }
    }
  }, [router.pathname]);

  useEffect(() => {
    console.log(item);
  }, [item]);

  return (
    <>
      <Head>
        <title>Rule Zero About Us</title>
        <meta name="description" content="About Us subpage for Rule Zero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <Sec>
        <div className="hero__grid">
          <div>
            <h2>Check out the latest show...</h2>
            <h3 className="">...or read more about the panel members.</h3>
          </div>
          <div>
            {item && (
              <Link href={item.link}>
                <button type="button" className="btn__primary">
                  Right here!
                </button>
              </Link>
            )}
          </div>
          <div>
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
          </div>
          <div>
            <div>
              <h4>On this show:</h4>
              {item &&
                <p>
                  {`${item.description}`}
                </p>}
            </div>
          </div>
          <div>
            <h5>Explore all episodes:</h5>
            <Link href={""}>
              <button type="button" className="btn__primary">
                Archive
              </button>
            </Link>
          </div>
          {app && (
            <div>
              <div className="stat-card">
                <p>{app.length}</p>
                <span>videos</span>
              </div>
              <div className="stat-card">
                <p>{images.length}</p>
                <span>creators</span>
              </div>
              <div className="stat-card">
                <p>2384</p>
                <span>Minutes</span>
              </div>
            </div>
          )}
        </div>
      </Sec>
      <Sec>
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
