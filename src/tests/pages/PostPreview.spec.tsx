
import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { createClient } from '../../services/prismic'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'



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
jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),

}))

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

    it('redirects user to full post when user is subscribed', async () => {
        const useSessionMocked = mocked(useSession);
        const useRouterMocked = mocked(useRouter);
        const pushMock = jest.fn();

        useSessionMocked.mockReturnValueOnce({
            data: {
                user: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',

                },
                expires: 'fake',
                activeSubscription: { 'fake': 'api-subscription' }
            },
            status: 'authenticated'
        })

        useRouterMocked.mockReturnValueOnce({
            push: pushMock
        } as any)

        render(
            <Post post={post} />
        )

        expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post');


    })

    it('loads initial data', async () => {
        const getPrismicClientMocked = mocked(createClient)

        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {
                    title: 'My new Post',
                    content: [{ type: 'paragraph', text: 'Post content', spans: [] }],
                },
                last_publication_date: '04-01-2021'
            })
        } as any)

        const response = await getStaticProps({
            params: {
                slug: 'my-new-post'
            }
        } as any);

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                        slug: 'my-new-post',
                        title: 'My new Post',
                        content: '<p>Post content</p>',
                        updatedAt: '01 de abril de 2021'
                    }
                }
            })
        )


    })


})