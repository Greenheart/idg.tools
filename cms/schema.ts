/*
Welcome to the schema! The schema is the heart of Keystone.

Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name.
A field: The individual bits of data on your list, each with its own type. You can see some of the lists in what we use below.
*/

// Like the `config` function we use in keystone.ts, we use functions
// for putting in our config so we get useful errors. With typescript,
// we get these even before code runs.
import { list } from '@keystone-6/core'
import cuid from 'cuid'

// We're using some common fields. Check out https://keystonejs.com/docs/apis/fields#fields-api
// for the full list of fields.
import { text, relationship, password, select } from '@keystone-6/core/fields'
// The document field is a more complicated field, so it's in its own package
// Keystone aims to have all the base field types, but you can make your own
// custom ones.
import { document, DocumentFieldConfig } from '@keystone-6/fields-document'

// We are using Typescript, and we want our types experience to be as strict as it can be.
// By providing the Keystone generated `Lists` type to our lists object, we refine
// our types to a stricter subset that is type-aware of other lists in our schema
// that Typescript cannot easily infer.
import { Lists } from '.keystone/types'

import { createBackwardsCompatibleLink } from './utils'
import {
    UserRole,
    isAdmin,
    hasPermission,
    Session,
    hasAPIToken,
    anyPass,
} from './auth'

const DocumentFormattingConfig: DocumentFieldConfig<any>['formatting'] = {
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

export enum ToolStatus {
    PUBLISHED = 'published',
    DRAFT = 'draft',
}

/**
 * Only allow admins to view and update all users. Otherwise only yourself.
 */
const filterUsers = ({ session }: { session: Session }) => {
    if (session?.data.role === UserRole.ADMIN) return true
    return { id: { equals: session?.data.id } }
}

// Each property on the exported lists object will become the name of a list (a.k.a. the `listKey`),
// with the value being the definition of the list, including the fields.
export const lists: Lists = {
    User: list({
        access: {
            operation: {
                delete: isAdmin,
                // NOTE: Might need to allow access to query users if we add the contributors feature
                query: hasPermission(UserRole.EDITOR),
                update: hasPermission(UserRole.EDITOR),
                create: isAdmin,
            },
            filter: {
                query: filterUsers,
                update: filterUsers,
            },
        },
        // Here are the fields that `User` will have. We want an email and password so they can log in.
        fields: {
            name: text({ validation: { isRequired: true } }),
            email: text({
                validation: { isRequired: true },
                isIndexed: 'unique',
                isFilterable: true,
            }),
            role: select({
                options: [
                    { label: 'Editor', value: UserRole.EDITOR },
                    { label: 'Reviewer', value: UserRole.REVIEWER },
                    { label: 'Admin', value: UserRole.ADMIN },
                ],
                type: 'enum',
                defaultValue: UserRole.EDITOR,
                validation: { isRequired: true },
                ui: { displayMode: 'select' },
                access: {
                    update: isAdmin,
                },
            }),
            // The password field takes care of hiding details and hashing values
            password: password({ validation: { isRequired: true } }),
        },
        // Here we can configure the Admin UI. We want to show a user's name and email in the list view
        ui: {
            listView: {
                initialColumns: ['name', 'email'],
            },
        },
    }),
    Tool: list({
        fields: {
            name: text({
                validation: { isRequired: true },
                ui: {
                    createView: {
                        fieldMode: 'edit',
                    },
                },
            }),
            description: document({
                formatting: DocumentFormattingConfig,
                links: true,
            }),
            challenge: document({
                formatting: DocumentFormattingConfig,
                links: true,
            }),
            resources: document({
                formatting: DocumentFormattingConfig,
                links: true,
            }),
            status: select({
                options: [
                    { label: 'Published', value: ToolStatus.PUBLISHED },
                    { label: 'Draft', value: ToolStatus.DRAFT },
                ],
                type: 'enum',
                defaultValue: ToolStatus.DRAFT,
                validation: { isRequired: true },
                ui: {
                    displayMode: 'select',
                },
                access: {
                    update: hasPermission(UserRole.REVIEWER),
                },
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
            slug: text({
                validation: { isRequired: false },
                ui: {
                    itemView: {
                        fieldMode: 'hidden',
                    },
                },
                hooks: {
                    validateInput: ({
                        operation,
                        resolvedData,
                        addValidationError,
                    }) => {
                        if (operation === 'update' && resolvedData.slug) {
                            addValidationError(`Cannot update slug once set`)
                        }
                    },
                },
                access: {
                    update: isAdmin,
                },
            }),
            link: text({
                validation: { isRequired: false },
                ui: {
                    itemView: {
                        fieldMode: 'read',
                    },
                },
            }),
            tags: relationship({
                ref: 'Tag.tools',
                ui: {
                    displayMode: 'cards',
                    cardFields: ['name'],
                    linkToItem: true,
                    inlineConnect: true,
                },
                many: true,
            }),
        },
        hooks: {
            resolveInput: ({ operation, resolvedData, item }) => {
                const data = { ...resolvedData }
                if (operation === 'create') {
                    data.slug = cuid.slug()
                }

                if (
                    typeof data.name === 'string' &&
                    (typeof data.slug === 'string' ||
                        typeof item?.slug === 'string')
                ) {
                    data.link = createBackwardsCompatibleLink(
                        data.name,
                        data.slug ?? item!.slug,
                    )
                }
                return data
            },
        },
        ui: {
            listView: {
                initialColumns: [
                    'name',
                    'categories',
                    'skills',
                    'status',
                    'link',
                ],
            },
            createView: {
                defaultFieldMode: 'hidden',
            },
        },
        access: {
            operation: {
                delete: hasPermission(UserRole.REVIEWER),
                create: hasPermission(UserRole.EDITOR),
                update: hasPermission(UserRole.EDITOR),
                query: anyPass(hasPermission(UserRole.EDITOR), hasAPIToken),
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
        access: {
            operation: {
                create: isAdmin,
                update: isAdmin,
                delete: isAdmin,
                query: anyPass(hasPermission(UserRole.EDITOR), hasAPIToken),
            },
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
        access: {
            operation: {
                create: isAdmin,
                update: isAdmin,
                delete: isAdmin,
                query: anyPass(hasPermission(UserRole.EDITOR), hasAPIToken),
            },
        },
    }),
    Tag: list({
        fields: {
            name: text({ validation: { isRequired: true } }),
            tools: relationship({ ref: 'Tool.tags', many: true }),
        },
        access: {
            operation: {
                create: hasPermission(UserRole.EDITOR),
                update: hasPermission(UserRole.EDITOR),
                delete: isAdmin,
                query: anyPass(hasPermission(UserRole.EDITOR), hasAPIToken),
            },
        },
    }),
}
