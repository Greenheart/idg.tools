import { CustomCmsField } from '../shared'

export const FeaturedContentFields: CustomCmsField[] = [
    {
        name: 'stories',
        required: false,
        label: '✍️ Featured Stories',
        label_singular: 'Featured Story',
        widget: 'relation',
        multiple: true,
        // NOTE: Maybe we want the same featured content in all languages, or maybe not.
        // With `duplicate` they will be consistent, but with `i18n: true` we could have variations
        i18n: 'duplicate',
        collection: 'stories',
        value_field: 'id',
        search_fields: ['title', 'id'],
        display_fields: ['title'],
        hint: 'Select the stories you want to feature on the IDG.community website. You can change the order by removing and adding stories in the order you want them.',
    },
    {
        name: 'events',
        required: false,
        label: '📅 Featured Events',
        label_singular: 'Featured Event',
        widget: 'relation',
        multiple: true,
        // NOTE: Maybe we want the same featured content in all languages, or maybe not.
        // With `duplicate` they will be consistent, but with `i18n: true` we could have variations
        i18n: 'duplicate',
        collection: 'events',
        value_field: 'id',
        search_fields: ['name', 'id'],
        display_fields: ['name'],
        hint: 'Select the events you want to feature on the IDG.community website. You can change the order by removing and adding stories in the order you want them.',
    },
]
