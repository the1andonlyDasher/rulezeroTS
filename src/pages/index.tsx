import Head from 'next/head'
import { GL } from '@/js/GL'
import { createStore } from 'jotai';
import { loc } from './atoms';
import Hero from '@/components/hero/hero';

const app = createStore();


export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <GL location={app.get(loc)} />
    </>
  )
}
