---
name: component-preview-authoring
description: Create, repair, and verify live previews for reusable UI components. Use when building component galleries, registry index cards, detail-page demos, preview fixtures, isolated sandboxes, lazy renderers, or fallbacks for blank, crashing, oversized, nondeterministic, or noninteractive component previews. Do not use for static marketing thumbnails, unrelated page redesign, or copying a third-party demo without source and license review.
---

# Component Preview Authoring

Build a faithful, bounded, deterministic demonstration of the component's real behavior. A preview is executable documentation: it must show the component's purpose, survive catalogue rendering, and make failure local rather than breaking the page.

## Preview Workflow

1. Inspect the component source, styles, dependencies, required providers, browser APIs, and public props.
2. Define the behavior the preview must prove before choosing visual decoration.
3. Choose representative fixture data and one primary scenario from `references/preview-contract.md`.
4. Create a preview host with stable dimensions, explicit containment, and the minimum providers the component requires.
5. Separate catalogue-card behavior from the fully interactive detail demo.
6. Make time, randomness, network data, images, and animation startup deterministic.
7. Isolate loading and render failures per preview.
8. Verify geometry, interaction, accessibility, motion, cleanup, and lazy remounting with `references/verification-matrix.md`.

## Start From The Component Contract

Before writing fixture markup, identify:

- the user job and observable behavior the component owns;
- required props, children, context providers, CSS, fonts, icons, and assets;
- browser APIs such as canvas, WebGL, observers, pointer capture, audio, or clipboard;
- minimum useful dimensions and expected aspect ratio;
- default, active, loading, empty, error, disabled, and reduced-motion behavior;
- cleanup requirements for timers, animation frames, observers, object URLs, listeners, and media contexts.

Do not import a component into the catalogue until its module, stylesheet, and runtime dependencies resolve independently.

## Choose A Representative Scenario

Show the smallest scenario that makes the component legible without instructions inside the preview. Use realistic copy and data. Include enough variation to expose the component's value, but avoid a miniature product page inside every card.

Prefer:

- three to seven items for lists, menus, and collections;
- one obvious action for interactive effects;
- a realistic success or populated state for cards and dashboards;
- visible start and end values for progress, counters, comparison, and motion;
- neutral, bounded assets stored with the project or generated from owned fixtures.

Avoid lorem ipsum, live production endpoints, unstable remote assets, current timestamps, unseeded randomness, and fixture text that explains how the preview was built.

## Build A Stable Host

The host owns geometry and isolation:

- use an explicit aspect ratio or responsive minimum height;
- set `min-width: 0` and contain overflowing visual effects intentionally;
- derive canvas backing dimensions from the rendered rectangle and device pixel ratio;
- provide a positioned containing block for absolute effects;
- keep preview styles scoped so component CSS cannot restyle the catalogue shell;
- use the repository's surface and text tokens where the component does not own a branded theme;
- reserve loading space to prevent layout shift.

Read `references/preview-contract.md` for host, fixture, interaction, and error-boundary contracts.

## Separate Index And Detail Behavior

Catalogue cards and detail pages have different jobs.

### Index preview

- Demonstrate the primary visual or motion behavior quickly.
- Keep pointer behavior deliberate. If the whole card navigates, make the preview noninteractive and move real interaction to the detail route.
- Pause or avoid expensive work while off-screen.
- Mount lazily without changing the card's dimensions.
- Keep one preview failure inside its own fallback.

### Detail preview

- Enable meaningful pointer, keyboard, touch, and control interaction.
- Expose representative props through bounded controls when those controls clarify the API.
- Reset fixture state predictably.
- Show reduced-motion and disabled behavior when relevant.
- Keep source, props, dependencies, and install guidance adjacent but outside the live stage.

Do not nest buttons, links, or form controls inside a navigation link. If the metadata region is clickable, keep the live stage as a sibling with an explicit route action.

## Make Rendering Deterministic

- Seed random values or replace them with fixed fixture data.
- Freeze clock-derived labels or pass a fixture date.
- Use owned local assets with known dimensions.
- Mock network states at the preview boundary; do not depend on a live API.
- Start animation only after the host has measurable dimensions.
- Treat a zero-size canvas, missing provider, missing CSS import, or unavailable browser API as a handled state.
- Keep lazy import mappings explicit and fail with the component name and recoverable fallback.

If a component requires an unavailable capability, show a bounded unsupported-state message instead of a blank rectangle.

## Isolate Failures And Cost

Each preview should have its own error boundary and loading fallback. A malformed component, asset, or browser capability must not blank the category or route.

For expensive previews:

- lazy load the module;
- mount near the viewport with an intersection observer;
- cap canvas resolution and particle counts for catalogue cards;
- stop animation, observers, and audio when hidden or unmounted;
- avoid creating one global animation loop per card when a shared scheduler exists;
- preserve an informative static first frame when motion is reduced.

Do not swallow errors silently. Keep the user-facing fallback calm and send component id, error type, and route to the project's existing diagnostics without including secrets or user content.

## Verify The Preview

Use `references/verification-matrix.md`. At minimum verify:

- a nonblank rendered result after lazy mount;
- stable bounds in card, list, and detail contexts;
- no page-level horizontal overflow;
- meaningful keyboard and touch behavior on the detail route;
- reduced-motion output and animation cleanup;
- loading, unsupported, and thrown-error fallbacks;
- unmount and remount behavior;
- no console or page errors from the preview;
- no inaccessible nested interactive elements;
- source and fixture data match the documented component API.

For canvas and WebGL previews, include a pixel check that distinguishes a real render from a clear or solid-color surface. For animated previews, sample more than one frame and confirm meaningful pixel change unless reduced motion is active.

## Report The Result

```text
Component: id and category
Behavior proved: primary scenario
Host: dimensions, providers, and capability requirements
Fixture: deterministic data and reset behavior
Isolation: loading, unsupported, and error handling
Verification: contexts, inputs, motion, pixels, and cleanup
Residual risk: untested browser, capability, or state
```

If the component itself is broken, fix or document that defect before disguising it with a preview-specific fork. Keep preview-only adaptation thin and visible.

## References

- Read `references/preview-contract.md` before implementing the host and fixture.
- Read `references/verification-matrix.md` before considering a preview complete.
