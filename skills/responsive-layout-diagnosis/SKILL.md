---
name: responsive-layout-diagnosis
description: Diagnose and fix responsive interface failures using rendered evidence and ownership-based debugging. Use for horizontal overflow, clipped or overlapping content, unstable grids, breakpoint regressions, oversized mobile typography, fixed or sticky collisions, viewport-unit problems, safe-area issues, text-zoom failures, and layouts that break on desktop, tablet, or mobile. Do not use for brand exploration, unrelated visual restyling, or document layouts outside a rendered interface.
---

# Responsive Layout Diagnosis

Reproduce the failure, identify the element and constraint that own it, make the smallest coherent fix, and verify the result across a deliberate viewport matrix. Preserve the product's established layout system unless that system is the demonstrated cause.

## Diagnostic Workflow

1. Inspect the route, surrounding layout primitives, design tokens, and target user task.
2. Reproduce the reported failure at the exact viewport, zoom, content, and state where it occurs.
3. Record evidence before editing: viewport dimensions, document width, offending bounds, computed sizing, and a screenshot when available.
4. Trace ownership from the overflowing or collapsed element through its containing block, grid or flex track, and page shell.
5. Classify the root cause using `references/evidence-matrix.md` and `references/fix-patterns.md`.
6. Fix the earliest shared constraint that is wrong without changing unrelated layouts.
7. Re-run the failing case, nearby breakpoints, narrow phones, text zoom, and affected interaction states.
8. Report the cause, changed constraint, evidence, verification, and residual risk.

## Reproduce Before Editing

Match the reported conditions rather than resizing until something looks acceptable. Capture:

- viewport width and height;
- browser zoom or text scaling;
- route, query, authentication state, and feature flags;
- content that causes the longest label, URL, number, or translated string;
- open menus, keyboards, dialogs, sidebars, and sticky regions;
- pointer, keyboard, and touch behavior when layout changes interaction.

Check whether `document.documentElement.scrollWidth` exceeds `clientWidth`. If it does, inspect element bounds and search for the first descendant whose right edge, left edge, minimum width, transform, or positioned offset escapes the viewport. Do not assume the visually largest element is the owner.

## Classify The Failure

Use one primary class and note contributing factors:

- **Intrinsic sizing:** long unbreakable text, images, canvas, SVG, tables, or controls impose a minimum width.
- **Track sizing:** grid `minmax`, fixed columns, flex basis, `min-width:auto`, or gaps exceed the container.
- **Containing block:** absolute or fixed positioning resolves against an unexpected ancestor.
- **Viewport math:** `100vw`, dynamic viewport height, scrollbar width, safe areas, or browser chrome create incorrect space.
- **Breakpoint contract:** content changes shape before the layout changes structure, or two breakpoint rules conflict.
- **Typography:** fixed display sizing, line height, nowrap, or controls cannot absorb longer content or text zoom.
- **Layer collision:** sticky bars, drawers, dialogs, and virtual keyboards cover content or actions.
- **Preview surface:** canvas or demo content lacks a stable aspect ratio, isolation boundary, or minimum track rule.

## Fix The Owning Constraint

Prefer changes in this order:

1. Allow the child to shrink with `min-width: 0`, wrapping, bounded media, or an appropriate overflow strategy.
2. Make tracks fluid with `minmax(0, 1fr)`, wrapping flex rows, or a deliberate structural stack.
3. Constrain fixed-format media with `max-width`, `aspect-ratio`, and container-relative sizing.
4. Move the breakpoint to the width where content actually fails, using the repository's existing breakpoint scale when possible.
5. Adjust page-shell padding, safe-area insets, sticky offsets, or overlay height when the shell owns the collision.
6. Reduce density or abbreviate secondary content only when preserving it would make the primary task unusable.

Do not hide the evidence with global `overflow-x: hidden`, disable user zoom, shrink all typography to fit, or add a one-off media query before identifying the owner. Avoid viewport-scaled font sizes when stable responsive type steps will work.

Read `references/fix-patterns.md` for focused patterns covering grids, flex rows, media, type, tables, overlays, fixed actions, and preview canvases.

## Preserve Product Behavior

Before changing a shared component:

- find every route that consumes it;
- distinguish intentional variants from accidental overrides;
- retain DOM order and semantic relationships when visual order changes;
- keep keyboard focus visible and logical after stacking or moving controls;
- keep touch targets usable without allowing them to resize the surrounding layout;
- respect reduced motion when layout transitions animate;
- avoid introducing nested scroll regions unless the workflow requires one.

Stop before destructive refactors, dependency upgrades, or design-system migrations unless the user explicitly requested them.

## Verify Deliberately

Use the matrix in `references/evidence-matrix.md`. At minimum verify:

- the exact failing viewport;
- 320, 360, and 390 CSS pixel widths when the surface is public and mobile-facing;
- one tablet width near the structural breakpoint;
- one representative desktop width and one wide desktop width;
- 200% text zoom or the closest supported text-scaling check;
- longest realistic content and empty, loading, error, and expanded states that affect geometry;
- keyboard focus, open overlays, and virtual-keyboard behavior when relevant;
- no horizontal document overflow, clipped text, overlap, blank media, or unexpected layout shift.

Check both sides of every changed breakpoint. Prefer automated assertions for document width and key element bounds, plus screenshots for hierarchy and framing.

## Report The Result

Use this compact structure:

```text
Failure: route, viewport, state, and visible symptom
Owner: element and constraint that caused it
Evidence: measured bounds or computed rule
Fix: changed file and constraint
Verification: viewport, zoom, state, and input checks
Residual risk: untested browser, content, or state
```

If the failure cannot be reproduced, do not guess. State the conditions tested, collect the missing state or content, and leave the layout unchanged until evidence identifies a cause.

## References

- Read `references/evidence-matrix.md` before choosing the verification surface.
- Read `references/fix-patterns.md` after the failure class is known.
