---
title: Rabbit Hole / Alice
slug: rabbit-hole
type: tool
status: live
tagline: |-
  Browser history is a list.
  Curiosity is a path.
summary: You say "rabbit hole" like it’s a bad thing. That curiosity is worth capturing.
started: 2026-10-03
updated: 2026-10-25
built_with: Claude Code
format: Chrome extension (local only)
status_note: Working prototype (and still working on the prototype)
repo: https://github.com/marylynn-mlb/rabbit-hole
demo: https://marylynn-mlb.github.io/rabbit-hole/
links:
  - label: See an example →
    url: https://marylynn-mlb.github.io/rabbit-hole/
  - label: See the code
    url: https://github.com/marylynn-mlb/rabbit-hole
word: ALICE
color: grey
order: 3
screenshots:
  - file: alice-1.webp
    alt: "The Rabbit Hole side panel next to a trail drawn as a map, on a dark purple page with pink accents and floral decoration"
    caption: "The book. A trail drawn as a map, with the side panel beside it."
  - file: alice-4.webp
    alt: "A trail map with a panel for one stop, where you mark what kind of stop it was, how it went, and whether it mattered"
    caption: "One stop on a trail. You say what kind of stop it was, and how it went."
  - file: alice-report1.webp
    alt: "The report page, with counts of trails, stops, searches, time on pages and sites"
    caption: "The report. Counts come from plain code you can check."
  - file: alice-report2.webp
    alt: "The shape of a week of browsing, with each trail drawn as a row of beads"
    caption: "The shape of it. Each bead is a stop, bigger when you stayed longer."
  - file: alice-report3.webp
    alt: "Time spent by subject and a thread of related curiosities, with buttons to say whether the reading is right"
    caption: "Where the time went, and threads Claude noticed. You get to say whether they are right."
  - file: alice-report4.webp
    alt: "Clusters of trails grouped by time and a list of loose ends with buttons to mark them still open or done"
    caption: "Trails grouped in time, and the loose ends you started but did not finish."
---

## What it is

I’m interested in the role curiosity plays in learning. We often dismiss “idle curiosity” as a waste of time, but I think it’s where learning starts. The trouble is that it leaves no record. Your browser history shows where you’ve been, not how one thing led to the next.

Rabbit holes usually start with a plain search, not an AI answer, so the tool has to live in the browser, not in a chat box. I built a Chrome extension, with Claude, that captures the path (what led to what) and reflects it back as a map and a report.

## What I learned

### From using it

Over four days I let it follow 13 trails: 207 stops, 16 searches, about two hours on pages.

On Saturday, I read an article about why control rooms were seafoam green, and it led me to a book by Faber Birren. I flipped through it and moved on. The next evening, about 25 hours later, I searched for Birren by name. I wouldn’t have remembered the link on my own. The tool found it by matching words across trails.

I tested it on myself, and the results changed three things in the design.

**I didn’t use the tagging.** I’d built buttons to flag what mattered, and I never touched them. Flagging mid-trail interrupts the fall. So I’m moving review to after: you read a report and react to it, instead of stopping to tag.

**Reading time was undercounted.** The tool treated two quiet minutes as “away,” so a long essay looked like a short visit. It now counts up to five quiet minutes as reading.

**My own assumption was only partly right.** I thought rabbit holes start with a search. Nine of my 13 trails began on a page I was already reading. I didn’t know when I opened the article to start reading that it would take me down a rabbit hole.

## Design choices

**Track a trail, not all browsing.** You start it, so it doesn’t monitor everything you do, only when your curiosity is triggered.

**Store no page content.** It keeps page titles, addresses without tracking parameters, and search terms on search pages. It skips banking, email, and password sites by default, and everything stays in your browser.

**Count in code, interpret with Claude.** Every number comes from plain code you can check. Claude’s role is limited to naming themes and asking questions, and each finding points to the stops behind it.

**A reading is a hypothesis.** The tool doesn’t know what mattered to you. It infers from time on a page, and you decide what’s right.

## Try it

To try it, open `chrome://extensions` in Chrome and turn on **Developer mode**. Choose **Load unpacked** and select the `extension/` folder from the repository. Pin the icon, run a search, open the side panel, and choose **Start a trail here**. Choose **Surface** when you are done, then open the book for the map and **Read my week** for the report.
