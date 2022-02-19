import 'dotenv/config'
import { fetch } from 'native-fetch'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'

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

const body = await fetch(process.env.API_URL, {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: { 'Content-Type': 'application/json' },
}).then((res) => res.json())

const content = body.data

// TODO: serialize document fields in `content.tools` to markdown to make it easier to work with in the client

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
    return tool
})

await writeFile(
    resolve('static/content.json'),
    JSON.stringify(content, null, 2),
    {
        encoding: 'utf-8',
    },
)
