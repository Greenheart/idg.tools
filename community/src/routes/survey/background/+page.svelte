<script lang="ts">
    import { Heading, IDGDivider, Markdown } from '$shared/components'

    const t = {
        title1: 'One-Question',
        title2: 'Global Impact',
        subtitle:
            'Shape the understanding of the transformative skills needed for a sustainable future, now.',
        whoTitle: 'Who is doing it?',
        md_whoText:
            'The global study of transformational skills for sustainable development ”One-Question. Global Impact” is led and coordinated by IDG Inner Development Goals AB (svb) registered by organization number: 559314-0675 in Sweden. Inner Development Goals (IDGs) is a not for profit and open-source initiative owned to 100% by the Oak Island Foundation, a not for profit foundation in Sweden.\n\nThe responsibility for the ethical conduct and data handling lie with the IDGs. Executive Director Jan Artem Henriksson and Head of Research Co-creation, Dr. Fredrik Lindencrona, Phd lead this effort.\n\nThe study is conducted in collaboration between IDGs and many international academic partner institutions, IDG partner organizations & hubs and international networks to be able to reach as widely as possible across the globe.\n\nFor any questions: please contact [onequestion@innerdevelopmentgoals.org](mailto:onequestion@innerdevelopmentgoals.org)',
        whyTitle: 'Why do we do it?',
        whyText:
            "In 2015, all members of the United Nations agreed on 17 goals to build a world of peace, dignity and prosperity on a healthy planet. The initiative ”Inner Development Goals” is convinced that understanding and building transformational skills is essential to achieve this global ambition, critical for developing a sustainable future for humanity and planet.\n\nTo understand these transformational skills across the globe, we invite participants to make a Global Impact with one of the most inclusive studies ever on this theme. With your co-creation, we will achieve the vision of being a solid bridge between your knowledge and the impact of people's inner and outer development to manage a better world. Better people, better planet.\n\nThis process will develop a Global IDG Framework, for the first time solidly based on input from all around the world. Answers to this One-Big-Question will be analyzed and processed collaboratively by researchers in many countries across the world.",
        howTitle: 'How is it done?',
        howText:
            'The global study is run as a distributed global collaborative process where country- and language based research team, established in as many countries as possible will collaborate.\n\nCountry teams will be coordinated by two co-leads who are able to work in the key languages of the participating countries and have at least earned a PhD in relevant areas. The teams will include up to ten co-researchers that represent a mix of the relevant cultural/language variations in the country.\n\nThe data for each country and language will be gathered anonymously through the same survey, administered through the Survey Monkey Platform (SMP) where possible and a special questionnaire where SMPis not feasible. In this case, SMP is ran from the Republic of Ireland within the European Union. No identifiable information about participants is collected without direct consent provided.\n\nAll teams will follow the same 4-phase process and ethical procedures (see next slide). Active global coordination will happen through the team co-leads working with the core team led by the Head of Research Co-creation at IDGs. These meet regularly for support, learning and joint quality assurance throughout the four main phases.',
        journeyTitle: 'Join the journey',
        journeyTitle2: "Let's be part of the co-creation",
        milestones: 'Milestones',
        researchers: 'Researchers',
        multipliers: 'Multipliers/Networks',
        date1: 'Mar - Sep 19, 2023',
        date2: 'Sep 19 - Jan 2024',
        date3: 'Jan - Jun 2024',
        date4: 'Jul - Dec 2024',
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
    }
</script>

<div class="mx-auto">
    <Heading size={1} class="mb-4 font-black uppercase"
        ><span class="text-thinking">{t.title1}</span><br /><span class="text-acting"
            >{t.title2}</span
        ></Heading
    >
    <p class="text-xl md:text-2xl font-medium">{t.subtitle}</p>

    <IDGDivider />

    <Heading size={1} tag="h2" class="mb-4 text-collaborating">{t.whoTitle}</Heading>
    <Markdown formatting="linksOnly" source={t.md_whoText} />

    <IDGDivider />

    <Heading size={1} tag="h2" class="mb-4 text-collaborating">{t.whyTitle}</Heading>
    <Markdown formatting="linksOnly" source={t.whyText} />

    <IDGDivider />

    <Heading size={1} tag="h2" class="mb-4 text-collaborating">{t.howTitle}</Heading>
    <Markdown formatting="linksOnly" source={t.howText} />

    <IDGDivider />

    <Heading size={1} tag="h2" class="mb-4 text-collaborating uppercase font-black"
        ><span class="text-acting">{t.journeyTitle}</span><br />{t.journeyTitle2}</Heading
    >
    <div class="grid grid-cols-3 gap-8 mt-8">
        <div class="grid gap-4 text-right content-start">
            <Heading size={3} class="uppercase">{t.milestones}</Heading>
            <p>
                <span class="font-semibold text-collaborating">{t.date1}</span><br />
                {t.milestone1}
            </p>
            <p>
                <span class="font-semibold text-collaborating">{t.date2}</span><br />
                {t.milestone2}
            </p>
            <p>
                <span class="font-semibold text-collaborating">{t.date3}</span><br />
                {t.milestone3}
            </p>
            <p>
                <span class="font-semibold text-collaborating">{t.date4}</span><br />
                {t.milestone4}
            </p>
        </div>
        <div class="grid gap-4 content-start">
            <Heading size={3} class="uppercase">{t.researchers}</Heading>
            <p>
                {t.research1}
            </p>
            <p>
                {t.research2}
            </p>
            <p>
                {t.research3}
            </p>
            <p>
                {t.research4}
            </p>
        </div>
        <div class="grid gap-4 content-start">
            <Heading size={3} class="uppercase">{t.multipliers}</Heading>
            <p>
                {t.multiplier1}
            </p>
            <p>
                {t.multiplier2}
            </p>
            <p>
                {t.multiplier3}
            </p>
            <p>
                {t.multiplier4}
            </p>
        </div>
    </div>
</div>
