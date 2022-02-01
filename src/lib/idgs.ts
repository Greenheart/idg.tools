export const InnerDevelopmentGoals = {
    // IDG colors use original colors, with added alpha transparency in two final characters
    categories: [
        {
            id: 1,
            name: 'Being',
            subtitle: 'Relationship to Self',
            color: 'bg-[#CFB991CC]',
        },
        {
            id: 2,
            name: 'Thinking',
            subtitle: 'Cognitive Skills',
            color: 'bg-[#D88AA1CC]',
        },
        {
            id: 3,
            name: 'Relating',
            subtitle: 'Caring for Others and the World',
            color: 'bg-[#D64F42CC]',
        },
        {
            id: 4,
            name: 'Collaborating',
            subtitle: 'Social Skills',
            color: 'bg-[#ED7239CC]',
        },
        {
            id: 5,
            name: 'Acting',
            subtitle: 'Driving change',
            color: 'bg-[#5E2030B2]',
        },
    ],
    skills: [
        {
            id: 1,
            category: 1,
            name: 'Inner compass',
            description:
                'Having a deeply felt sense of responsibility and commitment to values and purposes relating to the good of the whole.',
        },
        {
            id: 2,
            category: 1,
            name: 'Integrity and Authenticity',
            description:
                'A commitment and ability to act with sincerity, honesty and integrity.',
        },
        {
            id: 3,
            category: 1,
            name: 'Openness and Learning mindset',
            description:
                'Having a basic mindset of curiosity and a willingness to be vulnerable and embrace change and grow.',
        },
        {
            id: 4,
            category: 1,
            name: 'Self-awareness',
            description:
                'Ability to be in reflective contact with own thoughts, feelings and desires; having a realistic self-image and ability to regulate oneself.',
        },
        {
            id: 5,
            category: 1,
            name: 'Presence',
            description:
                'Ability to be in the here and now, without judgement and in a state of open-ended presence.',
        },
        {
            id: 6,
            category: 2,
            name: 'Critical thinking',
            description:
                'Skills in critically reviewing the validity of views, evidence and plans.',
        },
        {
            id: 7,
            category: 2,
            name: 'Complexity awareness',
            description:
                'Understanding of and skills in working with complex and systemic conditions and causalities.',
        },
        {
            id: 8,
            category: 2,
            name: 'Perspective skills',
            description:
                'Skills in seeking, understanding and actively making use of insights from contrasting perspectives.',
        },
        {
            id: 9,
            category: 2,
            name: 'Sense-making',
            description:
                'Skills in seeing patterns, structuring the unknown and being able to consciously create stories.',
        },
        {
            id: 10,
            category: 2,
            name: 'Long-term orientation and Visioning',
            description:
                'Long-term orientation and ability to formulate and sustain commitment to visions relating to the larger context.',
        },
        {
            id: 11,
            category: 3,
            name: 'Appreciation',
            description:
                'Relating to others and to the world with a basic sense of appreciation, gratitude and joy.',
        },
        {
            id: 12,
            category: 3,
            name: 'Connectedness',
            description:
                'Having a keen sense of being connected with and/or being a part of a larger whole, such as a community, humanity or global ecosystem.',
        },
        {
            id: 13,
            category: 3,
            name: 'Humility',
            description:
                "Being able to act in accordance with the needs of the situation without concern for one's own importance.",
        },
        {
            id: 14,
            category: 3,
            name: 'Empathy and Compassion',
            description:
                'Ability to relate to others, oneself and nature with kindness, empathy and compassion and address related suffering',
        },
        {
            id: 15,
            category: 4,
            name: 'Communication skills',
            description:
                'Ability to really listen to others, to foster genuine dialogue, to advocate own views skillfully, to manage conflicts constructively and to adapt communication to diverse groups.',
        },
        {
            id: 16,
            category: 4,
            name: 'Co-creation skills',
            description:
                'Skills and motivation to build, develop and facilitate collaborative relationships with diverse stake-holders, characterized by psychological safety and genuine co-creation.',
        },
        {
            id: 17,
            category: 4,
            name: 'Inclusive mindset and intercultural competence',
            description:
                'Willingness and competence to embrace diversity and include people and collectives with different views and backgrounds.',
        },
        {
            id: 18,
            category: 4,
            name: 'Trust',
            description:
                'Ability to show trust and to create and maintain trusting relationships.',
        },
        {
            id: 19,
            category: 4,
            name: 'Mobilization skills',
            description:
                'Skills in inspiring and mobilizing others to engage in shared purposes.',
        },
        {
            id: 20,
            category: 5,
            name: 'Courage',
            description:
                'Ability to stand up for values, make decisions, take decisive action and, if need be, challenge and disrupt existing structures and views.',
        },
        {
            id: 21,
            category: 5,
            name: 'Creativity',
            description:
                'Ability to generate and develop original ideas, innovate and being willing to disrupt conventional patterns.',
        },
        {
            id: 22,
            category: 5,
            name: 'Optimism',
            description:
                'Ability to sustain and communicate a sense of hope, positive attitude and confidence in the possibility of meaningful change.',
        },
        {
            id: 23,
            category: 5,
            name: 'Perseverance',
            description:
                'Ability to sustain engagement and remain determined and patient even when efforts take a long time to bear fruit.',
        },
    ],
}

export type IDGSkill = typeof InnerDevelopmentGoals['skills'][number]
export type IDGCategory = typeof InnerDevelopmentGoals['categories'][number]

export const category = (id: IDGCategory['id']): IDGCategory =>
    InnerDevelopmentGoals.categories.find((c) => c.id === id) as IDGCategory

export const skill = (id: IDGSkill['id']): IDGSkill =>
    InnerDevelopmentGoals.skills.find((s) => s.id === id) as IDGSkill

export const skillsInCategory = (id: IDGCategory['id']): IDGSkill[] =>
    InnerDevelopmentGoals.skills.filter((s) => s.category === id)
