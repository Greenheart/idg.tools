import { CmsCollection } from 'netlify-cms-core'
import { STORIES_LEARN_MORE } from './constants'

import { ContributorsFields } from './fields/contributors'
import { DimensionsFields } from './fields/dimensions'
// import { FeaturedContentFields } from './fields/settings/featured'
import { SkillsFields } from './fields/skills'
import { StoriesFields } from './fields/stories'
import { TagsFields } from './fields/tags'
import { ToolsFields } from './fields/tools'

export const COLLECTIONS = [
    {
        name: 'skills',
        label: '🌱 Skills',
        label_singular: 'Skill',
        folder: '/content/src/skills',
        fields: SkillsFields,
        extension: 'json',
        format: 'json',
        create: false,
        delete: false,
        publish: false,
        summary: '{{fields.name}}',
        identifier_field: 'id',
        slug: '{{id}}',
        i18n: true,
        description: 'The 23 skills of the Inner Development Goals.',
    },
    {
        name: 'dimensions',
        label: '🌿 Dimensions',
        label_singular: 'Dimension',
        folder: '/content/src/dimensions',
        fields: DimensionsFields,
        extension: 'json',
        format: 'json',
        create: false,
        delete: false,
        publish: false,
        summary: '{{fields.name}}',
        identifier_field: 'id',
        slug: '{{id}}',
        i18n: true,
        description: 'The 5 dimensions of the Inner Development Goals.',
    },
    {
        name: 'tools',
        label: '📚 Tools',
        label_singular: 'Tool',
        folder: '/content/src/tools',
        fields: ToolsFields,
        extension: 'json',
        format: 'json',
        create: true,
        delete: false,
        publish: false,
        summary: '{{fields.name}}',
        identifier_field: 'id',
        slug: '{{id}}',
        i18n: true,
        description: 'Tools are resources that help practicing the Inner Development Goals.',
    },
    {
        name: 'stories',
        label: '✍️ Stories',
        label_singular: 'Story',
        folder: '/content/src/stories',
        fields: StoriesFields,
        extension: 'json',
        format: 'json',
        create: true,
        delete: false,
        publish: false,
        summary: '{{fields.title}}',
        slug: '{{id}}',
        identifier_field: 'id',
        i18n: true,
        description: `Stories to share insights and learnings of how the IDGs are being used in practice, to reach the SDGs.`,
    },
    {
        name: 'contributors',
        label: '👥 Contributors',
        label_singular: 'Contributor',
        folder: '/content/src/contributors',
        fields: ContributorsFields,
        extension: 'json',
        format: 'json',
        create: true,
        delete: false,
        publish: false,
        summary: '{{fields.name}}',
        identifier_field: 'id',
        slug: '{{id}}',
        i18n: false,
        description: 'Give credit to the people who help co-create the IDGs.',
    },
    {
        name: 'tags',
        label: '🏷 Tags',
        label_singular: 'Tag',
        folder: '/content/src/tags',
        fields: TagsFields,
        extension: 'json',
        format: 'json',
        create: true,
        delete: false,
        publish: false,
        summary: '{{fields.name}}',
        identifier_field: 'id',
        slug: '{{id}}',
        i18n: true,
        description: 'Create tags and use them to organize different tools.',
    },
    // NOTE: Since Netlify CMS doesn't support localization for file collections, we need to edit this manually for now
    // There are experiments available for how to solve this, but it's not worth the effort at the moment.
    // {
    //     name: 'settings',
    //     label: '⚙️ Settings',
    //     description: 'Here you can change settings like which stories that should be featured.',
    //     files: [
    //         {
    //             label: 'Featured Content',
    //             name: 'featured',
    //             file: '/content/src/settings/featured.json',
    //             fields: FeaturedContentFields,
    //         },
    //     ],
    // }
] as CmsCollection[]
