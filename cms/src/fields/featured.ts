import { CustomCmsField } from './shared'

export const FeaturedContentFields: CustomCmsField[] = [
    {
        name: 'featured',
        required: false,
        label: '✍️ Featured content',
        widget: 'relation',
        multiple: true,
        // NOTE: This becomes a problem since the collection has to be hard coded. This means this won't be possible to use for featured tools for example.
        // Unless we do a client side hack to only show the field right kind of featured content to the users when they visit this page
        // Or we could create a custom widget to handle this, but that's not as straightforward. And not worth it at this moment.
        // Better to let featured content be edited manually for now, and maybe change this in the future if we need to.
        collection: 'stories',
        value_field: 'id',
        search_fields: ['title', 'id'],
        display_fields: ['title'],
        hint: 'Select the content you want to feature on the IDG.community website. You can change the order by removing and adding stories in the order you want them.',
    },
]
