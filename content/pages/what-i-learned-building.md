---
title: "What building these taught me"
slug: what-i-learned-building
when: "Learnings from a season of building with AI, Oct 2026"
description: "What Mary-Lynn Bragg learned building a set of small tools and experiments: make the invisible visible, then test it."
---

These experiments contain a clear theme.

I believe that there are signals and patterns in everything around us. Sometimes they don't matter; other times they can have real meaning and should push us to act. In my work, identifying and validating these patterns is how I bring growth opportunities to organizations.

I didn't come at these from the direction of wanting to use AI to make something. I came at them from "what if there was a way to..." and then thinking that maybe AI could help me build that way. From there, it's all about that experimental process with AI.

## Some places I went looking for signal

- **Network Atlas:** who you actually talk to, as opposed to who you are connected to.
- **Rabbit Hole:** how one idea led to the next, which your browser history does not keep.
- **Colors of My World (Wide Web):** what a day in a browser window looks like.
- **Smoke Break:** the work a cigarette break did for workplace collaboration.
- **Hiatus:** what taking a sabbatical actually involves, and where to plan and where not to.
- **Atelier:** the stories that connect the art you own with what you want to collect next.

## My process right now looks like this

- I come up with an idea that usually centers on "what if there was a way to see...."

Note that I am deliberately not looking at other tools or apps that might do the same thing. There's no market analysis because I'm not planning to put these on the market as another competitor. The point for me is to build something that reflects the state of my thinking about the topic.

- I put the idea into either Claude Code or Codex, and at this point it's very loose (no product manager would call this a real spec).
- I direct the AI to build a tool, site or app.

To me this is the magic part. Because I know it's going to take my loose thinking and direct it back to me in the most middle-of-the-road way. Then I get to have fun.

- I iterate, iterate, iterate. The rate of rapid iteration, immediate quick testing by me, and then continued refinement is the best part.
- For the most part AI just does what I tell it to do, but sometimes I'll ask for its pushback or a series of alternate ideas for ways to solve a given problem.

Once everything is functioning, I push it to GitHub (or make it more public in some way; GitHub is reasonably new to me). And now, I'm making these project pages. Both processes are heavily supported by AI.

- Then I keep testing on myself. Yes, I use most of these projects myself and continue to try them out and see results.

## Early lessons

## 1. Surface the pattern first, but build action on top of it

Network Atlas started as a way to look at my network. Then I looked at mine. After 20 years I had 959 connections and 42 conversations in the last year, and 741 people had never exchanged a message with me. That is a striking picture, and it does not tell you what to do on Monday.

It was important to me that the tool did not just surface the information. It points out what matters about it and gives you concrete actions to take: a list of the dormant connections I once had a real back-and-forth with, and a draft of how to restart each conversation. A pattern is worth something only when it changes what someone does next.

## 2. Test it on yourself first, and expect to be wrong

I let Rabbit Hole follow my own browsing for four days. It watched 13 trails, 207 stops, about two hours on pages. Three of my assumptions did not survive.

I thought rabbit holes start with a search. Nine of my 13 trails began on a page I was already reading. I had built buttons to tag what mattered, and I never touched them, because by definition you don't hover in mid-air when you're falling down a hole. And the tool undercounted my reading, because it treated two quiet minutes as "away", so a long essay looked like a short visit.

Colors of My World (Wide Web) did the same thing at a different scale. My days turned out mostly white and gray, which is about what the web at work looks like.

## 3. A tool should specify what it knows from what it infers

In many of my tools, I've used AI to build the tool, let the tool capture the data or information without AI input, then create opportunities for the user to leverage AI to surface potential signal and offer inference.

The Rabbit Hole report separates what it counted from what it only inferred. A count is labeled as a count. A reading of what the trails mean is labeled as Claude's reading, with a note on how confident it is, and every inference has three buttons: that's right, partly, not really.

That turns a report into a small test. The tool makes a claim, shows its evidence, and asks you to grade it. That is the standard I want for any analysis, including my own and anything an AI hands me.

## 4. Build privacy into the architecture

Network Atlas, Colors, Rabbit Hole and Hiatus all run entirely in your browser. There is no account and no server. Nobody has to trust a policy, because they can check the design.

## 5. Building is the cheap part. Deciding is the work

I built Network Atlas with Claude Code over a weekend, and many others over the course of just a few days when I had free time. Generating the first draft was the easy part. The hard decisions were what the tool should do, what it should deliberately not do, and when to stop.

I am not planning for some big launch with these things but I wanted to bring them to their natural stopping or pause point. In some cases that meant admitting my vision for the output wasn't where I could go. I tried to specify a "digital smoke break" and concluded you cannot recreate the real thing digitally, so it became an art piece instead. ZineMe was fine and went no further. Bedtime Gorilla is abandoned, and I would rather say so than leave it looking alive.

> More than ever, building is about the questions you ask and the directions you take to get answers. That's human, hard, and costly. But once you get to a starting point, AI makes the building and the testing a whole lot easier and cheaper.

Each time I build a new prototype or start a new experiment, I'm refining my approach. The goal for me isn't the tool itself, but reflecting on how I got it from idea to application.
