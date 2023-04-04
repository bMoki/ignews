import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'
import sm from '../../sm.json'

const routes = [{
    type: 'publication',
    path: '/posts/:uid',
}]

export const createClient = (config: any = {}) => {
    const client = prismic.createClient(sm.apiEndpoint, {
        routes,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        ...config,
    })

    prismicNext.enableAutoPreviews({
        client,
        previewData: config.previewData,
        req: config.req,
    })

    return client
}