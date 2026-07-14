---
name: uigrids-interface-review
description: Review and improve product interfaces using evidence-based UI Grids guidance. Use for UI or UX audits, implementation reviews, and fixes involving forms, navigation, motion, feedback, empty states, interface audio, mobile reach, hover or focus parity, accessibility, and responsive behavior. Do not use for brand exploration, illustration, or subjective visual taste without an interface problem to solve.
---

# UI Grids Interface Review

Audit an implemented or proposed interface, identify concrete user-facing risks, make scoped fixes when asked, and verify the result across relevant input modes and viewports. Preserve the product's established design language unless that language causes a documented usability or accessibility problem.

## Review Workflow

1. Inspect the actual interface, surrounding code, target users, and primary task before judging it.
2. Reproduce the reported problem at the relevant desktop, tablet, and mobile sizes.
3. Check keyboard, pointer, touch, zoom, and reduced-motion behavior when the interface supports them.
4. Record findings by severity. Tie each finding to observable behavior, affected users, and a specific location.
5. Map findings to the approved guidance in `references/approved-guidance.md` and the broader checklist in `references/review-checklist.md`.
6. Make the smallest coherent fix when implementation is requested. Follow repository patterns and avoid unrelated visual redesign.
7. Re-test the changed flow and report the evidence, remaining risks, and any checks that could not run.

## Start With Evidence

Prefer rendered behavior over assumptions from component names or screenshots alone. Inspect:

- the page hierarchy and primary task;
- labels, instructions, status, errors, and recovery actions;
- current navigation state and return paths;
- loading, empty, success, failure, disabled, and interrupted states;
- keyboard order, visible focus, touch target size, and input parity;
- motion purpose and `prefers-reduced-motion` output;
- mobile safe areas, on-screen keyboard behavior, zoom, and text scaling;
- whether audio is optional and paired with visible meaning.

Do not claim a defect without a reproduction path or code-level reason. Mark uncertain concerns as questions and say what evidence would resolve them.

## Classify Severity

Use the following levels consistently:

- **Critical:** blocks a primary task, causes data loss, or creates a severe accessibility failure without a practical route around it.
- **High:** excludes a meaningful input mode or user group, breaks orientation or recovery, or makes a consequential action unreliable.
- **Medium:** creates repeated confusion, avoidable errors, weak feedback, or substantial friction with a workaround.
- **Low:** localized inconsistency or polish issue with limited task impact.

Order findings by severity, then by impact on the primary task. Do not inflate visual preference into a usability defect.

## Apply Approved Guidance

Read `references/approved-guidance.md` when a review touches one of its domains. Treat those entries as maintained UI Grids guidance, not as a substitute for platform documentation or project requirements.

Mandatory constraints:

- Keep form labels visible and programmatically associated.
- Preserve location and hierarchy in navigation.
- Use motion to explain change and provide an equivalent reduced state.
- Close the action loop with acknowledgement, progress, outcome, and recovery as needed.
- Treat loading, error, and empty as distinct states; give valid empty states a relevant next step.
- Keep interface audio optional and pair it with visible meaning.
- Make primary mobile actions reachable, sufficiently large, and safe-area aware.
- Never make essential content or actions hover-only.

Adapt details to the product. A familiar platform convention can outweigh a generic pattern when changing it would reduce predictability or accessibility.

## Implement Carefully

When asked to fix code:

1. Locate the shared component or token that owns the behavior.
2. Confirm the change will not erase intentional local variants.
3. Preserve semantic HTML before adding ARIA.
4. Keep focus management proportional to the state change.
5. Prefer stable layout constraints over viewport-scaled typography or brittle offsets.
6. Avoid nested decorative cards, oversized controls, and white hover fills unless the design system explicitly requires them.
7. Add focused tests for shared behavior, state transitions, keyboard operation, and regressions.

Stop before destructive changes, external publication, credential use, or broad design-system rewrites unless the user has explicitly authorized them.

## Verify The Result

Test the affected flow at minimum:

- one representative desktop viewport;
- one tablet viewport when layout changes across breakpoints;
- one narrow mobile viewport;
- keyboard-only operation;
- relevant hover, focus, pressed, disabled, loading, success, empty, and error states;
- reduced motion when animation changes;
- text zoom or scaling when density and wrapping are involved.

Use automated browser checks and screenshots when available. Check for console errors, horizontal overflow, clipped text, overlapping controls, unexpected layout shifts, and blank previews.

## Report Findings

Lead with findings. Use this shape:

```text
[Severity] Short finding title
Location: route, component, or file:line
Evidence: reproduction and observable result
Impact: affected task or users
Guidance: applicable UI Grids entry or primary standard
Fix: scoped recommendation or completed change
Verification: checks run and result
```

If no defects are found, say so clearly and name the tested surfaces and residual risk. Keep general visual commentary separate from behavioral findings.

## References

- Read `references/approved-guidance.md` for the maintained UI Grids rules and primary sources.
- Read `references/review-checklist.md` for a full interface pass and review stop conditions.
