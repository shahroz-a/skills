# Component Preview Contract

Every preview has four explicit contracts: behavior, fixture, host, and failure.

## Behavior Contract

State one sentence that describes what the preview proves. Examples:

- selecting a tab changes the visible panel and preserves keyboard navigation;
- a cursor effect follows pointer movement and stops on unmount;
- a comparison control reveals two bounded images using pointer and keyboard input;
- a loading component transitions to populated content without layout shift.

If the behavior cannot be seen or exercised in the preview, the scenario is incomplete.

## Fixture Contract

Fixture data must be:

- deterministic across reloads and screenshots;
- realistic enough to exercise wrapping, states, and hierarchy;
- free of secrets, personal data, and production endpoints;
- bounded in item count and asset size;
- resettable after interaction;
- owned by the project or used under a documented compatible license.

Document fixed dates, seeded randomness, and mocked response states close to the fixture.

## Host Contract

The host declares:

- card, list, and detail dimensions;
- aspect ratio or minimum block size;
- overflow and containment behavior;
- required providers, styles, assets, and browser capabilities;
- background and contrast assumptions;
- pointer policy for catalogue cards;
- reduced-motion behavior;
- lazy-mount and cleanup ownership.

The host should not change size when loading completes or an error occurs.

## Failure Contract

Handle these states locally:

- module import fails;
- required provider or prop is missing;
- host has zero dimensions;
- browser capability is unsupported;
- asset fails to decode;
- component throws while rendering or during an effect;
- animation or worker initialization times out.

The fallback should retain the preview's dimensions, identify that the preview is unavailable, and preserve navigation to documentation when safe.

## Index Card Contract

- Keep the primary visual behavior legible at small size.
- Use a stable first frame and bounded cost.
- Make the preview noninteractive when the whole card is a link.
- Keep metadata and the explicit route action together.
- Never place nested interactive descendants inside a link.

## Detail Demo Contract

- Enable the component's meaningful inputs.
- Provide a reset when state can become confusing.
- Place controls in a clear sibling region, not over the component.
- Keep props and source faithful to the published API.
- Expose disabled, loading, error, and reduced-motion variants when they are part of the component contract.
