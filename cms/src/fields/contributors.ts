import { CustomCmsField, ID, NAME } from './shared'

export const ContributorsFields: CustomCmsField[] = [
    ID,
    NAME,
    {
        label: 'Link',
        name: 'link',
        i18n: 'duplicate',
        required: false,
        hint: 'Link to personal webpage, LinkedIn or email',
    },
]
