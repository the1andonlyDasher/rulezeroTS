
import { imgs, listView } from "@/js/atoms";
import { useAtom } from "jotai";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Archive() {
  const [view, setView] = useAtom(listView);
  const [app, setApp] = useAtom<any>(imgs);
  const [images, setImages] = useState(app)

  useEffect(() => {
    setImages(app)
  }, [app])

  return (
    <>
      <Head>
        <title>Rule Zero Archive</title>
        <meta name="description" content="Archive subpage for Rule Zero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <section>
        <ul className="video-list">
          {images.map((item: any) => {
            return item !== null ? (
              <li key={item.name}>
                <div className="list__image" style={{ backgroundImage: `url('${item.url}')`, backgroundSize: "cover" }}>
                </div>
                <div className="list__info">
                  <h5 className="list__header">{item.title}</h5>
                  <p className="list__date">{item.date}</p>
                  <Link href={item.link}><button type="button" className="btn__alt">Watch now!</button></Link>
                </div>
              </li>) : null
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
  )
}