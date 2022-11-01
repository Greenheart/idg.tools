import { CustomCmsField, ID, MARKDOWN_FIELD, TITLE } from './shared'

export const StoriesFields: CustomCmsField[] = [
    ID,
    TITLE,
    {
        label: 'Intro',
        name: 'intro',
        hint: "A short intro to catch the reader's interest.",
        i18n: true,
        ...MARKDOWN_FIELD,
        required: false,
    },
    {
        label: 'Story',
        name: 'story',
        hint: 'Your story of how you practiced inner development and how it helped you with sustainable development.',
        i18n: true,
        ...MARKDOWN_FIELD,
    },
    // TODO: maybe use multiselect instead of list widget
    {
        label: 'Relevant dimensions',
        name: 'dimensions',
        hint: 'Link the most relevant dimensions from the IDG framework.',
        widget: 'list',
        i18n: true,
        summary: '{{fields.dimension}}',
        collapsed: true,
        required: false,
        fields: [
            {
                label: 'Dimension',
                name: 'dimension',
                widget: 'relation',
                collection: 'dimensions',
                value_field: 'id',
                search_fields: ['name', 'id'],
                display_fields: ['name'],
                i18n: 'duplicate',
            },
        ],
    },
    {
        label: 'Contributors',
        name: 'contributors',
        hint: 'Give credit to the people behind the story by adding their names.',
        multiple: true,
        widget: 'relation',
        collection: 'contributors',
        value_field: 'id',
        search_fields: ['name', 'id'],
        display_fields: ['name'],
        i18n: true,
    },
    // TODO: add image as a required field since a story without an image is too boring
    {
        label: 'Slug',
        name: 'slug',
        i18n: 'duplicate',
        widget: 'uniqueSlug',
    },
    {
        label: 'Link',
        name: 'link',
        i18n: 'duplicate',
        widget: 'hidden',
    },
]
