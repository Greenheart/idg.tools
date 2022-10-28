export const clickOutside = (
    node: HTMLElement,
    handler: (() => void) | undefined,
): { destroy: () => void } => {
    const onClick = handler
        ? (event: MouseEvent) =>
              node &&
              !node.contains(event.target as HTMLElement) &&
              !event.defaultPrevented &&
              handler()
        : () => {}

    document.addEventListener('click', onClick, true)

    return {
        destroy: () => document.removeEventListener('click', onClick, true),
    }
}
