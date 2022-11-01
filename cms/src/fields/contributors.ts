import { CustomCmsField, ID, NAME } from './shared'

export const ContributorsFields: CustomCmsField[] = [
    ID,
    NAME,
    {
        label: 'Link',
        name: 'link',
        required: false,
        hint: 'Link to personal webpage, LinkedIn or email',
    },
].map((field) => ({ ...field, i18n: false }))
