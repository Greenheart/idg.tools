import sharp from 'sharp'
import FastGlob from 'fast-glob'
import { dirname, resolve, basename, extname } from 'path'
import { fileURLToPath } from 'url'
import { writeFile, stat } from 'fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))

console.log('🌅 Optimizing images...')
const images = await FastGlob(resolve(__dirname, '../source-images', '*.{jpg,png}'))

const outputDir = resolve(__dirname, '../static/images')

/**
 * Get the optimal quality for a given file size
 */
const getImageQuality = (size) => {
    // IDEA: Or maybe use the image dimensions here instead, and reduce quality for larger resolutions.
    // This would remove the need for the stat() call and speed up build times.
    if (size < 1_500_000) {
        return 90
    } else if (size < 2_000_000) {
        return 80
    } else if (size < 3_000_000) {
        return 70
    }
    return 65
}

const getFilenameWithoutExtension = (path) => basename(path, extname(path))

const existing = (await FastGlob(resolve(outputDir, '*.{jpg,webp}'))).map((image) =>
    basename(image),
)

const outputTypes = ['webp', 'jpg']

await Promise.all(
    images.map(async (image) => {
        const missingTypes = outputTypes.filter(
            (type) => !existing.includes(`${getFilenameWithoutExtension(image)}.${type}`),
        )

        // Early exit if we don't need to build this image
        if (!missingTypes.length) return

        console.log(`Missing formats [${missingTypes.join(', ')}] for "${basename(image)}"`)

        const input = sharp(image).rotate()
        const meta = await input.metadata()

        // const width = Math.min(1000, meta.width)
        // const height = Math.min(750, meta.height)
        const size = (await stat(image)).size
        const quality = getImageQuality(size)

        const builtImages = []

        if (missingTypes.includes('webp')) {
            const webp = input
                .resize(meta.width, meta.height)
                .webp({ effort: 6, quality })
                .toBuffer()
                .then((buffer) =>
                    writeFile(
                        resolve(outputDir, `${basename(image, extname(image))}.webp`),
                        buffer,
                        {
                            encoding: 'binary',
                            flag: 'w',
                        },
                    ),
                )
                .catch((err) => console.error('Image transformation failed', err))
            builtImages.push(webp)
        }

        if (missingTypes.includes('jpg')) {
            const jpeg = input
                .resize(meta.width, meta.height)
                .jpeg({ mozjpeg: true, quality })
                .toBuffer()
                .then((buffer) =>
                    writeFile(
                        resolve(outputDir, `${basename(image, extname(image))}.jpg`),
                        buffer,
                        {
                            encoding: 'binary',
                            flag: 'w',
                        },
                    ),
                )
                .catch((err) => console.error('Image transformation failed', err))
            builtImages.push(jpeg)
        }

        return Promise.all(builtImages)
    }),
)
