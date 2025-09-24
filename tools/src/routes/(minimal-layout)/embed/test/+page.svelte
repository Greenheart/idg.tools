<script>
    import { onMount } from 'svelte'

    onMount(() => {
        // @ts-expect-error this is a known global
        iFrameResize(
            {
                // log: true,
                checkOrigin: ['http://localhost:5173', 'http://localhost:4173'],
                inPageLinks: true,
            },
            '#idg-framework',
        )
    })
</script>

<svelte:head>
    <script src="/js/iframeResizer.min.js"></script>
</svelte:head>

<div style="height: 50vh"></div>

<iframe id="idg-framework" src="/embed/framework" title="IDG Framework"></iframe>

<div style="height: 50vh"></div>

<style>
    #idg-framework {
        width: 1px;
        min-width: 100%;
        min-height: 500px;
    }
</style>
