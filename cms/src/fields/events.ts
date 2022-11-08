import { CmsField } from 'netlify-cms-core'
import { CustomCmsField, ID, MARKDOWN_FIELD, NAME } from './shared'

export const EventsFields: CustomCmsField[] = [
    ID,
    NAME,
    {
        label: 'Where',
        name: 'where',
        hint: 'Where is this event happening? E.g. "Online" or in a specific location.',
        ...MARKDOWN_FIELD,
        required: false,
    },
    {
        label: 'Description',
        name: 'description',
        hint: 'Describe the event details and how to participate.',
        ...MARKDOWN_FIELD,
    },
    // IDEA: Maybe include relevant dimensions for the event
    {
        label: 'Relevant dimensions',
        name: 'dimensions',
        hint: 'Link the most relevant dimensions from the IDG framework.',
        widget: 'relation',
        collection: 'dimensions',
        value_field: 'id',
        search_fields: ['name', 'id'],
        display_fields: ['name'],
        i18n: 'duplicate',
        multiple: true,
        required: false,
    },
    {
        label: 'Start date',
        name: 'startDate',
        widget: 'datetime',
        required: true,
        date_format: 'YYYY-MM-DD',
        time_format: 'HH:mm',
    } as CmsField,
    {
        label: 'End date',
        name: 'endDate',
        widget: 'datetime',
        required: true,
        date_format: 'YYYY-MM-DD',
        time_format: 'HH:mm',
    } as CmsField,
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
