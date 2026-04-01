/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        lora: ['Lora', 'serif'],
        cabinet: ['Cabinet Grotesk', 'sans-serif'],
        bespoke: ['Bespoke Stencil', 'sans-serif'],
      },
      colors: {
        nm: {
          dark: '#0D0D0F',
          mid: '#141418',
          surface: '#1A1A22',
          border: '#2A2A35',
          accent: '#1456CC',
          'accent-light': '#2E6FE0',
          muted: '#6B6B80',
          fg: '#E8E8EE',
          light: '#F4F4F8',
          warm: '#E8A44A',
          'warm-dim': '#C4853A',
        },
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}

