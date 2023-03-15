import { CmsField } from 'netlify-cms-core'
import { CustomCmsField, ID, MARKDOWN_LINKS_ONLY, NAME } from './shared'

export const HubsFields: CustomCmsField[] = [
    ID,
    NAME,
    // TODO: Add remaining fields
    // TODO: Create a good location input - maybe enter via map (custom netlify CMS widget)? Or typeahead location?
    // Make location optional.
    // Maybe a type selection
    {
        label: 'Intro',
        name: 'intro',
        hint: "A short intro to catch the reader's interest.",
        ...MARKDOWN_LINKS_ONLY,
        required: false,
    },
    {
        label: 'Relevant dimensions',
        name: 'dimensions',
        hint: 'Link the most relevant dimensions from the IDG framework.',
        widget: 'relation',
        collection: 'dimensions',
        value_field: 'id',
        search_fields: ['name', 'id'],
        display_fields: ['name'],
        i18n: false,
        multiple: true,
        required: false,
    },
    {
        label: 'Tags',
        name: 'tags',
        hint: 'Add tags to make it easier to categorise different stories, and allow filtering the content.',
        multiple: true,
        widget: 'relation',
        collection: 'tags',
        value_field: 'id',
        search_fields: ['name', 'id'],
        display_fields: ['name'],
        i18n: false,
        required: false,
    },
    {
        label: 'Updated at',
        name: 'updatedAt',
        widget: 'datetime',
        date_format: 'YYYY-MM-DD',
        time_format: '',
        i18n: false,
        default: '',
        hint: 'By leaving the publishing date empty, it will not be visible on the webpage.',
    } as CmsField,
    // NOTE: Do we need unique links for each entry? Probably not, we could keep it simple for now and only generate IDs.
    // Then always add slug + link in the future if needed.
    {
        label: 'Slug',
        name: 'slug',
        i18n: false,
        widget: 'uniqueSlug',
    },
    {
        label: 'Link',
        name: 'link',
        i18n: false,
        widget: 'hidden',
    },
]
