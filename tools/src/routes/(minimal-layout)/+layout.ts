import type { IDGSymbols } from '$shared/types'

export const load = async ({ fetch }) => {
    const symbols: IDGSymbols = await fetch('/symbols.json').then((res) => res.json())

    return { symbols }
}
