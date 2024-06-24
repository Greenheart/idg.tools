import { readdir, rm } from 'fs/promises'
import { resolve } from 'path'

const old29kTools = [
    {
        id: 'cl44ijlk90000rmpz4dgf31qr',
        text: 'Self Compassion',
    },
    {
        id: 'cl44ijlka0001rmpzchb06dl2',
        text: 'Purposeful Leadership',
    },
    {
        id: 'cl44ijlka0002rmpzc0sp564z',
        text: 'Acting with Purpose',
    },
    {
        id: 'cl44ijlka0003rmpzc7xz0ntw',
        text: 'Dealing with Stress',
    },
    {
        id: 'cl44ijlka0004rmpz0lan5s7d',
        text: 'Nourishing Relationships',
    },
    {
        id: 'cl44ijlka0005rmpz4op39kof',
        text: 'Deepening Relationships',
    },
    {
        id: 'cl44ijlka0006rmpz9fz38mle',
        text: 'ALIVE: Daily Quests – Pilot',
    },
    {
        id: 'cl44ijlka0007rmpzbqao4czu',
        text: 'Meaning-making in a Crisis',
    },
    {
        id: 'cl44ijlka0008rmpz2pzf2yjs',
        text: 'Values',
    },
    {
        id: 'cl44ijlka0009rmpz0t540wje',
        text: 'Coping with Crisis',
    },
]

const toolsBasePath = resolve(import.meta.dirname, '../src/tools')
const toolIds = new Set(old29kTools.map((t) => `${t.id}.json`))

const toolsLocales = await readdir(toolsBasePath)

for (const locale of toolsLocales) {
    const allTools = await readdir(resolve(toolsBasePath, locale), {
        withFileTypes: true,
    }).then((paths) =>
        paths.filter((path) => path.isFile() && toolIds.has(path.name)).map((x) => x.name),
    )

    for (const tool of allTools) {
        await rm(resolve(toolsBasePath, locale, tool))
    }
}
