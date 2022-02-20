<script lang="ts">
    // TODO: Add types for Document type, maybe from keystone, maybe from keystone/document-renderer on github
    export let node: unknown

    console.log(node)

    // IDEA: Maybe simplify compared to DocumentRender and use only one set of renderers without us needing to override them
    // This should work since we have a simple app. And by doing this, we can simplify the renderer even further
</script>

<div class={$$props.class}>
    <!-- TODO: parse nodes and return correct components -->
</div>
