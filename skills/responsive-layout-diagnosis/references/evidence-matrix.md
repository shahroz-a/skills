# Responsive Evidence Matrix

Use the smallest matrix that covers the layout contract and the reported risk. Record CSS pixel dimensions, not only device names.

## Baseline Matrix

| Surface | Minimum evidence |
| --- | --- |
| Public responsive page | 320, 360, 390, tablet breakpoint, desktop, wide desktop |
| Dense application shell | narrow supported width, collapsed navigation, expanded navigation, desktop |
| Form or checkout | narrow phone, virtual keyboard open, error state, text zoom, desktop |
| Data table | minimum supported width, longest row, filters open, horizontal strategy, desktop |
| Dialog or drawer | narrow phone, short viewport, keyboard focus, long content, desktop |
| Media or canvas tool | narrow phone, tablet, desktop, wide media, tall media, loading and error |
| Embedded component preview | card width, list width, detail width, lazy mount, failure fallback |

## Measurements

Capture the measurements that can prove or disprove the suspected cause:

- viewport `innerWidth` and `innerHeight`;
- root `clientWidth` and `scrollWidth`;
- element `getBoundingClientRect()` values;
- computed `min-width`, `max-width`, `width`, `flex-basis`, grid tracks, gaps, and overflow;
- media intrinsic dimensions and rendered aspect ratio;
- sticky or fixed offsets and safe-area padding;
- font size, line height, white-space, overflow-wrap, and text transform;
- layout shift or bounding-box changes after fonts, images, or data load.

## State Coverage

Select states that change geometry:

- loading skeleton and loaded content;
- empty, error, validation, success, and disabled;
- longest navigation label and selected tab;
- filters, popovers, menus, tooltips, dialogs, and drawers open;
- authenticated and anonymous headers;
- one item, many items, and pagination or virtualized boundaries;
- reduced-motion and high-contrast modes when supported;
- software keyboard open for fixed-action or viewport-height issues.

## Breakpoint Evidence

For every changed breakpoint, test:

1. one width below it;
2. the exact breakpoint width;
3. one width above it;
4. the longest realistic content at the weakest of those widths.

A breakpoint is justified when the content or interaction contract changes, not because a familiar device width was available.

## Browser Assertions

Useful automated checks include:

```js
const root = document.documentElement
const overflow = root.scrollWidth - root.clientWidth
if (overflow > 1) throw new Error(`Horizontal overflow: ${overflow}px`)
```

For critical controls, assert that their rectangles stay inside the viewport and do not intersect fixed navigation or action bars. Allow a one-pixel tolerance for rounding.

## Completion Evidence

A responsive fix is complete only when:

- the original failure is reproducible before and absent after;
- the root cause is stated as a constraint, not only a symptom;
- nearby breakpoints and shared consumers do not regress;
- essential content remains available and readable;
- keyboard, touch, text zoom, and overlays still work where relevant;
- skipped browsers or states are named as residual risk.
