import cuid from 'cuid'

// NOTE: Proof of concept that it would be possible to use /explore/[sluggified-name]-[cuid.slug()]
// to allow URLS to update to reflect the name of the content published

console.log(cuid.slug())
;[
    `/explore/kjhjkuiy-asdasdas-asasd-${cuid.slug()}`,
    `/explore/kjhjkuiy-asdasdas-asasd`,
].forEach((s) =>
    console.log(
        cuid.isSlug(s.split('-').at(-1)),
        `- URL "${s}" ends with slug`,
    ),
)
