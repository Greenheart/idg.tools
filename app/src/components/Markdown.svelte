<script lang="ts">
    import { compile } from 'mdsvex'

    let source: string
    let className: string | undefined = undefined
    export { className as class }

    const transformed_code = await compile(`

${source}`)
</script>

<div class={className}>
    {transformed_code}
</div>
