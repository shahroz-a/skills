# Contributing

## Propose

Open an issue that defines the user job, audience, non-goals, sources, safety level, and expected trigger fixtures. Do not submit copied or lightly rewritten third-party skills.

## Develop

1. Keep the skill name stable and kebab-case.
2. Put all activation context in the `SKILL.md` description.
3. Add at least three positive and three negative trigger fixtures, including held-out validation.
4. Record release and provenance data in `release.json`.
5. Update `CHANGELOG.md` and increment the semantic version.
6. Run `node scripts/validate.mjs` and inspect the generated registry diff.

## Review And Release

Every release requires domain, safety, and editorial review by someone other than the author. Merge only after validation passes, then tag the matching semantic version. Production listings must pin that tag or its commit.
