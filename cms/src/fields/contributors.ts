import { CustomCmsField, ID, NAME } from './shared'

// IDEA: Maybe show the stories a contributor is associated with as a two way relationship.
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
