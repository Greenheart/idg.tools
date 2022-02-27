import slugify from 'slugify'

export const slugifyName = (string: string) =>
    slugify(string, {
        replacement: '-', // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: true, // strip special characters except replacement, defaults to `false`
        locale: 'sv', // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
    })

export const createToolLink = (name: string, uniqueSlug: string) =>
    `${slugifyName(name)}-${uniqueSlug}`
