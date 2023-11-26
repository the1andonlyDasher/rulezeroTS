import '@/styles/scss/style.scss'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout';
import { GL } from '@/js/GL';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/Loader';
import { Cursor } from '@/components/Cursor';





export default function App({ Component, pageProps }: AppProps) {
  return (<>
    {/* <Cursor /> */}
    <Loader />
    <Layout>
      <Component {...pageProps} />
    </Layout>
    <AnimatePresence>
      <GL />
    </AnimatePresence>
  </>)
}
