import '@/styles/scss/style.scss'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout';
import { GL } from '@/js/GL';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/Loader';





export default function App({ Component, pageProps }: AppProps) {
  return (<>
    <Loader />
    <Layout>
      <Component {...pageProps} />
    </Layout>
    <AnimatePresence>
      <GL />
    </AnimatePresence>

  </>)
}
