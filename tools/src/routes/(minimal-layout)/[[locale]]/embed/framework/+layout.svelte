<script lang="ts">
    import 'iframe-resizer/js/iframeResizer.contentWindow'
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


 -->

<slot />
