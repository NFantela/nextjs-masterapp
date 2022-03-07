import type { GetStaticPropsContext } from 'next'
import Layout from '../components/common/layout/Layout'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }

  return {
    props: {},
  }
}

export default function NotFound() {
  return (
    <section>
      <h1>Page not found</h1>
    </section>
  )
}

NotFound.Layout = Layout;
