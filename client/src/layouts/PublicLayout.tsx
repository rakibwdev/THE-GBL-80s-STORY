import { NavLink, Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { to: '/story', label: 'Our story' },
  { to: '/clubs', label: 'Clubs' },
  { to: '/archive', label: 'Archive' },
  { to: '/recognition', label: 'Recognition' },
  { to: '/news', label: 'News & reunions' },
  { to: '/contribute', label: 'Contribute' },
] as const;

/**
 * Shared public layout — header bar, main landmark and footer.
 * Faithful to the approved prototype: deep-navy header, condensed brand mark.
 */
export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-0 focus:top-0 focus:z-50 focus:bg-paper focus:p-3 focus:text-ink"
      >
        Skip to content
      </a>

      <header className="border-b border-navy-line bg-navy-deep">
        <div className="mx-auto flex min-h-20 w-full max-w-wrap flex-col items-start gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between lg:px-[50px]">
          <NavLink to="/" className="group">
            <span className="block font-display text-[32px] font-black leading-[0.92] tracking-[0.02em] text-paper">
              GBL<span className="text-orange">80s</span>
            </span>
            <small className="mt-1 block text-[9px] font-bold uppercase tracking-brand text-paper">
              The GBL 80s Story
            </small>
          </NavLink>
          <nav aria-label="Main navigation" className="flex flex-wrap gap-x-8 gap-y-1.5 text-sm font-semibold">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn('transition-colors hover:text-orange', isActive && 'text-orange')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-navy-line">
        <div className="mx-auto flex w-full max-w-wrap items-center justify-between px-5 py-5 text-sm lg:px-[50px]">
          <span className="text-paper-muted">The GBL 80s Story</span>
          <span className="text-paper-muted">Gippsland Basketball League archive</span>
        </div>
      </footer>
    </div>
  );
}
