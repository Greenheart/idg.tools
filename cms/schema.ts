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

// We're using some common fields. Check out https://keystonejs.com/docs/apis/fields#fields-api
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
    blockTypes: {
        blockquote: true,
    },
    softBreaks: true,
}

// Each property on the exported lists object will become the name of a list (a.k.a. the `listKey`),
// with the value being the definition of the list, including the fields.
export const lists: Lists = {
    User: list({
        // Here are the fields that `User` will have. We want an email and password so they can log in
        // a name so we can refer to them, and a way to connect users to posts.
        fields: {
            name: text({ validation: { isRequired: true } }),
            // TODO: Require special auth token to be able to access the GraphQL API.
            email: text({
                validation: { isRequired: true },
                isIndexed: 'unique',
                isFilterable: true,
            }),
            // TODO: add user roles
            /**
             * 1) Editor
             * - create new Tools (always published with draft status)
             * - edit existing Tools (all fields except `Tool.status`)
             *
             * 2) Admin
             * - everything that Editors can do
             * - update `Tool.status` (publish/unpublish)
             * - remove Tools
             * - create new users
             * - create, update, delete IDG Categories and Skills
             */
            // The password field takes care of hiding details and hashing values
            password: password({ validation: { isRequired: true } }),
        },
        // Here we can configure the Admin UI. We want to show a user's name in the Admin UI
        ui: {
            listView: {
                initialColumns: ['name', 'email'],
            },
        },
    }),
    // TODO: Prevent data loss when creating a new item, and clicking outside.
    // IDEA: See if keystone has good UX tips for solving this.
    Tool: list({
        fields: {
            name: text({
                validation: { isRequired: true },
                defaultValue: '',
                ui: {
                    createView: {
                        fieldMode: 'edit',
                    },
                },
            }),
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
            resources: document({
                // @ts-expect-error Ignore missing exported type FormattingConfig from `@keystone-6/fields-document`
                formatting: DocumentFormattingConfig,
                links: true,
            }),
            status: select({
                options: [
                    { label: 'Published', value: 'published' },
                    { label: 'Draft', value: 'draft' },
                ],
                type: 'enum',
                // We want to make sure new tools start off as a draft when they are created
                defaultValue: 'draft',
                validation: { isRequired: true },
                ui: { displayMode: 'select' },
            }),
            categories: relationship({
                ref: 'Category.tools',
                ui: {
                    displayMode: 'cards',
                    cardFields: ['name'],
                    linkToItem: true,
                    inlineConnect: true,
                },
                many: true,
            }),
            skills: relationship({
                ref: 'Skill.tools',
                ui: {
                    displayMode: 'cards',
                    cardFields: ['name'],
                    linkToItem: true,
                    inlineConnect: true,
                },
                many: true,
            }),
            // TODO: Add UI text to warn users about changing the slug since it will break links
            // IDEA: Or use a cuid at the end of each dynamic url to let the slug always be the latest sluggified name
            // This would make URL:s less nice-looking, but greatly improving the UX for both editors and users, since they can see the updated, sluggified name
            // And because we can let anyone to update the name of the tool, since the final part is always the same
            // NOTE: Using a slug at the end of each tool url would however require a static cuid.slug() or similar that is set permanently when creating the initial document.
            slug: text({
                defaultValue: '',
                validation: { isRequired: true },
                ui: {
                    itemView: {
                        fieldMode: 'read',
                    },
                },
            }),
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
                initialColumns: [
                    'name',
                    'description',
                    'categories',
                    'skills',
                    'status',
                ],
            },
            createView: {
                defaultFieldMode: 'hidden',
            },
        },
    }),
    Category: list({
        fields: {
            name: text({ validation: { isRequired: true } }),
            description: text({ validation: { isRequired: true } }),
            tools: relationship({ ref: 'Tool.categories', many: true }),
            skills: relationship({
                ref: 'Skill.category',
                many: true,
            }),
            color: text({ defaultValue: '', validation: { isRequired: true } }),
        },
    }),
    Skill: list({
        fields: {
            name: text({ validation: { isRequired: true } }),
            description: text({ validation: { isRequired: true } }),
            tools: relationship({ ref: 'Tool.skills', many: true }),
            category: relationship({
                ref: 'Category.skills',
            }),
        },
    }),
    // IDEA: When content changes during development, trigger a rebuild of the `content.json` automatically
    // NOTE: However, since the schema doesn't change too often, it will not be worth the investment for the long term, once we have a stable schema.

    // IDEA: Export seed data from the local CMS to make local development easier for other developers.
}
