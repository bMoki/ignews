
import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import Posts, { getStaticProps } from '../../pages/posts'
import { createClient } from '../../services/prismic'



type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updateAt: string;
}

const posts: Post[] = [
    {
        slug: 'my-new-post',
        title: 'My New Post',
        excerpt: 'Post excerpt',
        updateAt: '10 de Abril'
    }
]

jest.mock('../../services/prismic')

describe('Posts page', () => {
    it('renders correctly', () => {
        render(
            <Posts posts={posts} />
        )

        expect(screen.getByText("My New Post")).toBeInTheDocument();
    })

    it('loads initial data', async () => {
        const getPrismicClientMocked = mocked(createClient)

        getPrismicClientMocked.mockReturnValueOnce({
            getAllByType: jest.fn().mockResolvedValueOnce([
                {
                    uid: 'my-new-post',
                    data: {
                        title: 'My new Post',
                        content: [{ type: 'paragraph', text: 'Post excerpt' }]
                    },
                    last_publication_date: '04-01-2021'
                }
            ]
            )
        } as any)

        const response = await getStaticProps({});

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    posts: [{
                        slug: 'my-new-post',
                        title: 'My new Post',
                        excerpt: 'Post excerpt',
                        updatedAt: '01 de abril de 2021'
                    }]
                }
            })
        )
    })


})