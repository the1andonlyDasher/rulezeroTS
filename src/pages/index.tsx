import Head from 'next/head'
import Hero from '@/components/hero/hero';
import { InView } from "react-intersection-observer";
import Sec from '@/components/Section';
import { useAtom } from 'jotai';
import { loc } from './atoms';
import Footer from '@/components/Footer';
import { useRef } from 'react';




export default function Home() {
  const [app, setApp] = useAtom(loc)
  const firstSec = useRef<any>(!null)
  const secondSec = useRef<any>(!null)
  return (
    <>
      <Head>
        <title>Rule Zero Archive</title>
        <meta name="description" content="Rule Zero Archive" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
