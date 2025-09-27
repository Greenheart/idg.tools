# Inner Development Goals - Interactive Widgets

## Add the widget to any website

Add the following HTML code where you want the widget to show up. For the best result, ensure the element with `id="idg-widget"` can cover the full page width.

```html
<div id="idg-widget"></div>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/Greenheart/idg.tools@main/innerdevelopmentgoals/dist/framework.css"
    crossorigin="anonymous"
/>
<script
    src="https://cdn.jsdelivr.net/gh/Greenheart/idg.tools@main/innerdevelopmentgoals/dist/framework.umd.js"
    crossorigin="anonymous"
></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        IDGFramework(document.getElementById('idg-widget'))
    })
</script>
```

By loading code from a CDN, no dedicated server is needed to host the widget.

---

The widget bundles the Inter Variable font to be consistent with the Inner Development Goals branding.
