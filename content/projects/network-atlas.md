---
# ---- Identity ----
title: Network Atlas
slug: network-atlas
type: tool                  # tool | writing
status: live                # idea | in-development | live | retired
tagline: |-
  Your network is a list.
  Your relationships are a pattern.
summary: Drop in your LinkedIn data export and see who found you, who you actually talk to, and who has gone quiet. Runs entirely in your browser.

# ---- Dates ----
started: 2026-10-01
updated: 2026-10-23

# ---- How it was made ----
built_with: Claude Code
license: Free for noncommercial use, as is, no support

# ---- Where to find it ----
repo: https://github.com/marylynn-mlb/network-atlas
demo: https://marylynn-mlb.github.io/network-atlas/

# ---- Visuals (paths relative to this file; add once the files exist) ----
# thumbnail: project-assets/thumbnail.png

# ---- Display ----
tags: [linkedin, networking, privacy, data-viz]
featured: true
format: Hosted in-browser tool
word: ATLAS
color: gold
order: 1
screenshots:
  - file: atlas-4.webp
    alt: "Four colored tiles of network numbers, then five tiers of connections sorted by how recently you last exchanged a message"
    caption: "Connections vs. conversations. Everyone in your network, sorted by when you last actually talked."
  - file: atlas-2.webp
    alt: "A shareable summary card with six large numbers on colored tiles, such as connections, years of building a network, and messages exchanged"
    caption: "The summary card. A shareable image of your best numbers that never names other people."
  - file: atlas-3.webp
    alt: "A network map grouping connections by industry, with the user at the center"
    caption: "Your network as a universe, grouped by industry and employer."
  - file: atlas-5.webp
    alt: "A score showing how well LinkedIn knows you, with accuracy and coverage bars and chips of matching and missing interests"
    caption: "How well LinkedIn knows you, with its guesses checked against what you actually do."
  - file: atlas-6.webp
    alt: "The Recommendations section, with moves to strengthen your network built around weak ties"
    caption: "Recommendations. Moves picked from your own numbers."
  - file: atlas-7.webp
    alt: "A starter kit download and a list of copyable prompts for going deeper with your own AI assistant"
    caption: "Go deeper with your own AI. A starter kit and ready-made prompts."
---

## What it is

LinkedIn shows you a list of names. But the data export you can request holds a better story: who found you, who you actually talk to, and how your network grew with each job.

I wanted to see mine, so I built Network Atlas with Claude Code. You drop in your export, and it draws the picture in your browser.

## Why I built it

I tested it on myself. After 20 years, I have 959 connections and 42 conversations in the last year. I wanted to know what the pattern looked like, and whether I'd like what I saw.

## What I learned

### From using it

**Most of my network has never heard from me.** 741 connections (77%) have never exchanged a message with me. LinkedIn messaging is a narrow lens, and plenty of colleagues I talk to elsewhere are in that group. It's still more than I expected.

**People find me more than I find them.** 96 people asked to connect in the last six months. I asked 6. I can't tell whether my reputation is doing the work or I'm being passive, and I think about it often.

**The valuable group is the quiet one.** Of my 105 dormant connections, 55 are people I once had a real back-and-forth with and let drift. That's a reconnection list, not a statistic.

### From building it

I built it with Claude Code over a weekend. The code was the easy part. The harder part was deciding what the tool should do, and what it deliberately should not.

**Analysis isn't the point. Action is.** It started as a way to see my network. But a chart of 741 people I've never messaged doesn't tell you what to do on Monday. The leap was imagining what a person needs from the report to act on it: a list of dormant connections worth reviving, and conversation-starter drafts. Four of the ten prompts in the starter kit now turn results into a plan.

**Privacy is architecture, not promise.** Everything runs in your browser, so you don't have to trust a policy; just check the design. It reads message dates and senders, never the messages themselves.

**Counts, never names.** The results show categories and numbers, which is also why the summary card is safe to post. It also offers a preview using sample data.

**Split the work by what needs human judgment.** Counting and charting happen in the browser. Harder questions, like reading messages, grouping companies, or planning outreach, need judgment, so I packaged them as prompts for your own AI assistant instead of pretending a script could do them.

**Say where the privacy stops.** An AI assistant is not this page. It sees whatever you point it at. The same names that make a reconnection plan useful make it sensitive, so the prompts that put real names into the results are marked private, and the kit's standing instructions keep names out of everything else.

## Notes

It's an experiment on purpose. I posted it on LinkedIn and sent it to some friends, and it's been interesting to see people share their results.
