<script lang="ts">
    import { page } from '$app/stores'
    import { SURVEY_EMAIL } from '$lib/constants'
    import { Heading, IDGDivider, Markdown, Link, LocaleSwitcher } from '$shared/components'
    import { DEFAULT_LOCALE_IDENTIFIER, IDG_WEBSITE } from '$shared/constants'
    import { Arrow, Info } from '$shared/icons'
    import type { PageData } from './$types'

    export let data: PageData
    $: ({ surveyInfo: t, supportedLocales } = data)

    const locale = $page.params.locale ?? DEFAULT_LOCALE_IDENTIFIER

    const monthOnly: Partial<Intl.DateTimeFormatOptions> = { month: 'short' }
    const yearAndMonth: Partial<Intl.DateTimeFormatOptions> = { month: 'short', year: 'numeric' }
    const dayAndMonth: Partial<Intl.DateTimeFormatOptions> = {
        month: 'short',
        day: 'numeric',
    }
    const fullDate: Partial<Intl.DateTimeFormatOptions> = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }

    const dates = {
        phase1: {
            start: new Date('2023-03-01').toLocaleDateString(locale, monthOnly),
            end: new Date('2023-09-19').toLocaleDateString(locale, fullDate),
        },
        phase2: {
            start: new Date('2023-09-19').toLocaleDateString(locale, dayAndMonth),
            end: new Date('2024-01-15').toLocaleDateString(locale, yearAndMonth),
        },
        phase3: {
            start: new Date('2024-01-15').toLocaleDateString(locale, monthOnly),
            end: new Date('2024-06-30').toLocaleDateString(locale, yearAndMonth),
        },
        phase4: {
            start: new Date('2024-07-01').toLocaleDateString(locale, monthOnly),
            end: new Date('2024-12-01').toLocaleDateString(locale, yearAndMonth),
        },
    }

    const people = {
        fredrik:
            'Dr. Fredrik Lindencrona, PhD\nHead of Research Co-Creation\nInner Development Goals',
        jan: 'Jan Artem Henriksson\nExecutive Director\nInner Development Goals',
    }
</script>

<header class="relative flex items-center justify-between pt-6 pb-12">
    <Link href={IDG_WEBSITE} unstyled class="z-30 flex h-[60px] items-center gap-4">
        <img src="/images/IDG-logo.svg" alt="IDG logo" width="112" height="60" />
    </Link>
    <LocaleSwitcher
        {supportedLocales}
        pathname={$page.url.pathname}
        currentLocale={$page.params.locale}
    />
</header>

<!--
    TODO: Maybe add proper support for RTL languages in the layout
    https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support
-->

<div class="mx-auto">
    <Heading size={1} class="mb-4 font-black uppercase"
        ><span class="text-thinking">{t.title1}</span><br /><span class="text-acting"
            >{t.title2}</span
        ></Heading
    >
    <p class="text-xl md:text-2xl font-medium max-w-prose">{t.subtitle}</p>

    <IDGDivider />

    <Heading size={1} tag="h2" class="mb-8 text-collaborating">{t.whoTitle}</Heading>
    <Markdown formatting="linksOnly" source={t.md_whoText} />
    <Link href={`mailto:${SURVEY_EMAIL}`} variant="orange">{SURVEY_EMAIL}</Link>

    <IDGDivider />

    <Heading size={1} tag="h2" class="mb-8 text-collaborating">{t.whyTitle}</Heading>
    <Markdown formatting="linksOnly" source={t.whyText} />

    <IDGDivider />

    <Heading size={1} tag="h2" class="mb-8 text-collaborating">{t.howTitle}</Heading>
    <Markdown formatting="linksOnly" source={t.howText} />

    <IDGDivider />

    <Heading
        size={1}
        tag="h2"
        class="mb-8 text-collaborating uppercase font-black whitespace-pre-line"
        ><span class="text-acting">{t.journeyTitle}</span><br />{t.journeyTitle2}</Heading
    >

    <p class="sm:hidden flex items-center p-2 bg-being text-sm">
        <Info class="mr-2" />{t.note}
        <span class="ml-2">
            (<Arrow left class="font-light !text-base" /><Arrow
                right
                class="font-light !text-base"
            />)
        </span>
    </p>

    <table class="mt-4 text-sm">
        <thead>
            <tr>
                <th class="font-bold uppercase text-xl text-right">{t.milestones}</th>
                <th class="font-bold uppercase text-xl text-left">{t.researchers}</th>
                <th class="font-bold uppercase text-xl text-left">{t.multipliers}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="text-right">
                    <p>
                        <span class="font-semibold text-collaborating"
                            >{dates.phase1.start} → {dates.phase1.end}</span
                        ><br />
                        {t.milestone1}
                    </p>
                </td>
                <td>
                    <p>
                        {t.research1}
                    </p>
                </td>
                <td>
                    <p>
                        {t.multiplier1}
                    </p>
                </td>
            </tr>
            <tr>
                <td class="text-right">
                    <p>
                        <span class="font-semibold text-collaborating"
                            >{dates.phase2.start} → {dates.phase2.end}</span
                        ><br />
                        {t.milestone2}
                    </p>
                </td>
                <td>
                    <p>
                        {t.research2}
                    </p>
                </td>
                <td>
                    <p>
                        {t.multiplier2}
                    </p>
                </td>
            </tr>
            <tr>
                <td class="text-right">
                    <p>
                        <span class="font-semibold text-collaborating"
                            >{dates.phase3.start} → {dates.phase3.end}</span
                        ><br />
                        {t.milestone3}
                    </p>
                </td>
                <td>
                    <p>
                        {t.research3}
                    </p>
                </td>
                <td>
                    <p>
                        {t.multiplier3}
                    </p>
                </td>
            </tr>
            <tr>
                <td class="text-right">
                    <p>
                        <span class="font-semibold text-collaborating"
                            >{dates.phase4.start} → {dates.phase4.end}</span
                        ><br />
                        {t.milestone4}
                    </p>
                </td>
                <td>
                    <p>
                        {t.research4}
                    </p>
                </td>
                <td>
                    <p>
                        {t.multiplier4}
                    </p>
                </td>
            </tr>
        </tbody>
    </table>

    <IDGDivider />

    <Heading size={1} tag="h2" class="mb-8 text-collaborating">{t.howDoneTitle}</Heading>
    <Heading size={3} class="mb-4"
        >{t.phaseTitle1} ({dates.phase1.start} → {dates.phase1.end})</Heading
    >
    <Markdown formatting="limited" source={t.md_phaseText1} />
    <Heading size={3} class="mb-4 mt-8"
        >{t.phaseTitle2} ({dates.phase2.start} → {dates.phase2.end})</Heading
    >
    <Markdown formatting="limited" source={t.md_phaseText2} />
    <Heading size={3} class="mb-4 mt-8"
        >{t.phaseTitle3} ({dates.phase3.start} → {dates.phase3.end})</Heading
    >
    <Markdown formatting="limited" source={t.md_phaseText3} />
    <Heading size={3} class="mb-4 mt-8"
        >{t.phaseTitle4} ({dates.phase4.start} → {dates.phase4.end})</Heading
    >
    <Markdown formatting="limited" source={t.md_phaseText4} />

    <IDGDivider />

    <Heading size={1} tag="h2" class="mb-4 text-collaborating">{t.ethicsPrivacyTitle}</Heading>
    <Heading size={3} class="mb-4 mt-8">{t.ethicsTitle}</Heading>
    <Markdown formatting="linksOnly" source={t.ethicsText} />
    <Heading size={3} class="mb-4 mt-8">{t.privacyTitle}</Heading>
    <Markdown formatting="linksOnly" source={t.privacyText} />

    <IDGDivider />

    <Heading size={1} tag="h2" class="mb-8 text-collaborating">{t.contactTitle}</Heading>

    <div
        class="grid gap-8 gap-y-16 md:grid-cols-2 max-w-screen-md mx-auto text-sm xs:text-base place-content-center"
    >
        <div>
            <img
                src={'/images/fredrik.jpg'}
                alt="Fredrik Lindencrona"
                class="mb-4"
                width={300}
                height={400}
            />
            <p class="whitespace-pre-line">{people.fredrik}</p>
            <Link href={`mailto:${SURVEY_EMAIL}`} variant="orange">{SURVEY_EMAIL}</Link>
        </div>
        <div>
            <img
                src={'/images/jan.jpg'}
                alt="Jan Artem Henriksson"
                class="mb-4"
                width={300}
                height={400}
            />
            <p class="whitespace-pre-line">{people.jan}</p>
            <Link href={`mailto:${SURVEY_EMAIL}`} variant="orange">{SURVEY_EMAIL}</Link>
        </div>
    </div>
</div>

<style lang="postcss">
    td {
        @apply align-top;
    }

    tr {
        border-top: 1rem solid transparent;
    }

    tr:first-child {
        border: 0;
    }

    td,
    th {
        border-left: 2rem solid transparent;
    }
    tr > td:first-child {
        border: 0;
    }

    table {
        overflow-x: auto;
        border-collapse: collapse;
        border-spacing: 0;
        max-width: 100%;
        vertical-align: top;
        display: inline-block;
    }

    tbody {
        -webkit-overflow-scrolling: touch;
    }
</style>
