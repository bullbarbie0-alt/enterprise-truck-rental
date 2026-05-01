/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#008542',
                'primary-dark': '#006b36',
                'primary-light': '#e8f5e9',
                dark: '#1a1a2e',
                'dark-light': '#2d2d44',
            },
        },
    },
    plugins: [],
}
