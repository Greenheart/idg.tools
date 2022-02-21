import 'dotenv/config'
import { fetch } from 'native-fetch'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import { serialize } from 'remark-slate'

// TODO: Only include content with status === 'published'

const query = `
  query {
    categories {
      id
      name
      description
      tools {
        id
      }
      skills {
        id
      }
      color
    }
  
    skills {
      id
      name
      description
      tools {
        id
      }
      category {
        id
      }
    }
  
    tools {
      id
      name
      description {
        document
      }
      challenge {
        document
      }
      resource {
        document
      }
      categories {
        id
      }
      skills {
        id
      }
      slug
    }
  }
`

const keepId = ({ id }) => id
const convertSlateToMarkdown = (document) =>
    document.map((v) => serialize(v)).join('')

const body = await fetch(process.env.API_URL, {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: { 'Content-Type': 'application/json' },
}).then((res) => res.json())

const content = body.data

content.categories = content.categories.map((category) => {
    category.tools = category.tools.map(keepId)
    category.skills = category.skills.map(keepId)
    return category
})

content.skills = content.skills.map((skill) => {
    skill.category = keepId(skill.category)
    skill.tools = skill.tools.map(keepId)
    return skill
})

content.tools = content.tools.map((tool) => {
    tool.categories = tool.categories.map(keepId)
    tool.skills = tool.skills.map(keepId)
    tool.description = convertSlateToMarkdown(tool.description.document)
    tool.challenge = convertSlateToMarkdown(tool.challenge.document)
    tool.resource = convertSlateToMarkdown(tool.resource.document)
    return tool
})

// await writeFile(
//     resolve('static/content.json'),
//     JSON.stringify(content, null, 2),
//     { encoding: 'utf-8' },
// )

await writeFile(
    resolve('static/content-markdown.json'),
    JSON.stringify(content, null, 2),
    { encoding: 'utf-8' },
)
