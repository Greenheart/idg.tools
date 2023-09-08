<script lang="ts">
    import { Link, Heading, LinkButton, Markdown, Divider } from '$shared/components'
    import Meta from '$components/Meta.svelte'
    import {
        COMMUNITY_HUBS_LINK,
        COMMUNITY_LINK,
        ELEMENT_COMMUNITY_LINK,
        ELEMENT_LOCALIZATION_LINK,
        ELEMENT_STORIES_LINK,
        ELEMENT_TOOLS_LINK,
        GITHUB_LINK,
        IDG_CMS_LINK,
    } from '$shared/constants'
    import { STORIES_ABOUT_LINK } from '$lib/constants'

    type Option = {
        title: string
        text: string
        link: string
    }
    const options: Option[] = [
        {
            title: 'Join or start an IDG Hub in your area',
            text: `One of the best way to get started is to join one of the existing IDG Hubs and explore the IDGs in practice together with others. [Learn more](${COMMUNITY_LINK}) and [find IDG Hubs near you](${COMMUNITY_HUBS_LINK}).`,
            link: 'hubs',
        },
        {
            title: 'Use the IDG Toolkit and give feedback',
            text: `Use the [IDG Toolkit](https://idg.tools) in practice. Learn what works for you and what needs to be improved. Give feedback via the forms on the website. This will help the team better understand how to continously improve the content, research, design and tech. Thank you!`,
            link: 'toolkit',
        },
        {
            title: 'Using the IDGs in practice? Share your stories',
            text: `This is a community-driven project where you can make a meaningful contribution to not just learn more about the IDGs yourself - but also empower many others. Welcome to get started by learning more about [IDG community stories](${STORIES_ABOUT_LINK})!`,
            link: 'stories',
        },
        {
            title: 'Storyteller? Join the editorial team for IDG community stories',
            text: `Our vision is to bring people together, and create a vast library of stories exploring how to use the IDGs in practice to reach the SDGs. To make this happen, we need your help to gather stories from around the world, edit them together with the main authors, and help them get published. To get started, [learn more about stories](${STORIES_ABOUT_LINK}) and [introduce yourself in the stories Element chat room](${ELEMENT_STORIES_LINK}).`,
            link: 'stories-curation',
        },
        {
            title: 'Localise and translate the IDGs into your language',
            text: `To support the emerging IDG movement to become truly global, we need to make the IDGs relevant and accessible to people all around the world. This is not just about translations - but more importantly, it's about adapting the content and language so it makes sense in your local context. And to make this happen, we need your help! We use the [IDG Community CMS](${IDG_CMS_LINK}) to coordinate our localization efforts. Welcome to join the Element chat room for the [IDG Localization Team](${ELEMENT_LOCALIZATION_LINK}) to get involved!`,
            link: 'localisation',
        },
        {
            title: 'Design and software development',
            text: `Help create digital experiences that make it easy and fun to use the IDGs in practice to reach the SDGs. We're a small team with high ambitions and would love to get your help! This is only the beginning of what we want to create - an active open source community where people use technology to make meaningful contributions for a future where humanity and the living planet thrive together 🌱\n\nWant to get involved? Visit our [GitHub project](${GITHUB_LINK}) and join the Element chat rooms where we talk about [IDG.tools](${ELEMENT_TOOLS_LINK}) and [IDG.community](${ELEMENT_COMMUNITY_LINK}).`,
            link: 'design-and-development',
        },
    ]
</script>

<Meta title="How to contribute" />

<div class="mx-auto max-w-3xl sm:text-lg">
    <Heading size={1} class="text-collaborating"
        >How you can co-create with the IDG community</Heading
    >
    <p class="my-8 text-lg lg:text-xl">
        First of all - thanks for being here! There are several ways you can contribute in a
        meaningful way, which could make a significant impact for the development of the IDGs and
        the SDGs.
    </p>

    <div class="mb-8 grid gap-y-2">
        {#each options as { title, link }, i}
            <Link href={`#${link}`} variant="orange">{i + 1}. {title}</Link>
        {/each}
    </div>

    <Divider class="my-12" />

    <div class="space-y-16">
        {#each options as { title, text, link }, i}
            <div class={i > 0 ? 'pt-4' : undefined} id={link}>
                <Heading>{i + 1}. {title}</Heading>
                <Markdown formatting="linksOnly" source={text} />
            </div>
        {/each}

        <!-- 
            IDEA: Maybe add this as the first option since this is most welcoming to new people

            <div>
        <Heading>Participate in local or global events</Heading>
        <p>
            Help organising a local IDG Hub in your area and bridge the existing communities related
            to the SDGs and inner development. The IDG community doesn't aim to be "the movement",
            but rather a place where different SDG-related communities connect and work on their
            inner development.
        </p>
    </div> -->
        <p class="text-lg font-bold sm:text-xl md:text-2xl">
            Welcome! Looking forward to co-creating with you :)
        </p>
    </div>
</div>

<div class="flex justify-center py-12">
    <LinkButton href="/" variant="secondary-inverted" size="lg">Back to IDG.community</LinkButton>
</div>
