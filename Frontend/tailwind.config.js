/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nav: ['Amatic SC', 'cursive'],        // For nav links
        heading: ["Sora", 'sans-serif'],      // For bold sketch headings
        body: ['Inter', 'sans-serif'],        // For body text
      },
      // Custom breakpoints for better responsive control
      screens: {
        'xs': '375px', 
        'customwidth':'393px',     // Extra small devices
        'sm': '425px',      // Extra small devices
              // Small devices (default)
        'md': '768px',      // Medium devices (default)
        'lg': '1024px',     // Large devices (default)
        'xl': '1280px',     // Extra large devices (default)
        '2xl': '1536px',    // 2X large devices (default)
        '3xl': '1920px',    // Ultra wide screens
      },
      // Custom spacing for better responsive layouts
    
    },
  },
  // tailwind.config.js
plugins: [
  require('@tailwindcss/forms'),
],

}