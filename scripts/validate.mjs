import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const skillsRoot = path.join(root, 'skills')
const errors = []
const commitPattern = /^[a-f0-9]{40}$/
const checksumPattern = /^sha256:[a-f0-9]{64}$/
const datePattern = /^\d{4}-\d{2}-\d{2}$/
const origins = new Set(['uigrids', 'external', 'adapted'])
const safetyLevels = new Set(['read-only', 'writes-workspace', 'network', 'account', 'destructive'])
const changelog = fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8')

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (error) {
    errors.push(`${path.relative(root, file)}: ${error.message}`)
    return null
  }
}

for (const entry of fs.readdirSync(skillsRoot, { withFileTypes: true }).filter((item) => item.isDirectory())) {
  const directory = path.join(skillsRoot, entry.name)
  const skillFile = path.join(directory, 'SKILL.md')
  const source = fs.readFileSync(skillFile, 'utf8')
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatter) errors.push(`${entry.name}: missing SKILL.md frontmatter`)
  const name = frontmatter?.[1].match(/^name:\s*(.+)$/m)?.[1]
  const description = frontmatter?.[1].match(/^description:\s*(.+)$/m)?.[1]
  if (name !== entry.name) errors.push(`${entry.name}: frontmatter name must match the directory`)
  if (!description || description.includes('TODO')) errors.push(`${entry.name}: description is missing or unfinished`)
  if (source.split('\n').length > 500) errors.push(`${entry.name}: SKILL.md exceeds 500 lines`)

  for (const relative of ['agents/openai.yaml', 'release.json', 'evals/train_queries.json', 'evals/validation_queries.json', 'evals/evals.json']) {
    if (!fs.existsSync(path.join(directory, relative))) errors.push(`${entry.name}: missing ${relative}`)
  }

  const release = readJson(path.join(directory, 'release.json'))
  if (release) {
    if (!/^\d+\.\d+\.\d+$/.test(release.version || '')) errors.push(`${entry.name}: release version must use semver`)
    for (const field of ['author', 'maintainer', 'license', 'source']) {
      if (typeof release[field] !== 'string' || !release[field].trim()) errors.push(`${entry.name}: release ${field} is required`)
    }
    for (const field of ['releasedAt', 'reviewedAt', 'nextReviewAt']) {
      if (!datePattern.test(release[field] || '')) errors.push(`${entry.name}: release ${field} must use YYYY-MM-DD`)
    }
    if (!origins.has(release.origin)) errors.push(`${entry.name}: invalid release origin`)
    if (!safetyLevels.has(release.safetyLevel)) errors.push(`${entry.name}: invalid safetyLevel`)
    if (!Array.isArray(release.testedAgents) || release.testedAgents.length === 0) errors.push(`${entry.name}: testedAgents must not be empty`)
    if (!commitPattern.test(release.lastPassingCommit || '')) {
      errors.push(`${entry.name}: invalid lastPassingCommit`)
    } else {
      const commit = spawnSync('git', ['cat-file', '-e', `${release.lastPassingCommit}^{commit}`], { cwd: root })
      if (commit.status !== 0) errors.push(`${entry.name}: lastPassingCommit is unavailable locally`)
    }
    if (!changelog.includes(`\`${entry.name}\``)) errors.push(`${entry.name}: missing changelog release note`)
  }

  const agentFile = path.join(directory, 'agents/openai.yaml')
  const agentMetadata = fs.existsSync(agentFile) ? fs.readFileSync(agentFile, 'utf8') : ''
  if (!agentMetadata.includes(`$${entry.name}`)) errors.push(`${entry.name}: default prompt must mention $${entry.name}`)
  if (/TODO/i.test(agentMetadata)) errors.push(`${entry.name}: agent metadata is unfinished`)

  for (const fixtureName of ['train_queries.json', 'validation_queries.json']) {
    const fixtures = readJson(path.join(directory, 'evals', fixtureName))
    if (!Array.isArray(fixtures)) continue
    const positive = fixtures.filter((fixture) => fixture.should_trigger === true).length
    const negative = fixtures.filter((fixture) => fixture.should_trigger === false).length
    if (positive < 3 || negative < 3) errors.push(`${entry.name}: ${fixtureName} needs at least three positive and three negative fixtures`)
  }

  for (const match of source.matchAll(/`references\/(.+?\.md)`/g)) {
    if (!fs.existsSync(path.join(directory, 'references', match[1]))) errors.push(`${entry.name}: missing referenced file ${match[0]}`)
  }
}

const build = spawnSync(process.execPath, [path.join(root, 'scripts/build-registry.mjs')], { stdio: 'inherit' })
if (build.status !== 0) errors.push('registry generation failed')

const registry = readJson(path.join(root, 'registry.json'))
if (registry?.schemaVersion !== 1 || !Array.isArray(registry?.skills)) errors.push('registry.json: invalid root schema')
for (const skill of registry?.skills || []) {
  if (!checksumPattern.test(skill.checksum || '')) errors.push(`${skill.name}: invalid registry checksum`)
  if (!commitPattern.test(skill.lastPassingCommit || '')) errors.push(`${skill.name}: invalid lastPassingCommit`)
  if (!origins.has(skill.origin)) errors.push(`${skill.name}: invalid origin`)
  if (!Array.isArray(skill.testedAgents) || skill.testedAgents.length === 0) errors.push(`${skill.name}: testedAgents must not be empty`)
}

const schema = readJson(path.join(root, 'schema/registry.schema.json'))
if (schema?.properties?.schemaVersion?.const !== 1) errors.push('schema/registry.schema.json: schema version must be 1')

if (errors.length) {
  console.error(`\nValidation failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}

console.log('Skills validation passed.')
