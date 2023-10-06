import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'
import content from '../static/content.json' assert { type: 'json' }

const { dimensions } = content['en']

export const COLORS = {
    ckzi3855r0086e2n0smi0mew5: 'being',
    ckzi3a4z90431e2n04kx2pbq2: 'being',
    ckzi3am4y0486e2n04obcy6hi: 'being',
    ckzi3ayvo0547e2n03lvu0goo: 'being',
    ckzi3b8sz0614e2n0ijnnazce: 'being',
    ckzi3blfz0687e2n0huf88a8y: 'being',
    ckzi38ilp0149e2n0idgw5zqv: 'thinking',
    ckzi3cikk0766e2n0j9my4e46: 'thinking',
    ckzi3cvpf0851e2n00bcmzsgz: 'thinking',
    ckzi3d9gp0942e2n0lvc6k1nh: 'thinking',
    ckzi3dk3h1039e2n0qxij7ooh: 'thinking',
    ckzi3dtdk1142e2n0m9v02uf5: 'thinking',
    ckzi38wix0218e2n09ncgnmxx: 'relating',
    ckzi3e4as1251e2n0fz614xn4: 'relating',
    ckzi3ef9s1366e2n082dhihsm: 'relating',
    ckzi3eor91487e2n0qdoa639u: 'relating',
    ckzi3ezut1614e2n07fab18pt: 'relating',
    ckzi3951t0293e2n0n3bykbg5: 'collaborating',
    ckzi3f9cj1747e2n0taoxah1j: 'collaborating',
    ckzi3fnea2022e2n0r588if1r: 'collaborating',
    ckzi3g17e2167e2n055jpiaaz: 'collaborating',
    ckzi3gb7f2318e2n04kesx118: 'collaborating',
    ckzi3gknp2475e2n0dm59ikcn: 'collaborating',
    ckzi39fwv0374e2n0d2eynda4: 'acting',
    ckzi3gu6u2638e2n0fmr9gv86: 'acting',
    ckzi3h80v2807e2n0l44d20qr: 'acting',
    ckzi3hi072982e2n0r4cdkqjy: 'acting',
    ckzi3hqs63163e2n03h36pb73: 'acting',
}

async function getSVGSymbol(dimension, skillId) {
    const index = skillId ? dimension.skills.findIndex((id) => id === skillId) : 0
    const raw = await readFile(
        resolve(`tools/static/symbols/${COLORS[dimension.id]}_${index}.svg`),
        {
            encoding: 'utf-8',
        },
    )

    const svgPaths = raw
        .split('\n')
        .slice(1, -1)
        .map((x) => x.trim().replace('<path d="', '').replace('"/>', ''))

    return [skillId ? skillId : dimension.id, svgPaths]
}

const symbols = await Promise.all(
    dimensions.flatMap((dimension) => [
        getSVGSymbol(dimension),
        ...dimension.skills.map((skill) => getSVGSymbol(dimension, skill)),
    ]),
).then((res) => res.reduce((result, [id, paths]) => ({ ...result, [id]: paths }), {}))

await writeFile(resolve('shared/symbols.json'), JSON.stringify(symbols), {
    encoding: 'utf-8',
})
