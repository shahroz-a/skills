# Approved UI Grids Guidance

These concise rules are generated from the approved UI Grids interface knowledge base. They were last reviewed on 2026-07-14 and should be reviewed again by 2027-01-14. Use the primary sources for normative requirements.

## Keep Form Labels Visible

Place a persistent, programmatically associated label beside every input. Keep examples, format help, and errors separate from the label. Connect help and errors with `aria-describedby`, and never rely on color alone.

Primary sources:

- [W3C WAI: Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WCAG 2.2: Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)

## Preserve Navigation Orientation

Keep durable destinations stable, expose the current location, and use route labels that match page headings and titles. Render destinations as real links and mark the current page with `aria-current`.

Primary sources:

- [W3C WAI: Navigation Menus](https://www.w3.org/WAI/tutorials/menus/)
- [Apple HIG: Navigation and search](https://developer.apple.com/design/human-interface-guidelines/navigation-and-search)

## Use Motion To Explain Change

Animate a cause-and-effect relationship, object continuity, or a meaningful state change. Avoid ambient movement near reading and novelty that delays the useful frame. Honor `prefers-reduced-motion` with an equivalent stable result.

Primary sources:

- [WCAG 2.2: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [Apple HIG: Reduce motion](https://developer.apple.com/design/human-interface-guidelines/motion#Reduce-motion)

## Close The Feedback Loop

Give consequential actions timely acknowledgement, truthful progress when needed, a clear outcome, and a useful recovery path. Keep errors near the affected control and expose asynchronous status without unnecessary focus movement.

Primary sources:

- [WCAG 2.2: Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
- [WAI-ARIA APG: Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

## Give Empty States A Next Step

Treat empty, loading, and error as separate states. Explain what is absent, why the state exists, and the most relevant action that can change it. Preserve filter context and provide a direct reset for zero results.

Primary sources:

- [Material Design 3: Empty states](https://m3.material.io/foundations/content-design/empty-states)
- [WCAG 2.2: Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)

## Keep Interface Audio Optional

Use sound only as a secondary signal after consent or an explicit gesture. Pair it with visible meaning, provide a persistent mute control, respect device audio context, and never make sound the only critical alert.

Primary sources:

- [WCAG 2.2: Audio Control](https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html)
- [Apple HIG: Playing audio](https://developer.apple.com/design/human-interface-guidelines/playing-audio)

## Keep Primary Mobile Actions Reachable

Make frequent actions large enough to activate without precision, stable in placement, safe-area aware, and usable with text scaling and alternative input. Keep destructive actions separated from the primary path.

Primary sources:

- [WCAG 2.2: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [Apple HIG: Layout](https://developer.apple.com/design/human-interface-guidelines/layout)

## Do Not Depend On Hover

Essential information and actions need focus, touch, and persistent routes. Keep transient content open while it is inspected, provide predictable dismissal, and use a button for interactive disclosure.

Primary sources:

- [WCAG 2.2: Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)
- [WAI-ARIA APG: Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
