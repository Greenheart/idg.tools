import { graphql as octokitGraphQL } from '@octokit/graphql'
import { GITHUB_API_TOKEN } from '$env/static/private'
import { dev } from '$app/environment'

// IDEA: can this be provided when starting up the app, and written to a static file or something?
// Maybe write a short shell script which adds this to the environment variables in both dev and prod
import { execSync } from 'child_process'

const GIT_COMMIT = execSync('git rev-parse --short HEAD').toString()

const REPOSITORY = dev
    ? {
          name: 'playground',
          owner: 'Greenheart',
          id: 'R_kgDOIEbazg',
      }
    : {
          name: 'idg.tools',
          owner: 'Greenheart',
          id: 'R_kgDOGwukUQ',
      }

const LABEL_IDS = dev
    ? {
          NEEDS_REVIEW: 'LA_kwDOIEbazs8AAAABENw4jA',
          FEEDBACK: 'LA_kwDOIEbazs8AAAABENw8mQ',
          CONTENT_SUGGESTION: 'LA_kwDOIEbazs8AAAABENw_UQ',
      }
    : {
          NEEDS_REVIEW: 'LA_kwDOGwukUc8AAAABENwnuQ',
          FEEDBACK: 'LA_kwDOGwukUc8AAAABENtM9w',
          CONTENT_SUGGESTION: 'LA_kwDOGwukUc8AAAABENs-UA',
      }

const TEMPLATES = {
    FEEDBACK: {
        title: 'App Feedback',
        labelIds: [LABEL_IDS.NEEDS_REVIEW, LABEL_IDS.FEEDBACK],
        disclaimer:
            '## Disclaimer\nThe following feedback was submitted by an user of https://idg.tools. This has not yet been reviewed or approved by the contributors.\n\n---\n',
    },
    CONTENT_SUGGESTION: {
        title: 'App Content Suggestion',
        labelIds: [LABEL_IDS.NEEDS_REVIEW, LABEL_IDS.CONTENT_SUGGESTION],
        disclaimer:
            '## Disclaimer\nThe following content suggestion was submitted by an user of https://idg.tools. This has not yet been reviewed or approved by the contributors.\n\n---\n',
    },
}

type ISSUE_TYPES = keyof typeof TEMPLATES

// NOTE: Seems like there's a rate limiting of 5000/requests per hour, so it might be worth to write multiple issues at once in the future to scale up.
export async function createIssue({
    userContent,
    type,
    url,
}: {
    userContent: string
    type: ISSUE_TYPES
    url: string
}) {
    const { title, labelIds, disclaimer } = TEMPLATES[type]

    const body = `${disclaimer}
- URL: ${url}
- Git commit: \`${GIT_COMMIT}\`

---

${userContent}`

    const newIssue = {
        repositoryId: REPOSITORY.id,
        title: `[${title}]: ${new Date().toISOString()}`,
        body,
        labelIds,
    }

    // console.log('NEW ISSUE', newIssue)

    try {
        const result = (await octokitGraphQL({
            query: `
mutation createIssue($repositoryId: ID!, $title: String!, $body: String!, $labelIds: [ID!]) {
  createIssue(input: {
    repositoryId: $repositoryId
    title: $title
    body: $body
    labelIds: $labelIds
  }) {
    issue {
      url
    }
  }
}`,
            headers: {
                'user-agent': 'IDG Community Bot',
                authorization: `token ${GITHUB_API_TOKEN}`,
            },
            ...newIssue,
        })) as { repository: { issues: { edges: Array<{ title: string }> } } }

        return result?.repository?.issues?.edges
    } catch (e) {
        console.error(e)
    }

    return null
}
