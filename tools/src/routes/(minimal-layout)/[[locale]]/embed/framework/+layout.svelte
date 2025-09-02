<script lang="ts">
    import 'iframe-resizer/js/iframeResizer.contentWindow'
    import { type Snippet } from 'svelte'

    interface Props {
        children?: Snippet
    }

    let { children }: Props = $props()
</script>

<!--

To embed this widget, add the following code to the parent page:


<style>
  #idg-framework {
    width: 1px;
    min-width: 100%;
    min-height: 500px;
  }
</style>
<script src="https://idg.tools/js/iframeResizer.min.js"></script>
<iframe id="idg-framework" src="https://idg.tools/embed/framework" title="Inner Development Goals Framework"></iframe>
<script>
  iFrameResize({ log: true, checkOrigin: ['https://idg.tools', 'https://idg.community'], inPageLinks: true }, '#idg-framework')
</script>



For embedding in Howspace, use settings in the following format:

Title:
Being - Relationship to Self

Info text:
Scroll to explore the skills of this dimension:

Embed iframe code or URL:
<iframe src="https://idg.tools/embed/framework#being" width="100%"></iframe>

Embed height:
80%

 -->

{@render children?.()}
