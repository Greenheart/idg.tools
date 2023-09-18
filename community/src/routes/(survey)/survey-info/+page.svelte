<script lang="ts">
    import { SURVEY_EMAIL } from '$lib/constants'
    import { Heading, IDGDivider, Markdown, Link } from '$shared/components'
    import { Arrow, Info } from '$shared/icons'

    const t = {
        title1: 'One-Question',
        title2: 'Global Impact',
        subtitle:
            'Shape the understanding of the transformative skills needed for a sustainable future, now.',
        whoTitle: 'Who is doing it?',
        md_whoText:
            'The global study of transformational skills for sustainable development ”One-Question. Global Impact” is led and coordinated by IDG Inner Development Goals AB (svb) registered by organization number: 559314-0675 in Sweden. Inner Development Goals (IDGs) is a not for profit and open-source initiative owned to 100% by the Oak Island Foundation, a not for profit foundation in Sweden.\n\nThe responsibility for the ethical conduct and data handling lie with the IDGs. Executive Director Jan Artem Henriksson and Head of Research Co-creation, Dr. Fredrik Lindencrona, Phd lead this effort.\n\nThe study is conducted in collaboration between IDGs and many international academic partner institutions, IDG partner organizations & hubs and international networks to be able to reach as widely as possible across the globe.\n\nFor any questions, please contact:',
        whyTitle: 'Why do we do it?',
        whyText:
            "In 2015, all members of the United Nations agreed on 17 goals to build a world of peace, dignity and prosperity on a healthy planet. The initiative ”Inner Development Goals” is convinced that understanding and building transformational skills is essential to achieve this global ambition, critical for developing a sustainable future for humanity and planet.\n\nTo understand these transformational skills across the globe, we invite participants to make a Global Impact with one of the most inclusive studies ever on this theme. With your co-creation, we will achieve the vision of being a solid bridge between your knowledge and the impact of people's inner and outer development to manage a better world. Better people, better planet.\n\nThis process will develop a Global IDG Framework, for the first time solidly based on input from all around the world. Answers to this One-Big-Question will be analyzed and processed collaboratively by researchers in many countries across the world.",
        howTitle: 'How is it done?',
        howText:
            'The global study is run as a distributed global collaborative process where country- and language based research team, established in as many countries as possible will collaborate.\n\nCountry teams will be coordinated by two co-leads who are able to work in the key languages of the participating countries and have at least earned a PhD in relevant areas. The teams will include up to ten co-researchers that represent a mix of the relevant cultural/language variations in the country.\n\nThe data for each country and language will be gathered anonymously through the same survey, administered through the Survey Monkey Platform (SMP) where possible and a special questionnaire where SMP is not feasible. In this case, SMP is ran from the Republic of Ireland within the European Union. No identifiable information about participants is collected without direct consent provided.\n\nAll teams will follow the same 4-phase process and ethical procedures (read more below). Active global coordination will happen through the team co-leads working with the core team led by the Head of Research Co-creation at IDGs. These meet regularly for support, learning and joint quality assurance throughout the four main phases.',
        journeyTitle: 'Join the journey',
        journeyTitle2: "Let's be part of\nco-creation",
        milestones: 'Milestones',
        researchers: 'Researchers',
        multipliers: 'Multipliers/Networks',
        milestone1: 'Setting up the system',
        milestone2: 'Data collection',
        milestone3: 'Analysis and prioritisation',
        milestone4: 'Finalise design, present and localise',
        research1: 'Co-create and translate survey',
        research2: 'Build culturally and linguistically diverse teams of researchers',
        research3: 'Develop thematic lists and co-create Delphi prioritisation process',
        research4:
            'Fine-tune the design for the shared global framework. Create minor local adaptations',
        multiplier1: 'Engage global organisations, partners, networks and hubs',
        multiplier2: 'Share widely across the globe',
        multiplier3: 'Engage in Delphi prioritisation process',
        multiplier4: 'Present the updated framework at the IDG Summit in October 2024',
        note: 'Scroll the table to see all details',
        howDoneTitle: 'How is it done?',
        phaseTitle1: 'Phase 1: Setting up the system (March 1 – September 2023)',
        phaseTitle2: 'Phase 2: Data collection (September 2023  –  January 2024)',
        phaseTitle3: 'Phase 3: Analysis & Prioritization (January  –  June 2024)',
        phaseTitle4: 'Phase 4: Finalise design, present and localize (July  –  December 2024)',
        md_phaseText1:
            'During this phase co-creation have been conducted with more than 100 researchers across the globe to develop the survey and other methods. In parallel, information meetings have been conducted with so called multipliers (i.e international networks, global organizations, IDG Partner organizations & IDG Hubs) who are interested to help share the survey to a global audience. To get a comprehensive and inclusive dataset we aim at engaging at least 100 countries with 2M people who view the survey out which 100,000 respond. Researchers and multipliers have quality controlled the automatically generated translations of the survey.',
        md_phaseText2:
            'Data collection starts with the global launch, September 19. The survey will be open for gathering responses during 4 months. Reach into countries will be tracked regularly and fed back to researchers and multipliers to assure that data gathering becomes as broad and inclusive as possible. Multipliers will continually distribute the survey through social media, conferences, emails and other suitable distribution channels.',
        md_phaseText3:
            'Each country research team focuses on the material relevant for their country in one or several relevant languages. The process includes 4 steps:\n\n1. identify all relevant data to answer the One big question,  i.e. the individual and collective transformational skills (including qualities, abilities and skills) relevant to build a sustainable future for people and planet\n\n2. apply thematic analysis systematically to generate a list of transformational skills under each of the five dimensions being, thinking, relating, collaborating and acting\n\n3. co-leads from each country team collaborate to develop a joint comprehensive list of transformational skills and descriptions that can represent the width of concepts across all countries. The skills of the first IDG framework will be taken into account when this list is created to not loose consistency.\n\n4. This joint list will be used in a so called Delphi process to collect feedback on key prioritized transformational skills by all research team members and other respondents that have volunteered to be reached again for later stages of the survey process.\n\nIn addition to this process, qualitative data from groups that may not be able to respond to the survey and/or can be under-represented such as indigenous groups, migrants and people with low ability to read/write will be added to the material during different steps of the process.',
        md_phaseText4:
            'The process will result in a shared global list of transformational skills under the five dimensions of the IDG framework. This final list lay the ground for the Global IDG framework.  The global framework will be designed in collaboration between researchers, key communication specialists for the first IDG framework as well as users of the framework from policy and practice. The framework will be presented at the IDG Summit in October 2024. The global shared framework will be considered the formal framework as the shared concepts and symbols are critical to increase understanding globally.\n\nAfter the shared global framework is presented, each country/language team will start to relocalize the global shared framework to their specific context by revising the descriptions of transformational skills in alignment with what their local list (derived in earlier stages) suggest is necessary to make IDGs relevant in their context. Contextual appropriateness is an important quality to make IDGs work in each context.',
        ethicsPrivacyTitle: 'How is ethics and data privacy secured?',
        ethicsTitle: 'Ethical principles',
        ethicsText:
            'The Inner Development Goals (IDG) is a non-profit organisation for inner development. It does research, collects and communicates science-based skills and qualities that help humanity to “live purposeful, sustainable, and productive lives”. The initiative follows the conviction that work on inner development, both individual and collective, is fundamental in the work to reach a sustainable future for people and planet as expressed in the Sustainable Development Goals. Inner Development Goals and its framework is therefore a resource that is collaboratively developed to bring inner transformation to all global challenges, a resource that everyone everywhere shall have access to. Inner Development Goals follows key principles of ethical conduct as expressed in the UN Human Rights Conventions.',
        privacyTitle: 'Data privacy protection',
        privacyText:
            'All information gathered for the One Question. Global Impact Survey is collected fully anonymously without any opportunity to be traced back to any respondent. The data is protected for use only for the purposes of understanding and acting according to the ethical principles in the section above. No IP-addresses or other sensitive personal identifiable information such as emails is gathered without explicit consent given by the respondent.  Consent to provide email addresses is only used in order to contact respondents for further questions. We will never use any information that respondents consent to provide for any other purpose than what is consented and in line with the ethical principles stated above.',
        contactTitle: 'Who to contact for further questions',
    }

    // TODO: use the selected locale from translations
    const locale = 'en'
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
    <Heading size={3} class="mb-4">{t.phaseTitle1}</Heading>
    <Markdown formatting="limited" source={t.md_phaseText1} />
    <Heading size={3} class="mb-4 mt-8">{t.phaseTitle2}</Heading>
    <Markdown formatting="limited" source={t.md_phaseText2} />
    <Heading size={3} class="mb-4 mt-8">{t.phaseTitle3}</Heading>
    <Markdown formatting="limited" source={t.md_phaseText3} />
    <Heading size={3} class="mb-4 mt-8">{t.phaseTitle4}</Heading>
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
