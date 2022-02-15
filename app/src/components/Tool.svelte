<script lang="ts" context="module">
    export const TOOLS = {
        'inner-compass': {
            name: 'Finding your inner compass',
            description:
                'Inner compass: having a deeply felt sense of responsibility and commitment to values and purposes relating to the good of the whole.',
            challenge:
                'Write down how you think people should treat themselves, others, and the planet. How closely do you follow these expectations? Is there anything you want to try to change? Starting with today, and think about how it feels to act closer to your values.',
            resource:
                'Researchers from 29k.org have created a lesson on this topic.',
        },
    }
</script>

<script lang="ts">
    export let id: keyof typeof TOOLS

    const tool = TOOLS[id]
</script>

<h2 class="py-4 text-xl font-semibold">{tool.name}</h2>

<p class="py-4">{tool.description}</p>

<div class="rounded-2xl bg-white p-4 py-4 text-stone-900">
    <h3 class="pb-2 text-xl font-bold">Your challenge</h3>
    <p>{tool.challenge}</p>
</div>

<p class="py-4">{tool.resource}</p>

git config user.name "Chris" git config user.email ""
