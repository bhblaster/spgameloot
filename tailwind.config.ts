import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0a0f',
        secondary: '#12121a',
        card: '#16161f',
        elevated: '#1a1a28',
        accent: {
          DEFAULT: '#e63946',
          glow: '#ff2d6b',
        },
        muted: '#8888a0',
        light: '#f0f0f5',
      },
      fontFamily: {
        display: ['var(--font-rajdhani)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
