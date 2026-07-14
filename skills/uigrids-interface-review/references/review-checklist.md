# Interface Review Checklist

Use the sections relevant to the task. Do not turn every review into a generic redesign.

## Structure And Hierarchy

- Is the primary task identifiable without explanatory marketing copy?
- Do headings form a coherent hierarchy?
- Does the layout avoid unnecessary containers and cards inside cards?
- Are repeated items dense enough to scan while retaining clear boundaries?
- Do typography, spacing, and alignment remain stable across breakpoints?

## Navigation

- Is the current location visible and semantically exposed?
- Are destination names consistent with headings and document titles?
- Can users return from details, overlays, and temporary flows predictably?
- Does mobile navigation preserve meaning instead of only hiding density?

## Forms And Actions

- Does every control have a persistent accessible label?
- Are help, optionality, constraints, and errors placed where they are needed?
- Are button labels specific about the outcome?
- Are destructive and primary actions separated?
- Are duplicate submissions prevented without losing entered data?

## States And Feedback

- Are loading, empty, error, disabled, success, and partial states distinct?
- Does a consequential action acknowledge receipt and expose its outcome?
- Is progress truthful and determinate when possible?
- Does failure preserve context and offer recovery?
- Are status messages available to assistive technology without noisy announcements?

## Input And Accessibility

- Can the flow be completed with keyboard, pointer, and touch where applicable?
- Is focus visible, ordered logically, and moved only when context changes require it?
- Are touch targets large and separated enough for imprecise input?
- Is essential content available without hover?
- Do zoom, text scaling, high contrast, and screen-reader names preserve the task?

## Motion And Audio

- Does each animation explain change or continuity?
- Is the final state understandable without observing motion?
- Does reduced motion remove spatial travel or repeated effects?
- Is interface audio optional, gesture initiated, and paired with visible meaning?
- Are controls available to mute or stop sustained media?

## Responsive Behavior

- Is there horizontal document overflow?
- Does text wrap without clipping or overlapping adjacent content?
- Do fixed or sticky elements respect safe areas and the on-screen keyboard?
- Are key actions reachable without obscuring content?
- Do previews and canvases have stable dimensions and nonblank output?

## Stop Conditions

Pause and ask for direction when:

- the primary user or task cannot be inferred safely;
- requested changes would overwrite a product-wide design system;
- the review requires credentials, private user data, or external publication;
- the only evidence is subjective taste and no product requirement supports it;
- legal, medical, financial, or safety-critical claims need domain review.
