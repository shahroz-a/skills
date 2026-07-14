import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const skillsRoot = path.join(root, 'skills')

function readFrontmatter(file) {
  const source = fs.readFileSync(file, 'utf8')
  const match = source.match(/^---\n([\s\S]*?)\n---/)
  if (!match) throw new Error(`Missing frontmatter: ${file}`)

  return Object.fromEntries(match[1].split('\n').map((line) => {
    const separator = line.indexOf(':')
    if (separator < 1) throw new Error(`Invalid frontmatter line in ${file}: ${line}`)
    return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()]
  }))
}

function checksumDirectory(directory) {
  const files = []
  const visit = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) visit(fullPath)
      else if (entry.name !== 'release.json') files.push(fullPath)
    }
  }
  visit(directory)

  const hash = crypto.createHash('sha256')
  for (const file of files.sort()) {
    hash.update(path.relative(directory, file))
    hash.update('\0')
    hash.update(fs.readFileSync(file))
    hash.update('\0')
  }
  return `sha256:${hash.digest('hex')}`
}

const records = fs.readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const directory = path.join(skillsRoot, entry.name)
    const frontmatter = readFrontmatter(path.join(directory, 'SKILL.md'))
    const release = JSON.parse(fs.readFileSync(path.join(directory, 'release.json'), 'utf8'))
    const train = JSON.parse(fs.readFileSync(path.join(directory, 'evals/train_queries.json'), 'utf8'))
    const validation = JSON.parse(fs.readFileSync(path.join(directory, 'evals/validation_queries.json'), 'utf8'))

    return {
      name: frontmatter.name,
      description: frontmatter.description,
      path: `skills/${entry.name}`,
      checksum: checksumDirectory(directory),
      ...release,
      fixtureCount: train.length + validation.length,
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

fs.writeFileSync(path.join(root, 'registry.json'), `${JSON.stringify({ schemaVersion: 1, skills: records }, null, 2)}\n`)
console.log(`Wrote ${records.length} skill record${records.length === 1 ? '' : 's'} to registry.json`)
