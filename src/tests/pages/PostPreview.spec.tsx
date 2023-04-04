
import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { createClient } from '../../services/prismic'
import { useSession } from 'next-auth/react'



type Post = {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
}

const post: Post =
{
    slug: 'my-new-post',
    title: 'My New Post',
    content: '<p>Post excerpt</p>',
    updatedAt: '10 de Abril'
}
jest.mock('next-auth/react')
jest.mock('../../services/prismic')

describe('Post preview page', () => {
    it('renders correctly', () => {

        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' })

        render(
            <Post post={post} />
        )

        expect(screen.getByText("My New Post")).toBeInTheDocument();
        expect(screen.getByText("Post excerpt")).toBeInTheDocument();
        expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
    })

    // it('redirects user to full post when user is subscribed', async () => {
    //     const getSessionMocked = mocked(getSession);
    //     getSessionMocked.mockResolvedValueOnce(null)

    //     const response = await getServerSideProps({
    //         params: {
    //             slug: 'my-new-post'
    //         }
    //     } as any);

    //     expect(response).toEqual(
    //         expect.objectContaining({
    //             redirect: expect.objectContaining({
    //                 destination: '/'
    //             })
    //         })
    //     )
    // })

    // it('loads initial data', async () => {
    //     const getPrismicClientMocked = mocked(createClient)
    //     const getSessionMocked = mocked(getSession);

    //     getPrismicClientMocked.mockReturnValueOnce({
    //         getByUID: jest.fn().mockResolvedValueOnce({
    //             data: {
    //                 title: 'My new Post',
    //                 content: [{ type: 'paragraph', text: 'Post content', spans: [] }],
    //             },
    //             last_publication_date: '04-01-2021'
    //         })
    //     } as any)

    //     getSessionMocked.mockResolvedValueOnce({
    //         activeSubscription: 'fake-active-subscription'
    //     } as any)

    //     const response = await getServerSideProps({
    //         params: {
    //             slug: 'my-new-post'
    //         }
    //     } as any);

    //     expect(response).toEqual(
    //         expect.objectContaining({
    //             props: {
    //                 post: {
    //                     slug: 'my-new-post',
    //                     title: 'My new Post',
    //                     content: '<p>Post content</p>',
    //                     updatedAt: '01 de abril de 2021'
    //                 }
    //             }
    //         })
    //     )


    // })


})