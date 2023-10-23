import Head from 'next/head'
import Hero from '@/components/hero/hero';
import { InView } from "react-intersection-observer";
import Sec from '@/components/Section';
import { useAtom } from 'jotai';
import { globalTextures, imgs, loc } from '../js/atoms';
import Footer from '@/components/Footer';
import { useEffect, useRef, useState } from 'react';
import Papa from 'papaparse';
import { useRouter } from 'next/router';


// const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';


// export async function getServerSideProps() {
//   const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLKMF7Unzvbu54WcfrOCUZyg7J-733rd3N&key=${process.env.YOUTUBE_API_KEY}`)

//   const data = await res.json();

//   return {
//     props: {
//       data
//     }
//   }
// }




export default function Home({ data }: any) {
  const [app, setApp] = useAtom(loc)
  const firstSec = useRef<any>(!null)
  const secondSec = useRef<any>(!null)





  // useEffect(() => {
  //   images.length === 0 && bb(images)
  //   // console.log(images.map((item: any) => item.url))
  //   data.items.map((item: any) => {

  //     textures.push(item)
  //     // console.log(item.snippet.title,
  //     //   item.snippet.publishedAt,
  //     //   item.snippet.thumbnails.medium.url)
  //   })
  //   console.log(textures)
  // }, [images, textures])

  return (
    <>
      <Head>
        <title>Rule Zero Archive</title>
        <meta name="description" content="Rule Zero Archive" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />

      </Head>
      {/* <ul >
        {images.map((item: any) => {
          return item !== null ? (
            <li>
              <a>
                <p>
                  <img src={item.url} />
                </p>
              </a>
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
          )
        })}       </ul> */}


      <InView className='int-ob__wrapper' threshold={0.5} rootMargin='100px' onChange={(inView, entry) => { inView ? (setApp(`${entry.target.firstElementChild?.getAttribute("data-section-name")}`)) : null }}>
        <Sec sectionName="firstSection" ref={firstSec}>
          <Hero
            headerPartOne="Actionable"
            headerPartTwo="Information"
            subHeader="Male sexual strategy. Positive male identity."
            text="Success really boils down to one thing: rational self-interest. We swap notes on how men can put themselves first and navigate modern dating."
            buttonOne="Watch now!"
            linkOne="/archive"
            buttonTwo="Contact us"
            linkTwo="/contact"
          />
        </Sec>
      </InView>
      <InView className='int-ob__wrapper' threshold={0.5} rootMargin='100px' onChange={(inView, entry) => { inView ? (setApp(`${entry.target.firstElementChild?.getAttribute("data-section-name")}`)) : null }}>
        <Sec sectionName="secondSection" ref={secondSec}>
          <Hero
            headerPartOne="What the #@-!"
            headerPartTwo="is Rule Zero?"
            subHeader="Find out what RZ is all about"
            text="Rule Zero is a panel of men coming from various backgrounds talking about intersexual dynamics and all things related."
            buttonOne="Explore"
            linkOne="/about"

          />
        </Sec>
      </InView>
      <Footer />
    </>
  )
}
