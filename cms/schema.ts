/*
Welcome to the schema! The schema is the heart of Keystone.

Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name. For the starter
  we have `User`, `Post`, and `Tag` lists.
A field: The individual bits of data on your list, each with its own type.
  you can see some of the lists in what we use below.

*/

// Like the `config` function we use in keystone.ts, we use functions
// for putting in our config so we get useful errors. With typescript,
// we get these even before code runs.
import { list } from '@keystone-6/core'

// We're using some common fields in the starter. Check out https://keystonejs.com/docs/apis/fields#fields-api
// for the full list of fields.
import { text, relationship, password, select } from '@keystone-6/core/fields'
// The document field is a more complicated field, so it's in its own package
// Keystone aims to have all the base field types, but you can make your own
// custom ones.
import { document } from '@keystone-6/fields-document'

// We are using Typescript, and we want our types experience to be as strict as it can be.
// By providing the Keystone generated `Lists` type to our lists object, we refine
// our types to a stricter subset that is type-aware of other lists in our schema
// that Typescript cannot easily infer.
import { Lists } from '.keystone/types'

import { createSlug } from './utils'

const DocumentFormattingConfig = {
    inlineMarks: {
        bold: true,
        italic: true,
    },
    listTypes: {
        ordered: true,
        unordered: true,
    },
    headingLevels: [1, 2, 3],
    blockTypes: {
        blockquote: true,
    },
    softBreaks: true,
}

// We have a users list, a blogs list, and tags for blog posts, so they can be filtered.
// Each property on the exported object will become the name of a list (a.k.a. the `listKey`),
// with the value being the definition of the list, including the fields.
export const lists: Lists = {
    // Here we define the user list.
    User: list({
        // Here are the fields that `User` will have. We want an email and password so they can log in
        // a name so we can refer to them, and a way to connect users to posts.
        fields: {
            name: text({ validation: { isRequired: true } }),
            email: text({
                validation: { isRequired: true },
                isIndexed: 'unique',
                isFilterable: true,
            }),
            // The password field takes care of hiding details and hashing values
            password: password({ validation: { isRequired: true } }),
        },
        // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
        ui: {
            listView: {
                initialColumns: ['name'],
            },
        },
    }),
    Tool: list({
        fields: {
            name: text({ validation: { isRequired: true }, defaultValue: '' }),
            description: document({
                // @ts-expect-error Ignore missing exported type FormattingConfig from `@keystone-6/fields-document`
                formatting: DocumentFormattingConfig,
                links: true,
            }),
            challenge: document({
                // @ts-expect-error Ignore missing exported type FormattingConfig from `@keystone-6/fields-document`
                formatting: DocumentFormattingConfig,
                links: true,
            }),
            resource: document({
                // @ts-expect-error Ignore missing exported type FormattingConfig from `@keystone-6/fields-document`
                formatting: DocumentFormattingConfig,
                links: true,
            }),
            status: select({
                options: [
                    { label: 'Published', value: 'published' },
                    { label: 'Draft', value: 'draft' },
                ],
                // We want to make sure new tools start off as a draft when they are created
                defaultValue: 'draft',
                ui: {
                    displayMode: 'segmented-control',
                },
            }),
            categories: relationship({
                ref: 'Category.tools',
                ui: {
                    displayMode: 'cards',
                    cardFields: ['name'],
                    inlineEdit: { fields: ['name'] },
                    linkToItem: true,
                    inlineConnect: true,
                    inlineCreate: { fields: ['name'] },
                },
                many: true,
            }),
            skills: relationship({
                ref: 'Skill.tools',
                ui: {
                    displayMode: 'cards',
                    cardFields: ['name'],
                    inlineEdit: { fields: ['name'] },
                    linkToItem: true,
                    inlineConnect: true,
                    inlineCreate: { fields: ['name'] },
                },
                many: true,
            }),
            // IDEA: Warn users about changing the slug since it will break links
            // TODO: Add 404 redirect for invalid slugs back to the explore page
            slug: text({ defaultValue: '' }),
        },
        hooks: {
            resolveInput: ({ operation, resolvedData }) => {
                if (operation === 'create' && resolvedData) {
                    // @ts-expect-error 2540
                    resolvedData.slug = createSlug(resolvedData.name ?? '')
                }
                return resolvedData
            },
        },
        ui: {
            listView: {
                initialColumns: ['name', 'description', 'categories', 'skills'],
            },
        },
    }),
    Category: list({
        fields: {
            name: text(),
            description: text(),
            tools: relationship({ ref: 'Tool.categories', many: true }),
            skills: relationship({
                ref: 'Skill.category',
                many: true,
            }),
            color: text({ defaultValue: '' }),
        },
    }),
    Skill: list({
        fields: {
            name: text(),
            description: text(),
            tools: relationship({ ref: 'Tool.skills', many: true }),
            category: relationship({
                ref: 'Category.skills',
            }),
        },
    }),
}
