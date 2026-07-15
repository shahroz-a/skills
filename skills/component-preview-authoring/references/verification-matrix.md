# Preview Verification Matrix

## Render Contexts

| Context | Verify |
| --- | --- |
| Catalogue card | stable aspect ratio, useful first frame, local failure, bounded cost |
| Catalogue list | horizontal composition, text wrapping, preview containment |
| Detail stage | real interaction, reset, controls, source parity |
| Narrow mobile | stacking, touch, no document overflow, readable fallback |
| Tablet | transition around structural breakpoint, no clipped controls |
| Desktop | intended framing, pointer behavior, no excessive empty space |

## State Matrix

Verify applicable states:

- initial and populated;
- hover, focus, pressed, selected, and disabled;
- loading, empty, error, and unsupported;
- reduced motion;
- asset decode failure;
- thrown render error;
- unmount, remount, and route return;
- off-screen pause and resumed visibility.

## DOM And Accessibility

- No nested links, buttons, or form controls.
- The detail demo follows a logical tab order.
- Focus remains visible against the preview background.
- Pointer-only behavior has keyboard or touch parity when the component promises it.
- Status and fallback text use appropriate semantics.
- Decorative preview content stays out of the accessibility tree when it adds no meaning.

## Geometry

- Root document `scrollWidth` does not exceed `clientWidth` by more than one pixel.
- Preview bounds remain stable during lazy import, asset decode, and state changes.
- Fixed-format surfaces have explicit responsive constraints.
- Long fixture content does not cover controls or metadata.
- The error fallback occupies the same layout slot as the preview.

## Canvas And WebGL Evidence

For pixel-rendered previews:

1. wait for measurable host dimensions;
2. sample a grid of pixels away from known transparent edges;
3. confirm more than one meaningful color or alpha value;
4. for motion, sample another frame and compare changed pixels;
5. repeat with reduced motion and expect a stable useful frame;
6. unmount and confirm animation frames, observers, workers, and contexts stop.

Do not accept a nonzero canvas size as proof of a rendered component.

## Failure Isolation

Intentionally test one failing preview in a category. Confirm:

- neighboring previews still render;
- search, filters, and navigation still work;
- the fallback names no internal stack or sensitive data;
- diagnostics include the component id and route;
- remounting after the cause is removed recovers.

## Completion Evidence

A preview is complete when it proves one representative behavior, matches the published component API, renders reliably in every supported context, degrades locally, and leaves no timers, observers, listeners, media contexts, or object URLs after unmount.
