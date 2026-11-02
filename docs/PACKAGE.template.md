---
# Copy this file to content/packages/<slug>.md, one file per consulting package.
# The same file drives (1) the package's card on the Partnership Foundations page
# (/consulting/) and (2) its own detail page (/consulting/<slug>/).
# The pages are unlisted: noindex, not in the sitemap, not in the nav.
# If a value contains a colon, wrap it in double quotes (YAML needs this).

title: Package Name
slug: package-name            # becomes /consulting/package-name/
order: 1                      # card number and sort order (01, 02, ...)
row: engine                   # engine = top row of cards | alongside = second row
verb: Focus                   # one word, shown large on the card and the page hero
color: teal                   # teal | gold | red (card header and hero background)
page: true                    # false = card only, no detail page yet

# --- Card on the main page ---
pitch: One sentence, bold on the card.
when: When you need it. One or two sentences.
leave: What you leave with. A short list in one sentence.
card_meta: Fixed-fee project, typically 4 to 6 weeks.

# --- Detail page ---
tagline: One line under the page title.
best_for: Who this is for. Two or three sentences.

included:                     # the numbered "What's included" list
  - title: First deliverable
    text: What it is and what it contains.
  - title: Second deliverable
    text: What it is and what it contains.

how:                          # the three-step "How the engagement works" row
  - title: Step one
    text: What happens.
  - title: Step two
    text: What happens.
  - title: Step three
    text: What happens.

format_line: ""               # one sentence in "Format & duration": format and duration only, no hours or effort
format_note: What final scope, timing and investment depend on.

working_together:             # paragraphs in "Working together"
  - What your team provides and owns.
  - What is in scope, and what can be added separately.

# Optional: an add-on shown in a box under "Working together".
# extension:
#   title: Add-on name
#   text: What it adds and when it happens.

result: The one-sentence outcome, shown large on its own band.
---
The intro paragraphs go here, below the frontmatter, as plain Markdown.
They appear at the top of the detail page next to the "Best for" box.
