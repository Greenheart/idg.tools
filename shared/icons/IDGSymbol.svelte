<script lang="ts">
    import type { Skill, Dimension, IDGSymbols } from '../types'

    let className = ''
    export { className as class }
    export let style = ''

    export const DIMENSION_SYMBOLS = {
        being: 'ckzi3855r0086e2n0smi0mew5',
        thinking: 'ckzi38ilp0149e2n0idgw5zqv',
        relating: 'ckzi38wix0218e2n09ncgnmxx',
        collaborating: 'ckzi3951t0293e2n0n3bykbg5',
        acting: 'ckzi39fwv0374e2n0d2eynda4',
    }

    export const DIMENSIONS: Record<Dimension['id'] | Skill['id'], keyof typeof DIMENSION_SYMBOLS> =
        {
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

    export let id: Skill['id'] | Dimension['id']
    export let symbols: IDGSymbols

    // TODO: Remove this when we release the full framework
    const TMP_SYMBOL = DIMENSION_SYMBOLS[DIMENSIONS[id]]
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    stroke="currentColor"
    viewBox="0 0 198.43 198.43"
    class={className}
    {style}
>
    <!-- TODO: Replace with this when publishing -->
    <!-- {#each symbols[id] as path} -->
    {#each symbols[TMP_SYMBOL] as path}
        <path d={path} />
    {/each}
</svg>
