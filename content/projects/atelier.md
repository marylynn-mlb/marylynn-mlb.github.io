---
title: "Atelier"
slug: atelier
type: tool
status: in-development
tagline: |-
  The art you own.
  The experiences that shape what you collect.
summary: "A personal archive connecting your art collection, exhibitions, reading, and discoveries with what inspires you to collect next."
updated: 2026-10-25
built_with: "OpenAI Codex"
format: "Hosted in-browser tool"
status_note: "Working prototype, in active development"
word: ATELIER
color: gold
order: 6
screenshots:
  - file: atelier-1.webp
    alt: "The Atelier collection page, with totals for artworks, cost and value, filters by medium, and a grid of pieces"
    caption: "The collection. The pieces you love, and the stories they tell."
  - file: atelier-2.webp
    alt: "A record for one piece, with its medium, location, purchase cost, acquisition date and condition"
    caption: "A record for one piece."
  - file: atelier-3.webp
    alt: "Cards for two exhibitions, marked as visited, with notes"
    caption: "Exhibitions and visits."
  - file: atelier-4.webp
    alt: "A Discover page with saved venues and suggested searches for artists and exhibitions near Santa Cruz"
    caption: "Discover. Places worth returning to, and what to look for next."
---

## What it is

Atelier is a personal archive for an art collection and the experiences around it. It brings together the practical details of ownership with the exhibitions, reading, encounters, and ideas that shape a collector's interests.

Each artwork has a record: who made it, its medium, where it lives, when and where it was acquired, what it cost, and its condition. Photographs and supporting documents sit alongside those details, with linked artist and gallery records. A separate Records & insurance area keeps the practical side of collection management close at hand.

Around that inventory are places to document a wider relationship with art:

- **Exhibitions & visits** records museum and gallery visits, open studios, and exhibitions to attend. Entries can include photographs, artists, themes, and personal reflections.
- **Library** tracks books, articles, podcasts, videos, and websites, with ownership recorded separately from reading or viewing progress. Notes can connect a source to artists, artworks, and exhibitions.
- **Collecting notebook** holds ideas and leads worth returning to, including thoughts carried over from visits and reading.
- **Discover** brings together saved interests, collecting locations, and venues, with searches to help explore what to see or investigate next.

The connections matter as much as the individual records. A book can help explain an interest in an artist; an exhibition note can become a collecting lead; a gallery can remain worth following even when a visit leads to no purchase.

## Why I built it

I have a small but growing art collection. I wanted a useful record of what I own for financial and insurance purposes, and a way to explore the artists, galleries, and kinds of work I might want to collect next.

As the project developed, that second purpose became broader. Seeing an exhibition, visiting an open studio, or reading about an artist can be significant without resulting in an acquisition. I wanted somewhere to remember those experiences and connect them to the collection over time.

That led Atelier beyond an inventory toward a personal account of how a collection takes shape.

## What I learned

### From using it

Using early versions exposed the small obstacles that make a record-keeping tool difficult to keep up with. Entering publication details by hand was one. Library now offers likely matches from a partial book or journal article title, with available citation details filled in for review. A book-cover photograph can also be read to find possible catalog matches.

Adding photographs prompted another round of improvements: choosing from a photo library or taking a photo directly, then reviewing the selection before saving. These are small interactions, but they affect whether documenting a visit feels easy enough to do in the moment.

The language and navigation evolved too. Bibliography became Library as its role expanded beyond citations. Records & insurance moved to a separate position in the navigation, giving the collection and exploratory sections more prominence while keeping the administrative tools accessible.

### From building it

I have been developing Atelier iteratively with Codex: trying a working version, identifying what feels awkward or missing, and making focused changes. The feature set has grown through those exchanges, from collection records to visits, reading, and connections between them.

Real use has also made reliability more concrete. An oversized photograph once prevented a record from saving without explaining why. The form now keeps the error visible, reports the attempted file size against the limit, and preserves the entry so it can be corrected and retried.

Another design question has been how much automation to introduce. Citation lookup offers a small set of likely matches and keeps the result editable. Discover currently provides searches shaped by recorded interests and locations. Both approaches give the collector useful assistance while leaving room to choose, check, and interpret.

## Where it goes next

I am interested in how Atelier could help someone reflect on their collecting life as the archive grows: recurring themes, changing interests, and connections between what they own and what captures their attention.

Possible directions include a visual collection portrait, a timeline weaving together acquisitions and visits, and occasional reviews that draw on images and personal notes. These are exploratory ideas rather than current features. Any interpretation should make it easy to see the records behind it and to correct a connection that does not fit.

## Notes

Atelier is a working prototype in active development. The screenshots show stages of that development and may differ from the latest interface.

Book-cover recognition works best with English-language covers; edition and ISBN details still need review. Discover's searches are starting points for exploration, rather than a verified feed of current exhibitions or an automated recommendation service.
