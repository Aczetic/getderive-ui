# Derive landing page — engineering handoff

## Deployable output

Deploy the contents of `dist/` as a static site. It has no build step and no runtime dependency.

Set the production domain to `https://getderive.ai`; the canonical URL, sitemap, robots file and JSON-LD already use that address.

Before publishing, set `bookingUrl` in `dist/site.js` to Derive's Google Appointment Schedule URL. This activates the header's `Talk to us` link. Set `linkedInUrl` to the actual company profile. Both destinations are still missing; the email link works now and uses kartik@getderive.ai.

## Visual system

- Final holding-page order: header (`DERIVE` / `Talk to us`), centered proposition, full-page ledger artwork, moving services ticker, then email and LinkedIn footer.
- Headline: `The AI-Native Professional Services Firm` (no full stop).
- Supporting copy: `Our Mixture of Experts brings specialised AI agents and experienced professionals together to deliver accounting, tax and advisory work, end to end.`
- Ticker: `Accounting & Finance · Tax · Transactions & Advisory`.
- Keep the ticker below the hero and above the footer. Use a dark charcoal surface, warm ivory lettering and subtle thin borders. Preserve the continuous loop; no visible play/pause button.
- The canonical hero asset is `dist/assets/derive-ledger-canonical.png`.
- It must fill the viewport as a softened, dark-charcoal working-paper field, with centered content above it.
- Preserve the supplied open ledger's silhouette, camera angle, ivory paper, charcoal environment and editorial restraint. Do not introduce floating geometry, metal objects, architectural forms, rotations or page turns.
- Typography is Suisse Int'l only: Regular for supporting text and Medium for `DERIVE`, labels and CTA. The site contains the current webfont files in `dist/assets/`.
- Keep the all-caps `DERIVE` logo in the navigation. The central headline is the sentence above, set in two lines on desktop and three on small phones. Do not reinstate a giant central DERIVE wordmark.
- Emphasize only “specialised AI agents” and “experienced professionals” in the paragraph. Use balanced line wrapping and a wider text measure.
- The supplied Suisse files are trial files. Selected symbols are rendered in Arial because the trial substitutes dots for them; this includes ampersands, the email @ and the navigation arrow.
- The ticker contains two identical groups. Each group is at least one full viewport wide, and the track translates by exactly half its width for a seamless loop. Keep the two groups identical. No visible play/pause button. Hover or keyboard focus pauses the ticker; reduced-motion shows a static service list.

## Animation: dither to clarity

The intended narrative is **complexity → organisation → clarity**. The page should run the entrance once and then hold.

1. The original ledger remains the canonical still asset. No generated replacement or new hero object is introduced.
2. `ledger-motion.js` samples the artwork's luminance into an ordered dither. Dots are located on actual page details and edges, rather than a generic pattern laid over the screen.
3. A 3.6-second left-to-right resolve settles each dot into its sampled image position. The base image gently sharpens and settles from 1.014 scale to 1.0.
4. Dots fade into a restrained texture. The animation stops drawing after completion; only the service ticker keeps moving.
5. A separate shading layer protects headline readability throughout. The text does not blur or move.
6. Reduced-motion disables the canvas effect and shows a static service list. Image/canvas failure leaves the original CSS background and readable page intact.
7. The canvas uses bounded sample counts, caps device pixel ratio, draws at approximately 30fps during the entrance, handles resize and stops when the document is hidden.

The delivered effect is a Canvas 2D image-derived dither resolve, not a 3D reconstruction. Preserve the existing visual and this restrained motion language if upgrading to WebGL later.

## Mobile layout

Below 580px, the headline uses three deliberate lines, larger relative type, a tighter paragraph and an outlined header CTA. At 320px, the page may scroll vertically so content is never squeezed or clipped. Checked at 390px and 320px with no horizontal overflow. Artwork and canvas share the same cover crop (62% horizontally on mobile), so the dither remains aligned to the ledger.

## Files

- `assets/derive-ledger.webp` — quality-96 WebP used on the site (511,534 bytes).
- `assets/derive-ledger-canonical.png` — unchanged original master (2,574,617 bytes).
- The background and Canvas dither use the same WebP to avoid two image downloads. No WebM/MP4 is needed for the procedural effect.
- `dist/` — deploy this directory.
- `index.html`, `styles.css`, `site.js`, `ledger-motion.js` — editable source mirrors.
- `assets/` — artwork, logo, favicon and fonts.
- `MASTER-BRIEF.md` — historical artwork/motion reference. This handoff and the current HTML take precedence for copy, page structure, animation timing and typography.
