<script lang="ts">
    import Link from '$shared/components/Link.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import LinkButton from '$shared/components/LinkButton.svelte'
    import { COMMUNITY_LINK } from '$shared/constants'
</script>

<Heading size={1}>How you can contribute</Heading>

<div class="space-y-4 py-12 text-lg sm:text-xl">
    <p>First of all - thanks for taking the time to contribute!</p>

    <p>The Inner Development Goals Community</p>
</div>

<p class="text-center text-sm uppercase">Our three pillars:</p>

<div class="mt-8 grid grid-cols-3 gap-8">
    <div class="text-center">
        <Heading size={2}>Tools</Heading>
        <p class="my-4">
            We're creating an open source library of scientifically-validated tools to develop the
            skills outlined by the IDG framework. Here you can find methods, workshops and resources
            relevant to the skills you want to practice.
        </p>
        <Link href="https://idg.tools" variant="pink">Explore IDG.tools</Link>
    </div>

    <div class="text-center">
        <Heading size={2}>Community</Heading>
        <p class="my-4">
            With hubs in almost 100 cities, this is an emerging network eager to participate,
            explore and co-create. Join local events, connect with the global community and learn
            together.
        </p>
        <Link href={COMMUNITY_LINK} variant="pink">Find your community</Link>
    </div>

    <div class="text-center">
        <Heading size={2}>Stories</Heading>
        <p class="my-4">
            Read stories of how people around the world are using the IDG framework in practice.
            Learn from others and try it with your local hub. Share your own story and help make the
            IDG resources even better!
        </p>
        <Link href="/#stories" variant="pink">Inspire and get inspired</Link>
    </div>
</div>

<Heading class="mb-4 mt-16">Featured stories</Heading>

<!-- 


    - intro: welcome, thank you for being here. This community will only be as good as we make it together. There are several ways you can contribute in a meaningful way, which will have a significant impact for the development of the IDGs.
    
    There are several ways to contribute:
    - To begin with, please participate in hubs local events, global events.
    - Use the IDGs in practice to reach the SDGs
        - Use th toolkit - try it in practice, see what works for you
        - Give feedback and help improve the toolkit
    - Help organising a local IDG hub in your area and bridge the existing communities related to the SDGs and inner development. The IDG community doesn't aim to be "the movement", but rather a place where different SDG-related communities connect and work on their inner development.
    - Translations
        - Help the IDGs become a global movement by translating resources into your own language! In that way, the IDGs become more accessible for more people and we can get inputs from a larger variety of people.
        - ... so we can get help to understand more international nuances and perspecives to help the IDG framework, toolkit and resources more useful.
    - Stories
        - (text finns redan)
        - Share your story!
        - Whether you are a storyteller, writer/journalist or you ...
        - Help us find and share the stories from the IDG community to empower and inspire others to practice the IDG skills. (typ)
        - Join the editorial team for the IDG stories!
    - Design and development
        - Design and develop idg.tools, idg.community and other ways to support the emerging IDG community with tech.
        - (Introduce GitHub...) - this is our main way of collaborating with these Element chat rooms. Everything we are doing is free and open source, so your contributions will be visible.
        - As technologists we have a special responsibility to follow the principles of Humane Technology (LINK) to make sure we use tech to strengthen the IDG movement and create good conditions to help people practice the IDGs (compared to tech which doesn't respect people's attention and agency).





 -->
