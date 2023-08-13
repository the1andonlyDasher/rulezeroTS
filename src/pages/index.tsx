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
      <Sec sectionName="firstSection" ref={firstSec} children={
      <Hero
        headerPartOne="Actionable"
        headerPartTwo="Information"
        subHeader="Swapping notes and talking shop"
        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut."
        buttonOne="Watch now!"
        buttonTwo="Contact us"
      />
      } ></Sec>
      </InView>
      <InView className='int-ob__wrapper' threshold={0.5} rootMargin='100px' onChange={(inView, entry) => { inView ? (setApp(`${entry.target.firstElementChild?.getAttribute("data-section-name")}`)) : null }}>
      <Sec sectionName="secondSection" ref={secondSec} children={
      <Hero
      headerPartOne="What the #@-!"
      headerPartTwo="is Rule Zero?"
      subHeader="Find out what we're all about"
      text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut."
      buttonOne="Explore"
    
      />
      } ></Sec>
      </InView>
      <Footer/>
    </>
  )
}
