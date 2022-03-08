import '../styles/globals.scss'
import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from '../components/common/head/Head'
import { ManagedUIContext } from '../components/ui-context/UIContext'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}