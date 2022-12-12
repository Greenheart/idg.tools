<script lang="ts">
    import Link from '$shared/components/Link.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import Meta from '$components/Meta.svelte'
    import {
        COMMUNITY_HUBS_LINK,
        COMMUNITY_LINK,
        ELEMENT_COMMUNITY_LINK,
        ELEMENT_STORIES_LINK,
        ELEMENT_TOOLS_LINK,
        GITHUB_LINK,
    } from '$shared/constants'
    import LinkButton from '$shared/components/LinkButton.svelte'
    import { STORIES_ABOUT_LINK } from '$lib/constants'
</script>

<Meta title="How to contribute" />

<div class="mx-auto max-w-3xl">
    <Heading size={1} class="text-collaborating">How you can support the IDG community</Heading>
    <p class="my-8">
        First of all - thanks for being here! There are several ways you can contribute in a
        meaningful way, which could make a significant impact for the development of the IDGs and
        the SDGs.
    </p>

    <div class="space-y-16 text-lg sm:text-xl">
        <div class="space-y-4">
            <Heading>1. Join or start an IDG Hub in your area</Heading>
            <p>
                One of the best way to get started is to join one of the existing IDG Hubs and
                explore the IDGs in practice together with others.
                <Link href={COMMUNITY_LINK} variant="pink">Learn more</Link> and
                <Link href={COMMUNITY_HUBS_LINK} variant="pink">find IDG Hubs near you</Link>.
            </p>
        </div>
        <!-- <div class="space-y-4">
            <Heading>2. Use the IDG toolkit and give feedback</Heading>
            <p>
                Use <Link href="https://idg.tools" variant="pink">IDG.tools</Link> in practice. Learn
                what works for you and what needs to be improved. Give feedback via the forms on the
                website. This will help the team better understand how to continously improve the content,
                research, design and tech. Thank you!
            </p>
        </div> -->
        <div class="space-y-4">
            <Heading>2. Using the IDGs in practice? Share your stories</Heading>
            <p>
                This is a community-driven project where you can make a meaningful contribution to
                not just learn more about the IDGs yourself - but also empower many others. Welcome
                to get started by learning more <Link href={STORIES_ABOUT_LINK} variant="pink"
                    >about IDG community stories</Link
                >!
            </p>
        </div>
        <div class="space-y-4">
            <Heading>3. Storyteller? Join the editorial team for IDG Community Stories</Heading>
            <p>
                Our vision is to bring people together, and create a vast library of stories
                exploring how to use the IDGs in practice to reach the SDGs. To make this happen, we
                need your help to gather stories from around the world, edit them together with the
                main authors, and help them get published. To get started, <Link
                    href={STORIES_ABOUT_LINK}
                    variant="pink">learn more about stories</Link
                > and <Link href={ELEMENT_STORIES_LINK} variant="pink"
                    >introduce yourself in the stories chat room</Link
                >.
            </p>
        </div>
        <!-- <div>
        <Heading>Translate the IDGs into your language</Heading>
        <p>
            Help make the IDGs accessible in your local language. Both IDG.tools and IDG.community
            are built to handle translations.
        </p>
    </div> -->
        <div class="space-y-4">
            <Heading>4. Design and software development</Heading>
            <p>
                Help create digital experiences that make it easy and fun to use the IDGs in
                practice to reach the SDGs. Want to get involved? <Link
                    href={GITHUB_LINK}
                    variant="pink">Check us out on GitHub</Link
                > and join chat rooms where we talk about <Link
                    href={ELEMENT_TOOLS_LINK}
                    variant="pink">tools</Link
                > and the <Link href={ELEMENT_COMMUNITY_LINK} variant="pink">community website</Link
                >.
            </p>
        </div>

        <Heading>Welcome! Looking forward to co-creating with you :)</Heading>
    </div>
</div>

<div class="flex justify-center py-12">
    <LinkButton href="/" variant="primary" size="lg">Back to IDG.community</LinkButton>
</div>

<!-- <div>
        <Heading>Participate in local or global events</Heading>
        <p>
            Help organising a local IDG Hub in your area and bridge the existing communities related
            to the SDGs and inner development. The IDG community doesn't aim to be "the movement",
            but rather a place where different SDG-related communities connect and work on their
            inner development.
        </p>
    </div> -->

<!--


    - intro: welcome, thank you for being here. This community will only be as good as we make it together. There are several ways you can contribute in a meaningful way, which will have a significant impact for the development of the IDGs.
    
    There are several ways to participate and contribute:
    - To begin with, please participate in IDG Hubs local events, global events.
    - Use the IDGs in practice to reach the SDGs
        - Use the toolkit - try it in practice, see what works for you
        - Give feedback and help improve the toolkit
    - Help organising a local IDG Hub in your area and bridge the existing communities related to the SDGs and inner development. The IDG community doesn't aim to be "the movement", but rather a place where different SDG-related communities connect and work on their inner development.
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
