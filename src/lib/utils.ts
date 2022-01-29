export const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

export const cx = (...classes: string[]) => classes.join(' ')
