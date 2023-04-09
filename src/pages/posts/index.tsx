import Head from 'next/head'
import styles from './styles.module.scss';
import { GetStaticProps } from 'next';
import { createClient } from '../../services/prismic';
import Link from 'next/link';

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updateAt: string;
}

interface PostsProps {
    posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <Link href={`/posts/preview/${post.slug}`} key={post.slug}>
                            <time>{post.updateAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt} </p>
                        </Link>
                    ))}

                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
    const client = createClient({ previewData })

    const response = await client.getAllByType('publication');


    const posts = response.map(post => {
        return {
            slug: post.uid,
            title: post.data.title,
            excerpt: post.data.content.find((content: any) => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })


        }
    })

    return {
        props: { posts }
    }
}