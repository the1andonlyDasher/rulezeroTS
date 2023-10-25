
import Head from "next/head";



export default function Archive() {
  return (
    <>
      <Head>
        <title>Rule Zero Archive</title>
        <meta name="description" content="Archive subpage for Rule Zero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />
      </Head>
      {/* <ul >
        {app.map((item: any) => {
          return item !== null ? (
            <li>
              <a>
                <p>
                  <img src={item.url} />
                </p>
              </a>
            </li>) : null
        })} */}
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
      {/* </ul> */}
    </>
  )
}