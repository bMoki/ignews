import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Roboto } from 'next/font/google'
import '../styles/global.scss';
import { Header } from '@/components/Header';
import { SessionProvider as NextAuthProvider } from 'next-auth/react'



const roboto = Roboto({ weight: ['400', '700', '900'], subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Head>
        <title>ig.news</title>
      </Head>
      <main className={roboto.className}>
        <Header />
        <Component {...pageProps} />
      </main>
    </NextAuthProvider>
  )
}
