# UI Grids Skills

Original, tested agent skills for interface and product work from [UI Grids](https://www.uigrids.com/).

These skills turn repeatable product judgment into portable instructions for coding agents. Each published skill is versioned, reviewed, tested against trigger fixtures, and represented in [`registry.json`](./registry.json). Production consumers should pin a release tag or commit rather than installing from a moving branch.

## Use Cases

Use this repository when you want an agent to:

- audit an interface and report concrete, severity-ranked findings;
- fix responsive, keyboard, touch, focus, motion, feedback, or state problems;
- apply consistent product-quality checks before release;
- follow a maintained workflow instead of relying on a one-off prompt;
- install the same reviewed instructions across Codex, Claude Code, Cursor, or Copilot.

## Published Skills

| Skill | What it does | Version | Tested agents |
| --- | --- | --- | --- |
| [`component-preview-authoring`](./skills/component-preview-authoring/) | Builds deterministic, isolated, responsive live previews for component catalogues and detail pages. | `0.1.0` | Codex, Claude Code, Cursor, Copilot |
| [`responsive-layout-diagnosis`](./skills/responsive-layout-diagnosis/) | Reproduces responsive failures, identifies the owning constraint, applies a scoped fix, and verifies breakpoint behavior. | `0.1.0` | Codex, Claude Code, Cursor, Copilot |
| [`uigrids-interface-review`](./skills/uigrids-interface-review/) | Audits and improves implemented interfaces using evidence-based checks for navigation, forms, feedback, states, accessibility, motion, mobile reach, and responsive behavior. | `0.1.0` | Codex, Claude Code, Cursor, Copilot |

The machine-readable catalogue in [`registry.json`](./registry.json) includes checksums, provenance, review dates, safety levels, fixture counts, and tested-agent support.

## Install A Skill

Copy the complete skill directory into the native skills directory used by your agent. Keep `SKILL.md`, `references/`, `evals/`, and release metadata together.

```bash
# Codex or another agent using the shared .agents convention
mkdir -p .agents/skills
cp -R skills/uigrids-interface-review .agents/skills/

# Claude Code project skill
mkdir -p .claude/skills
cp -R skills/uigrids-interface-review .claude/skills/

# GitHub Copilot repository skill
mkdir -p .github/skills
cp -R skills/uigrids-interface-review .github/skills/
```

For a stable installation, clone or download a tagged release first. Confirm the checksum and support metadata in `registry.json` when automating installs.

## How To Use It

Ask the agent for the job the skill is designed to own. For example:

```text
Review the checkout flow at desktop and mobile sizes. Rank findings by severity,
fix the high-impact issues, and verify keyboard, focus, loading, error, and success states.
```

The interface review skill starts from rendered evidence, separates usability defects from visual preference, makes scoped fixes when requested, and reports verification plus residual risk.

Use the responsive diagnosis skill when the failure is specifically caused by viewport, content, track, overlay, or intrinsic sizing constraints. Use the component preview skill when a reusable component needs a reliable catalogue card, detail demo, fixture, lazy renderer, or local failure boundary.

## Quality Contract

- Every skill solves one clear job and states its non-goals.
- Trigger and non-trigger fixtures live in `evals/`, including held-out cases.
- Normative claims prefer primary sources and maintained UI Grids guidance.
- Destructive commands, credentials, publication, and account access require explicit permission.
- External or adapted work must be labeled and attributed; hosting never implies ownership.
- Releases include provenance, semantic versioning, checksums, review dates, and tested-agent metadata.
- Validation must pass before the generated registry can change.

## Validate

```bash
npm run validate
```

The validator checks skill structure, frontmatter, references, fixtures, release metadata, checksums, and the generated registry contract in [`schema/registry.schema.json`](./schema/registry.schema.json).

## Contributing

Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) before proposing a skill. Contributions should begin with a specific user job, non-goals, safety level, sources, and positive and negative trigger fixtures. Copied or lightly rewritten third-party skills are not accepted.

Security issues belong in [`SECURITY.md`](./SECURITY.md). Community behavior is covered by [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

## License

Released under the [MIT License](./LICENSE).
