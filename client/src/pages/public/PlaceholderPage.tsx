interface PlaceholderPageProps {
  kicker: string;
  title: string;
  description: string;
}

/** Temporary page shell for routes whose real content lands in Phases 4–7. */
export function PlaceholderPage({ kicker, title, description }: PlaceholderPageProps) {
  return (
    <section className="bg-paper">
      <div className="mx-auto w-full max-w-wrap px-5 py-20 lg:px-[50px]">
        <p className="kicker kicker-rust">{kicker}</p>
        <h2 className="font-display text-[clamp(46px,6vw,80px)] font-extrabold leading-[0.94] tracking-[-0.015em] text-ink">
          {title}
        </h2>
        <p className="mt-4 max-w-[48ch] text-paper-muted">{description}</p>
      </div>
    </section>
  );
}
