import { json, type RequestHandler } from '@sveltejs/kit'
import { remark } from 'remark'
import stripMarkdown from 'strip-markdown'

import { createIssue } from '$lib/github'

const sanitizer = remark().use(stripMarkdown)
const sanitizeInput = (raw: string) => sanitizer.process(raw).then((value) => value.toString())

// NOTE: This API route is disabled since it's not currently used.

export const POST = (async ({ request, url }) => {
    const raw = await request.json()

    if (raw.description) return json({ success: true })

    const data = {
        liked: raw.liked,
        improve: raw.improve,
    } as Record<'liked' | 'improve', string | null>

    if (data.liked) {
        data.liked = await sanitizeInput(data.liked)
    }
    if (data.improve) {
        data.improve = await sanitizeInput(data.improve)
    }

    if (!Boolean(data.liked || data.improve)) return json({ success: false })

    await createIssue({
        userContent: `## What do you like?\n> ${data.liked}\n\n## What can be improved?\n> ${data.improve}`,
        type: 'FEEDBACK',
        url: url.href,
    })

    return json({ success: true })
}) satisfies RequestHandler
