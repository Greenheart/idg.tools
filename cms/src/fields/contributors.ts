import { CustomCmsField, ID, NAME } from './shared'

export const ContributorsFields: CustomCmsField[] = [
    ID,
    NAME,
    { label: 'Link', name: 'link', i18n: 'duplicate' },
]
