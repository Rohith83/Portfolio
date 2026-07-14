/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1277FF',
          50: '#EAF3FF',
          100: '#D5E7FF',
          200: '#A8CEFF',
          300: '#7BB6FF',
          400: '#4D9DFF',
          500: '#1277FF',
          600: '#0E5FCC',
          700: '#0B4899',
          800: '#073066',
          900: '#041833',
        },
        ink: {
          DEFAULT: '#0A0A0F',
          800: '#15151D',
          700: '#22222C',
        },
        canvas: {
          DEFAULT: '#FAFBFC',
          dark: '#0A0A0F',
        },
        panel: {
          DEFAULT: '#EEF2F7',
          dark: '#13131A',
        },
        slate: {
          custom: '#64748B',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'caret-blink': 'caret 1s step-end infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'gradient-x': 'gradientX 6s ease infinite',
      },
      keyframes: {
        caret: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(18,119,255,0.15), 0 8px 30px -8px rgba(18,119,255,0.35)',
      },
    },
  },
  plugins: [],
}
