/**
 * Phase 2 placeholder — demonstrates the locked design tokens and layout
 * vocabulary. Replaced by the real homepage in Phase 4.
 */
export function HomePage() {
  return (
    <section className="bg-navy">
      <div className="mx-auto w-full max-w-wrap px-5 py-20 lg:px-[50px]">
        <p className="kicker">Gippsland Basketball League</p>
        <h1 className="font-display text-[clamp(68px,10vw,145px)] font-extrabold leading-[0.94] tracking-[-0.015em] text-paper">
          THE GBL
          <br />
          <em className="not-italic text-orange">80s STORY.</em>
        </h1>
        <p className="mt-6 max-w-[390px] text-[19px] leading-relaxed text-paper-muted">
          The teams, the rivalries and the people who filled Gippsland&rsquo;s basketball courts in the
          1980s.
        </p>
        <p className="mt-10 inline-flex items-center gap-4 border border-paper-line bg-navy px-5 py-3 text-sm font-bold text-paper-muted">
          Phase 2 — project setup complete. Public pages arrive in Phase 4.
        </p>
      </div>
    </section>
  );
}
