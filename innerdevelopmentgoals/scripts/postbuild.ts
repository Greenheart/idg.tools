import { rename, glob } from 'fs/promises'
import { resolve } from 'path'

const files = await Array.fromAsync(glob('./dist/**/*.cjs'))

await Promise.all(
    files.map((file: string) => rename(resolve(file), resolve(file.replace('.cjs', '.js')))),
)
