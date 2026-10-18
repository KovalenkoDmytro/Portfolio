# Website screenshots

Add real website screenshots to this folder as WebP, PNG, JPG, JPEG or AVIF files. They appear automatically in the homepage gallery. Prefer WebP, roughly 1,600–2,000 pixels wide, and compress large screenshots before adding them.

Use a descriptive filename such as `01-company-name.webp`. Without metadata, the gallery uses the filename as the title. It does not invent a client location, industry or your role.

Optional captions go in `gallery.json`, keyed by the exact filename:

```json
{
  "01-company-name.webp": {
    "title": "Company name",
    "industry": "Business sector",
    "location": "Calgary, Alberta",
    "platform": "WordPress",
    "contribution": "Describe the work you personally did, including agency collaboration where applicable.",
    "alt": "Company name website homepage screenshot",
    "order": 1
  }
}
```

Keep the best and most relevant examples first using `order` or numbered filenames. Only use locations and contribution descriptions that apply to that particular project. No website URL is required.

Reload the page after adding files during development. Production pages are generated at build time: rebuild and redeploy to publish new screenshots or caption changes. When this folder has no screenshots, the gallery is hidden in production; the development server shows an empty preview section.

The gallery shows every screenshot in a responsive grid. Clicking a preview opens the original screenshot in a scrollable dialog with previous/next controls, keyboard arrows, Escape to close and a link to the original image.
