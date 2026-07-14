/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#22C55E',
          teal: '#2DD4BF',
          dark: '#16A34A',
        },
        ink: {
          900: '#1F2937',
          700: '#374151',
          500: '#6B7280',
          400: '#9CA3AF',
          200: '#E5E7EB',
          100: '#F3F4F6',
          50: '#F8F9FB',
        },
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'page-title': ['1.75rem', { lineHeight: '2.125rem', letterSpacing: '-0.025em', fontWeight: '600' }],
        'section-title': ['0.8125rem', { lineHeight: '1.25rem', letterSpacing: '0.04em', fontWeight: '600' }],
        'card-title': ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body': ['0.9375rem', { lineHeight: '1.6' }],
        'caption': ['0.8125rem', { lineHeight: '1.25rem' }],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(16, 24, 40, 0.04)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
}
