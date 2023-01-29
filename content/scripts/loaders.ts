import type { AllContent } from '$shared/types'
import { getPaths } from './utils'

/**

Create one module with loaders
    - loaders should take the names of selectedContent to be included in the bundle
    - loaders should know which selectedContent are collections vs singletons
    - loaders should know which selectedContent that should be loaded with translations, and also those that are the same across languages
    - loaders should return the content object in the same shape as it was entered

Ideally load content from all locales and turn it into the expected format.
Maybe we can even re-use the existing structure since that works good enough for now.
Then we could apply some additional transformation in the builders, but then let them work with the same format as before. This way, we can avoid having to rewrite everything from scratch.
It might be better with a more generic approach of loaders and transformers, but it will take some time just to get right. And that time might be better spent on other things.

With the more generic approach, it would be cleaner to understand how it fits together, and likely easier to maintain
*/

type X = AllContent['contributors']

// NOTE: implementing loaders for all content types allows us to ignore the concepts of collections and singletons
// since this will be defined in code instead.

type LoaderInput = {
    contentDir: string
}

const loadContributors = async ({ contentDir }: LoaderInput): => {
    await Promise.all(getPaths(contentDir, `contributors/*.json`))
    // get paths
    // await loading and parsing all JSON
    // return as Translated<Pick<AllContent, 'contributors'>>
}

const loadContent = async (selected: SelectedContent, baseDir: string, locale: Locale) => {
    const paths = await getContentPaths(selected, baseDir, locale)

    const [collectionsByType, singletonsByType] = await Promise.all([
        Promise.all(paths.collections.map((collection) => Promise.all(collection.map(readJSON)))),
        Promise.all(paths.singletons.map(readJSON)),
    ])
    console.log({ paths, collectionsByType, singletonsByType })

    const rawContent = {} as CommunityContent

    ;(selected.collections as CommunityCollections).forEach((contentType, i) => {
        rawContent[contentType] = collectionsByType[i]
    })
    ;(selected.singletons as SingletonName[]).forEach((contentType, i) => {
        rawContent[contentType] = singletonsByType[i]
    })

    return rawContent
}
