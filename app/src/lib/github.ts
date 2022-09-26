import { graphql as octokitGraphQL } from '@octokit/graphql'
import { GITHUB_API_TOKEN } from '$env/static/private'

// TODO: create issue with graphql API
// TODO: Add label for `app-content-suggestion`
// TODO: Add label for `app-feedback`

// TODO: Add disclaimer within the published message

// TODO: distinguish between dev and prod

const LABELS = {
    NEEDS_REVIEW: '',
    FEEDBACK: '',
    CONTENT_SUGGESTION: '',
}

const TEMPLATES = {
    FEEDBACK: {
        title: '[App Feedback]:', // IDEA: Add ISO date string after here
        labelIds: [LABELS.NEEDS_REVIEW, LABELS.FEEDBACK],
    },
    CONTENT_SUGGESTION: {
        title: '[App Content Suggestion]:',
        labelIds: [LABELS.NEEDS_REVIEW, LABELS.CONTENT_SUGGESTION],
    },
}

const DISCLAIMER =
    '## Disclaimer\nThe following feedback or suggestion was submitted via https://idg.tools and has not yet been reviewed or approved by the team.\n\n---\n\n'

export async function getLatestIssues() {
    try {
        const result = (await octokitGraphQL(
            `{
  repository(owner: "Greenheart", name: "idg.tools") {
    issues(last: 3) {
      edges {
        node {
          title
        }
      }
    }
  }
}`,
            {
                headers: {
                    'user-agent': 'IDG Community Bot',
                    authorization: `token ${GITHUB_API_TOKEN}`,
                },
            },
        )) as { repository: { issues: { edges: Array<{ title: string }> } } }
        console.log('GITHUB result: ', result?.repository?.issues?.edges)

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
