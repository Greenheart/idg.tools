import sharp from 'sharp'
import FastGlob from 'fast-glob'
import { dirname, resolve, basename, extname } from 'path'
import { fileURLToPath } from 'url'
import { writeFile, stat } from 'fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))

console.log('🌅 Optimizing images...')
const images = await FastGlob(resolve(__dirname, '../source-images', '*.{jpg,png}'))

// const outputDir = resolve(__dirname, '../static/images')
const outputDir = resolve(__dirname, '../optimized-images')

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

/*


images = getImages(inputDir)
uniqueSourceImages = images.map(getFilenameWithoutExtension)

existingImages = getImages(outputDir).map(basename) // keep extension to know which types exist

for image of images
    for type of webp, jpg
        if !existingImages.includes(`${getFilenameWithoutExtension(image)}.${type}`)
            await buildImage(image, type, outputDir)

outputTypes = ['webp', 'jpg']

await Promise.all(images.flatMap(image =>
    outputTypes.map(type => {
        if (!existingImages.includes(`${getFilenameWithoutExtension(image)}.${type}`)) {
            return buildImage(image, type, outputDir)
        }
        return null
    })
))

*/

// const uniqueSourceImages = existing.map(getFilenameWithoutExtension)

// // Skip images that already exist at output destination
// const unique = images.filter((image) => {
//     if (uniqueSourceImages.includes(getFilenameWithoutExtension(image))) {
//     }
// })

console.log({ images, existing })

const outputTypes = ['webp', 'jpg']

await Promise.all(
    images.map(async (image) => {
        const missingTypes = outputTypes.filter(
            (type) => !existing.includes(`${getFilenameWithoutExtension(image)}.${type}`),
        )

        // Early exit if we don't need to build this image
        if (!missingTypes.length) return

        console.log(image, missingTypes)

        const input = sharp(image).rotate()
        const meta = await input.metadata()

        const width = Math.min(1000, meta.width)
        const height = Math.min(750, meta.height)
        const size = (await stat(image)).size
        const quality = getImageQuality(size)

        const builtImages = []

        if (missingTypes.includes('webp')) {
            const webp = input
                .resize(width, height)
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
                .resize(width, height)
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

// await Promise.all(
//     images.map(async (image) => {
//         const input = sharp(image).rotate()
//         const meta = await input.metadata()

//         const width = Math.min(1000, meta.width)
//         const height = Math.min(750, meta.height)
//         const size = (await stat(image)).size
//         const quality = getImageQuality(size)

//         const webp = input
//             .resize(width, height)
//             .webp({ effort: 6, quality })
//             .toBuffer()
//             .then((buffer) =>
//                 writeFile(resolve(outputDir, `${basename(image, extname(image))}.webp`), buffer, {
//                     encoding: 'binary',
//                     flag: 'w',
//                 }),
//             )
//             .catch((err) => console.error('Image transformation failed', err))

//         const jpeg = input
//             .resize(width, height)
//             .jpeg({ mozjpeg: true, quality })
//             .toBuffer()
//             .then((buffer) =>
//                 writeFile(resolve(outputDir, `${basename(image, extname(image))}.jpg`), buffer, {
//                     encoding: 'binary',
//                     flag: 'w',
//                 }),
//             )
//             .catch((err) => console.error('Image transformation failed', err))

//         return webp
//         // return Promise.all([jpeg, webp])
//     }),
// )
