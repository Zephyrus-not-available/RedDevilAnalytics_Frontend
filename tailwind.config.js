/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                united: {
                    red: '#DA291C',
                    black: '#050505',
                    dark: '#111111',
                    gold: '#FBE122'
                }
            },
            fontFamily: {
                headline: ['Oswald', 'sans-serif'],
                body: ['Inter', 'sans-serif']
            },
            dropShadow: {
                glow: '0 0 24px rgba(218, 41, 28, 0.35)'
            }
        }
    },
    plugins: []
}