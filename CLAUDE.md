# CLAUDE.md

## Tech Stack

- Plain HTML, CSS, and JavaScript only.
- No frameworks, no build step. Files must run by opening them in a browser.

## Project Structure

The repository is nearly empty for now. As files are added, keep them here:

- `index.html` and other pages: top level
- `css/`: stylesheets
- `js/`: scripts

Update this section when the layout changes.

## Key Requirements

1. Every page must be responsive and work on desktop, tablet, and phone.
2. Users can toggle between a light and a dark theme. The default is the light theme.

## Rules for Claude

- Explain technical terms in plain language.
- Ask before making big changes.
- Ask rather than guess when something is unclear.

## Feature Plan

### Site structure

One long scrolling page:

- **Header:** course title and the light/dark theme toggle.
- **Section menu:** jumps to any lesson. On phones it collapses into a button menu.
- **Lessons:** one section per slide (3-5). Each has the slide's content, a short key takeaway, and 2-3 quick check questions.
- **Moving around:** students scroll top to bottom, or use the menu to jump. Quick checks give instant feedback and no score.

### Phases

- **Phase 1: the course built from the user's slides.** First ask the user for the slides (PDF or PowerPoint). Then build the page, menu, takeaways, quick checks, theme toggle, and responsive layout.
- **Later phases:** to be decided with the user after Phase 1.
