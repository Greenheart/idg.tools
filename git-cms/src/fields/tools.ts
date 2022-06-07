import { CustomCmsField, ID, MARKDOWN_FIELD, NAME } from './shared'

export const ToolsFields: CustomCmsField[] = [
    ID,
    NAME,
    {
        label: 'Description',
        name: 'description',
        hint: 'Describe how and why this tool helps people practice inner development for sustainable development.',
        i18n: true,
        ...MARKDOWN_FIELD,
    },
    {
        label: 'Actions',
        name: 'actions',
        hint: 'Call to action. Describe one or more ways people can start using this tool to practice inner development for sustainable development.',
        i18n: true,
        ...MARKDOWN_FIELD,
    },
    {
        label: 'Relevant skills',
        name: 'relevancy',
        hint: 'Link related skills from the IDG framework.',
        widget: 'list',
        i18n: true,
        summary: '{{fields.skill}} - {{fields.score}}',
        // minimize_collapsed: true,
        collapsed: true,
        fields: [
            {
                label: 'Skill',
                name: 'skill',
                widget: 'relation',
                collection: 'skills',
                value_field: 'id',
                search_fields: ['name', 'id'],
                display_fields: ['name'],
                i18n: true,
            },
            {
                label: 'Skill relevancy',
                name: 'score',
                hint: 'Score how relevant this skill is (0-100)',
                min: 0,
                max: 100,
                widget: 'number',
                i18n: true,
            },
        ],
    },
    // TODO: remove old skills from local content files and replace with new structure
    // {
    //     label: 'Skills',
    //     name: 'skills',
    //     hint: 'Link related skills from the IDG framework.',
    //     multiple: true,
    //     widget: 'relation',
    //     collection: 'skills',
    //     value_field: 'id',
    //     search_fields: ['name', 'id'],
    //     display_fields: ['name'],
    //     i18n: true,
    // },
    {
        label: 'Tags',
        name: 'tags',
        hint: 'Add tags to make it easier to categorize different tools, and allow filtering the content.',
        multiple: true,
        widget: 'relation',
        collection: 'tags',
        value_field: 'id',
        search_fields: ['name', 'id'],
        display_fields: ['name'],
        i18n: true,
    },
    {
        label: 'Research & Resources',
        name: 'resources',
        hint: 'List relevant research that supports this tool, and other resources that are relevant.',
        i18n: true,
        ...MARKDOWN_FIELD,
    },
]

/**
 * TODO:
 *
 * - slug field for the permanent ending to the link
 * - link for storing the slugified name + slug that will be used to link to the tool
 */
