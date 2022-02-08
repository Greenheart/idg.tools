<script lang="ts">
    /**
     * Enable visual layout debugging
     */
    export let debug = false
</script>

<section
    class="fixed top-0 bottom-0 right-0 left-0 mx-auto h-full max-h-[950px] w-full max-w-md bg-[url(/images/david-marcu-78A265wPiO4-unsplash.jpg)] bg-cover bg-fixed bg-center bg-no-repeat text-stone-50"
>
    <div
        class="grid h-full grid-rows-[max-content_1fr_max-content] bg-stone-900 bg-opacity-[55%]"
    >
        <div class="grid px-8" class:bg-green-400={debug}>
            <slot name="header" />
        </div>
        <div class="grid px-8" class:bg-blue-400={debug}>
            <slot name="main" />
        </div>
        <div class="grid px-8" class:bg-orange-300={debug}>
            <slot name="footer" />
        </div>
    </div>
</section>
