import { graphql as octokitGraphQL } from '@octokit/graphql'
import { GITHUB_API_TOKEN } from '$env/static/private'
import { dev } from '$app/environment'

const LABELS = dev
    ? {
          NEEDS_REVIEW: {
              id: 'LA_kwDOIEbazs8AAAABENw4jA',
          },
          FEEDBACK: {
              id: 'LA_kwDOIEbazs8AAAABENw8mQ',
          },
          CONTENT_SUGGESTION: {
              id: 'LA_kwDOIEbazs8AAAABENw_UQ',
          },
      }
    : {
          NEEDS_REVIEW: {
              id: 'LA_kwDOGwukUc8AAAABENwnuQ',
          },
          FEEDBACK: {
              id: 'LA_kwDOGwukUc8AAAABENtM9w',
          },
          CONTENT_SUGGESTION: {
              id: 'LA_kwDOGwukUc8AAAABENs-UA',
          },
      }

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

const TEMPLATES = {
    FEEDBACK: {
        title: 'App Feedback',
        labelIds: [LABELS.NEEDS_REVIEW, LABELS.FEEDBACK],
        disclaimer:
            '## Disclaimer\nThe following feedback was submitted by an user of https://idg.tools. This has not yet been reviewed or approved by the contributors.\n\n---\n\n',
    },
    CONTENT_SUGGESTION: {
        title: 'App Content Suggestion',
        labelIds: [LABELS.NEEDS_REVIEW, LABELS.CONTENT_SUGGESTION],
        disclaimer:
            '## Disclaimer\nThe following content suggestion was submitted by an user of https://idg.tools. This has not yet been reviewed or approved by the contributors.\n\n---\n\n',
    },
}

export async function getLatestIssues() {
    try {
        const result = (await octokitGraphQL({
            query: `
query lastIssues($owner: String!, $repo: String!) {
  repository(owner: $owner, name: $repo) {
    issues(last: 3) {
      edges {
        node {
        title
        }
      }
    }
  }
}`,
            headers: {
                'user-agent': 'IDG Community Bot',
                authorization: `token ${GITHUB_API_TOKEN}`,
            },
            owner: 'Greenheart',
            repo: 'idg.tools',
        })) as { repository: { issues: { edges: Array<{ title: string }> } } }

        return result?.repository?.issues?.edges
    } catch (e) {
        console.error(e)
    }

    return null
}

type ISSUE_TYPES = keyof typeof TEMPLATES

export async function createIssue({
    userContent,
    type,
}: {
    userContent: string
    type: ISSUE_TYPES
}) {
    const { title, labelIds, disclaimer } = TEMPLATES[type]
    const newIssue = {
        repositoryId: REPOSITORY.id,
        title: `[${title}]: ${new Date().toISOString()}`,
        body: disclaimer + userContent,
        labelIds,
    }

    console.log('NEW ISSUE', newIssue)

    return null

    // TODO: get repositoryId based on $env
    // TODO: set the title basd on type of issue
    // TODO: format body as `DISCLAIMER + userContent`
    // TODO: spread variables into the mutation below, then send request and return result

    try {
        const result = (await octokitGraphQL({
            mutation: `
mutation createIssue($repositoryId: String!, $title: String!, $body: String!, $labelIds: [String]!) {
  createIssue(input: {
    repositoryId: $repositoryId
    title: $title
    body: $body
    labelIds: $labelIds
  })
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

// TODO: Read labels from the example repo https://github.com/Greenheart/playground/labels
// TODO: Read lables from the real repo

// TODO: setup difference between prod and dev
// IDEA: Could use .env.development and .env
