---
# Copy this file to the root of a project repo as PROJECT.md.
# Also add the GitHub topic "brightlight-project" to the repo so the site finds it.
# Only title, slug, type, status and summary are required.
# If a value contains a colon, wrap it in double quotes (YAML needs this), e.g. caption: "Step 1: upload".

title: Project Name
slug: project-name           # becomes /projects/project-name/
type: tool                   # tool | writing
status: in-development       # idea | in-development | live | retired | abandoned
tagline: |-
  One or two short lines, shown large on the project page.
summary: One sentence for the card on the Projects page and the top of the project page.

started: 2026-10-01
updated: 2026-10-25

built_with: Claude Code
format: Hosted in-browser tool   # optional; shown as "Type" on the project page
status_note: Working prototype   # optional; replaces the plain status in the facts strip
license: Free for noncommercial use, as is, no support

repo: https://github.com/marylynn-mlb/project-name
demo: https://marylynn-mlb.github.io/project-name/
# Optional. Overrides the default "Try it" and "See the code" buttons.
# links:
#   - label: Buy a copy →
#     url: https://example.com

# Card look (optional). Colors: gold | red | grey. Word: short, up to about 7 letters.
word: NAME
color: gold
order: 20                    # lower numbers come first on the Projects page

# Images are paths relative to this file. Leave out if you have none yet.
# thumbnail: project-assets/thumbnail.png
# screenshots:
#   - file: project-assets/screen-1.png
#     caption: What this screenshot shows.
---

## What it is

## Why I built it

## What I learned

### From using it

### From building it

## Notes

# Card teaser (optional): the first screenshot is faded under the word on the Projects index.
# teaser: false          # turn it off
# teaser_position: center # which part of the image shows (CSS object-position)
# teaser_opacity: 0.3    # lower for dark screenshots
# Page hero: the first screenshot sits at the top of the project page, enlargeable on click.
