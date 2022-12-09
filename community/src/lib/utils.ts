export * from '$shared/utils'

export const _getBgOpacity = (routeId: string) => {
    if (routeId === '[link]') return 75
    return 55
}
