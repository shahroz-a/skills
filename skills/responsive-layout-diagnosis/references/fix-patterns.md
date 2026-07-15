# Responsive Fix Patterns

Use these patterns after measurement identifies the failure class. Match the repository's existing primitives and tokens.

## Shrinkable Grid And Flex Children

- Add `min-width: 0` to a grid or flex child that must become narrower than its intrinsic content.
- Use `minmax(0, 1fr)` for fluid grid tracks that contain long text or media.
- Use `flex-wrap` only when the wrapped order and alignment remain understandable.
- Bound fixed side rails and give the primary region the fluid track.

## Long Content

- Prefer wrapping for prose, labels, URLs, and identifiers that users need to read.
- Use `overflow-wrap: anywhere` for unpredictable tokens when normal break opportunities do not exist.
- Use truncation only when the full value is available through a detail view or accessible disclosure.
- Test translated and user-generated content rather than placeholder strings.

## Media, SVG, Canvas, And Previews

- Give fixed-format surfaces a stable `aspect-ratio` and responsive maximum width.
- Separate intrinsic render resolution from CSS display size.
- Recalculate canvas backing dimensions when its rendered rectangle changes.
- Avoid fixed pixel widths inside cards and split panes.
- Provide a bounded loading and failure state so a missing preview cannot collapse the layout.

## Tables And Dense Data

- Keep true tabular relationships in a table when users compare columns.
- Choose an explicit small-screen strategy: prioritized columns, a controlled horizontal table region, or a semantic stacked representation.
- Keep page-level horizontal scrolling at zero.
- Preserve headers, row actions, and keyboard reach in the chosen strategy.

## Responsive Type

- Use stable type steps at intentional breakpoints.
- Keep compact surfaces below hero-scale typography.
- Allow headings to wrap without covering following content.
- Avoid negative letter spacing and viewport-width font scaling as a fit mechanism.
- Test the longest word and 200% text zoom.

## Fixed And Sticky Actions

- Reserve layout space for persistent bars instead of covering content.
- Include safe-area insets on supported devices.
- Re-evaluate viewport height when the software keyboard opens.
- Keep the focused input and primary action visible without scroll traps.

## Overlays

- Bound dialogs and drawers to the dynamic viewport and allow one intentional internal scroll region when content exceeds it.
- Preserve a reachable close action and visible focus.
- Avoid nesting a scrollable panel inside another scrollable panel without a workflow reason.
- Check long titles, validation messages, menus, and keyboard-open states.

## Breakpoint Changes

- Change structure where content fails, then align that value with an existing token if the difference is small.
- Prefer one structural change over multiple narrow override bands.
- Keep DOM order logical when visual columns stack.
- Verify both sides of the breakpoint and shared component consumers.

## Patterns To Reject

- Global `overflow-x: hidden` used to conceal an unidentified child.
- `user-scalable=no` or maximum-scale restrictions.
- Arbitrary transforms that visually move content without changing layout bounds.
- Fixed heights around variable copy.
- Smaller text used as the only response to insufficient space.
- New device-specific breakpoints for one sample string.
