import { z } from 'zod/v4'

const baseItem = z.object({
    id: z.string(),
    name: z.string(),
})

const item = baseItem.extend({
    description: z.string(),
})

/**
 * Schemas are used to parse content and ensure it meets the expected format.
 */
export const SCHEMAS = {
    contributors: baseItem.extend({
        link: z.optional(z.string()),
    }),
    tags: baseItem,
    skills: item.extend({
        dimension: z.string(),
        questions: z.array(z.string()),
    }),
    dimensions: item.extend({
        subtitle: z.string(),
        skills: z.array(z.string()),
    }),
    tools: item.extend({
        link: z.optional(z.string()),
        intro: z.optional(z.string()),
        slug: z.string(),
        actions: z.string(),
        resources: z.optional(z.string()),
        relevancy: z
            .array(
                z.object({
                    skill: z.string(),
                    score: z.number(),
                }),
            )
            .default([]),
        tags: z.array(z.string()).default([]),
    }),
    stories: z.object({
        id: z.string(),
        title: z.string(),
        intro: z.optional(z.string()),
        image: z.string(),
        imageAlt: z.string(),
        story: z.string(),
        dimensions: z.array(z.string()).default([]),
        link: z.optional(z.string()),
        slug: z.string(),
        contributors: z.array(z.string()).default([]),
        publishedAt: z.string(),
        tags: z.array(z.string()).default([]),
    }),
    featured: z.array(z.string()),
}
