/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          950: '#1F0309',
          900: '#350610', // Dark wine
          800: '#4E0A17',
          700: '#650D1B', // Deep burgundy
          600: '#831425',
          500: '#A41D32',
        },
        gold: {
          100: '#FAF3E0',
          200: '#F4E4BD',
          300: '#E8D6A5', // Champagne
          400: '#D9BC7E',
          500: '#C9A45C', // Antique gold
          600: '#B08842',
          700: '#8C672B',
          800: '#684A1A',
        },
        ivory: {
          DEFAULT: '#FFF5DF', // Warm ivory
          50: '#FFFCF5',
          100: '#FFF9ED',
          200: '#FFF5DF',
          300: '#F5E7C8',
        }
      },
      fontFamily: {
        devanagari: ['"Rozha One"', '"Tiro Devanagari Hindi"', '"Yatra One"', 'serif'],
        serif: ['"Playfair Display"', '"Cinzel"', 'Georgia', 'serif'],
        display: ['"Cinzel Decorative"', '"Cinzel"', 'serif'],
        body: ['"Marcellus"', '"Cinzel"', 'serif']
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(201, 164, 92, 0.45)',
        'gold-glow-lg': '0 0 50px rgba(201, 164, 92, 0.65)',
        'burgundy-deep': '0 20px 50px rgba(53, 6, 16, 0.8)',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-slow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(201,164,92,0.6))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(232,214,165,0.9))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
