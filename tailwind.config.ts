import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        peach: '#FAD4C0',
        mint: '#A8D5BA',
        pastelYellow: '#FFF4B9',
        softBlue: '#BFD8E5',
        cream: '#FFF8E7',
        gray: {
          200: '#e5e5e5',
          600: '#4b5563'
        }
      }
    }
  },
  plugins: []
} satisfies Config
