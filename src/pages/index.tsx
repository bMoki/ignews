
import Head from 'next/head'
import styles from './home.module.scss'
import Image from 'next/image'
import homeImage from '../public/images/avatar.svg';
import { SubscribeButton } from '@/components/SubscribeButton';
import { GetStaticProps } from 'next';
import { stripe } from '@/services/stripe';

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <Image src={homeImage} width={336} height={521} alt='Girl coding' />
      </main>
    </>
  )

}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1MiqIUCCJdqY72jkHcTTrC1E')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount ? price.unit_amount / 100 : 0)
  }



  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}