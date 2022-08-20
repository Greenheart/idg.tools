// import type { redirect } from '@sveltejs/kit'

import { content } from '$lib/content-backend'
import { getToolByLink } from '$shared/content-utils'

/** @type {import('@sveltejs/kit').PageServerLoad} */
export async function load({
    params: { link },
}: {
    params: Record<string, string>
}) {
    const tool = getToolByLink(link, content)

    if (tool) {
        // If page was found on a different URL,
        // permanently redirect to the updated url (HTTP 301)
        // to prevent multiple URLs publishing the same content.
        // TODO: Re-enable this when https://github.com/sveltejs/kit/issues/5952 has been solved.
        // if (link !== tool.link) {
        //     const location = `/explore/${tool.link}`
        //     throw redirect(301, location)
        // }

        // the tool itself
        // the skills, and the colors of the categories
        // the tags of the tool
        // But no other content

        // IDEA: replace skillIds and tagIds with the actual skills, tags etc. Though this will mess up types but that can be fixed
        // IDEA: move colors from categories to skills to save the extra work. For the other way lookup, just take a category you want, and read the color from the first skill of the category. This might make it out of sync though.
        // IDEA: Alternatively, simply add the color to each skill during build time. Which would also mess up types
        // NOTE: However, it might be possible to define the types returned from the endpoints to automatically make the types available in the pages

        // IDEA: Maybe transform content at build time, instead of at every request.

        // TODO: compare vercel output `__data.json` size for Purposeful leadership - before 35711 - after 11214
        // This is only 31% of the original size. However, this approach addde complexity to the content build, introducing runtime types which can be confusing.
        // The new content build also made the full content.json file much larger, meaning that when it will be included it will take much more bandwidth to transfer.

        // The next approach might be to keep the old types from before, but returning the expected data when rendering for example individual tools.
        // For example by returning the tags and relevant skills for a specific tool. But this would duplicate some data.

        // Or refactor the app to use the static content.json (which can be cached) as a single source of truth, and then reusing that data on all pages
        // This approach would remove the custom `__data.json` for each page, and instead rely on fetching the content.json.
        // However, this would need client side rendering, needing the app to operate as a SPA.
        // One benefit of the SPA approach though would be to be able to do content lookups locally, and that it would work faster once the initial pages has been loaded, since it wouldn't need to download the data every time.
        // This would enable the redirects to invalid content URLs, and be data efficient. However, it would require all users to have JS (but that's a requirement anyway to get the filtering and similar)
        // So in summary, the SPA would enable content lookups as long as the tool slug is correct. It would make the app download more efficient for longer usage. It would minimize the data usage compared to loading multiple pages.
        // However, it would have to wait for the JS and content to load before rendering the UI, meaning the initial page load might not be as fast.
        // Another benefit of SPA is that it's easier to enable offline support and the installable PWA mode, which are features we want anyway.

        return { tool }
    }
}
