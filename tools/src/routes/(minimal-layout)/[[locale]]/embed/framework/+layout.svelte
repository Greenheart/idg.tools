<!-- TODO: Add the iframe resize script to the embedding site too -->
<!-- TODO: configure the embedding site correctly -->

<script lang="ts">
    import { IDG_WEBSITE } from '$shared/constants'
    import 'iframe-resizer/js/iframeResizer.contentWindow'
</script>

<svelte:head>
    <script>
        // Since we can't add multiple targetOrigin, we might just as well disable it
        // I guess we could allow only a few origins on the server side, and respond with 403 otherwise.
        window.iFrameResizer = {
            targetOrigin: IDG_WEBSITE,
        }
    </script>
    <script src="/js/iframeResizer.contentWindow.min.js"></script>
</svelte:head>

<slot />
