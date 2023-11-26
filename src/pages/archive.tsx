import { Cursor } from "@/components/Cursor";
import { atomField, atomResult, atomSort, atomState, imgs, listView, totalLoad } from "@/js/atoms";
import { motion, useAnimation, useMotionValueEvent, useScroll } from "framer-motion";
import { useAtom } from "jotai";
import Head from "next/head";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

const colors = ["hsl(240, 11%, 61%)", "hsl(240, 11%, 50%)", "hsl(240, 11%, 40%)", "hsl(240, 11%, 25%)", "hsl(240, 11%, 15%)"];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const dotVariants = {
  initial: {},
  animate: {
    height: [40, 100, 40],
    transition: {
      repeat: Infinity
    }
  }
};

const Dots = ({ count = 5 }) => {
  return (<>
    <motion.div variants={containerVariants}>
      {Array(count)
        .fill(null)
        .map((_, index) => {
          return (
            <motion.div
              key={index}
              variants={dotVariants}
              style={{
                height: 40,
                width: 40,
                backgroundColor: colors[index % colors.length],
                borderRadius: 20
              }}
            />
          );
        })}
    </motion.div>
  </>)
}

const formVariants = {
  top: { backgroundColor: "rgba(17, 18, 22, 0)", borderColor: "rgba(35, 36, 47, 0)", width: "100%", padding: "1rem 0rem" },
  scroll: { backgroundColor: "rgba(17, 18, 22, 255)", borderColor: "rgba(35, 36, 47, 255)", width: "110%", padding: "1rem 1rem" },
}

const list_variants = {
  in: { opacity: 1, zIndex: 1 },
  out: { opacity: 0, zindex: -100 },
}

// const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

// export async function getServerSideProps() {
//   const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=TLPPMjAxMTIwMjMrsZfUMlJuig&key=${process.env.YOUTUBE_API_KEY}`);
//   const data = await res.json();
//   return {
//     props: {
//       data
//     }
//   }
// }

export default function Archive() {
  const [view, setView] = useAtom(listView);
  const [load, setLoad] = useAtom(totalLoad);
  const [app, setApp] = useAtom<any>(imgs);
  const [images, setImages] = useState<any>(app)
  const { scrollY } = useScroll();
  const controls = useAnimation()
  const list_controls = useAnimation()

  // Store sortby order i.e. ascending or descending
  const [sortType, setSortType] = useAtom(atomSort);

  // Sortby field i.e. title or description
  const [sortByField, setSortByField] = useAtom(atomField);

  // Store filter/latest posts
  const [result, setResult] = useAtom(atomResult);

  const [state, setstate] = useState({
    query: "",
    list: images,
  });

  const [a, aa] = useAtom(atomState)

  useEffect(() => {
    aa(state)
    console.log(a)
  }, [state])

  // Filter posts on typing in search input
  const handleChange = (e: any) => {
    const results = images.filter((post: any) => {
      if (e.target.value === "") return images;
      return post[sortByField]
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    setResult(results);

    setstate({
      query: e.target.value,
      list: sortFunc(results, sortType, sortByField),
    });
  };

  // Sort posts depending on sort type and available results
  function sortFunc(results: any, sortType: any, sortByField: any) {
    if (sortByField === "title") {
      if (sortType === "ascending") {
        results.sort((a: any, b: any) =>
          a[sortByField] < b[sortByField] ? -1 : 1
        );
      } else if (sortType === "descending") {
        results.sort((a: any, b: any) =>
          b[sortByField] > a[sortByField] ? 1 : -1
        );
      }
    } else if (sortByField === "date") {
      if (sortType === "ascending") {
        results.sort((a: any, b: any) =>
          new Date(a[sortByField]) < new Date(b[sortByField]) ? -1 : 1
        );
      } else if (sortType === "descending") {
        results.sort((a: any, b: any) =>
          new Date(a[sortByField]) < new Date(b[sortByField]) ? 1 : -1
        );
      }
    }
    return results;
  }

  // Dropdown to sort posts in ascending or descending order depending on title.
  function updatePosts(e: any) {
    setSortType(e);
    setstate({
      query: state.query,
      list: !result
        ? sortFunc(images, e, sortByField)
        : sortFunc(result, e, sortByField),
    });
  }

  // Dropdown to sort images in ascending or descending order depending on title.
  function sortBy(e: any) {
    setSortByField(e);
    setstate({
      query: state.query,
      list: !result
        ? sortFunc(images, sortType, e)
        : sortFunc(result, sortType, e),
    });
  }

  useEffect(() => {
    load && setImages(app)
  }, [load]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    view && controls.start(view && latest > 0 ? "scroll" : "top")
  })


  useEffect(() => {
    controls.start(view ? "top" : "top");
    view ? list_controls.start({ pointerEvents: "all", display: "grid" }).then(() => { list_controls.start("in") }) :
      list_controls.start("out").then(() => { list_controls.start({ pointerEvents: "none", display: "none" }) })
  }, [view])



  return (
    <>
      <Head>
        <title>Rule Zero Archive</title>
        <meta name="description" content="Archive subpage for Rule Zero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <div className="archive__wrapper">
        <motion.form className="list__form" initial={scrollY.get() > 0 ? "scroll" : "top"} variants={formVariants} animate={controls}>
          <div>
            <span>Search</span>
            <input
              className="list__form-search"
              onChange={handleChange}
              value={state.query}
              type="search"
            />
          </div>

          <div>
            <span>Sort By</span>
            <select
              className="list__form-sort"
              defaultValue={""}
              onChange={(e) => sortBy(e.target.value)}
            >
              <option value="" disabled>
                None
              </option>
              <option value="date">Date</option>
              <option value="title">Title</option>
            </select>
          </div>

          <div>
            <span>Order</span>
            <select
              className="list__form-sort"
              defaultValue={"DEFAULT"}
              onChange={(e) => updatePosts(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                None
              </option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
          <div>
            <button type="button" onClick={() => setView(!view)}>{view ? "timeline view" : "list view"}</button>
          </div>
        </motion.form>

        <motion.ul className="video-list" initial="in" animate={list_controls} variants={list_variants}>
          <Suspense fallback={<Dots />}>
            {images && state.list.map((item: any) => {
              return item !== null ? (
                <li key={item.name}>
                  <div className="list__image-wrapper">
                    <div className="list__item-number">{item.number}</div>
                    <div
                      className="list__image"
                      style={{
                        backgroundImage: `url('${item.url}')`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </div>
                  <div className="list__info">
                    <h5 className="list__header">{item.title}</h5>
                    <p className="list__date">{new Date(item.date).toDateString()}</p>

                    <Link href={item.link}>
                      <button type="button" className="btn__alt">
                        Watch now!
                      </button>
                    </Link>
                  </div>
                </li>
              ) : null;
            })}
          </Suspense>
        </motion.ul>

      </div>
    </>
  );
}
