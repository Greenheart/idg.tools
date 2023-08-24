<script lang="ts">
    import { getRGBColor } from '$shared/utils'
    import {
        hierarchy,
        interpolateZoom,
        pack,
        transition,
        type HierarchyCircularNode,
        type ZoomView,
    } from 'd3'

    export let data: unknown

    const width = 800 //the outer width of the chart, in pixels
    const height = width // the outer height of the chart, in pixels
    const margin = 20 //the overall margin between the circle packs to the viewport edge

    const packFunc = (packData: any) =>
        pack()
            .size([width - margin, height - margin])
            .padding(3)(
            hierarchy(packData)
                .sum((d) => d.value)
                .sort((a, b) => (b?.value ?? 0) - (a?.value ?? 0)),
        )

    const root = packFunc(data)

    /**
     * Expose the activeFocus to let other components react when this value changes
     * Learn more: https://svelte.dev/docs/component-directives#bind-property
     */
    export let activeFocus = root

    let view: ZoomView
    let activeZoomK = (width / root.r) * 2
    let activeZoomA = root.x
    let activeZoomB = root.y

    const inactiveZoomTo = (v: ZoomView) => {
        activeZoomK = width / v[2]
        view = v
        activeZoomA = v[0]
        activeZoomB = v[1]
    }

    inactiveZoomTo([root.x, root.y, root.r * 2 + margin])

    const zoom = (d: HierarchyCircularNode<unknown>, e: Event) => {
        e.stopPropagation()

        activeFocus = d

        transition()
            .duration(600)
            .tween('zoom', () => {
                var i = interpolateZoom(view, [
                    activeFocus.x,
                    activeFocus.y,
                    activeFocus.r * 2 + margin,
                ])
                return function (t) {
                    inactiveZoomTo(i(t))
                }
            })
    }

    const IDG_COLORS = {
        being: '#d4b88c',
        thinking: '#e585a1',
        relating: '#e84139',
        collaborating: '#ff6821',
        acting: '#661a30',
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<svg {width} {height} on:click={(e) => zoom(root, e)}>
    <g transform="translate({width / 2},{height / 2})">
        <!-- IDEA: Maybe making the skills selectable too would be a good idea, since that would allow opening details with more information -->
        {#each root.descendants().slice(1) as rootData}
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <circle
                class={rootData.parent
                    ? rootData.children
                        ? 'node'
                        : 'node node--leaf'
                    : 'node node--root'}
                fill={rootData.children ? getRGBColor(rootData.data.id) ?? '#f5f5f5' : '#f5f5f5'}
                on:click={(e) => {
                    if (activeFocus !== rootData) zoom(rootData, e)
                }}
                transform="translate({(rootData.x - activeZoomA) * activeZoomK},{(rootData.y -
                    activeZoomB) *
                    activeZoomK})"
                r={rootData.r * activeZoomK}
            ></circle>
        {/each}
        <!--
            This always renders all the descendants of the root.
            It would be useful to know it was showing a skill or a dimension
        -->
        {#each root.descendants() as rootDes}
            <text
                class="label"
                style="fill-opacity: {rootDes.parent === activeFocus
                    ? 1
                    : 0}; display: {rootDes.parent === activeFocus ? 'inline' : 'none'};"
                transform="translate({(rootDes.x - activeZoomA) * activeZoomK},{(rootDes.y -
                    activeZoomB) *
                    activeZoomK})">{rootDes.data.name}</text
            >

            <!-- TODO: Add text wrapping for labels longer than a max length -->
            <!-- TODO: Add background and padding behind the text labels -->
        {/each}
    </g>
</svg>

<style>
    .node {
        cursor: pointer;
    }

    .node:hover {
        stroke: #000;
        stroke-width: 1.5px;
    }

    .node--leaf {
        fill: white;
    }

    .label {
        font-size: 15px;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        text-anchor: middle;
        text-shadow:
            0 1px 0 #fff,
            1px 0 0 #fff,
            -1px 0 0 #fff,
            0 -1px 0 #fff;
    }

    .label,
    .node--root {
        pointer-events: none;
        user-select: none;
    }
</style>
