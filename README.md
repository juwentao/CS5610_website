# ZenGrid Sudoku

ZenGrid is a multi-page mock website that showcases a polished Sudoku experience using only semantic HTML and modern CSS.

## Project links

- GitHub repository: `https://github.khoury.northeastern.edu/juwentao/CS5610`
- Live site (GitHub Pages): `https://pages.github.khoury.northeastern.edu/juwentao/CS5610/`
- Walkthrough video (≤ 5 minutes): ``

## Pages

| Path | Description |
| --- | --- |
| `/` | Home landing page introducing ZenGrid's brand and value. |
| `/selection/` | Mock game library with curated puzzle summaries. |
| `/game-hard/` | 9×9 hard puzzle layout with subgrid styling and status panel. |
| `/game-easy/` | 6×6 easy puzzle layout with guidance sidebar. |
| `/rules/` | Rules overview, tips, and credits section. |
| `/high-scores/` | Leaderboard table highlighting top solvers. |
| `/login/` | Username/password form (mock only). |
| `/register/` | Registration form with verification fields (mock only). |

All routes use folder-based `index.html` files to ensure clean URLs and share global styling from `assets/css/base.css`.

## Responsive + design notes

- **Navigation**: Sticky desktop navbar that repositions to the bottom on screens narrower than 700px, preserving access without covering content.
- **Layouts**: CSS Grid and Flexbox power hero sections, puzzle boards, leaderboards, and form layouts. Media queries adjust column counts and padding for small screens.
- **Visual language**: Custom color palette, Google Fonts import, subtle transitions, and purposeful pseudo-elements (`::before`, `::after`) create a cohesive look while highlighting interactions.
- **Accessibility**: Semantic headings, descriptive labels, `aria-label` usage on grid inputs, and `sr-only` helpers improve screen reader support for the mock experience.

## Write-up

### 1. Challenges & timeline
Building eight coordinated pages with purely static assets meant carefully planning shared navigation, typography, and utility classes before diving into each layout. The Sudoku grids required extra attention to keep borders crisp, accessible, and responsive without relying on JavaScript or additional markup helpers. The full assignment was completed in roughly 20 hours.

### 2. Mobile design decisions
The navbar transitions to a fixed bottom bar on narrow viewports to maintain reachability while freeing vertical space for content. Puzzle boards switch to more compact cell sizing, and multi-column sections collapse into stacked cards to prevent horizontal scrolling. Form layouts use a fluid grid so that input labels remain adjacent to fields even on smaller screens, reducing cognitive load.

### 3. Visual design considerations
I aimed for a calm, modern aesthetic that pairs a deep navy foundation with warm accent highlights to mimic the contrast of pencil marks on paper. Cards, callouts, and buttons share rounded geometry and layered shadows to hint at physical tiles without overwhelming the interface. I'm particularly proud of the Sudoku grid styling that balances clarity, contrast, and responsive behavior with nothing but CSS.

### 4. Future enhancements
Given more time I would add a light/dark theme toggle, interactive candidate notes, profile dashboard summarizing streaks, and celebratory animations on puzzle completion. Finally, integrating real puzzle data and validation logic would transform the static mock into a fully playable app.

### 5. Hours invested
Approximately 20 hours.

### 6. Assumptions
I assumed the assignment allows external, hotlinked imagery and fonts provided no JavaScript libraries are introduced. I also assumed folder-based routing on GitHub Pages would be acceptable so every page can remain an `index.html` inside its own directory.

### 7. Sources & attributions
Hero photograph sourced from [Unsplash](https://unsplash.com/) with attribution embedded via the hotlinked URL metadata. Icon asset sourced from [SVG Repo](https://www.svgrepo.com/) under their free usage license.

## Running locally
No build tools are required. Open `index.html` in a web browser to explore the mock site.
