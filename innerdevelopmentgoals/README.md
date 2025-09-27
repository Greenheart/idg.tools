# Inner Development Goals - Interactive Widgets

## Add the widget to any website

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

---

## Installation

The widgets come bundled with Inter Variable fonts to be consistent with the Inner Development Goals branding.

- Any website: Add to your website.
- Using npm: Import JS library in your web project.

---

Import the widget you want

For example:

/framework to import the 2023 version of the Inner Development Goals framework
