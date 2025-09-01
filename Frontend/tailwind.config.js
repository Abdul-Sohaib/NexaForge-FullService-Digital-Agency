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
      heading: ["Sora", 'sans-serif'],    // For bold sketch headings
      body: ['Inter', 'sans-serif'],    
    },

    },
  },
  plugins: [],
}