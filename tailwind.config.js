/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './app/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        primaryMuted: 'var(--color-primary-muted)',
        background: 'var(--color-background)',
        mutedBackground: 'var(--color-muted-background)',
        foreground: 'var(--color-foreground)',
        mutedForeground: 'var(--color-muted-foreground)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        destructive: 'var(--color-destructive)',
        tint: 'var(--color-tint)',
        card: 'var(--color-card)',
        icon: 'var(--color-icon)',
        tabIconDefault: 'var(--color-tab-icon-default)',
        tabIconSelected: 'var(--color-tab-icon-selected)',
        border: 'var(--color-border)',
      },
    },
  },
  plugins: [
    ({ addBase }) => {
      addBase({
        ':root': {
          '--color-primary': '#ce40ad',
          '--color-primary-muted': '#361e33',
          '--color-background': '#120a11',
          '--color-background-muted': '#ffffff',
          '--color-foreground': '#ffffff',
          '--color-muted-foreground': '#b594b0',
          '--color-secondary': '#41203e',
          '--color-accent': '#ff4081',
          '--color-success': '#4caf50',
          '--color-destructive': '#ff1744',
          '--color-tint': '#e91e63',
          '--color-card': '#2e152c',
          '--color-icon': '#8a8a8a',
          '--color-tab-icon-default': '#8a8a8a',
          '--color-tab-icon-selected': '#e91e63',
          '--color-border': '#412738',
        },
      });
    },
  ],
};
