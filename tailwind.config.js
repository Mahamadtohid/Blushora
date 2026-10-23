/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FBF6EF',
          100: '#F5EDE4',
          200: '#EEDFCF',
          300: '#E4CDB4'
        },
        wine: {
          900: '#2A0712',
          800: '#3B0C1C',
          700: '#4A0E26',
          600: '#651634',
          500: '#842045'
        },
        honey: {
          400: '#F0B870',
          500: '#E9A95C',
          600: '#D4913E'
        },
        blush: {
          400: '#E29287',
          500: '#D97A6C',
          600: '#B85C50'
        },
        ink: '#1A0A0A'
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      letterSpacing: {
        tightest: '-0.04em'
      }
    }
  },
  plugins: []
}
