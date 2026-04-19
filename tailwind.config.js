/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Redesign type stack
        display: ['Fraunces', 'serif'],
        body:    ['Inter', 'sans-serif'],
        ui:      ['Space Grotesk', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
        // Legacy — kept until full port of remaining pages
        satoshi:  ['Satoshi', 'sans-serif'],
        erode:    ['Erode', 'serif'],
        cabinet:  ['Cabinet Grotesk', 'sans-serif'],
        bespoke:  ['Bespoke Stencil', 'sans-serif'],
      },
      colors: {
        // Redesign ink scale
        ink: {
          900: '#0B0B0D',
          800: '#101013',
          700: '#16161B',
          600: '#1D1D24',
          500: '#2A2A33',
          400: '#4A4A57',
          300: '#6B6B7A',
          200: '#A7A7B2',
          100: '#DADADF',
          50:  '#EEEEF2',
          0:   '#F7F7F2',
        },
        accent: {
          blue:  '#1456CC',
          blueL: '#2E6FE0',
          gold:  '#C9A24B',
          goldL: '#E2BE6C',
        },
        // Legacy nm-* — kept until full port of remaining pages
        nm: {
          dark:           '#0D0D0F',
          mid:            '#141418',
          surface:        '#1A1A22',
          border:         '#2A2A35',
          accent:         '#1456CC',
          'accent-light': '#2E6FE0',
          muted:          '#6B6B80',
          fg:             '#E8E8EE',
          light:          '#F4F4F8',
          warm:           '#E8A44A',
          'warm-dim':     '#C4853A',
        },
      },
      letterSpacing: {
        widest2: '0.32em',
        wider2:  '0.22em',
      },
    },
  },
  plugins: [],
}
