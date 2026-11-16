import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '@/App';

describe('App smoke test', () => {
  it('renders the homepage brand and title', () => {
    render(<App />);
    expect(screen.getByText('THE GBL', { exact: false })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /find your club/i })).toBeInTheDocument();
  });
});
