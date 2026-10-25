---
title: Colors of My World (Wide Web)
slug: colors-www
type: tool
status: live
summary: Ever wonder if the amount of time you spend looking at your screen was as vivid as your world is outside it?
started: 2026-10-08
updated: 2026-10-25
built_with: Claude Code
format: Chrome extension (local only)
status_note: Working prototype, open source
license: MIT
repo: https://github.com/marylynn-mlb/colors-www
demo: https://marylynn-mlb.github.io/colors-www/
links:
  - label: Try the demo →
    url: https://marylynn-mlb.github.io/colors-www/
  - label: See the code
    url: https://github.com/marylynn-mlb/colors-www
word: COLORS
color: red
order: 2
screenshots:
  - file: logbook-overview.png
    alt: "The logbook: a day as a color barcode, with the week's dominant accent along the top"
    caption: "The logbook. A day as a color barcode, with the week's dominant accent along the top."
  - file: day.png
    alt: "A single day shown as a barcode of colors"
    caption: "A single day as a barcode of colors. Hover for the colors at any moment."
  - file: week.png
    alt: "A week of day strips, with weekdays compared with weekends"
    caption: "A week, and weekdays compared with weekends."
  - file: year.png
    alt: "A year shown as one square per day"
    caption: "The year in days."
  - file: popup.png
    alt: "The toolbar popup, with sampling frequency, a list of sites not to sample, and buttons to sample now or open the logbook"
    caption: "The toolbar popup. Sampling frequency, sites to skip, and a button to open the logbook."
---

## What it is

Most of us spend most of our day online, so the browser window is what we see most of the time. This art project makes that view visible.

I built a Chrome extension that samples whatever is in my browser window while I work. About once a minute, it captures the visible tab, shrinks it in memory, keeps the six dominant colors, and discards the image. It saves only the colors and a timestamp, never screenshots, page addresses, or titles.

## The logbook

The colors collect in a logbook built like a diary. A day appears as a 24-hour color barcode, a week as seven stacked strips with a weekday-versus-weekend comparison, and a year as one square per day. My days turned out mostly white and gray, fairly representative of the World Wide Web at work (a bit depressing, I think), so the logbook can switch to an accents-only view that shows the color underneath and marks each week’s dominant accent color.

## Design choices

**Ambient design.** It records continuously until I switch it off.

**Pixels, not styles.** Photos, video, and large white areas all count because they're what actually fill the window.

**Private by design.** Nothing leaves the browser, and it skips idle time, private windows, and any excluded sites.

**Desktop Chrome only, for now.** Phone time happens mostly in apps, which this approach wouldn’t capture.

**An art piece and a working prototype, not a product.**

## Install and permissions

There is no Chrome Web Store listing, so you load it yourself: download or clone the repository, open `chrome://extensions`, switch on **Developer mode**, choose **Load unpacked** and pick the folder, then pin the extension and flip the switch.

Chrome will say the extension can “read and change all your data on all websites”. That is Chrome’s standard wording for the permission it needs to capture the visible tab. In practice it never reads page text, URLs, titles, or form contents, never changes any page, and makes no network requests. The data lives in your browser, and the logbook has buttons to delete a day or everything.
