import type { Config } from 'tailwindcss';

/**
 * Design tokens extracted from `Design Refferance/` — the approved visual
 * identity for the public site. Do not introduce colours outside this palette.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101c29',
        navy: {
          DEFAULT: '#101b2a',
          deep: '#0b1420',
          darker: '#080d15',
          line: 'rgba(255,255,255,0.19)',
        },
        paper: {
          DEFAULT: '#f6efe2',
          warm: '#fff9ee',
          muted: '#ded7cc',
          line: '#e9dcc8',
          border: '#978a7d',
        },
        orange: {
          DEFAULT: '#ff9850',
          hover: '#ffa970',
        },
        rust: {
          DEFAULT: '#98451d',
          border: '#ad572d',
          focus: '#bb561f',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', '"Arial Narrow"', 'Impact', 'sans-serif'],
        body: ['"DM Sans"', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        kicker: '0.17em',
        meta: '0.12em',
        brand: '0.15em',
      },
      maxWidth: {
        wrap: '1200px',
      },
    },
  },
  plugins: [],
} satisfies Config;
