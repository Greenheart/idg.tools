export const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

export const cx = (...classes: (string | undefined)[]) =>
    classes.filter(Boolean).join(' ').trim()

/**
 * Test if an URL is external.
 * @param href The URL to test.
 * @returns True if the link is external, and false otherwise.
 */
export function isExternalURL(href: string): boolean {
    const a = document.createElement('a')
    a.href = href
    return window.location.host !== a.host
}

export const getBgOpacity = (routeId: string) => {
    if (routeId === 'explore/[link]') return 75
    if (routeId === 'explore') return 65
    return 55
}
