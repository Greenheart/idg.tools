export * from '$shared/utils'

export const getBgOpacity = (routeId: string) => {
    if (routeId === '[link]') return 75
    return 55
}
