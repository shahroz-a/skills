import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const blockedDigests = new Set([
  'f6ab7868abcf9396a434240009c643fca67bfc278ff8294cc978e31046b438db',
  '8141066995a5ed0d7baf756bd7ffe9f7a064d1669a91a95aa8756db8d9a18b85',
  '3b94aa2ddfade6ae8ddf55990a0bccbc4f5ae92bf418efe4c4790dff1adce966',
  '16d90ae29b70c66eba96d4c0d1730fcb7716f0ed7caa4a809eca7a009c53b237',
  '43b9f09b9877f4c974d69298036a3dedc526fb31704370943f9d5fa3752a42a0',
  '0dae1e68d7c1ce0928d20d2ac336d7cff228fd52911178bc6283914954f6d0a3',
  'ade276acd313d3d972d294f322bf90148213106e9798cc9cf852c159e8b13318',
  '73597d244867772f6143ed56d1840c11ff442e95e692192fc2b2b229e713058c',
  'a057c9e7eebce4f2aead94141496ffee9110d0f2c8b5dbcd5fc5a8cb9edf20a8',
  '7703db53621efd61f81b3e58cba97c075e44426b80947fe5fc39c7f40fd1b06e',
  '26259c5d67c4bfabde76bff34d8db4667ce574edc4c04af7f8302fb857d70b98',
  'dc15aaf9c1c231363373065d40535f0fde12f9d462abfcb66978556dd52901aa',
  'eb49a396fedc9bfd83d133953536b84d2586977d7bcd7eb83477dbadd9968453',
  'fc161a0b0bb0b9ed5998faff5d0f6b495c761c03490588a4ac52ebc9e4508908',
  '3c84a18b5d36f70d63a9d0e94bfbad9756fffd0edc8284baf4a53e5ac243bd38',
  'ebb05e64a52f31e443cea410ec947b3e10f72d6b0267ec810770d8052d861d95',
  '3c182f9b0511d06dba589a273978131130d935e0566d8f77c3f601f9a6b982ed',
  '144529fea9d12eaf79d4b9383c53ff311c32ecefec66937ef92fd6acddc161d6',
  'd00770ee84d253542b31b1ffdab9de49438674a063f7a96dbb77d5c7f457c36e',
  '3d0f251ebd5da326861503d6a4b7c58430076511987ce39943c5decde03e72ac',
  '6edb1d1942abea57bf62585b694ffe5a774dd7f0611d9de05af880f8d601d329',
  '528a2e78a343148aecf81af2303c749026b55100451acb3d471581bbbc1fab14',
])

const blockedLengths = new Set([6, 7, 9, 10, 11, 12, 13, 14, 16, 17, 18])
const digestCache = new Map()
const digest = (value) => {
  if (!digestCache.has(value)) {
    digestCache.set(value, createHash('sha256').update(value).digest('hex'))
  }
  return digestCache.get(value)
}
const files = execFileSync('git', ['ls-files', '-co', '--exclude-standard'], {
  encoding: 'utf8',
}).trim().split('\n').filter(Boolean)

const failures = []
for (const file of files) {
  let source
  try {
    source = readFileSync(file, 'utf8')
  } catch {
    continue
  }

  const words = source.toLowerCase().match(/[a-z0-9]+/g) || []
  for (let index = 0; index < words.length; index += 1) {
    let candidate = ''
    for (let length = 1; length <= 4 && index + length <= words.length; length += 1) {
      candidate += words[index + length - 1]
      if (blockedLengths.has(candidate.length) && blockedDigests.has(digest(candidate))) {
        failures.push(file)
        index = words.length
        break
      }
    }
  }
}

if (failures.length) {
  console.error(`Public source footprint check failed:\n${[...new Set(failures)].map((file) => `- ${file}`).join('\n')}`)
  process.exit(1)
}

console.log(`Public source footprint check passed (${files.length} files).`)
