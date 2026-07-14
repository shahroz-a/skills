# UI Grids Skills

Original, tested agent skills for interface and product work from [UI Grids](https://www.uigrids.com/).

Each published skill is versioned, reviewed, and represented in `registry.json`. Production consumers should pin a release tag or commit instead of installing from a moving branch.

## Install A Skill

Copy the selected skill directory into the native skills directory supported by your agent. Keep `SKILL.md` and every referenced file together.

## Quality Contract

- Skills solve one clear job and state their non-goals.
- Trigger and non-trigger fixtures are held in `evals/`.
- Primary sources are preferred for normative interface requirements.
- Destructive commands, credentials, publication, and account access require explicit permission.
- External or adapted work is labeled and attributed; UI Grids ownership is never inferred from hosting.

Run `node scripts/validate.mjs` before proposing a change. The generated registry contract is documented in `schema/registry.schema.json`. See `CONTRIBUTING.md` for the release workflow.
