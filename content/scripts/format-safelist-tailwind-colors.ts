const dimensionSlugs = ['being', 'thinking', 'relating', 'collaborating', 'acting']

function getCommunitySafelist() {
    return dimensionSlugs.flatMap((name) => [`bg-${name}`, `text-${name}`])
}

function getToolsSafelist() {
    return dimensionSlugs.flatMap((name) => [
        `bg-${name}`,
        `text-${name}`,
        `group-hover:!text-${name}`,
        `hover:outline-${name}`,
        `outline-${name}`,
    ])
}

console.log('\nNOTE: Add these safelist classes to the Tailwind config:\n')

console.log(
    '\nCommunity => ./community/src/app.css\n\n' +
        getCommunitySafelist()
            .map((c) => `@source inline(${c});`)
            .join('\n'),
)
console.log(
    '\n\n\nTools => ./tools/src/app.css\n\n' +
        getToolsSafelist()
            .map((c) => `@source inline(${c});`)
            .join('\n') +
        '\n',
)
