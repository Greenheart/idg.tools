import { CustomField, ID, NAME } from './shared'

export const ContributorsFields: CustomField[] = [
    ID,
    NAME,
    {
        widget: 'string',
        label: 'Link',
        name: 'link',
        required: false,
        hint: 'Link to personal webpage, LinkedIn or email',
    },
].map((field) => ({ ...field, i18n: false }))
