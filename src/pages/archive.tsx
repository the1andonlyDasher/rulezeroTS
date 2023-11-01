import { imgs, listView } from "@/js/atoms";
import { useAtom } from "jotai";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TupleType } from "typescript";

export default function Archive() {
  const [view, setView] = useAtom(listView);
  const [app, setApp] = useAtom<any>(imgs);
  const [images, setImages] = useState(app);

  // Store sortby order i.e. ascending or descending
  const [sortType, setSortType] = useState("descending");

  // Sortby field i.e. title or description
  const [sortByField, setSortByField] = useState("date");

  // Store filter/latest posts
  const [result, setResult] = useState();

  const [state, setstate] = useState({
    query: "",
    list: images,
  });

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
    console.log(sortByField)
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
    setImages(app);
    let sortedCars = images.sort(
      (a: any, b: any) =>
        Date.parse(`${new Date(a.date.split("/").reverse().join("-"))}`) -
        Date.parse(`${new Date(b.date.split("/").reverse().join("-"))}`)
    );
    let sortedCars1 = images.sort((a: any, b: any) =>
      a.date
        .split("/")
        .reverse()
        .join()
        .localeCompare(b.date.split("/").reverse().join())
    );
    console.log(sortedCars1);
  }, [app]);

  return (
    <>
      <Head>
        <title>Rule Zero Archive</title>
        <meta name="description" content="Archive subpage for Rule Zero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <section>
        <form className="list__form">
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
              defaultValue={"title"}
              onChange={(e) => sortBy(e.target.value)}
            >
              <option value="title" disabled>
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
        </form>
        <ul className="video-list">
          {state.list.map((item: any) => {
            return item !== null ? (
              <li key={item.name}>
                <div
                  className="list__image"
                  style={{
                    backgroundImage: `url('${item.url}')`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="list__info">
                  <h5 className="list__header">{item.title}</h5>
                  <p className="list__date">{item.date}</p>
                  <Link href={item.link}>
                    <button type="button" className="btn__alt">
                      Watch now!
                    </button>
                  </Link>
                </div>
              </li>
            ) : null;
          })}
          {/* {data.items.map(({ id, snippet = {} }: any) => {
          const { title, thumbnails = {}, resourceId = {} }: any = snippet;
          const { medium } = thumbnails;
          return (
            <li key={id}>
              <a href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}>
                <p>
                  <img width={medium.width} height={medium.height} src={medium.url} alt="" />
                </p>
                <h3>{title}</h3>
              </a>
            </li>
          )})}  */}
        </ul>
      </section>
    </>
  );
}
