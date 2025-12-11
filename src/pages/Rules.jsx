function Rules() {
  return (
    <main>
      <header className="page-header flow">
        <div className="tag">How to play</div>
        <h1 className="section-title">Sudoku rules & mindful play</h1>
        <p>Sudoku invites you to complete a grid using logic rather than guesswork. Follow these rules to maintain the harmony of every puzzle.</p>
      </header>

      <section className="rules-grid">
        <article className="rule-card flow">
          <h2>1. Respect the rows</h2>
          <p>Each row must contain the digits from 1 up to the size of the grid (1-6 for easy mode, 1-9 for normal mode) without repetition. Scan left to right and use pencil marks sparingly.</p>
        </article>
        <article className="rule-card flow">
          <h2>2. Balance the columns</h2>
          <p>Columns follow the same rule: no duplicate numbers from top to bottom. If you find a conflict, reassess the intersecting row.</p>
        </article>
        <article className="rule-card flow">
          <h2>3. Honor sub-grids</h2>
          <p>Each highlighted block (3×3 on normal grids, 2×3 on easy grids) must also include all digits once. These zones offer powerful deduction cues.</p>
        </article>
        <article className="rule-card flow">
          <h2>4. Use logic, not luck</h2>
          <p>Make deliberate moves. Techniques like lone singles, hidden pairs, and pointing pairs keep your reasoning transparent.</p>
        </article>
      </section>

      <section className="tips flow">
        <h2 className="section-title">Mindful solving tips</h2>
        <blockquote>
          Take mindful pauses. If a path feels stuck, breathe, zoom out, and revisit the grid with a fresh lens. Logic always reveals the next move.
        </blockquote>
        <ul className="tips-list">
          <li><span>Start with high-contrast clues.</span> Fill in cells with only one possibility first.</li>
          <li><span>Sketch candidates.</span> Light pencil marks reveal hidden singles across the grid.</li>
          <li><span>Alternate focus areas.</span> Cycle rows, columns, and blocks to keep insights flowing.</li>
        </ul>
      </section>

      <section className="credits" aria-labelledby="credits-heading">
        <h2 id="credits-heading" className="section-title">Made by</h2>
        <div className="credits-card flow">
          <p>This project was developed by <strong>Wentao Ju</strong>.</p>
          <p>Connect and follow the journey:</p>
          <ul>
            <li><a href="mailto:ju.wen@northeastern.edu">ju.wen@northeastern.edu</a></li>
            <li><a href="https://github.com/wentaoju" target="_blank" rel="noopener noreferrer">github.com/wentaoju</a></li>
            <li><a href="https://www.linkedin.com/in/wentaoju" target="_blank" rel="noopener noreferrer">linkedin.com/in/wentaoju</a></li>
          </ul>
        </div>
      </section>
    </main>
  )
}

export default Rules
