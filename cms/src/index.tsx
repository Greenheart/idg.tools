import CMS from 'netlify-cms-app'
import { CmsCollection } from 'netlify-cms-core'

import { default as UniqueId } from './widgets/UniqueId'
import { default as UniqueSlug } from './widgets/UniqueSlug'

import { DEFAULT_LANGUAGE_TAG, LANGUAGE_TAGS } from '../../shared/constants'
import { ToolsFields } from './fields/tools'
import { SkillsFields } from './fields/skills'
import { DimensionsFields } from './fields/dimensions'
import { TagsFields } from './fields/tags'
import { StoriesFields } from './fields/stories'
import { ContributorsFields } from './fields/contributors'

CMS.init({
    config: {
        load_config_file: false,
        editor: { preview: false },
        media_folder: '/tools/static/images',
        backend: {
            name: 'github',
            repo: 'Greenheart/idg.tools',
            branch: 'main',
            open_authoring: true,
        },
        local_backend: {
            url: 'http://localhost:2030/api/v1',
        },
        publish_mode: 'editorial_workflow',
        i18n: {
            structure: 'single_file',
            locales: LANGUAGE_TAGS,
            default_locale: DEFAULT_LANGUAGE_TAG,
        },
        collections: [
            {
                name: 'tools',
                label: 'Tools',
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
                description:
                    'Tools are resources that help practicing the Inner Development Goals.',
            },
            {
                name: 'stories',
                label: 'Stories',
                label_singular: 'Story',
                folder: '/content/src/stories',
                fields: StoriesFields,
                extension: 'json',
                format: 'json',
                create: true,
                delete: false,
                publish: false,
                summary: '{{ fields.name }}',
                slug: '{{id}}',
                identifier_field: 'id',
                i18n: true,
                description:
                    'Stories to share insights and learnings of how the IDGs are being used in practice, to reach the SDGs.',
            },
            {
                name: 'contributors',
                label: 'Contributors',
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
                i18n: true,
                description:
                    'Give credit to the people who help co-create the IDGs.',
            },
            {
                name: 'tags',
                label: 'Tags',
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
                description:
                    'Create tags and use them to organize different tools.',
            },
            {
                name: 'skills',
                label: 'Skills',
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
                label: 'Dimensions',
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
        ] as CmsCollection[],
    },
})

CMS.registerWidget(UniqueId)
CMS.registerWidget(UniqueSlug)
